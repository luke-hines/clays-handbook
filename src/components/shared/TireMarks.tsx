/**
 * Rubber groove overlay — fixed behind all content.
 *
 * Two sweeping arc families cross in an S-curve:
 *  Corner A — main racing line (upper-left → lower-right), 9 arcs
 *  Corner B — opposite corner (upper-right → lower-left), 6 arcs
 *
 * Pure black strokes — avoids warm colour bleeding into content.
 * Haze kept subtle so it doesn't wash over page sections.
 */
export default function TireMarks() {

  const pA = (dy: number) =>
    `M -200,${144 + dy} C 350,${112 + dy} 718,${202 + dy} 928,${338 + dy} C 1138,${474 + dy} 1348,${634 + dy} 1638,${740 + dy}`

  const pB = (dy: number) =>
    `M 1640,${126 + dy} C 1278,${178 + dy} 976,${338 + dy} 776,${488 + dy} C 576,${638 + dy} 258,${748 + dy} -200,${830 + dy}`

  // Corner A — 9 arcs
  const A_OFF = [-56, -42, -28, -14, 0, 14, 28, 42, 56]
  const A_OPA = [0.12, 0.24, 0.38, 0.50, 0.60, 0.50, 0.38, 0.24, 0.12]
  const A_W   = [10,   12,   13,   14,   16,   14,   13,   12,   10  ]

  // Corner B — 6 arcs, lighter
  const B_OFF = [-35, -21, -7, 7, 21, 35]
  const B_OPA = [0.09, 0.18, 0.28, 0.28, 0.18, 0.09]
  const B_W   = [10,   11,   13,   13,   11,   10  ]

  return (
    <svg
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="groove" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55 0.75"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic" in2="noise"
            scale="10" xChannelSelector="R" yChannelSelector="G"
            result="disp"
          />
          <feGaussianBlur in="disp" stdDeviation="4" />
        </filter>

        {/* Subtle ambient haze — keep opacity low to avoid content bleed */}
        <filter id="haze">
          <feGaussianBlur stdDeviation="20" />
        </filter>

        <linearGradient id="gA" gradientUnits="userSpaceOnUse"
          x1="-200" y1="200" x2="1638" y2="750">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="6%"   stopColor="#000" stopOpacity="1" />
          <stop offset="94%"  stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="gB" gradientUnits="userSpaceOnUse"
          x1="1640" y1="150" x2="-200" y2="780">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="6%"   stopColor="#000" stopOpacity="1" />
          <stop offset="94%"  stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Corner A — haze (very subtle) */}
      <g filter="url(#haze)" opacity="0.18">
        <path d={pA(0)} fill="none"
          stroke="#000" strokeWidth="240" strokeLinecap="round" />
      </g>

      {/* Corner A — groove band */}
      <g filter="url(#groove)">
        {A_OFF.map((dy, i) => (
          <path key={i} d={pA(dy)} fill="none"
            stroke="url(#gA)" strokeWidth={A_W[i]}
            strokeLinecap="round" opacity={A_OPA[i]} />
        ))}
      </g>

      {/* Corner B — haze */}
      <g filter="url(#haze)" opacity="0.10">
        <path d={pB(0)} fill="none"
          stroke="#000" strokeWidth="200" strokeLinecap="round" />
      </g>

      {/* Corner B — groove band */}
      <g filter="url(#groove)">
        {B_OFF.map((dy, i) => (
          <path key={i} d={pB(dy)} fill="none"
            stroke="url(#gB)" strokeWidth={B_W[i]}
            strokeLinecap="round" opacity={B_OPA[i]} />
        ))}
      </g>
    </svg>
  )
}
