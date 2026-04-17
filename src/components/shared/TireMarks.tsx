/**
 * Rubber groove overlay — fixed behind all content.
 *
 * Simulates the worn rubber deposits left by cars driving
 * the same corner lines lap after lap, as seen in aerial
 * photography of racing circuits. Two sweeping arc families
 * cross the viewport in an S-curve. Corner A has 9 tight
 * parallel arcs (dense band = heavy traffic). Corner B has
 * 6 arcs (lighter — this corner sees fewer laps).
 */
export default function TireMarks() {
  // Corner A center path — upper-left → lower-right
  const cA = (dy: number) =>
    `M -200,${144 + dy} C 350,${112 + dy} 718,${202 + dy} 928,${338 + dy} C 1138,${474 + dy} 1348,${634 + dy} 1638,${740 + dy}`

  // Corner B center path — upper-right → lower-left
  const cB = (dy: number) =>
    `M 1640,${126 + dy} C 1278,${178 + dy} 976,${338 + dy} 776,${488 + dy} C 576,${638 + dy} 258,${748 + dy} -200,${830 + dy}`

  // Corner A: 9 arcs at 14px spacing, centered at dy=0
  //   offsets: -56 -42 -28 -14  0 +14 +28 +42 +56
  const aOpacity = [0.16, 0.28, 0.40, 0.52, 0.64, 0.52, 0.40, 0.28, 0.16]
  const aWidth   = [11,   12,   13,   14,   16,   14,   13,   12,   11  ]
  const aOffsets = [-56, -42, -28, -14, 0, 14, 28, 42, 56]

  // Corner B: 6 arcs at 14px spacing, centered at dy=0, lighter
  const bOpacity = [0.13, 0.24, 0.36, 0.36, 0.24, 0.13]
  const bWidth   = [11,   12,   14,   14,   12,   11  ]
  const bOffsets = [-35, -21, -7, 7, 21, 35]

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
        {/* Rubber grain — turbulence makes path edges look like real deposits */}
        <filter id="groove" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.52 0.68"
            numOctaves="5"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />
          <feGaussianBlur in="disp" stdDeviation="4.5" />
        </filter>

        {/* Wide soft haze behind groove band */}
        <filter id="haze" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="18" />
        </filter>

        {/* Corner A gradient: fades in from left, out to right */}
        <linearGradient id="gA" gradientUnits="userSpaceOnUse"
          x1="-200" y1="200" x2="1640" y2="750">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="6%"   stopColor="#000" stopOpacity="1" />
          <stop offset="94%"  stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Corner B gradient: fades in from right, out to left */}
        <linearGradient id="gB" gradientUnits="userSpaceOnUse"
          x1="1640" y1="150" x2="-200" y2="780">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="6%"   stopColor="#000" stopOpacity="1" />
          <stop offset="94%"  stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Corner A: upper-left → lower-right ─────────────────────────────── */}

      {/* Broad outer haze */}
      <g filter="url(#haze)" opacity="0.50">
        <path
          d={cA(0)}
          fill="none" stroke="url(#gA)" strokeWidth="280" strokeLinecap="round"
        />
      </g>

      {/* 9-arc groove band */}
      <g filter="url(#groove)">
        {aOffsets.map((dy, i) => (
          <path
            key={i}
            d={cA(dy)}
            fill="none"
            stroke="url(#gA)"
            strokeWidth={aWidth[i]}
            strokeLinecap="round"
            opacity={aOpacity[i]}
          />
        ))}
      </g>

      {/* ── Corner B: upper-right → lower-left ─────────────────────────────── */}

      {/* Broad outer haze */}
      <g filter="url(#haze)" opacity="0.38">
        <path
          d={cB(0)}
          fill="none" stroke="url(#gB)" strokeWidth="240" strokeLinecap="round"
        />
      </g>

      {/* 6-arc groove band */}
      <g filter="url(#groove)">
        {bOffsets.map((dy, i) => (
          <path
            key={i}
            d={cB(dy)}
            fill="none"
            stroke="url(#gB)"
            strokeWidth={bWidth[i]}
            strokeLinecap="round"
            opacity={bOpacity[i]}
          />
        ))}
      </g>
    </svg>
  )
}
