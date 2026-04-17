/**
 * Rubber groove overlay — fixed behind all content.
 *
 * Three sweeping arc families model the deposits left by cars
 * running different lines lap after lap:
 *
 *  Corner A — main racing line: upper-left → lower-right
 *             9 tight parallel arcs, densest band (most rubber)
 *
 *  Corner B — opposite corner: upper-right → lower-left
 *             6 arcs, lighter (less traffic through this sector)
 *
 *  Corner C — secondary / late-apex line inside Corner A:
 *             5 arcs, low opacity (drivers defending, braking later)
 *
 * Colour: #1a0d00 — near-black warm brown, the actual colour of
 * old rubber deposits on asphalt when seen from altitude.
 */

// Rubber colour — dark warm brown, not pure black
const RUB = '#1a0d00'

export default function TireMarks() {

  // ── path generators ─────────────────────────────────────────────────────────

  // Corner A — main line (upper-left → lower-right sweep)
  const pA = (dy: number) =>
    `M -200,${144 + dy} C 350,${112 + dy} 718,${202 + dy} 928,${338 + dy} C 1138,${474 + dy} 1348,${634 + dy} 1638,${740 + dy}`

  // Corner B — opposite corner (upper-right → lower-left sweep)
  const pB = (dy: number) =>
    `M 1640,${126 + dy} C 1278,${178 + dy} 976,${338 + dy} 776,${488 + dy} C 576,${638 + dy} 258,${748 + dy} -200,${830 + dy}`

  // Corner C — secondary inside line (~90px above/inside corner A)
  // Tighter radius (less curvature): drivers who brake later and apex tighter
  const pC = (dy: number) =>
    `M -200,${58 + dy} C 340,${30 + dy} 700,${108 + dy} 900,${240 + dy} C 1100,${372 + dy} 1320,${540 + dy} 1638,${650 + dy}`

  // ── Corner A: 9 arcs at 14 px spacing ──────────────────────────────────────
  const A_OFF = [-56, -42, -28, -14, 0, 14, 28, 42, 56]
  const A_OPA = [0.16, 0.30, 0.44, 0.56, 0.68, 0.56, 0.44, 0.30, 0.16]
  const A_W   = [10,   12,   13,   14,   16,   14,   13,   12,   10  ]

  // ── Corner B: 6 arcs — lighter overall ─────────────────────────────────────
  const B_OFF = [-35, -21, -7, 7, 21, 35]
  const B_OPA = [0.12, 0.22, 0.34, 0.34, 0.22, 0.12]
  const B_W   = [10,   12,   13,   13,   12,   10  ]

  // ── Corner C: 5 arcs — secondary line, subtler ─────────────────────────────
  const C_OFF = [-28, -14, 0, 14, 28]
  const C_OPA = [0.10, 0.18, 0.26, 0.18, 0.10]
  const C_W   = [9,   10,   12,   10,   9   ]

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
        {/*
          Rubber grain filter — fractalNoise displaces path edges to
          give the ragged, smeared look of real rubber deposits.
          stdDeviation kept tight (3.5) so groove edges remain distinct.
        */}
        <filter id="groove" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.60 0.80"
            numOctaves="6"
            seed="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />
          <feGaussianBlur in="disp" stdDeviation="3.5" />
        </filter>

        {/* Wide soft haze behind each groove band */}
        <filter id="haze" x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur stdDeviation="22" />
        </filter>

        {/* Gentle smear for corner C (secondary line) */}
        <filter id="soft" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        {/* Corner A gradient — fades at both ends (upper-left → lower-right) */}
        <linearGradient id="gA" gradientUnits="userSpaceOnUse"
          x1="-200" y1="200" x2="1638" y2="750">
          <stop offset="0%"   stopColor={RUB} stopOpacity="0" />
          <stop offset="5%"   stopColor={RUB} stopOpacity="1" />
          <stop offset="95%"  stopColor={RUB} stopOpacity="1" />
          <stop offset="100%" stopColor={RUB} stopOpacity="0" />
        </linearGradient>

        {/* Corner B gradient — fades at both ends (upper-right → lower-left) */}
        <linearGradient id="gB" gradientUnits="userSpaceOnUse"
          x1="1640" y1="150" x2="-200" y2="780">
          <stop offset="0%"   stopColor={RUB} stopOpacity="0" />
          <stop offset="5%"   stopColor={RUB} stopOpacity="1" />
          <stop offset="95%"  stopColor={RUB} stopOpacity="1" />
          <stop offset="100%" stopColor={RUB} stopOpacity="0" />
        </linearGradient>

        {/* Corner C shares same direction as A but slightly shifted */}
        <linearGradient id="gC" gradientUnits="userSpaceOnUse"
          x1="-200" y1="80" x2="1638" y2="660">
          <stop offset="0%"   stopColor={RUB} stopOpacity="0" />
          <stop offset="8%"   stopColor={RUB} stopOpacity="1" />
          <stop offset="92%"  stopColor={RUB} stopOpacity="1" />
          <stop offset="100%" stopColor={RUB} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Corner A — main racing line ─────────────────────────────────────── */}

      {/* Broad background haze — suggests rubber-stained asphalt outside groove */}
      <g filter="url(#haze)" opacity="0.48">
        <path d={pA(0)} fill="none"
          stroke={RUB} strokeWidth="320" strokeLinecap="round" />
      </g>

      {/* 9-arc groove band */}
      <g filter="url(#groove)">
        {A_OFF.map((dy, i) => (
          <path key={i} d={pA(dy)} fill="none"
            stroke="url(#gA)" strokeWidth={A_W[i]}
            strokeLinecap="round" opacity={A_OPA[i]} />
        ))}
      </g>

      {/* ── Corner B — opposite corner ──────────────────────────────────────── */}

      <g filter="url(#haze)" opacity="0.36">
        <path d={pB(0)} fill="none"
          stroke={RUB} strokeWidth="260" strokeLinecap="round" />
      </g>

      <g filter="url(#groove)">
        {B_OFF.map((dy, i) => (
          <path key={i} d={pB(dy)} fill="none"
            stroke="url(#gB)" strokeWidth={B_W[i]}
            strokeLinecap="round" opacity={B_OPA[i]} />
        ))}
      </g>

      {/* ── Corner C — secondary inside line ────────────────────────────────── */}
      {/* Softer filter — this line has fewer layers of rubber on it */}
      <g filter="url(#soft)">
        {C_OFF.map((dy, i) => (
          <path key={i} d={pC(dy)} fill="none"
            stroke="url(#gC)" strokeWidth={C_W[i]}
            strokeLinecap="round" opacity={C_OPA[i]} />
        ))}
      </g>
    </svg>
  )
}
