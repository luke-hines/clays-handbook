// ─── Tracks ───────────────────────────────────────────────────────────────────

export interface Track {
  id: string
  name: string
  flag: string
  country: string
  lengthKm: number
  pitLossSec: number              // time lost in pit lane
  tireDeg: 'low' | 'medium' | 'high'
  gt3RefSec: number               // GT3 reference lap time in seconds
  type: 'permanent' | 'street' | 'oval'
}

export const TRACKS: Track[] = [
  { id: 'spa',         name: 'Spa-Francorchamps',    flag: '🇧🇪', country: 'Belgium',     lengthKm: 7.004, pitLossSec: 22, tireDeg: 'medium', gt3RefSec: 137, type: 'permanent' },
  { id: 'monza',       name: 'Monza',                flag: '🇮🇹', country: 'Italy',       lengthKm: 5.793, pitLossSec: 20, tireDeg: 'low',    gt3RefSec: 105, type: 'permanent' },
  { id: 'monaco',      name: 'Monaco',               flag: '🇲🇨', country: 'Monaco',      lengthKm: 3.337, pitLossSec: 28, tireDeg: 'high',   gt3RefSec: 93,  type: 'street'    },
  { id: 'silverstone', name: 'Silverstone GP',       flag: '🇬🇧', country: 'UK',          lengthKm: 5.891, pitLossSec: 21, tireDeg: 'medium', gt3RefSec: 117, type: 'permanent' },
  { id: 'nurburgring', name: 'Nürburgring GP',       flag: '🇩🇪', country: 'Germany',     lengthKm: 5.148, pitLossSec: 21, tireDeg: 'medium', gt3RefSec: 114, type: 'permanent' },
  { id: 'suzuka',      name: 'Suzuka',               flag: '🇯🇵', country: 'Japan',       lengthKm: 5.807, pitLossSec: 22, tireDeg: 'medium', gt3RefSec: 122, type: 'permanent' },
  { id: 'barcelona',   name: 'Circuit de Catalunya', flag: '🇪🇸', country: 'Spain',       lengthKm: 4.657, pitLossSec: 21, tireDeg: 'high',   gt3RefSec: 115, type: 'permanent' },
  { id: 'lagunaseca',  name: 'Laguna Seca',          flag: '🇺🇸', country: 'USA',         lengthKm: 3.602, pitLossSec: 18, tireDeg: 'medium', gt3RefSec: 85,  type: 'permanent' },
  { id: 'watkinsglen', name: 'Watkins Glen',         flag: '🇺🇸', country: 'USA',         lengthKm: 5.435, pitLossSec: 20, tireDeg: 'medium', gt3RefSec: 102, type: 'permanent' },
  { id: 'roadamerica', name: 'Road America',         flag: '🇺🇸', country: 'USA',         lengthKm: 6.515, pitLossSec: 23, tireDeg: 'low',    gt3RefSec: 130, type: 'permanent' },
  { id: 'zandvoort',   name: 'Zandvoort',            flag: '🇳🇱', country: 'Netherlands', lengthKm: 4.259, pitLossSec: 19, tireDeg: 'high',   gt3RefSec: 92,  type: 'permanent' },
  { id: 'bathurst',    name: 'Mount Panorama',       flag: '🇦🇺', country: 'Australia',   lengthKm: 6.213, pitLossSec: 24, tireDeg: 'medium', gt3RefSec: 120, type: 'permanent' },
  { id: 'cota',        name: 'COTA',                 flag: '🇺🇸', country: 'USA',         lengthKm: 5.513, pitLossSec: 22, tireDeg: 'medium', gt3RefSec: 123, type: 'permanent' },
  { id: 'lemans',      name: 'Le Mans',              flag: '🇫🇷', country: 'France',      lengthKm: 13.626, pitLossSec: 55, tireDeg: 'low',  gt3RefSec: 225, type: 'permanent' },
  { id: 'imola',       name: 'Imola',                flag: '🇮🇹', country: 'Italy',       lengthKm: 4.909, pitLossSec: 20, tireDeg: 'medium', gt3RefSec: 110, type: 'permanent' },
  { id: 'brandshatch', name: 'Brands Hatch GP',      flag: '🇬🇧', country: 'UK',          lengthKm: 4.206, pitLossSec: 19, tireDeg: 'medium', gt3RefSec: 95,  type: 'permanent' },
  { id: 'interlagos',  name: 'Interlagos',           flag: '🇧🇷', country: 'Brazil',      lengthKm: 4.309, pitLossSec: 20, tireDeg: 'high',   gt3RefSec: 101, type: 'permanent' },
  { id: 'sebring',     name: 'Sebring',              flag: '🇺🇸', country: 'USA',         lengthKm: 6.019, pitLossSec: 22, tireDeg: 'high',   gt3RefSec: 118, type: 'permanent' },
  { id: 'paulricard',  name: 'Paul Ricard',          flag: '🇫🇷', country: 'France',      lengthKm: 5.842, pitLossSec: 21, tireDeg: 'low',    gt3RefSec: 115, type: 'permanent' },
  { id: 'daytona',     name: 'Daytona Road Course',  flag: '🇺🇸', country: 'USA',         lengthKm: 5.730, pitLossSec: 23, tireDeg: 'medium', gt3RefSec: 118, type: 'oval'      },
]

