import { useState, useRef, useEffect } from 'react'
import { Calculator, Flag, Timer } from 'lucide-react'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import { TRACKS, CAR_CLASSES, CONDITIONS } from '@/lib/toolsData'
import {
  calculateStrategy,
  analyzeLapTime,
  fmtTime,
  parseTimeInput,
  type StrategyResult,
  type LapAnalyzerResult,
  type Stint,
} from '@/lib/strategyEngine'

// ─── Tab type ─────────────────────────────────────────────────────────────────

type Tab = 'strategy' | 'analyzer'

// ─── Shared select style ─────────────────────────────────────────────────────

const selectStyle: React.CSSProperties = {
  width: '100%',
  background: '#1E1E1E',
  border: '1px solid rgba(240,237,232,0.1)',
  borderRadius: 10,
  padding: '11px 14px',
  color: 'var(--text)',
  fontSize: 14,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(240,237,232,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  paddingRight: 36,
  outline: 'none',
}

const inputStyle: React.CSSProperties = {
  ...selectStyle,
  backgroundImage: 'none',
  paddingRight: 14,
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'rgba(240,237,232,0.45)',
      display: 'block',
      marginBottom: 7,
    }}>
      {children}
    </label>
  )
}

// ─── Format helpers ──────────────────────────────────────────────────────────

function fmtTimeDelta(sec: number): string {
  const sign = sec >= 0 ? '+' : ''
  return `${sign}${sec.toFixed(3)}s`
}

function fmtRaceTime(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = Math.floor(sec % 60)
  if (h > 0) return `${h}h ${m}m ${String(s).padStart(2, '0')}s`
  return `${m}m ${String(s).padStart(2, '0')}s`
}

// ─── Stint Bar ────────────────────────────────────────────────────────────────

function StintBar({ stints, totalLaps }: { stints: Stint[]; totalLaps: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, height: 36, borderRadius: 8, overflow: 'hidden', marginTop: 12 }}>
      {stints.map((s, i) => {
        const pct = (s.laps / totalLaps) * 100
        return (
          <div
            key={i}
            title={`Stint ${s.stintNumber}: ${s.laps} laps on ${s.compound.label} — avg ${fmtTime(s.avgLapTimeSec)}`}
            style={{
              flex: `0 0 ${pct}%`,
              background: `linear-gradient(135deg, ${s.compound.hexColor}55 0%, ${s.compound.hexColor}33 100%)`,
              border: `1px solid ${s.compound.hexColor}66`,
              borderRadius: i === 0 ? '8px 0 0 8px' : i === stints.length - 1 ? '0 8px 8px 0' : 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 800,
              color: s.compound.hexColor,
              letterSpacing: '0.04em',
              flexDirection: 'column',
              gap: 0,
              cursor: 'default',
              transition: 'filter 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)' }}
          >
            <span>{s.compound.shortLabel}</span>
            <span style={{ fontSize: 9, opacity: 0.75 }}>{s.laps}L</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Efficiency Gauge ─────────────────────────────────────────────────────────

function EfficiencyGauge({ pct, color, rating }: { pct: number; color: string; rating: string }) {
  const ref = useRef<SVGCircleElement>(null)
  const r = 54
  const circumference = 2 * Math.PI * r
  const clampedPct = Math.min(100, Math.max(0, pct))
  const offset = circumference - (clampedPct / 100) * circumference

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.strokeDashoffset = String(circumference)
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (ref.current) ref.current.style.strokeDashoffset = String(offset)
      }, 60)
    })
  }, [pct, offset, circumference])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={130} height={130} style={{ overflow: 'visible' }}>
        {/* Track */}
        <circle
          cx={65} cy={65} r={r}
          fill="none"
          stroke="rgba(240,237,232,0.07)"
          strokeWidth={10}
        />
        {/* Progress */}
        <circle
          ref={ref}
          cx={65} cy={65} r={r}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '65px 65px',
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: `drop-shadow(0 0 8px ${color}88)`,
          }}
        />
        {/* Text */}
        <text x={65} y={60} textAnchor="middle" fill="var(--text)" fontSize={22} fontWeight={800}>
          {clampedPct.toFixed(1)}%
        </text>
        <text x={65} y={77} textAnchor="middle" fill="rgba(240,237,232,0.45)" fontSize={11} fontWeight={600}>
          efficiency
        </text>
      </svg>
      <span style={{
        fontSize: 13,
        fontWeight: 800,
        color,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textShadow: `0 0 12px ${color}88`,
      }}>
        {rating}
      </span>
    </div>
  )
}

// ─── Strategy Calculator ──────────────────────────────────────────────────────

