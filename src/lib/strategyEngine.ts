import {
  TRACKS, CAR_CLASSES, TIRE_COMPOUNDS, CONDITIONS,
  type Track, type CarClassInfo, type TireCompound, type ConditionInfo,
} from './toolsData'

// ─── Input Types ─────────────────────────────────────────────────────────────

export interface StrategyInput {
  trackId: string
  carClassId: string
  conditionId: string
  totalLaps: number
  requiredPitStops: number   // 0 = no mandatory stops; calculator will still suggest if beneficial
}

export interface LapAnalyzerInput {
  trackId: string
  carClassId: string
  conditionId: string
  userLapTimeSec: number     // user's representative lap time
}

// ─── Output Types ────────────────────────────────────────────────────────────

export interface Stint {
  stintNumber: number
  compound: TireCompound
  laps: number
  startLap: number
  endLap: number
  avgLapTimeSec: number      // degraded average over stint
  stintTimeSec: number
}

export interface StrategyVariant {
  stops: number
  stints: Stint[]
  totalRaceTimeSec: number
  totalPitLossSec: number
  compoundSummary: string    // e.g. "M → H"
  isRecommended: boolean
  label: string
  notes: string
}

export interface StrategyResult {
  track: Track
  carClass: CarClassInfo
  condition: ConditionInfo
  totalLaps: number
  theoreticalFastestLapSec: number   // best possible single lap (no fuel/deg)
  variants: StrategyVariant[]
  recommendedVariant: StrategyVariant
}

export interface LapAnalyzerResult {
  track: Track
  carClass: CarClassInfo
  condition: ConditionInfo
  userLapTimeSec: number
  theoreticalBestSec: number
  efficiencyPct: number              // 0–100
  gapSec: number
  gapBreakdown: GapBreakdown[]
  rating: 'Elite' | 'Fast' | 'Solid' | 'Room to Grow' | 'Learning'
  ratingColor: string
  tips: string[]
}

export interface GapBreakdown {
  label: string
  estimatedGapSec: number
  description: string
}

// ─── Core helpers ────────────────────────────────────────────────────────────

/** Base lap time (no fuel, fresh tires) for a given combo */
function baseLapTime(track: Track, car: CarClassInfo, cond: ConditionInfo): number {
  return track.gt3RefSec * car.multiplier * cond.lapTimeMultiplier
}

/**
 * Average lap time over a stint including:
 * - fuel penalty (linear decrease as fuel burns — approximated as half-stint average)
 * - tire degradation after peakLaps
 */
function avgStintLapTime(
  base: number,
  compound: TireCompound,
  laps: number,
  fuelLapPenalty: number,
  tireDegMultiplier: number,
): number {
  // Fuel penalty: starts at fuelLapPenalty, ends near 0 over the stint
  const fuelAvg = fuelLapPenalty * (laps / 2) / laps  // average fuel effect ≈ half max

  // Tyre deg penalty: laps beyond peakLaps accumulate deg
  let totalDeg = 0
  for (let lap = 1; lap <= laps; lap++) {
    if (lap > compound.peakLaps) {
      totalDeg += (lap - compound.peakLaps) * compound.degRatePerLap * tireDegMultiplier
    }
  }
  const avgDeg = totalDeg / laps

  return base + compound.deltaSecVsMedium + fuelAvg + avgDeg
}

/** Distribute laps evenly across N stints */
function distributeStints(totalLaps: number, stops: number): number[] {
  const stintCount = stops + 1
  const base = Math.floor(totalLaps / stintCount)
  const remainder = totalLaps % stintCount
  return Array.from({ length: stintCount }, (_, i) => base + (i < remainder ? 1 : 0))
}

/** Choose best compound sequence for N stints given track tireDeg and conditions */
function chooseBestCompounds(
  stops: number,
  trackDeg: 'low' | 'medium' | 'high',
  availableIds: string[],
  lapsPerStint: number[],
): TireCompound[] {
  const available = TIRE_COMPOUNDS.filter(c => availableIds.includes(c.id))

  if (stops === 0) {
    // Pick compound whose maxLaps covers the full distance with lowest avg time
    const durable = available.filter(c => c.maxLaps >= lapsPerStint[0])
    if (durable.length > 0) {
      // prefer fastest durable option (lowest deltaSecVsMedium)
      return [durable.sort((a, b) => a.deltaSecVsMedium - b.deltaSecVsMedium)[0]]
    }
    // fall back to hard
    return [available.find(c => c.id === 'hard') ?? available[available.length - 1]]
  }

  // For multi-stop: assign a compound to each stint
  // General heuristic: softer early (traffic, fresh rubber), harder later (longer stint)
  const result: TireCompound[] = []
  for (let i = 0; i < lapsPerStint.length; i++) {
    const lapCount = lapsPerStint[i]
    // prefer compounds that can cover the stint without going massively over maxLaps
    const viable = available.filter(c => c.maxLaps >= lapCount * 0.85)
    if (viable.length === 0) {
      result.push(available[available.length - 1])
      continue
    }
    // Last stint: can push harder, pick softest viable
    if (i === lapsPerStint.length - 1) {
      result.push(viable.sort((a, b) => a.deltaSecVsMedium - b.deltaSecVsMedium)[0])
    } else {
      // Earlier stints on high-deg tracks: go harder to preserve tires
      if (trackDeg === 'high') {
        result.push(viable.sort((a, b) => b.deltaSecVsMedium - a.deltaSecVsMedium)[0])
      } else {
        // medium/low: medium compound or softest viable
        const medium = viable.find(c => c.id === 'medium')
        result.push(medium ?? viable.sort((a, b) => a.deltaSecVsMedium - b.deltaSecVsMedium)[0])
      }
    }
  }
  return result
}

