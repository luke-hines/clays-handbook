/**
 * Realistic tire mark overlay — fixed behind all content.
 * Uses SVG paths with turbulence displacement + gaussian blur to simulate
 * rubber deposit texture. Pairs of parallel lines = two tires of one car.
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
        {/* Rubber texture: turbulence displacement + soft blur gives organic edges */}
        <filter id="rubber" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1.2" />
        </filter>

        {/* — Gradients: fade each mark at both ends — */}

        {/* Braking mark A: left-to-right fade */}
        <linearGradient id="gA" gradientUnits="userSpaceOnUse" x1="160" y1="590" x2="840" y2="650">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="12%"  stopColor="#000" stopOpacity="0.35" />
          <stop offset="65%"  stopColor="#000" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Corner exit arc B: top-left diagonal fade */}
        <linearGradient id="gB" gradientUnits="userSpaceOnUse" x1="1050" y1="500" x2="1400" y2="840">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="18%"  stopColor="#000" stopOpacity="0.32" />
          <stop offset="70%"  stopColor="#000" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.06" />
        </linearGradient>

        {/* Spin marks C: bottom-up fade */}
        <linearGradient id="gC" gradientUnits="userSpaceOnUse" x1="530" y1="880" x2="545" y2="650">
          <stop offset="0%"   stopColor="#000" stopOpacity="0.35" />
          <stop offset="55%"  stopColor="#000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Long braking mark D: left-to-right */}
        <linearGradient id="gD" gradientUnits="userSpaceOnUse" x1="190" y1="285" x2="1120" y2="255">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="8%"   stopColor="#000" stopOpacity="0.28" />
          <stop offset="60%"  stopColor="#000" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Late-apex flick E: diagonal */}
        <linearGradient id="gE" gradientUnits="userSpaceOnUse" x1="60" y1="720" x2="420" y2="440">
          <stop offset="0%"   stopColor="#000" stopOpacity="0.3" />
          <stop offset="50%"  stopColor="#000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Mark A: Hard braking streak, centre-left, slight diagonal ──────── */}
      {/* Realistic: patchy deposits (dasharray), parallel twin tracks          */}
      <g filter="url(#rubber)" opacity="0.95">
        <path
          d="M 160,583 C 360,590 580,608 845,648"
          fill="none" stroke="url(#gA)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray="310 7 180 5 220 4 90"
        />
        <path
          d="M 162,601 C 362,608 582,626 847,666"
          fill="none" stroke="url(#gA)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray="270 9 200 6 160 5 110"
        />
      </g>

      {/* ── Mark B: Corner exit oversteer arc, right side ───────────────────── */}
      {/* Curved rubber from rear stepping out on corner exit                   */}
      <g filter="url(#rubber)" opacity="0.88">
        <path
          d="M 1395,835 C 1310,710 1190,590 1055,498"
          fill="none" stroke="url(#gB)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray="380 6 210 8 180"
        />
        <path
          d="M 1377,826 C 1292,700 1172,582 1037,490"
          fill="none" stroke="url(#gB)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray="340 9 190 7 160"
        />
      </g>

      {/* ── Mark C: Tyre warmup / burnout arc, lower centre ─────────────────── */}
      {/* Wide curved marks from wheelspin coming out of a slow corner          */}
      <g filter="url(#rubber)" opacity="0.78">
        <path
          d="M 498,882 C 548,820 568,755 532,678"
          fill="none" stroke="url(#gC)" strokeWidth="15" strokeLinecap="round"
          strokeDasharray="240 11 130 8 80"
        />
        <path
          d="M 520,877 C 572,814 592,747 556,670"
          fill="none" stroke="url(#gC)" strokeWidth="13" strokeLinecap="round"
          strokeDasharray="210 13 110 9 70"
        />
        {/* Third inner arc — cars spin out wide */}
        <path
          d="M 475,886 C 520,826 538,762 500,688"
          fill="none" stroke="url(#gC)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray="180 15 90"
          opacity="0.6"
        />
      </g>

      {/* ── Mark D: Long high-speed braking, upper area ──────────────────────── */}
      {/* Lighter, wider-spaced — car was still fast when brakes applied        */}
      <g filter="url(#rubber)" opacity="0.8">
        <path
          d="M 190,278 C 480,268 760,258 1125,248"
          fill="none" stroke="url(#gD)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray="480 6 290 9 200 5 120"
        />
        <path
          d="M 190,294 C 480,284 760,274 1125,264"
          fill="none" stroke="url(#gD)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray="430 9 260 7 180 6 100"
        />
      </g>

      {/* ── Mark E: Late-apex correction flick, left edge ────────────────────── */}
      {/* Quick direction change: short curved marks                            */}
      <g filter="url(#rubber)" opacity="0.82">
        <path
          d="M 55,718 C 130,660 240,560 410,448"
          fill="none" stroke="url(#gE)" strokeWidth="11" strokeLinecap="round"
          strokeDasharray="300 8 160 6 100"
        />
        <path
          d="M 72,726 C 148,668 258,568 428,456"
          fill="none" stroke="url(#gE)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray="260 10 140 8 90"
        />
      </g>
    </svg>
  )
}