function StrategyCalculator() {
  const [trackId,  setTrackId]  = useState(TRACKS[0].id)
  const [carId,    setCarId]    = useState('gt3')
  const [condId,   setCondId]   = useState('dry')
  const [laps,     setLaps]     = useState(30)
  const [minStops, setMinStops] = useState(1)
  const [result,   setResult]   = useState<StrategyResult | null>(null)

  const track = TRACKS.find(t => t.id === trackId)!

  function run() {
    setResult(calculateStrategy({
      trackId,
      carClassId: carId,
      conditionId: condId,
      totalLaps: laps,
      requiredPitStops: minStops,
    }))
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
      {/* Form panel */}
      <div style={{
        background: '#161616',
        border: '1px solid rgba(240,237,232,0.08)',
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        <div>
          <FieldLabel>Track</FieldLabel>
          <select value={trackId} onChange={e => setTrackId(e.target.value)} style={selectStyle}>
            {TRACKS.map(t => (
              <option key={t.id} value={t.id}>{t.flag} {t.name}</option>
            ))}
          </select>
          {track && (
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(240,237,232,0.35)', display: 'flex', gap: 10 }}>
              <span>{track.lengthKm} km</span>
              <span>·</span>
              <span>Pit loss: {track.pitLossSec}s</span>
              <span>·</span>
              <span>Deg: {track.tireDeg}</span>
            </div>
          )}
        </div>

        <div>
          <FieldLabel>Car Class</FieldLabel>
          <select value={carId} onChange={e => setCarId(e.target.value)} style={selectStyle}>
            {CAR_CLASSES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Conditions</FieldLabel>
          <select value={condId} onChange={e => setCondId(e.target.value)} style={selectStyle}>
            {CONDITIONS.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <FieldLabel>Total Laps</FieldLabel>
            <input
              type="number"
              min={2}
              max={200}
              value={laps}
              onChange={e => setLaps(Math.max(2, parseInt(e.target.value) || 2))}
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel>Min Pit Stops</FieldLabel>
            <input
              type="number"
              min={0}
              max={4}
              value={minStops}
              onChange={e => setMinStops(Math.min(4, Math.max(0, parseInt(e.target.value) || 0)))}
              style={inputStyle}
            />
          </div>
        </div>

        <button
          onClick={run}
          style={{
            marginTop: 4,
            padding: '13px 0',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #E8322A 0%, #c42a22 100%)',
            color: '#fff',
            boxShadow: '0 0 20px rgba(232,50,42,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.boxShadow = '0 0 32px rgba(232,50,42,0.5), inset 0 1px 0 rgba(255,255,255,0.16)'
            el.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.boxShadow = '0 0 20px rgba(232,50,42,0.3), inset 0 1px 0 rgba(255,255,255,0.12)'
            el.style.transform = 'translateY(0)'
          }}
        >
          Calculate Strategy
        </button>
      </div>

      {/* Results */}
      <div>
        {!result ? (
          <div style={{
            background: '#161616',
            border: '1px solid rgba(240,237,232,0.08)',
            borderRadius: 16,
            padding: 48,
            textAlign: 'center',
            color: 'rgba(240,237,232,0.3)',
          }}>
            <div style={{ marginBottom: 12, color: 'rgba(240,237,232,0.2)', display: 'flex', justifyContent: 'center' }}><Flag size={40} /></div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Configure your race and hit Calculate</div>
            <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>Strategy variants will appear here</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Header */}
            <div style={{
              background: '#161616',
              border: '1px solid rgba(240,237,232,0.08)',
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                  {result.track.flag} {result.track.name} · {result.carClass.label} · {result.condition.icon} {result.condition.label}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.4)', marginTop: 3 }}>
                  {result.totalLaps} laps · Theoretical fastest lap: <span style={{ color: '#E8322A', fontWeight: 700 }}>{fmtTime(result.theoreticalFastestLapSec)}</span>
                </div>
              </div>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#3DAB6E',
                background: 'rgba(61,171,110,0.12)',
                border: '1px solid rgba(61,171,110,0.25)',
                borderRadius: 6,
                padding: '4px 10px',
              }}>
                {result.variants.length} variants
              </div>
            </div>

            {/* Strategy cards */}
            {result.variants.map(v => (
              <div
                key={v.stops}
                style={{
                  background: v.isRecommended ? 'rgba(232,50,42,0.06)' : '#161616',
                  border: `1px solid ${v.isRecommended ? 'rgba(232,50,42,0.3)' : 'rgba(240,237,232,0.08)'}`,
                  borderRadius: 14,
                  padding: 20,
                  position: 'relative',
                  transition: 'border-color 0.2s',
                }}
              >
                {v.isRecommended && (
                  <div style={{
                    position: 'absolute',
                    top: -1,
                    right: 16,
                    background: 'linear-gradient(135deg, #E8322A 0%, #c42a22 100%)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 2px 8px rgba(232,50,42,0.4)',
                  }}>
                    Recommended
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{v.label}</span>
                      <span style={{ fontSize: 12, color: 'rgba(240,237,232,0.45)' }}>{v.compoundSummary}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 12 }}>{v.notes}</div>

                    <StintBar stints={v.stints} totalLaps={result.totalLaps} />

                    {/* Stint details */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                      {v.stints.map((s, i) => (
                        <div key={i} style={{
                          fontSize: 11,
                          color: s.compound.hexColor,
                          background: `${s.compound.hexColor}18`,
                          border: `1px solid ${s.compound.hexColor}33`,
                          borderRadius: 6,
                          padding: '4px 8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                        }}>
                          <span style={{ fontWeight: 700 }}>Stint {s.stintNumber} · {s.compound.label}</span>
                          <span style={{ opacity: 0.75 }}>L{s.startLap}–{s.endLap} ({s.laps} laps)</span>
                          <span style={{ opacity: 0.75 }}>Avg {fmtTime(s.avgLapTimeSec)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time column */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: v.isRecommended ? '#E8322A' : 'var(--text)' }}>
                      {fmtRaceTime(v.totalRaceTimeSec)}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.35)', marginTop: 2 }}>
                      total race time
                    </div>
                    {v.stops > 0 && (
                      <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.3)', marginTop: 4 }}>
                        {v.stops} × pit = {v.totalPitLossSec}s loss
                      </div>
                    )}
                    {/* Delta vs recommended */}
                    {!v.isRecommended && result.recommendedVariant && (
                      <div style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#C9A84C',
                        marginTop: 6,
                      }}>
                        +{fmtRaceTime(v.totalRaceTimeSec - result.recommendedVariant.totalRaceTimeSec)} vs best
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Lap Time Analyzer ────────────────────────────────────────────────────────

function LapAnalyzer() {
  const [trackId,  setTrackId]  = useState(TRACKS[0].id)
  const [carId,    setCarId]    = useState('gt3')
  const [condId,   setCondId]   = useState('dry')
  const [lapInput, setLapInput] = useState('')
  const [error,    setError]    = useState('')
  const [result,   setResult]   = useState<LapAnalyzerResult | null>(null)

  const track = TRACKS.find(t => t.id === trackId)!

  function run() {
    const parsed = parseTimeInput(lapInput.trim())
    if (parsed === null || parsed <= 0) {
      setError('Enter a valid lap time — e.g. 1:23.456 or 83.456')
      return
    }
    setError('')
    setResult(analyzeLapTime({
      trackId,
      carClassId: carId,
      conditionId: condId,
      userLapTimeSec: parsed,
    }))
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
      {/* Form */}
      <div style={{
        background: '#161616',
        border: '1px solid rgba(240,237,232,0.08)',
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>
        <div>
          <FieldLabel>Track</FieldLabel>
          <select value={trackId} onChange={e => setTrackId(e.target.value)} style={selectStyle}>
            {TRACKS.map(t => (
              <option key={t.id} value={t.id}>{t.flag} {t.name}</option>
            ))}
          </select>
          {track && (
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(240,237,232,0.35)', display: 'flex', gap: 10 }}>
              <span>{track.lengthKm} km</span>
              <span>·</span>
              <span>GT3 ref: {fmtTime(track.gt3RefSec)}</span>
            </div>
          )}
        </div>

        <div>
          <FieldLabel>Car Class</FieldLabel>
          <select value={carId} onChange={e => setCarId(e.target.value)} style={selectStyle}>
            {CAR_CLASSES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Conditions</FieldLabel>
          <select value={condId} onChange={e => setCondId(e.target.value)} style={selectStyle}>
            {CONDITIONS.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Your Lap Time</FieldLabel>
          <input
            type="text"
            value={lapInput}
            onChange={e => { setLapInput(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && run()}
            placeholder="1:23.456 or 83.456"
            style={{
              ...inputStyle,
              borderColor: error ? 'rgba(232,50,42,0.5)' : 'rgba(240,237,232,0.1)',
            }}
          />
          {error && (
            <div style={{ fontSize: 11, color: '#E8322A', marginTop: 5 }}>{error}</div>
          )}
        </div>

        <button
          onClick={run}
          style={{
            marginTop: 4,
            padding: '13px 0',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #4A9EDB 0%, #2d7fc4 100%)',
            color: '#fff',
            boxShadow: '0 0 20px rgba(74,158,219,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.boxShadow = '0 0 32px rgba(74,158,219,0.45), inset 0 1px 0 rgba(255,255,255,0.16)'
            el.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.boxShadow = '0 0 20px rgba(74,158,219,0.25), inset 0 1px 0 rgba(255,255,255,0.12)'
            el.style.transform = 'translateY(0)'
          }}
        >
          Analyze Lap Time
        </button>
      </div>

      {/* Results */}
      <div>
        {!result ? (
          <div style={{
            background: '#161616',
            border: '1px solid rgba(240,237,232,0.08)',
            borderRadius: 16,
            padding: 48,
            textAlign: 'center',
            color: 'rgba(240,237,232,0.3)',
          }}>
            <div style={{ marginBottom: 12, color: 'rgba(240,237,232,0.2)', display: 'flex', justifyContent: 'center' }}><Timer size={40} /></div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Enter your lap time and hit Analyze</div>
            <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>Efficiency score and breakdown will appear here</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Top row: gauge + headline numbers */}
            <div style={{
              background: '#161616',
              border: '1px solid rgba(240,237,232,0.08)',
              borderRadius: 14,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}>
              <EfficiencyGauge
                pct={result.efficiencyPct}
                color={result.ratingColor}
                rating={result.rating}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'rgba(240,237,232,0.4)', fontWeight: 600, marginBottom: 4 }}>
                  {result.track.flag} {result.track.name} · {result.carClass.label} · {result.condition.icon} {result.condition.label}
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.35)', marginBottom: 3 }}>Your time</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>{fmtTime(result.userLapTimeSec)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.35)', marginBottom: 3 }}>Theoretical best</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#3DAB6E' }}>{fmtTime(result.theoreticalBestSec)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.35)', marginBottom: 3 }}>Gap</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: result.gapSec < 1 ? '#C9A84C' : '#E8322A' }}>
                      {fmtTimeDelta(result.gapSec)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gap breakdown */}
            {result.gapBreakdown.length > 0 && (
              <div style={{
                background: '#161616',
                border: '1px solid rgba(240,237,232,0.08)',
                borderRadius: 14,
                padding: 20,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', marginBottom: 14 }}>
                  Where the gap lives
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {result.gapBreakdown.map((g, i) => {
                    const barPct = (g.estimatedGapSec / result.gapSec) * 100
                    return (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{g.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#E8322A' }}>{fmtTimeDelta(g.estimatedGapSec)}</span>
                        </div>
                        <div style={{ height: 5, background: 'rgba(240,237,232,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${barPct}%`,
                            background: 'linear-gradient(90deg, #E8322A, #ff6b65)',
                            borderRadius: 3,
                            transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                          }} />
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.35)', marginTop: 4 }}>{g.description}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tips */}
            <div style={{
              background: '#161616',
              border: '1px solid rgba(240,237,232,0.08)',
              borderRadius: 14,
              padding: 20,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', marginBottom: 14 }}>
                Tips to close the gap
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#4A9EDB',
                      background: 'rgba(74,158,219,0.12)',
                      border: '1px solid rgba(74,158,219,0.25)',
                      borderRadius: 4,
                      padding: '2px 6px',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  const [loading, done] = usePageLoader(380)
  const [tab, setTab] = useState<Tab>('strategy')

  if (loading) return <PageLoader icon={<Calculator size={40} />} label="Racing Tools" color="#E8322A" duration={380} onDone={done} />
  return (
    <div className="screen-enter" style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ color: '#E8322A', filter: 'drop-shadow(0 0 8px rgba(232,50,42,0.4))', display: 'flex' }}><Calculator size={28} /></span>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)' }}>
            Racing{' '}
            <span style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(90deg, #E8322A, #ff6b65)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}>
              Tools
            </span>
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(240,237,232,0.5)', maxWidth: 520 }}>
          Strategy calculator and lap time analyzer for sim racing and real-world racing theory.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'inline-flex',
        background: '#161616',
        border: '1px solid rgba(240,237,232,0.08)',
        borderRadius: 12,
        padding: 4,
        marginBottom: 28,
        gap: 2,
      }}>
        {([
          { id: 'strategy' as Tab, label: 'Strategy Calculator', icon: <Flag size={14} /> },
          { id: 'analyzer' as Tab, label: 'Lap Time Analyzer',   icon: <Timer size={14} /> },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '9px 20px',
              borderRadius: 9,
              fontSize: 13,
              fontWeight: tab === t.id ? 700 : 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.18s',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: tab === t.id
                ? 'linear-gradient(135deg, rgba(232,50,42,0.2) 0%, rgba(232,50,42,0.1) 100%)'
                : 'transparent',
              color: tab === t.id ? '#fff' : 'rgba(240,237,232,0.45)',
              boxShadow: tab === t.id
                ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 12px rgba(232,50,42,0.12)'
                : 'none',
              borderWidth: tab === t.id ? 1 : 0,
              borderStyle: 'solid',
              borderColor: tab === t.id ? 'rgba(232,50,42,0.25)' : 'transparent',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'strategy' && <StrategyCalculator />}
      {tab === 'analyzer' && <LapAnalyzer />}
    </div>
  )
}