// ─── Strategy Calculator ─────────────────────────────────────────────────────

export function calculateStrategy(input: StrategyInput): StrategyResult {
  const track    = TRACKS.find(t => t.id === input.trackId)!
  const carClass = CAR_CLASSES.find(c => c.id === input.carClassId)!
  const cond     = CONDITIONS.find(c => c.id === input.conditionId)!

  const base = baseLapTime(track, carClass, cond)

  const variants: StrategyVariant[] = []

  // Evaluate 0 through 4 stops
  const maxStops = Math.min(4, input.totalLaps - 1)
  const minStops = Math.max(0, input.requiredPitStops)

  for (let stops = 0; stops <= maxStops; stops++) {
    const lapsPerStint = distributeStints(input.totalLaps, stops)
    const compounds    = chooseBestCompounds(stops, track.tireDeg, cond.availableCompounds, lapsPerStint)

    const stints: Stint[] = []
    let lap = 1
    let totalRaceTime = 0

    for (let i = 0; i < lapsPerStint.length; i++) {
      const laps     = lapsPerStint[i]
      const compound = compounds[i] ?? compounds[compounds.length - 1]
      const avgLap   = avgStintLapTime(base, compound, laps, carClass.fuelLapPenalty, carClass.degMultiplier)
      const stintTime = avgLap * laps

      stints.push({
        stintNumber: i + 1,
        compound,
        laps,
        startLap: lap,
        endLap: lap + laps - 1,
        avgLapTimeSec: avgLap,
        stintTimeSec: stintTime,
      })
      totalRaceTime += stintTime
      lap += laps
    }

    const totalPitLoss = stops * track.pitLossSec
    totalRaceTime += totalPitLoss

    const compoundSummary = stints.map(s => s.compound.shortLabel).join(' → ')

    let notes = ''
    if (stops === 0) {
      notes = lapsPerStint[0] > (compounds[0]?.maxLaps ?? 0)
        ? 'Tires may not last — high deg risk.'
        : 'Zero-stop possible. Strong on low-deg tracks.'
    } else if (stops === 1) {
      notes = 'Classic one-stop strategy. Balances pace and pit loss.'
    } else if (stops === 2) {
      notes = 'Two-stop for fresh rubber. Better on high-deg tracks.'
    } else if (stops === 3) {
      notes = 'Aggressive three-stop. Only viable on very long races.'
    } else {
      notes = 'Four-stop ultra-aggressive. Usually only for sprint formats.'
    }

    variants.push({
      stops,
      stints,
      totalRaceTimeSec: totalRaceTime,
      totalPitLossSec: totalPitLoss,
      compoundSummary,
      isRecommended: false,
      label: stops === 0 ? 'Zero Stop' : `${stops}-Stop`,
      notes,
    })
  }

  // Filter to only include stops >= required minimum
  const eligible = variants.filter(v => v.stops >= minStops)

  // Recommend the fastest eligible strategy
  const fastest = eligible.reduce((best, v) =>
    v.totalRaceTimeSec < best.totalRaceTimeSec ? v : best, eligible[0])

  fastest.isRecommended = true

  const theoreticalFastestLapSec = base + (TIRE_COMPOUNDS.find(c => c.id === 'soft')?.deltaSecVsMedium ?? 0)

  return {
    track,
    carClass,
    condition: cond,
    totalLaps: input.totalLaps,
    theoreticalFastestLapSec,
    variants: eligible,
    recommendedVariant: fastest,
  }
}

// ─── Lap Time Analyzer ───────────────────────────────────────────────────────