// ─── Car Classes ──────────────────────────────────────────────────────────────

export type CarClass = 'tcr' | 'gt4' | 'gt3' | 'gte' | 'lmp2' | 'hypercar' | 'f4' | 'f3'

export interface CarClassInfo {
  id: CarClass
  label: string
  description: string
  multiplier: number      // lap time multiplier vs GT3 (1.0 = same pace as GT3)
  fuelLapPenalty: number  // seconds added per lap at full fuel load
  degMultiplier: number   // tire wear multiplier vs baseline
}

export const CAR_CLASSES: CarClassInfo[] = [
  { id: 'tcr',      label: 'TCR / Touring Car', description: 'Production-based touring car',      multiplier: 1.14, fuelLapPenalty: 0.6,  degMultiplier: 0.9 },
  { id: 'gt4',      label: 'GT4',               description: 'Entry-level GT racing',             multiplier: 1.08, fuelLapPenalty: 0.7,  degMultiplier: 0.95 },
  { id: 'gt3',      label: 'GT3',               description: 'Premier GT endurance class',        multiplier: 1.00, fuelLapPenalty: 0.8,  degMultiplier: 1.0 },
  { id: 'gte',      label: 'GTE / GT3 Pro',     description: 'Professional GT specification',     multiplier: 0.98, fuelLapPenalty: 0.75, degMultiplier: 1.05 },
  { id: 'lmp2',     label: 'LMP2',              description: 'Le Mans Prototype 2',               multiplier: 0.91, fuelLapPenalty: 0.6,  degMultiplier: 1.1 },
  { id: 'hypercar', label: 'LMH / Hypercar',    description: 'Le Mans Hypercar / LMDh',          multiplier: 0.84, fuelLapPenalty: 0.5,  degMultiplier: 1.15 },
  { id: 'f4',       label: 'Formula 4',         description: 'Entry-level single-seater',         multiplier: 1.03, fuelLapPenalty: 0.4,  degMultiplier: 0.9 },
  { id: 'f3',       label: 'Formula 3',         description: 'FIA F3 / Regional F3',              multiplier: 0.94, fuelLapPenalty: 0.35, degMultiplier: 0.95 },
]

// ─── Tire Compounds ───────────────────────────────────────────────────────────

export interface TireCompound {
  id: string
  label: string
  shortLabel: string
  color: string             // for UI
  hexColor: string
  deltaSecVsMedium: number  // per lap delta vs medium (negative = faster)
  peakLaps: number          // laps before deg kicks in
  maxLaps: number           // absolute max before serious falloff
  degRatePerLap: number     // seconds/lap added after peakLaps
  conditions: ('dry' | 'wet' | 'mixed')[]
}

export const TIRE_COMPOUNDS: TireCompound[] = [
  {
    id: 'soft', label: 'Soft', shortLabel: 'S', color: 'red', hexColor: '#E8322A',
    deltaSecVsMedium: -1.4, peakLaps: 12, maxLaps: 22,
    degRatePerLap: 0.18, conditions: ['dry'],
  },
  {
    id: 'medium', label: 'Medium', shortLabel: 'M', color: 'yellow', hexColor: '#C9A84C',
    deltaSecVsMedium: 0, peakLaps: 22, maxLaps: 38,
    degRatePerLap: 0.10, conditions: ['dry'],
  },
  {
    id: 'hard', label: 'Hard', shortLabel: 'H', color: 'white', hexColor: '#B0ADA8',
    deltaSecVsMedium: 1.2, peakLaps: 38, maxLaps: 60,
    degRatePerLap: 0.06, conditions: ['dry'],
  },
  {
    id: 'intermediate', label: 'Intermediate', shortLabel: 'I', color: 'green', hexColor: '#3DAB6E',
    deltaSecVsMedium: 0, peakLaps: 20, maxLaps: 35,
    degRatePerLap: 0.15, conditions: ['mixed'],
  },
  {
    id: 'wet', label: 'Full Wet', shortLabel: 'W', color: 'blue', hexColor: '#4A9EDB',
    deltaSecVsMedium: 0, peakLaps: 25, maxLaps: 50,
    degRatePerLap: 0.10, conditions: ['wet'],
  },
]

// ─── Conditions ───────────────────────────────────────────────────────────────

export type RaceCondition = 'dry' | 'mixed' | 'wet'

export interface ConditionInfo {
  id: RaceCondition
  label: string
  icon: string
  lapTimeMultiplier: number
  availableCompounds: string[]  // compound ids
  description: string
}

export const CONDITIONS: ConditionInfo[] = [
  {
    id: 'dry',   label: 'Dry',         icon: '☀️',
    lapTimeMultiplier: 1.00,
    availableCompounds: ['soft', 'medium', 'hard'],
    description: 'Full slick compounds available',
  },
  {
    id: 'mixed', label: 'Mixed / Damp', icon: '🌦️',
    lapTimeMultiplier: 1.08,
    availableCompounds: ['intermediate'],
    description: 'Intermediate tires required, damp surface',
  },
  {
    id: 'wet',   label: 'Wet',         icon: '🌧️',
    lapTimeMultiplier: 1.15,
    availableCompounds: ['wet'],
    description: 'Full wet tires required throughout',
  },
]
