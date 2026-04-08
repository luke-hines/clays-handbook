export interface DiagramHotspot {
  id: string
  x: number        // percentage of SVG viewBox width
  y: number        // percentage of SVG viewBox height
  label: string
  body: string
  color?: string   // accent color for dot
}

export interface TrackDiagram {
  id: string
  title: string
  description: string
  viewBox: string
  paths: {
    d: string
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
  }[]
  hotspots: DiagramHotspot[]
}

// ─── Diagrams ──────────────────────────────────────────────────────────────────

export const TRACK_DIAGRAMS: TrackDiagram[] = [

  // ── Corner Anatomy ──────────────────────────────────────────────────────────
  // Top-down view of a 90° right-hand corner with racing line overlaid

  {
    id: 'd-corner-anatomy',
    title: 'Corner Anatomy',
    description: 'Hover over each zone to understand what happens at each stage of a corner.',
    viewBox: '0 0 560 420',
    paths: [
      // ── Track surface (dark fill) ────────────────────────────────────────
      {
        d: `M 90,0 L 90,230 Q 90,390 250,390 L 560,390
            L 560,320 Q 415,320 165,320 Q 155,320 155,230 L 155,0 Z`,
        fill: '#1E1E1E',
        stroke: 'none',
      },
      // ── Kerbs — outer (left & bottom) ───────────────────────────────────
      {
        d: `M 90,0 L 90,230 Q 90,390 250,390 L 560,390 L 560,385 Q 250,385 96,385 Q 84,385 84,230 L 84,0 Z`,
        fill: 'rgba(232,50,42,0.25)',
        stroke: 'none',
      },
      // ── Kerbs — inner (right & top) ─────────────────────────────────────
      {
        d: `M 155,0 L 155,230 Q 155,320 250,320 L 560,320 L 560,325 Q 250,325 160,325 Q 161,325 161,230 L 161,0 Z`,
        fill: 'rgba(232,50,42,0.25)',
        stroke: 'none',
      },
      // ── Track borders ────────────────────────────────────────────────────
      {
        d: `M 90,0 L 90,230 Q 90,390 250,390 L 560,390`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      {
        d: `M 155,0 L 155,230 Q 155,320 250,320 L 560,320`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      // ── Racing line ──────────────────────────────────────────────────────
      {
        d: `M 148,0 L 148,195 Q 148,355 260,355 L 560,355`,
        fill: 'none',
        stroke: '#E8322A',
        strokeWidth: 2.5,
        opacity: 0.7,
      },
      // ── Braking zone highlight ───────────────────────────────────────────
      {
        d: `M 90,30 L 155,30 L 155,140 L 90,140 Z`,
        fill: 'rgba(201,168,76,0.08)',
        stroke: 'rgba(201,168,76,0.2)',
        strokeWidth: 1,
      },
    ],
    hotspots: [
      {
        id: 'hs-braking-zone',
        x: 22.3,
        y: 20.2,
        label: 'Braking Zone',
        body: 'The straight before the corner where you shed speed. Brake at maximum threshold — as hard as possible without locking. The earlier you learn your braking reference point, the later you can safely push it. One meter earlier is free time.',
        color: '#C9A84C',
      },
      {
        id: 'hs-turn-in',
        x: 22,
        y: 55,
        label: 'Turn-In Point',
        body: 'Where you first apply steering to start the corner. Turning in too early (before the apex opens up) forces an early apex and a compromised exit. Turn in too late and you miss the apex and go wide. Reference points make this repeatable — use a kerb edge, a mark on the road, anything fixed.',
        color: '#4A9EDB',
      },
      {
        id: 'hs-apex',
        x: 32,
        y: 84,
        label: 'Apex',
        body: 'The innermost point of the corner — where the racing line gets closest to the inside edge. A late apex (past the geometric midpoint) opens up the exit earlier, allowing full throttle sooner. A geometric or early apex closes the exit, forcing you to wait or risk running wide. In most circuit corners, late apex is correct.',
        color: '#E8322A',
      },
      {
        id: 'hs-trackout',
        x: 70,
        y: 88,
        label: 'Track-Out',
        body: 'The exit of the corner — where the car uses the full track width on the outside. Using all the road on exit maximizes the radius of the arc, which directly allows more speed. If you\'re not reaching the outside edge of the track on exit, you\'re either apexing too late or not applying enough throttle.',
        color: '#3DAB6E',
      },
    ],
  },

  // ── Trail Braking Arc ───────────────────────────────────────────────────────
  // Same corner, showing brake pressure overlay through entry

  {
    id: 'd-trail-braking',
    title: 'Trail Braking Zones',
    description: 'Hover each zone to understand how brake pressure changes from the straight through to the apex.',
    viewBox: '0 0 560 420',
    paths: [
      // Track surface
      {
        d: `M 90,0 L 90,230 Q 90,390 250,390 L 560,390
            L 560,320 Q 415,320 165,320 Q 155,320 155,230 L 155,0 Z`,
        fill: '#1E1E1E',
        stroke: 'none',
      },
      // Track borders
      {
        d: `M 90,0 L 90,230 Q 90,390 250,390 L 560,390`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      {
        d: `M 155,0 L 155,230 Q 155,320 250,320 L 560,320`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      // Phase 1: full braking (wide red band on approach)
      {
        d: `M 90,30 L 155,30 L 155,145 L 90,145 Z`,
        fill: 'rgba(232,50,42,0.2)',
        stroke: 'rgba(232,50,42,0.4)',
        strokeWidth: 1,
      },
      // Phase 2: trail braking (lighter from turn-in to mid-corner)
      {
        d: `M 90,145 L 155,145 Q 155,250 148,270 L 135,260 Q 141,240 141,145 Z`,
        fill: 'rgba(232,50,42,0.1)',
        stroke: 'rgba(232,50,42,0.25)',
        strokeWidth: 1,
      },
      // Racing line
      {
        d: `M 148,0 L 148,195 Q 148,355 260,355 L 560,355`,
        fill: 'none',
        stroke: '#E8322A',
        strokeWidth: 2.5,
        opacity: 0.6,
      },
    ],
    hotspots: [
      {
        id: 'hs-full-brake',
        x: 22.3,
        y: 18,
        label: 'Full Braking — 100%',
        body: 'Maximum threshold braking in a straight line. Apply full brake pressure immediately after the braking reference point. This is the heaviest braking phase — as hard as the tires will take without locking. The straight-line phase is where you shed the bulk of your speed.',
        color: '#E8322A',
      },
      {
        id: 'hs-trail-start',
        x: 22,
        y: 44,
        label: 'Trail Begins — Turn-In',
        body: 'As you start to steer, you begin releasing the brakes progressively. You\'re NOT releasing fully — you\'re trailing off. The initial drop is steep: from 100% down to maybe 40–50% in the first third of the arc. Weight stays loaded on the front tires, keeping them hooked up through entry.',
        color: '#C9A84C',
      },
      {
        id: 'hs-trail-mid',
        x: 25,
        y: 66,
        label: 'Trail Mid-Corner — 10–20%',
        body: 'The release is slowing dramatically. You\'re holding barely a trace of brake — just enough to keep the weight biased forward. This is the skill: the tiny, almost imperceptible amount of pressure that keeps the nose planted right when the front tires are most loaded in cornering. Release too fast here and the benefit is gone.',
        color: '#C9A84C',
      },
      {
        id: 'hs-apex-release',
        x: 34,
        y: 84,
        label: 'Apex — Brake Released',
        body: 'By the apex, brake pressure should be at zero. The moment brake pressure ends is also roughly when throttle begins its progressive increase. There should be no neutral coasting phase between brake release and throttle application — the transition is continuous. Hesitation here is where tenths are lost.',
        color: '#3DAB6E',
      },
    ],
  },

  // ── Chicane / Corner Linking ────────────────────────────────────────────────

  {
    id: 'd-chicane',
    title: 'Chicane: Linking Two Corners',
    description: 'Hover each element to see the priority hierarchy in a left-right corner sequence.',
    viewBox: '0 0 600 300',
    paths: [
      // Outer edge of track (S-shape)
      {
        d: `M 0,60 L 160,60 Q 220,60 220,120 Q 220,200 280,200 Q 340,200 340,140 Q 340,60 400,60 L 600,60`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      // Inner edge of track
      {
        d: `M 0,120 L 170,120 Q 170,170 225,170 Q 285,170 285,115 Q 285,60 340,60
            M 340,120 L 340,60 M 400,120 L 600,120`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      // Track fill
      {
        d: `M 0,60 L 160,60 Q 220,60 220,120 Q 220,200 280,200 Q 340,200 340,140 Q 340,60 400,60 L 600,60
            L 600,120 L 400,120 Q 370,120 340,120 Q 300,120 280,140 Q 260,160 230,160 Q 210,160 200,140 Q 185,120 170,120 L 0,120 Z`,
        fill: '#1E1E1E',
        stroke: 'none',
      },
      // Racing line through the chicane
      {
        d: `M 0,115 L 140,115 Q 200,115 210,145 Q 230,185 280,185 Q 325,185 330,145 Q 335,100 375,80 L 600,80`,
        fill: 'none',
        stroke: '#E8322A',
        strokeWidth: 2.5,
        opacity: 0.7,
      },
      // Priority corner highlight (second element)
      {
        d: `M 330,58 Q 380,58 400,80 L 400,122 Q 380,122 360,110 Q 340,98 330,80 Z`,
        fill: 'rgba(61,171,110,0.12)',
        stroke: 'rgba(61,171,110,0.35)',
        strokeWidth: 1,
      },
    ],
    hotspots: [
      {
        id: 'hs-chicane-brake',
        x: 12,
        y: 57,
        label: 'Brake Point',
        body: 'The single braking point for the entire chicane complex. You\'re braking for the second element, not the first. Float through the first element without hard braking — this keeps the car settled and in position for the priority exit.',
        color: '#C9A84C',
      },
      {
        id: 'hs-first-element',
        x: 35,
        y: 72,
        label: 'First Element — Setup Corner',
        body: 'This element is sacrificed. Your goal is to navigate it in a way that positions you perfectly for the second element — not to optimize it individually. Clip the apex loosely, stay slightly wide on exit to set up your entry to the second corner.',
        color: '#4A9EDB',
      },
      {
        id: 'hs-link',
        x: 50,
        y: 65,
        label: 'Linking Section',
        body: 'The brief straight connecting the two elements. Use this space to straighten the wheel and reposition to the outside for the second element. Most of your braking force is applied here — firm but progressive, setting up the trail into the second apex.',
        color: '#E8322A',
      },
      {
        id: 'hs-second-element',
        x: 64,
        y: 35,
        label: 'Second Element — Priority Corner',
        body: 'This is the money corner. It feeds the exit straight, so all your optimization goes here. Late apex, maximum exit speed. The time you gave up in the first element buys you this clean, wide entry and the ability to get on throttle early onto the straight.',
        color: '#3DAB6E',
      },
      {
        id: 'hs-exit',
        x: 88,
        y: 28,
        label: 'Exit to Straight',
        body: 'The reward for prioritizing the second element. You\'re wide, pointed straight, and at full throttle while a driver who tried to optimize both elements is still managing mid-corner attitude. The time difference compounds over the entire length of the following straight.',
        color: '#3DAB6E',
      },
    ],
  },

  // ── Overtake Setup ──────────────────────────────────────────────────────────

  {
    id: 'd-overtake-inside',
    title: 'Inside Overtake Geometry',
    description: 'Hover each position to understand the geometry of a late-braking inside pass.',
    viewBox: '0 0 600 340',
    paths: [
      // Track — top straight into a right-hand corner
      {
        d: `M 0,100 L 360,100 Q 500,100 500,240 L 600,240
            L 600,300 Q 500,300 440,300 Q 360,300 360,220 Q 360,160 0,160 Z`,
        fill: '#1E1E1E',
        stroke: 'none',
      },
      {
        d: `M 0,100 L 360,100 Q 500,100 500,240 L 600,240`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      {
        d: `M 0,160 Q 360,160 360,220 Q 360,300 440,300 L 600,300`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.18)',
        strokeWidth: 1.5,
      },
      // Defender's line (wider, outside)
      {
        d: `M 0,118 L 330,118 Q 468,118 468,240 L 600,262`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.3)',
        strokeWidth: 2,
        opacity: 0.5,
      },
      // Attacker's line (inside, late apex)
      {
        d: `M 0,142 L 355,142 Q 390,142 400,180 Q 415,250 460,270 L 600,280`,
        fill: 'none',
        stroke: '#E8322A',
        strokeWidth: 2.5,
        opacity: 0.8,
      },
      // DRS zone highlight
      {
        d: `M 0,100 L 200,100 L 200,160 L 0,160 Z`,
        fill: 'rgba(74,158,219,0.08)',
        stroke: 'rgba(74,158,219,0.2)',
        strokeWidth: 1,
      },
      // Braking zone highlight
      {
        d: `M 260,100 L 370,100 L 370,160 L 260,160 Z`,
        fill: 'rgba(201,168,76,0.1)',
        stroke: 'rgba(201,168,76,0.25)',
        strokeWidth: 1,
      },
    ],
    hotspots: [
      {
        id: 'hs-slipstream',
        x: 16,
        y: 40,
        label: 'Slipstream Zone',
        body: 'Behind the car ahead, you\'re in their low-pressure wake — drag is reduced and you accelerate faster. Move to the inside of the track here to exit the worst of the turbulent dirty air. You\'re still benefiting from the speed differential while arriving at the braking zone on a cleaner line.',
        color: '#4A9EDB',
      },
      {
        id: 'hs-commit',
        x: 52,
        y: 40,
        label: 'Commit Point',
        body: 'This is where you must be committed to the inside. If you\'re not alongside or overlapping by the braking zone, the car ahead can legally close the door. Get here first — ideally with your front wheel past their rear wheel — and the position is yours to defend from the inside.',
        color: '#E8322A',
      },
      {
        id: 'hs-late-brake',
        x: 68,
        y: 40,
        label: 'Late Braking Zone',
        body: 'The moment the pass is won or lost. You\'re braking later than the car ahead, from the inside. Your braking distance is slightly longer than usual because you\'re on the inside line (shorter arc, less speed needed) — but your confidence level must be high. Any lock-up here loses the corner.',
        color: '#C9A84C',
      },
      {
        id: 'hs-inside-apex',
        x: 70,
        y: 80,
        label: 'Inside Apex',
        body: 'The inside apex of an overtaking pass is usually earlier than the optimal racing apex — you\'re taking the geometric line rather than the late apex. This costs you exit speed compared to the defender\'s clean exit. This is why you must have a decisive advantage to make the pass stick through the exit.',
        color: '#E8322A',
      },
      {
        id: 'hs-defend-line',
        x: 40,
        y: 30,
        label: 'Defender\'s Line',
        body: 'The car being passed is on the normal outside-inside-outside line. They have a better exit but you\'re already on the inside with position — they cannot legally squeeze you off the track once you have overlap at the braking point. Position before the corner is the right to the inside.',
        color: 'rgba(255,255,255,0.5)',
      },
    ],
  },

  // ── Tire Temperature Zones ──────────────────────────────────────────────────

  {
    id: 'd-tire-temps',
    title: 'Tire Contact Patch & Temperature Zones',
    description: 'Hover each zone to understand how camber, pressure, and load affect temperature distribution across the contact patch.',
    viewBox: '0 0 500 360',
    paths: [
      // Tire outline (rounded rectangle — front view)
      {
        d: `M 140,40 Q 140,20 180,20 L 320,20 Q 360,20 360,40 L 360,320 Q 360,340 320,340 L 180,340 Q 140,340 140,320 Z`,
        fill: '#1A1A1A',
        stroke: 'rgba(255,255,255,0.15)',
        strokeWidth: 2,
      },
      // Inner liner
      {
        d: `M 170,70 Q 170,55 185,55 L 315,55 Q 330,55 330,70 L 330,290 Q 330,305 315,305 L 185,305 Q 170,305 170,290 Z`,
        fill: '#111',
        stroke: 'rgba(255,255,255,0.08)',
        strokeWidth: 1,
      },
      // Contact patch zones (3 columns: inner, center, outer)
      // Inner shoulder (overheats with too much neg camber)
      {
        d: `M 140,140 L 190,140 L 190,220 L 140,220 Z`,
        fill: 'rgba(232,50,42,0.22)',
        stroke: 'rgba(232,50,42,0.4)',
        strokeWidth: 1,
      },
      // Center band (optimal zone)
      {
        d: `M 195,110 L 305,110 L 305,250 L 195,250 Z`,
        fill: 'rgba(61,171,110,0.2)',
        stroke: 'rgba(61,171,110,0.4)',
        strokeWidth: 1,
      },
      // Outer shoulder (overheats with too little neg camber / too much pressure)
      {
        d: `M 310,140 L 360,140 L 360,220 L 310,220 Z`,
        fill: 'rgba(201,168,76,0.2)',
        stroke: 'rgba(201,168,76,0.4)',
        strokeWidth: 1,
      },
      // Tread grooves
      {
        d: `M 215,20 L 215,340`,
        fill: 'none',
        stroke: '#0D0D0D',
        strokeWidth: 3,
      },
      {
        d: `M 250,20 L 250,340`,
        fill: 'none',
        stroke: '#0D0D0D',
        strokeWidth: 3,
      },
      {
        d: `M 285,20 L 285,340`,
        fill: 'none',
        stroke: '#0D0D0D',
        strokeWidth: 3,
      },
    ],
    hotspots: [
      {
        id: 'hs-inner-shoulder',
        x: 22,
        y: 47,
        label: 'Inner Shoulder — Hot Zone',
        body: 'Overheating here means too much negative camber. The tire is tilted in too far, rolling on the inner edge instead of sitting flat. The inner shoulder is scrubbing against the road while the outer shoulder barely contacts. Fix: reduce negative camber. Symptom: inner edge visually more worn and discolored after a session.',
        color: '#E8322A',
      },
      {
        id: 'hs-center',
        x: 50,
        y: 50,
        label: 'Center Band — Optimal',
        body: 'Even temperature across the center indicates the contact patch is working correctly — load distributed across the full width of the tread. This is what you\'re aiming for. Achieved through correct camber (distributes cornering load) and correct tire pressure (contact patch sits flat, not crowned or collapsed).',
        color: '#3DAB6E',
      },
      {
        id: 'hs-outer-shoulder',
        x: 76,
        y: 47,
        label: 'Outer Shoulder — Warm Zone',
        body: 'Warmer outer edge suggests too little negative camber or too high tire pressure. High pressure crowns the tire — less rubber touching the road, most load concentrated in a center stripe. Low/no camber means under cornering loads the outer shoulder lifts. Either way the contact patch shrinks and grip drops.',
        color: '#C9A84C',
      },
      {
        id: 'hs-tread',
        x: 50,
        y: 25,
        label: 'Tread Grooves',
        body: 'Grooves channel water away from the contact patch in wet conditions. On slick/dry tires, there are no grooves — the entire surface is contact patch for maximum grip. Intermediate and wet tires sacrifice some dry grip for the ability to pump water out from under the tire, preventing aquaplaning.',
        color: '#4A9EDB',
      },
      {
        id: 'hs-sidewall',
        x: 20,
        y: 72,
        label: 'Sidewall Flex Zone',
        body: 'The sidewall flexes under cornering load — this is intentional. That flex is part of the slip angle mechanism: the contact patch grips the road, the sidewall deforms, and the car turns. Overly stiff sidewalls (too high pressure, too stiff compound) reduce this flex and reduce cornering grip. Some flex is desirable.',
        color: '#4A9EDB',
      },
    ],
  },

  // ── Brake System ────────────────────────────────────────────────────────────

  {
    id: 'd-brake-system',
    title: 'Braking System Components',
    description: 'Hover each component to understand its role in the braking system.',
    viewBox: '0 0 560 380',
    paths: [
      // Wheel/hub outline
      {
        d: `M 220,60 Q 220,30 250,30 Q 310,30 310,60 L 310,320 Q 310,350 280,350 Q 220,350 220,320 Z`,
        fill: '#151515',
        stroke: 'rgba(255,255,255,0.12)',
        strokeWidth: 1.5,
      },
      // Disc rotor
      {
        d: `M 238,90 Q 238,75 265,75 Q 295,75 295,90 L 295,290 Q 295,305 265,305 Q 238,305 238,290 Z`,
        fill: '#2A2A2A',
        stroke: 'rgba(255,255,255,0.2)',
        strokeWidth: 2,
      },
      // Disc ventilation slots
      {
        d: `M 244,100 L 289,100 M 244,130 L 289,130 M 244,160 L 289,160 M 244,190 L 289,190 M 244,220 L 289,220 M 244,250 L 289,250 M 244,280 L 289,280`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.06)',
        strokeWidth: 4,
      },
      // Caliper body
      {
        d: `M 180,130 Q 170,130 170,145 L 170,235 Q 170,250 180,250 L 237,250 L 237,130 Z`,
        fill: '#E8322A',
        stroke: 'rgba(232,50,42,0.6)',
        strokeWidth: 1.5,
      },
      // Brake pads
      {
        d: `M 237,140 L 245,140 L 245,240 L 237,240 Z`,
        fill: '#888',
        stroke: 'none',
      },
      // Brake duct
      {
        d: `M 100,60 L 170,120 M 100,60 L 120,40 L 170,105`,
        fill: 'none',
        stroke: '#4A9EDB',
        strokeWidth: 2.5,
        opacity: 0.8,
      },
      {
        d: `M 90,50 Q 85,35 110,35 L 135,35 Q 155,35 155,50 L 155,75 Q 155,90 135,90 L 110,90 Q 90,90 90,75 Z`,
        fill: 'rgba(74,158,219,0.15)',
        stroke: 'rgba(74,158,219,0.4)',
        strokeWidth: 1.5,
      },
      // Brake line
      {
        d: `M 170,190 L 80,190 L 80,310 L 60,310`,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.25)',
        strokeWidth: 2,
      },
      // Master cylinder (simplified)
      {
        d: `M 20,295 Q 20,285 30,285 L 60,285 Q 70,285 70,295 L 70,325 Q 70,335 60,335 L 30,335 Q 20,335 20,325 Z`,
        fill: '#222',
        stroke: 'rgba(255,255,255,0.2)',
        strokeWidth: 1.5,
      },
      // Temp color on disc (heat glow)
      {
        d: `M 240,150 Q 240,140 265,140 Q 290,140 290,150 L 290,240 Q 290,250 265,250 Q 240,250 240,240 Z`,
        fill: 'rgba(232,50,42,0.08)',
        stroke: 'none',
      },
    ],
    hotspots: [
      {
        id: 'hs-disc',
        x: 51,
        y: 50,
        label: 'Brake Disc (Rotor)',
        body: 'The rotating disc attached to the wheel. When clamped by the caliper, friction converts kinetic energy into heat. Race car discs are typically carbon-ceramic — lighter than cast iron, withstand higher temperatures, but require 400°C+ to work properly. Ventilation grooves and internal vanes draw air through the disc to dissipate heat.',
        color: '#E8322A',
      },
      {
        id: 'hs-caliper',
        x: 33,
        y: 52,
        label: 'Brake Caliper',
        body: 'The fixed housing that straddles the disc. Hydraulic pressure from the brake pedal pushes pistons outward, squeezing the pads against both sides of the disc simultaneously. Multi-piston calipers (4, 6, even 8 pistons) apply more even clamping force across the pad area for consistent, fade-resistant braking.',
        color: '#E8322A',
      },
      {
        id: 'hs-pad',
        x: 44.5,
        y: 52,
        label: 'Brake Pads',
        body: 'The friction material pressed against the disc. Compound choice determines the operating temperature window. High-friction compounds need heat to activate (like carbon-carbon). Low-friction street compounds work cold but fade at race temperatures. Pads transfer material to the disc surface over time, changing braking feel.',
        color: '#C9A84C',
      },
      {
        id: 'hs-duct',
        x: 19,
        y: 22,
        label: 'Brake Duct',
        body: 'Channels cool airflow from outside the car to the brake assembly. Opening size is tuned per circuit: large ducts for Monaco (constant braking, little recovery time), small ducts for Monza (infrequent braking, long straights to cool). Over-cooling is as bad as overheating — carbons need temperature to function.',
        color: '#4A9EDB',
      },
      {
        id: 'hs-line',
        x: 12,
        y: 55,
        label: 'Brake Line & Master Cylinder',
        body: 'Hydraulic fluid transmits pedal force from the master cylinder (pushed by the pedal) to the caliper pistons. The brake bias bar splits this pressure between front and rear circuits — physically changing how much fluid goes to the front vs rear caliper. Brake fade can also be felt here as a "spongy" pedal caused by fluid vaporization.',
        color: '#4A9EDB',
      },
    ],
  },
]

export function getDiagram(id: string): TrackDiagram | undefined {
  return TRACK_DIAGRAMS.find(d => d.id === id)
}
