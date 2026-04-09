import { useState, useEffect, useRef, useCallback } from 'react'

interface PageLoaderProps {
  icon: React.ReactNode
  label: string
  color: string          // accent color for glow + bar
  duration?: number      // ms before fading out (default 420)
  onDone: () => void
}

export default function PageLoader({
  icon,
  label,
  color,
  duration = 420,
  onDone,
}: PageLoaderProps) {
  const [phase, setPhase] = useState<'in' | 'visible' | 'out'>('in')
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    // in → visible after 80ms
    const t1 = setTimeout(() => setPhase('visible'), 80)
    // visible → out after duration
    const t2 = setTimeout(() => setPhase('out'), duration)
    // call onDone after fade-out completes
    const t3 = setTimeout(() => onDoneRef.current(), duration + 220)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [duration]) // onDone intentionally excluded — accessed via ref

  const opacity = phase === 'in' ? 0 : phase === 'out' ? 0 : 1
  const scale   = phase === 'in' ? 0.96 : 1

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#0D0D0D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        opacity,
        transform: `scale(${scale})`,
        transition: phase === 'out'
          ? 'opacity 0.2s ease-in, transform 0.2s ease-in'
          : 'opacity 0.12s ease-out, transform 0.12s ease-out',
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      {/* Icon ring */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${color}14`,
          border: `1.5px solid ${color}40`,
          color,
          boxShadow: `0 0 32px ${color}30, inset 0 0 16px ${color}08`,
          transition: 'box-shadow 0.3s',
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: `${color}cc`,
        }}
      >
        {label}
      </span>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          animation: `loader-bar ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      />

      <style>{`
        @keyframes loader-bar {
          from { width: 0%; left: 0%; opacity: 1; }
          to   { width: 100%; left: 0%; opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePageLoader(_duration = 420): [boolean, () => void] {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])
  return [loading, done]
}
