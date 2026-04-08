import { useState, useRef } from 'react'
import type { TrackDiagram, DiagramHotspot } from '@/lib/diagramData'

interface Props {
  diagram: TrackDiagram
  accentColor?: string
}

interface TooltipState {
  hotspot: DiagramHotspot
  x: number
  y: number
}

export default function TrackDiagramView({ diagram, accentColor = '#E8322A' }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEnter = (hotspot: DiagramHotspot, e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setTooltip({
      hotspot,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setActiveId(hotspot.id)
  }

  const handleMove = (hotspot: DiagramHotspot, e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setTooltip({
      hotspot,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleLeave = () => {
    setTooltip(null)
    setActiveId(null)
  }

  // Parse viewBox to get dimensions for hotspot % positioning
  const [, , vbW, vbH] = diagram.viewBox.split(' ').map(Number)

  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{
        margin: '0 0 12px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
      }}>
        Interactive Diagram
      </p>

      <div
        style={{
          borderRadius: 12,
          border: '1px solid var(--border)',
          background: '#0D0D0D',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
              {diagram.title}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-tertiary)' }}>
              {diagram.description}
            </p>
          </div>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: 6,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}>
            Hover to explore
          </span>
        </div>

        {/* SVG + hotspots */}
        <div
          ref={containerRef}
          style={{ position: 'relative', width: '100%', userSelect: 'none' }}
        >
          <svg
            viewBox={diagram.viewBox}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            aria-hidden="true"
          >
            {/* Background */}
            <rect width={vbW} height={vbH} fill="#0D0D0D" />

            {/* Track paths */}
            {diagram.paths.map((path, i) => (
              <path
                key={i}
                d={path.d}
                fill={path.fill ?? 'none'}
                stroke={path.stroke ?? 'none'}
                strokeWidth={path.strokeWidth ?? 1}
                opacity={path.opacity ?? 1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Hotspot markers */}
            {diagram.hotspots.map(hs => {
              const cx = (hs.x / 100) * vbW
              const cy = (hs.y / 100) * vbH
              const isActive = activeId === hs.id
              const dotColor = hs.color ?? accentColor

              return (
                <g key={hs.id}>
                  {/* Pulse ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 14 : 10}
                    fill={`${dotColor}18`}
                    stroke={`${dotColor}50`}
                    strokeWidth={1}
                    style={{ transition: 'r 0.15s, fill 0.15s' }}
                  />
                  {/* Main dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={isActive ? dotColor : `${dotColor}CC`}
                    stroke={isActive ? '#fff' : dotColor}
                    strokeWidth={isActive ? 1.5 : 1}
                    style={{
                      cursor: 'pointer',
                      transition: 'fill 0.15s, r 0.15s',
                      filter: isActive ? `drop-shadow(0 0 4px ${dotColor})` : 'none',
                    }}
                  />
                  {/* Invisible large hit area */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={18}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={e => handleEnter(hs, e)}
                    onMouseMove={e => handleMove(hs, e)}
                    onMouseLeave={handleLeave}
                  />
                </g>
              )
            })}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <Tooltip tooltip={tooltip} containerRef={containerRef} />
          )}
        </div>

        {/* Legend row */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 16px',
        }}>
          {diagram.hotspots.map(hs => (
            <button
              key={hs.id}
              onMouseEnter={e => {
                const container = containerRef.current
                if (!container) return
                const rect = container.getBoundingClientRect()
                setTooltip({ hotspot: hs, x: e.clientX - rect.left, y: e.clientY - rect.top })
                setActiveId(hs.id)
              }}
              onMouseLeave={handleLeave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: hs.color ?? accentColor,
                flexShrink: 0,
                boxShadow: activeId === hs.id ? `0 0 6px ${hs.color ?? accentColor}` : 'none',
                transition: 'box-shadow 0.15s',
              }} />
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: activeId === hs.id ? 'var(--text)' : 'var(--text-tertiary)',
                transition: 'color 0.15s',
              }}>
                {hs.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tooltip ────────────────────────────────────────────────────────────────────

function Tooltip({ tooltip, containerRef }: {
  tooltip: TooltipState
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const TOOLTIP_W = 280
  const TOOLTIP_OFFSET = 16
  const container = containerRef.current
  const containerWidth = container?.offsetWidth ?? 600

  let left = tooltip.x + TOOLTIP_OFFSET
  if (left + TOOLTIP_W > containerWidth - 8) {
    left = tooltip.x - TOOLTIP_W - TOOLTIP_OFFSET
  }
  if (left < 8) left = 8

  const top = Math.max(tooltip.y - 60, 8)

  const dotColor = tooltip.hotspot.color ?? '#E8322A'

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: TOOLTIP_W,
        pointerEvents: 'none',
        zIndex: 10,
        animation: 'tooltip-in 0.12s ease',
      }}
    >
      <style>{`
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        background: 'rgba(22,22,22,0.97)',
        border: `1px solid ${dotColor}40`,
        borderRadius: 10,
        padding: '12px 14px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${dotColor}20`,
        backdropFilter: 'blur(12px)',
      }}>
        <p style={{
          margin: '0 0 6px',
          fontSize: 12,
          fontWeight: 700,
          color: dotColor,
          letterSpacing: '0.02em',
        }}>
          {tooltip.hotspot.label}
        </p>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}>
          {tooltip.hotspot.body}
        </p>
      </div>
    </div>
  )
}