export function analyzeLapTime(input: LapAnalyzerInput): LapAnalyzerResult {
  const track    = TRACKS.find(t => t.id === input.trackId)!
  const carClass = CAR_CLASSES.find(c => c.id === input.carClassId)!
  const cond     = CONDITIONS.find(c => c.id === input.conditionId)!

  // Theoretical best: base lap + softest available compound, no fuel, fresh tires
  const base          = baseLapTime(track, carClass, cond)
  const availableIds  = cond.availableCompounds
  const fastestCompound = TIRE_COMPOUNDS
    .filter(c => availableIds.includes(c.id))
    .sort((a, b) => a.deltaSecVsMedium - b.deltaSecVsMedium)[0]

  const theoreticalBestSec = base + (fastestCompound?.deltaSecVsMedium ?? 0)
  const gapSec             = Math.max(0, input.userLapTimeSec - theoreticalBestSec)
  const efficiencyPct      = Math.min(100, (theoreticalBestSec / input.userLapTimeSec) * 100)

  // Rate the driver
  let rating: LapAnalyzerResult['rating']
  let ratingColor: string
  if (efficiencyPct >= 98)       { rating = 'Elite';          ratingColor = '#E8322A' }
  else if (efficiencyPct >= 95)  { rating = 'Fast';           ratingColor = '#ff8c00' }
  else if (efficiencyPct >= 91)  { rating = 'Solid';          ratingColor = '#C9A84C' }
  else if (efficiencyPct >= 86)  { rating = 'Room to Grow';   ratingColor = '#4A9EDB' }
  else                           { rating = 'Learning';       ratingColor = '#3DAB6E' }

  // Gap breakdown (estimated proportional attribution)
  const gapBreakdown: GapBreakdown[] = []
  if (gapSec > 0.05) {
    // Brake points typically 30–40% of lap time gap for amateur drivers
    const brakeGap = parseFloat((gapSec * 0.32).toFixed(2))
    gapBreakdown.push({
      label: 'Braking & Trail Braking',
      estimatedGapSec: brakeGap,
      description: 'Late braking and carrying speed into corners. Threshold braking and trail braking technique.',
    })
    // Cornering: 35–45%
    const cornerGap = parseFloat((gapSec * 0.38).toFixed(2))
    gapBreakdown.push({
      label: 'Corner Apex & Rotation',
      estimatedGapSec: cornerGap,
      description: 'Hitting the geometric apex, rotating the car mid-corner, minimizing scrub.',
    })
    // Traction: 20–30%
    const tractionGap = parseFloat((gapSec * 0.22).toFixed(2))
    gapBreakdown.push({
      label: 'Exit Traction & Power Application',
      estimatedGapSec: tractionGap,
      description: 'Early and smooth throttle application on exit. Maximizing straight-line acceleration.',
    })
    // Misc
    const miscGap = parseFloat((gapSec - brakeGap - cornerGap - tractionGap).toFixed(2))
    if (miscGap > 0.01) {
      gapBreakdown.push({
        label: 'Lines & Misc',
        estimatedGapSec: miscGap,
        description: 'Reference point precision, track surface usage, and setup effects.',
      })
    }
  }

  // Contextual tips
  const tips: string[] = []

  if (track.type === 'street') {
    tips.push('Street circuits have narrow margins — wall proximity matters more than perfect apex.')
  }
  if (track.tireDeg === 'high') {
    tips.push(`${track.name} chews through tires fast. Smooth inputs preserve rubber longer.`)
  }
  if (gapSec > 5) {
    tips.push('Focus on one sector at a time. Learn the track first, then push the limits.')
  }
  if (gapSec > 2 && gapSec <= 5) {
    tips.push('You\'re in a good window. Refine your brake points and commit earlier to apexes.')
  }
  if (gapSec <= 2) {
    tips.push('You\'re close to the limit. Micro-gains from trail braking and exit rotation.')
  }
  if (carClass.id === 'hypercar' || carClass.id === 'lmp2') {
    tips.push(`Prototype cars demand precision — aero dependency means more speed in fast corners vs slow corners.`)
  }
  if (cond.id === 'wet' || cond.id === 'mixed') {
    tips.push('Wet conditions shift reference points earlier — brake before usual markers.')
  }
  tips.push(`Theoretical best at ${track.name} in a ${carClass.label} is ${fmtTime(theoreticalBestSec)}. Use simulation laps to benchmark.`)

  return {
    track,
    carClass,
    condition: cond,
    userLapTimeSec: input.userLapTimeSec,
    theoreticalBestSec,
    efficiencyPct,
    gapSec,
    gapBreakdown,
    rating,
    ratingColor,
    tips,
  }
}

// ─── Utilities ───────────────────────────────────────────────────────────────

export function fmtTime(sec: number): string {
  const m   = Math.floor(sec / 60)
  const s   = sec % 60
  const sInt = Math.floor(s)
  const ms  = Math.round((s - sInt) * 1000)
  return `${m}:${String(sInt).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
}

export function parseTimeInput(str: string): number | null {
  // Accepts: "1:23.456" or "83.456" or "83"
  const colonForm = str.match(/^(\d+):(\d{1,2})\.(\d{1,3})$/)
  if (colonForm) {
    return parseInt(colonForm[1]) * 60 + parseFloat(`${colonForm[2]}.${colonForm[3]}`)
  }
  const raw = parseFloat(str)
  return isNaN(raw) ? null : raw
}
