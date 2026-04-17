/**
 * Rubber groove overlay — fixed behind all content.
 *
 * Simulates the worn rubber deposits left by cars driving
 * the same corner lines lap after lap, as seen in aerial
 * photography of racing circuits. Two sweeping arc families
 * cross the viewport in an S-curve, each built from 5
 * parallel paths that blur together into a realistic groove.
 */
export default function TireMarks() {
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
        {/* Rubber grain: turbulence distorts path edges to look like real tire deposits */}
        <filter id="groove" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.48 0.62"
            numOctaves="5"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />
          <feGaussianBlur in="disp" stdDeviation="6" />
        </filter>

        {/* Softer outer-edge haze */}
        <filter id="haze" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.32"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="28"
            result="disp"
          />
          <feGaussianBlur in="disp" stdDeviation="14" />
        </filter>

        {/* Corner A gradient: fades in from left, out to right */}
        <linearGradient id="gA" gradientUnits="userSpaceOnUse"
          x1="-200" y1="200" x2="1640" y2="750">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="7%"   stopColor="#000" stopOpacity="1" />
          <stop offset="93%"  stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Corner B gradient: fades in from right, out to left */}
        <linearGradient id="gB" gradientUnits="userSpaceOnUse"
          x1="1640" y1="150" x2="-200" y2="780">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="7%"   stopColor="#000" stopOpacity="1" />
          <stop offset="93%"  stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/*
        ── Corner A: upper-left → lower-right ────────────────────────────────
        Five parallel arcs 22px apart.
        Arc 0 & 4 = groove edges (lightest).
        Arc 2 = racing line (darkest — most rubber).
      */}

      {/* Outer haze */}
      <g filter="url(#haze)" opacity="0.55">
        <path
          d="M -200,130 C 350,95 720,185 930,320 C 1140,455 1350,615 1640,720"
          fill="none" stroke="url(#gA)" strokeWidth="220" strokeLinecap="round"
        />
      </g>

      {/* Five-arc groove band */}
      <g filter="url(#groove)">
        {/* arc 0 — outer edge */}
        <path
          d="M -200,100 C 350,68 718,158 928,294 C 1138,430 1348,590 1638,696"
          fill="none" stroke="url(#gA)" strokeWidth="14" strokeLinecap="round"
          opacity="0.20"
        />
        {/* arc 1 */}
        <path
          d="M -200,122 C 350,90 718,180 928,316 C 1138,452 1348,612 1638,718"
          fill="none" stroke="url(#gA)" strokeWidth="14" strokeLinecap="round"
          opacity="0.36"
        />
        {/* arc 2 — racing line (center, darkest) */}
        <path
          d="M -200,144 C 350,112 718,202 928,338 C 1138,474 1348,634 1638,740"
          fill="none" stroke="url(#gA)" strokeWidth="16" strokeLinecap="round"
          opacity="0.52"
        />
        {/* arc 3 */}
        <path
          d="M -200,166 C 350,134 718,224 928,360 C 1138,496 1348,656 1638,762"
          fill="none" stroke="url(#gA)" strokeWidth="14" strokeLinecap="round"
          opacity="0.36"
        />
        {/* arc 4 — inner edge */}
        <path
          d="M -200,188 C 350,156 718,246 928,382 C 1138,518 1348,678 1638,784"
          fill="none" stroke="url(#gA)" strokeWidth="14" strokeLinecap="round"
          opacity="0.20"
        />
      </g>

      {/*
        ── Corner B: upper-right → lower-left ────────────────────────────────
        Crosses Corner A to create an S-curve track sequence.
        Slightly lighter overall — this corner sees less traffic.
      */}

      {/* Outer haze */}
      <g filter="url(#haze)" opacity="0.42">
        <path
          d="M 1640,110 C 1280,160 980,320 780,470 C 580,620 260,730 -200,810"
          fill="none" stroke="url(#gB)" strokeWidth="200" strokeLinecap="round"
        />
      </g>

      {/* Five-arc groove band */}
      <g filter="url(#groove)">
        {/* arc 0 — outer edge */}
        <path
          d="M 1640,82 C 1278,134 976,294 776,444 C 576,594 258,704 -200,786"
          fill="none" stroke="url(#gB)" strokeWidth="14" strokeLinecap="round"
          opacity="0.16"
        />
        {/* arc 1 */}
        <path
          d="M 1640,104 C 1278,156 976,316 776,466 C 576,616 258,726 -200,808"
          fill="none" stroke="url(#gB)" strokeWidth="14" strokeLinecap="round"
          opacity="0.28"
        />
        {/* arc 2 — racing line */}
        <path
          d="M 1640,126 C 1278,178 976,338 776,488 C 576,638 258,748 -200,830"
          fill="none" stroke="url(#gB)" strokeWidth="16" strokeLinecap="round"
          opacity="0.42"
        />
        {/* arc 3 */}
        <path
          d="M 1640,148 C 1278,200 976,360 776,510 C 576,660 258,770 -200,852"
          fill="none" stroke="url(#gB)" strokeWidth="14" strokeLinecap="round"
          opacity="0.28"
        />
        {/* arc 4 — inner edge */}
        <path
          d="M 1640,170 C 1278,222 976,382 776,532 C 576,682 258,792 -200,874"
          fill="none" stroke="url(#gB)" strokeWidth="14" strokeLinecap="round"
          opacity="0.16"
        />
      </g>
    </svg>
  )
}
