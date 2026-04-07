import type { Lesson, Concept, Module, Quiz } from '@/types'

// ─── Concepts ─────────────────────────────────────────────────────────────────

export const MOCK_CONCEPTS: Concept[] = [
  {
    id: 'c-weight-transfer',
    slug: 'weight-transfer',
    title: 'Weight Transfer',
    summary: 'How the car\'s weight shifts under braking, acceleration, and cornering — and why it determines grip.',
    body: `Every time you brake, accelerate, or turn, the car's weight shifts. Braking pushes weight forward onto the front tires. Acceleration pushes it rearward. Cornering pushes it to the outside.\n\nMore weight on a tire means more grip from that tire — up to a point. Understanding weight transfer lets you predict how much grip each corner of the car has at any moment, which is the foundation of fast, consistent driving.`,
    pillar: 'racing',
    relatedConceptIds: ['c-grip-circle', 'c-understeer', 'c-oversteer'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-grip-circle',
    slug: 'grip-circle',
    title: 'Grip Circle',
    summary: 'The total grip a tire has is a shared budget between lateral (cornering) and longitudinal (braking/acceleration) forces.',
    body: `Imagine each tire has a circle of available grip. The size of the circle is the total grip budget. You can spend that budget on braking, cornering, or acceleration — but the total can't exceed the circle.\n\nIf you're braking at 80% of the limit and cornering at 80%, you're asking for 160% — the tire slides. Trail braking is the art of managing this overlap deliberately, spending just enough budget on each force to stay inside the circle while maximizing both.`,
    pillar: 'racing',
    relatedConceptIds: ['c-weight-transfer', 'c-trail-braking'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-understeer',
    slug: 'understeer',
    title: 'Understeer',
    summary: 'When the front tires lose grip and the car pushes wide of the intended line.',
    body: `Understeer is when the front tires can't provide the turning force you're asking for. The car goes straight when you want to turn — it "pushes" toward the outside of the corner.\n\nCommon causes: too much entry speed, too-early throttle application, front tires overloaded, or a setup that puts too much demand on the fronts. The driving fix is usually simple: slow down more, turn in later, or get on the throttle later and more smoothly.`,
    pillar: 'racing',
    relatedConceptIds: ['c-oversteer', 'c-weight-transfer', 'c-grip-circle'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-oversteer',
    slug: 'oversteer',
    title: 'Oversteer',
    summary: 'When the rear tires lose grip and the car rotates past the intended line.',
    body: `Oversteer happens when the rear tires lose traction relative to the front. The car rotates past your intended line — the tail steps out.\n\nCauses: too much throttle on corner exit, lifting mid-corner (snap oversteer), trail braking too aggressively, or a loose setup. In small doses, oversteer is useful for rotating the car. Too much and you're spinning. The correction is countersteering — pointing the front wheels into the slide — combined with careful throttle management.`,
    pillar: 'racing',
    relatedConceptIds: ['c-understeer', 'c-weight-transfer', 'c-trail-braking'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-trail-braking',
    slug: 'trail-braking',
    title: 'Trail Braking',
    summary: 'Carrying brake pressure past the turn-in point to load the front tires and rotate the car through entry.',
    body: `Trail braking means you don't finish all your braking in a straight line. You carry decreasing brake pressure as you turn in, releasing it progressively through corner entry.\n\nThis keeps weight on the front tires at the moment you need them most — corner entry — increasing their grip and allowing the rear to rotate. The release is the skill: smooth, linear, predictable. Too much brake held too long and the rear snaps. Released too fast and you've gained nothing.`,
    pillar: 'racing',
    relatedConceptIds: ['c-weight-transfer', 'c-grip-circle', 'c-threshold-braking'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-threshold-braking',
    slug: 'threshold-braking',
    title: 'Threshold Braking',
    summary: 'Braking at the maximum available deceleration without locking the wheels.',
    body: `Threshold braking means applying just enough brake pressure to decelerate at the maximum the tires can handle — right at the edge of locking up, but not over it.\n\nThis is faster than comfortable braking (not enough pressure) and faster than locking up (which turns round tires into flat-spotted ovals). Finding the threshold is a feel skill — you learn it by deliberately pushing until you lock, backing off slightly, and repeating until that edge becomes familiar.`,
    pillar: 'racing',
    relatedConceptIds: ['c-weight-transfer', 'c-grip-circle', 'c-trail-braking'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-apex',
    slug: 'apex',
    title: 'Apex',
    summary: 'The innermost point of a corner — where the car gets closest to the inside edge.',
    body: `The apex is the point in a corner where your car is closest to the inside edge of the road. Hit it right and you've maximized your radius through the corner.\n\nThere are three types: geometric (mathematical midpoint), early (before the midpoint — often gives less exit speed), and late (after the midpoint — allows earlier throttle and better exit speed). Late apexes are the most common in sim racing because they optimize exit speed onto the following straight.`,
    pillar: 'racing',
    relatedConceptIds: ['c-weight-transfer', 'c-trail-braking'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c-racing-line',
    slug: 'racing-line',
    title: 'Racing Line',
    summary: 'The path through a corner that maximizes speed by using the full track width to create the largest possible radius.',
    body: `The racing line is the fastest path through a corner. It works by maximizing the radius of the arc the car travels — a larger radius allows more speed for the same level of cornering force.\n\nThe classic line is outside-inside-outside: start wide, hit the apex, track out to the exit. Every deviation from this has a cost unless there's a specific reason — like setting up for the next corner.`,
    pillar: 'racing',
    relatedConceptIds: ['c-apex', 'c-weight-transfer'],
    createdAt: '2026-01-01T00:00:00Z',
  },
]

// ─── Lessons ──────────────────────────────────────────────────────────────────

export const MOCK_LESSONS: Lesson[] = [

  // ── Batch 1: Fundamentals ────────────────────────────────────────────────────

  {
    id: 'l-hand-position',
    slug: 'hand-position',
    title: 'Proper Hand Position & Steering Control',
    summary: 'Why where your hands sit on the wheel changes how fast and how safely you can react — and what good steering technique actually looks like.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      '9-and-3 is the correct starting position — equal range in both directions, arms slightly bent',
      'Push-pull steering keeps your hands in control; shuffling/crossing over reduces it',
      'Good hand position means you can apply opposite lock fast when the rear steps out',
      'In the sim, your wheel rotation setting must match reality — otherwise inputs are inaccurate',
      'Smooth hands equal smooth weight transfer equal more grip',
    ],
    body: `## Why Hand Position Matters

Your hands are your only connection to what the front of the car is doing. Bad hand position means slower inputs, less feel, and limited ability to catch a slide. It's the most basic thing to get right — and a lot of drivers never do.

The correct starting position is 9-and-3: hands at the horizontal midpoint of the wheel, left and right. This gives you equal steering range in both directions without moving your grip, and keeps your arms slightly bent so you can feel the wheel rather than fight it.

Avoid 10-and-2. It limits your available steering lock and puts your arms in an awkward position for quick corrections.

## Push-Pull Technique

Push-pull is the steering technique that keeps you in control. As one hand pushes the wheel up, the other pulls down. Your input is continuous and your grip never breaks. You don't cross over, you don't shuffle — you stay coordinated.

Crossing your arms over the wheel is slower and creates a moment where you have reduced authority over the steering. At high speed, that moment matters.

## Countersteering

When the rear slides, you need to countersteer — turn the wheel toward the slide — fast. This is instinctive when your hand position is right. If your hands are already at 9-and-3 with arms slightly bent, you can reach full opposite lock without adjusting your grip.

Practice it slowly. Set up a slide deliberately in a low-speed corner and hold it. Feel how the wheel wants to turn and how your hands need to move.

## Sim-Specific Setup

Set your wheel rotation in the game to match your physical wheel. If the virtual steering wheel turns more than yours, your inputs won't correspond to reality and you'll lose feel. Force feedback should be strong enough to feel what the tires are doing, not so heavy you're fighting the wheel.

## What to Work On

Next session: actively notice your hand position. Are you crossing over? Shuffling? Slow down if you need to and practice the push-pull technique deliberately. Smooth hands equal smooth weight transfer equal more grip. It all starts here.`,
    thumbnailColor: '#0F0F0F',
    emoji: '🤲',
    conceptIds: ['c-weight-transfer'],
    diagramIds: [],
    quizId: 'q-hand-position',
    relatedLessonIds: ['l-smooth-inputs', 'l-vision'],
    moduleId: 'mod-fundamentals',
    publishedAt: '2026-02-01T00:00:00Z',
    createdAt: '2026-02-01T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-vision',
    slug: 'vision',
    title: 'Vision: Where You Should Be Looking',
    summary: 'The single habit that separates smooth, fast drivers from nervous, reactive ones — and it has nothing to do with car control.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Always look further ahead than feels natural — your car goes where your eyes lead',
      'At the braking point, your eyes should already be on the apex',
      'At the apex, your eyes should already be looking toward the exit',
      'Fixating on a wall or barrier pulls you toward it — look at where you want to go',
      'Peripheral vision handles the close-up stuff; your focus should be on what\'s coming',
    ],
    body: `## The Most Underrated Skill

Vision is the most impactful thing you can improve as a beginner — and almost nobody talks about it. Where you look directly affects where the car goes. Get it wrong and you're constantly reacting. Get it right and the car starts to flow.

The rule is simple: always look further ahead than feels comfortable.

## The Lead-Lag Problem

Most beginner drivers look at the road right in front of the car. By the time they see the apex, they're already at the braking point. By the time they see the exit, they're already past the apex. They're always reacting instead of planning.

Fast drivers are looking one step ahead. At the braking point, their eyes are already on the apex. At the apex, they're already scanning for the exit. The car is being placed based on information gathered a second earlier — not right now.

## Looking Through Corners

As you approach a corner, your gaze should move from the braking point → inside edge of the turn → apex → exit in a smooth sweep. Not all at once, but leading. You're always looking at where you're going, not where you are.

The moment you find yourself staring at the road directly ahead, your vision has collapsed. Consciously lift your gaze.

## The Wall Effect

When you fixate on a wall or barrier, your hands steer toward it. This is how drivers who don't want to hit the wall end up hitting it. Your brain says "don't hit that" and your hands say "OK I'll aim right at it."

Look at where you want the car to go. Not what you want to avoid.

## In the Sim

The sim is actually ideal for training vision because everything is predictable and repeatable. Pick one corner and practice the gaze sequence: braking reference → apex → exit. Do it for 10 laps. It will feel slow at first because you're being deliberate. That's correct. Speed your vision up before you speed the car up.`,
    thumbnailColor: '#0D1520',
    emoji: '👁️',
    conceptIds: ['c-racing-line', 'c-apex'],
    diagramIds: [],
    quizId: 'q-vision',
    relatedLessonIds: ['l-hand-position', 'l-smooth-inputs'],
    moduleId: 'mod-fundamentals',
    publishedAt: '2026-02-02T00:00:00Z',
    createdAt: '2026-02-02T00:00:00Z',
    isFeatured: true,
  },

  {
    id: 'l-smooth-inputs',
    slug: 'smooth-inputs',
    title: 'Smooth Inputs: Steering, Brake & Throttle',
    summary: 'Why the fastest drivers look almost bored — and how smoothness directly translates to grip and lap time.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Sudden inputs cause weight spikes — spikes exceed grip limits and cause slides or lockups',
      'Smooth doesn\'t mean slow — it means progressive, deliberate, and in control',
      'Every input change transfers weight: smooth input = gradual transfer = manageable grip demand',
      'Telemetry is the best feedback tool — your inputs as traces show you exactly what you\'re doing',
      'If the car feels nervous, your inputs are almost always the cause — not the car',
    ],
    body: `## Why Smooth Equals Fast

Every time you make an input — steer, brake, throttle — you're transferring weight in the car. A sudden jerk of the wheel or a hard stomp on the brake creates a weight spike. That spike can exceed the tire's current grip limit, and when it does, the tire slides.

Smooth inputs create gradual, manageable weight transfer. The tire stays inside its grip window. You carry more speed, make less mistakes, and the car feels planted.

Fast drivers look almost boring to watch. The wheel hardly seems to move. The braking is decisive but not violent. The throttle builds rather than snaps. That's not because they're going slower — it's because they've learned that smoothness is speed.

## Steering Smoothness

Jerky steering is the most common beginner issue. Turning in too quickly creates a weight spike that either causes understeer (front washes out) or unbalances the rear.

The steering input into a corner should feel like you're drawing a smooth curve, not flicking the wheel. Turn-in is deliberate and progressive. The wheel unwinds the same way coming out.

## Brake Smoothness

Braking has two phases: the initial squeeze (building to threshold), and the release (trailing off on entry or coming off for the straight).

Hard initial application is fine — even necessary for threshold braking. But the transition from braking to not braking should not be a cliff. A snapped release at speed shifts weight forward aggressively and can unbalance the front.

## Throttle Smoothness

The throttle coming on at corner exit needs to be progressive. The rear tires are being asked to provide both traction and cornering force simultaneously. Too much throttle too fast overwhelms them.

Build it. Feet off the floor at the apex, smoothly increasing as the car straightens. By the time you're fully straight, you're at full throttle. Not before.

## Checking Your Work

Pull up your telemetry. Look at the traces for steering angle, brake pressure, and throttle position. Smooth inputs look like smooth curves. Jerky inputs look like jagged lines. The correlation between the smoothness of those lines and your lap time is almost perfect.`,
    thumbnailColor: '#150F0F',
    emoji: '🎛️',
    conceptIds: ['c-weight-transfer', 'c-grip-circle'],
    diagramIds: [],
    quizId: 'q-smooth-inputs',
    relatedLessonIds: ['l-weight-transfer', 'l-grip-circle'],
    moduleId: 'mod-fundamentals',
    publishedAt: '2026-02-03T00:00:00Z',
    createdAt: '2026-02-03T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-understanding-grip',
    slug: 'understanding-grip',
    title: 'Understanding Grip',
    summary: 'What grip actually is, where it comes from, and why the limit is never where you think it is.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Grip comes from the tire deforming and bonding with the road surface — not just friction',
      'More load on a tire increases grip, but only up to a point — beyond that it drops off',
      'Tires have a temperature window — cold tires and overheated tires both have less grip',
      'Grip is a budget: you can spend it on braking, cornering, or acceleration — not all three at once',
      'The limit is a feeling, not a number — learning to sense it is the whole game',
    ],
    body: `## What Grip Actually Is

Grip isn't magic and it isn't just friction. When a tire rolls on a surface, the rubber deforms slightly — microscopic knobs and channels in the compound interlock with the microscopic texture of the road. That mechanical bonding, combined with a chemical attraction between rubber and asphalt, is what we call grip.

This matters because it means grip isn't constant. It changes with temperature, surface type, load, and tire condition. Understanding those variables is what gives you an intuition for where the limit is.

## Load and Grip

More weight on a tire means more grip — up to a point. Press the tire harder into the road and it deforms more, creates more bonding, handles more force. This is why weight transfer is so important: it tells you which tires have grip and which ones are relatively unloaded.

But there's a ceiling. Overload a tire and the deformation becomes too much — the compound starts sliding rather than bonding. That's why you can't just add downforce infinitely and get unlimited cornering speed.

## The Temperature Window

Every tire compound has an operating temperature range. Too cold: the rubber is stiff and doesn't deform well — grip is low. Too hot: the compound degrades, the rubber breaks down, grip drops and doesn't come back.

In practice, this means the first lap on cold tires is always slower. And a driver who's been pushing too hard for too many laps will feel the tires "going away" — that's heat degradation happening in real time.

## Grip Is a Budget

Think of each tire as having a budget of available grip at any moment. You can spend that budget on braking, on cornering, or on acceleration. But the budget is finite. Demand more than the budget allows and the tire slides.

This framing — grip as a budget — is how elite drivers think. Every input decision is about how to spend the available grip most efficiently. That's the whole game.`,
    thumbnailColor: '#0F1510',
    emoji: '🔄',
    conceptIds: ['c-weight-transfer', 'c-grip-circle'],
    diagramIds: [],
    quizId: 'q-understanding-grip',
    relatedLessonIds: ['l-weight-transfer', 'l-grip-circle'],
    moduleId: 'mod-fundamentals',
    publishedAt: '2026-02-04T00:00:00Z',
    createdAt: '2026-02-04T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-weight-transfer',
    slug: 'weight-transfer',
    title: 'Weight Transfer',
    summary: 'The invisible force that controls every handling characteristic of your car — and the key to understanding why your car does what it does.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Braking transfers weight forward — front grip increases, rear grip decreases',
      'Acceleration transfers weight rearward — rear grip increases, front grip decreases',
      'Cornering transfers weight to the outside — outside tires load up, inside tires unload',
      'All three can happen simultaneously — the total weight stays the same, it just moves around',
      'Every handling feeling you have in the car is caused by weight transfer',
    ],
    body: `## The Car's Weight Never Disappears

The total weight of the car is fixed. But where that weight sits at any given moment changes constantly based on what you're doing with the pedals and steering.

Understanding weight transfer means understanding why the car does everything it does. It's not abstract — it's directly what you feel through the seat and steering wheel.

## Braking: Weight Goes Forward

When you brake, inertia resists the deceleration and pushes the car's mass forward. Weight loads up the front tires, unloads the rear. The fronts get more grip. The rears get less.

This is why the car can rotate more easily under braking — the light rear is easy to swing. It's also why you can spin under heavy braking if you have too much rear brake bias — the rear tires have very little grip to work with.

## Acceleration: Weight Goes Rearward

Throttle application pushes weight to the rear. The rear tires grip harder. The front tires unload slightly.

On corner exit, this means the front is lighter as you accelerate. Apply throttle before the car is pointed straight and the light front end washes outward — understeer on exit. Apply too much throttle with the rear already working to corner and it can break loose — oversteer on exit.

## Cornering: Weight Goes Outside

Turning creates centrifugal force, which pushes weight to the outside of the car. The outside tires load up and grip more. The inside tires unload and grip less.

This is why fast cornering is done on the outside tires. It's also why the balance between front and rear roll stiffness matters so much — it controls how that cornering weight gets distributed.

## Feeling It

You don't need data to sense weight transfer. You feel it in the seat, through the steering, through the pedals. A driver who understands weight transfer isn't just intellectually aware of it — they feel it happening and use that information every lap.`,
    thumbnailColor: '#151510',
    emoji: '⚖️',
    conceptIds: ['c-weight-transfer', 'c-grip-circle'],
    diagramIds: [],
    quizId: 'q-weight-transfer',
    relatedLessonIds: ['l-grip-circle', 'l-understanding-grip', 'l-smooth-inputs'],
    moduleId: 'mod-fundamentals',
    publishedAt: '2026-02-05T00:00:00Z',
    createdAt: '2026-02-05T00:00:00Z',
    isFeatured: true,
  },

  {
    id: 'l-grip-circle',
    slug: 'grip-circle',
    title: 'The Grip Circle',
    summary: 'The single mental model that explains every fast driving decision — and why you can\'t brake and corner at maximum at the same time.',
    pillar: 'racing',
    category: 'cornering',
    difficulty: 'beginner',
    keyTakeaways: [
      'Each tire has a total grip budget that must be shared between braking, cornering, and acceleration',
      'Maximizing one force reduces what\'s available for the others',
      'Staying inside the circle means smooth, controlled driving — exceeding it means sliding',
      'Trail braking is the technique of deliberately managing the overlap between braking and cornering',
      'The best lap times come from using 100% of the circle, not staying safely inside it',
    ],
    body: `## The Mental Model

Picture a circle. The size of the circle represents all the grip a tire has available right now. You can spend that grip budget in three directions: forward (braking), backward (acceleration), or sideways (cornering).

The rule is that the total can't exceed the circle. Demand more than the circle allows and the tire slides.

This is called the traction circle, friction circle, or grip circle — all the same thing. It's the most useful mental model in racing.

## What Happens at the Limit

If you're braking at 100% of available grip, there's nothing left for cornering. Turn the wheel while braking at the absolute limit and the tire immediately slides — you've asked for 100% + something, and that something pushes you outside the circle.

If you're cornering at 90%, you have 10% left for braking or acceleration. You can apply a small amount of each without exceeding the circle.

This is exactly what trail braking exploits: as you release the brakes through corner entry, you're reducing the braking demand and freeing up grip budget for cornering. You're always near the edge of the circle, just moving around it.

## Why It Changes How You Think

Once you have this model, every handling problem becomes diagnosable. Understeer on corner exit while on throttle? You're asking for cornering plus acceleration and the front tires don't have enough budget. Rear steps out under trail braking? You've loaded the braking side too long and the rear has nothing left for cornering.

It's not magic — it's budget management.

## The Goal: Use 100% of the Circle

The goal is not to stay comfortably inside the circle. It's to ride the edge of it as precisely as possible. Staying at 70% because you're scared of the limit is leaving 30% of available performance on the table.

Learning where the circle's edge is — by feel, by understanding the car, by deliberate practice — is what driving fast actually means.`,
    thumbnailColor: '#0F0F18',
    emoji: '⭕',
    conceptIds: ['c-grip-circle', 'c-weight-transfer', 'c-trail-braking'],
    diagramIds: [],
    quizId: 'q-grip-circle',
    relatedLessonIds: ['l-weight-transfer', 'l-trail-braking-basics', 'l-smooth-inputs'],
    moduleId: 'mod-fundamentals',
    publishedAt: '2026-02-06T00:00:00Z',
    createdAt: '2026-02-06T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-understeer-oversteer',
    slug: 'understeer-oversteer',
    title: 'Understeer vs Oversteer',
    summary: 'What the two most common handling problems feel like, what causes them, and what to do about them in the moment.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Understeer: front pushes wide — car won\'t turn. Oversteer: rear steps out — car turns too much',
      'Both are caused by asking more grip from one end than it currently has',
      'Understeer correction: reduce speed, reduce steering input, wait for grip to return',
      'Oversteer correction: countersteer (steer into the slide), manage throttle carefully',
      'Identifying which problem you have is the first step — corrections are completely different',
    ],
    body: `## Two Problems, Two Ends of the Car

Every handling problem traces back to one end of the car having more grip than the other. Understeer means the front is overloaded or undergripped. Oversteer means the rear is. They feel completely different and are fixed in completely different ways.

Getting this diagnosis wrong is dangerous. The correction for oversteer makes understeer worse, and vice versa.

## Understeer: The Push

Understeer is when you're steering and the car isn't following. You've turned the wheel but the front tires are sliding and the car wants to go straight. It pushes wide toward the outside of the corner.

What causes it: too much entry speed, turning in before you've released enough brake, applying throttle while still at full steering lock, or a setup that overloads the fronts.

What to do: don't add more steering input — the front is already sliding and more steering doesn't help. Reduce speed (gently), reduce steering angle slightly, and wait for the tires to regain grip. Then try again.

## Oversteer: The Snap

Oversteer is when the rear of the car steps out. The back end is rotating past the front, and if you don't catch it, you spin.

What causes it: too much throttle on exit, lifting sharply mid-corner (snap oversteer), trail braking too aggressively, or a loose rear setup.

What to do: countersteer. Turn the wheel into the direction the rear is going — if the rear slides right, steer right. At the same time, manage the throttle carefully — don't snap off, but don't floor it either. Catching a slide takes practice. The countersteer has to be fast enough to prevent rotation but not so aggressive you spin the other way.

## Which Is Easier to Drive

Understeer is safer and more predictable. It's the default handling characteristic of most road cars and many entry-level race cars. You go wide, you slow down, you survive.

Oversteer is faster when controlled — a small amount of rotation on entry is desirable. But it's less forgiving. A snap of oversteer at the wrong moment and you're in the wall.

## Learn to Diagnose First

Before you think about setup fixes, be able to answer: is this understeer or oversteer? At what point in the corner? Entry, apex, or exit? Once you can reliably diagnose the problem, the fix — whether driving technique or setup — becomes much clearer.`,
    thumbnailColor: '#1A0A0A',
    emoji: '🔁',
    conceptIds: ['c-understeer', 'c-oversteer', 'c-weight-transfer'],
    diagramIds: [],
    quizId: 'q-understeer-oversteer',
    relatedLessonIds: ['l-weight-transfer', 'l-grip-circle', 'l-trail-braking-basics'],
    moduleId: 'mod-car-control',
    publishedAt: '2026-02-07T00:00:00Z',
    createdAt: '2026-02-07T00:00:00Z',
    isFeatured: false,
  },

  // ── Batch 2: Braking Technique & The Racing Line ─────────────────────────────

  {
    id: 'l-braking-points',
    slug: 'braking-points',
    title: 'Braking Points & Reference Markers',
    summary: 'How to find your braking point, how to lock it in with a reference marker, and why consistency beats heroics every time.',
    pillar: 'racing',
    category: 'braking',
    difficulty: 'beginner',
    keyTakeaways: [
      'A braking point is only useful if it\'s tied to a fixed visual reference you can repeat',
      'Braking by feel alone varies lap to lap — a reference marker doesn\'t',
      'Finding your point: brake there, assess the corner, move it 5m at a time until it\'s right',
      'Reference markers are everywhere — boards, posts, paint, curb edges, track features',
      'Own your braking point and never brake before it unless conditions change',
    ],
    body: `## Why Consistency Beats Heroics

The fastest drivers aren't always the ones who brake latest. They're the ones who brake most consistently. A braking point that's 5 meters later than theoretically optimal but perfectly repeatable will beat a theoretical best that varies by 10 meters every lap.

Consistency means the car does the same thing at the same place every lap. That repeatability is what lets you build on a lap rather than just survive it.

## Finding a Reference Marker

Your braking point must be tied to something you can see. In the real world: brake boards, marshal posts, advertising hoardings. In the sim: exactly the same things, plus paint lines, curb edges, track features, even background objects.

The mistake most beginners make is braking by feel. "It felt right" varies. A specific board or post 100m before the corner doesn't.

Process: pick a landmark, brake there, evaluate the corner. Too early? Move the point 5 meters later. Too late? Move it earlier. Iterate until it's right — then commit to it.

## Setting the Point

When you're finding a new braking point on an unfamiliar circuit, always start conservative. Brake earlier than you think you need to. You can always move the point later; you can't un-crash.

Move the point in small increments — 5 meters at a time. After each change, do 2-3 laps to confirm the result before adjusting again. One lap isn't enough data.

## Adapting Through the Stint

Braking points aren't static. They shift as:
- Tires wear (less grip = brake earlier)
- Fuel burns off (lighter car = can sometimes brake slightly later)
- Track temperature changes
- You encounter traffic

Experienced drivers make small adjustments constantly — often subconsciously. The skill is noticing when the car is taking longer to slow down and reacting before it costs you the corner.

## In the Sim

The sim is ideal for building braking consistency because conditions are perfectly repeatable. Run the same track and car, spend 20 minutes only moving your braking point later each lap until you find the limit. You'll lock up. That's fine — you're mapping the edge. Then back off 3-5 meters and own that point.`,
    thumbnailColor: '#1A0A00',
    emoji: '📍',
    conceptIds: ['c-threshold-braking', 'c-weight-transfer'],
    diagramIds: [],
    quizId: 'q-braking-points',
    relatedLessonIds: ['l-threshold-braking', 'l-trail-braking-basics'],
    moduleId: 'mod-car-control',
    publishedAt: '2026-02-09T00:00:00Z',
    createdAt: '2026-02-09T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-threshold-braking',
    slug: 'threshold-braking',
    title: 'Threshold Braking',
    summary: 'Braking at the absolute limit without locking — the technique that squeezes every meter out of your braking zone.',
    pillar: 'racing',
    category: 'braking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Threshold braking is braking at maximum deceleration without locking the wheels',
      'Any less pressure = leaving braking performance unused. Any more = lockup',
      'A locked wheel decelerates slower than a rolling wheel at the limit — locking is always slower',
      'The initial squeeze should be fast and firm — don\'t tip-toe onto the brakes',
      'Feel the limit by deliberately pushing until you lock, then back off slightly and repeat',
    ],
    body: `## What Threshold Means

Threshold braking means applying exactly enough brake pressure to decelerate at the maximum the tires can handle — right at the edge of locking up, but not crossing it.

Under threshold braking, the tires are rolling but working extremely hard. They're generating maximum friction against the road surface. This is faster than a locked wheel because a locked tire skids instead of rolling, and sliding rubber on asphalt decelerates slower than a gripping tire at the threshold.

## The Initial Squeeze

Most beginners brake progressively — they increase pressure slowly from the moment they hit the pedal. This is wrong. You're wasting the early part of the braking zone.

The correct technique: hit the pedal firmly and quickly, building to your target pressure fast. The initial squeeze should be decisive. You're not stomping — but you're not tip-toeing either. Get to threshold fast, then hold it.

## Modulating at the Limit

Once at threshold pressure, the job is to hold it as close to the lock-up point as possible while still rolling. This requires constant small adjustments — the grip available changes slightly based on track surface, tire temperature, and load.

On bumpy sections, the tires bounce and momentarily lose contact. If you're at threshold and you hit a bump, you'll briefly lock. The correction: slightly reduce pressure over known bumps, then return to threshold.

## Finding the Limit

You learn threshold braking by going over it. Brake until you lock. Feel it. Back off slightly. That slightly-backed-off point is your threshold. Repeat until you know exactly where it is and can reproduce it consistently.

Don't be afraid of lockups during practice sessions. Controlled lockup practice in low-risk situations is how you build the feel for the edge.

## ABS vs No ABS

In cars with ABS, the system finds the threshold for you — but it doesn't always do it perfectly. Understanding threshold braking helps you work with ABS rather than against it, and prepares you for the many racing scenarios where ABS isn't available.`,
    thumbnailColor: '#200808',
    emoji: '🔴',
    conceptIds: ['c-threshold-braking', 'c-grip-circle'],
    diagramIds: [],
    quizId: 'q-threshold-braking',
    relatedLessonIds: ['l-braking-points', 'l-brake-release', 'l-trail-braking-basics'],
    moduleId: 'mod-car-control',
    publishedAt: '2026-02-10T00:00:00Z',
    createdAt: '2026-02-10T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-brake-release',
    slug: 'brake-release',
    title: 'Brake Release Technique',
    summary: 'The part of braking nobody talks about — how you come off the brake is just as important as how hard you press it.',
    pillar: 'racing',
    category: 'braking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Snapping the brakes off transfers weight forward suddenly and unsettles the car',
      'Progressive release keeps the car balanced and transitions smoothly into the corner',
      'For a straight-line stop: release progressively as the car slows to prevent nose-dive',
      'For trail braking: release follows the corner — decreasing smoothly as you approach the apex',
      'The release is where most drivers lose the most time in the braking zone',
    ],
    body: `## The Forgotten Half of Braking

Everyone focuses on braking hard. Fewer people think about the release. But the way you come off the brakes shapes the entire corner entry — weight transfer, rotation, balance, all of it.

Snap the brakes off and you throw weight forward in a spike. The front dives, the rear lightens suddenly, and the car is unbalanced right when you need it most — at turn-in.

Release progressively and the weight transition is smooth. The car settles into the corner rather than pitching.

## Straight-Line Release

Even on a straight-line stop — no trail braking, just stopping — the release matters. As the car slows, the aerodynamic load decreases and the grip available from braking changes. If you hold full threshold pressure all the way to a low speed, you'll lock.

Progressively ease off as speed drops. Match your brake pressure to the changing conditions as the car decelerates.

## Corner Release — The Trail

When you're trail braking, the release is the technique. It's not a question of releasing — it's how you release.

The goal is a straight line on the trace: from peak pressure at the start of braking down to zero at the apex. Every meter into the corner, slightly less pressure. Smooth, linear, predictable.

The most common errors:
- Releasing in steps (two or three chunks instead of one smooth decrease)
- Releasing too fast early then holding steady (defeats the purpose)
- Holding too long then releasing abruptly at the apex

## Feeling the Car Through the Release

As you release the brakes into a corner, you should feel the car's attitude changing. The front is lightening slightly, the car is starting to rotate. This is feedback. Use it to modulate the release — if you feel the rear getting light, you're releasing too slowly (still too much brake). If the front washes out, you released too fast.

## Practice Drill

Run a single corner at medium speed. Focus only on the release. Try to make the brake trace a perfectly straight line from peak to zero. Do this for 15 minutes. It will change how every corner feels.`,
    thumbnailColor: '#1A1000',
    emoji: '🎚️',
    conceptIds: ['c-trail-braking', 'c-weight-transfer'],
    diagramIds: [],
    quizId: 'q-brake-release',
    relatedLessonIds: ['l-trail-braking-basics', 'l-threshold-braking'],
    moduleId: 'mod-car-control',
    publishedAt: '2026-02-11T00:00:00Z',
    createdAt: '2026-02-11T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-late-braking',
    slug: 'late-braking',
    title: 'Late Braking: When and When Not To',
    summary: 'Late braking isn\'t always faster — here\'s when it gains you time, when it costs you, and how to use it as a racecraft weapon.',
    pillar: 'racing',
    category: 'braking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Later braking only gains time if you can still hit the apex and get a good exit',
      'Braking late but missing the apex loses more time on exit than you saved at the entry',
      'Late braking is most valuable as a passing weapon — not as a lap time tool by default',
      'The conditions that support later braking: fresh tires, cool track, no traffic pressure',
      'Know your consistent point first — then explore later, not the other way around',
    ],
    body: `## The Late Braking Myth

Late braking has a reputation as the mark of a fast driver. Brake later = go faster. It's not that simple.

Braking later only gains time if you can still make the corner correctly. If braking 10 meters later means you miss the apex, run wide, and compromise the exit, you've lost far more time than the 10 meters bought you.

Exit speed onto a straight is worth more than entry heroics. Always.

## When Late Braking Actually Helps

Late braking gains time when: you can still hit the apex, you can still get a clean exit, and your tires and conditions support the later point.

Fresh tires in the first few laps of a stint often allow slightly later braking — more grip available. Cool track temperatures can extend the braking window. A lighter fuel load later in a stint changes the car's stopping characteristics.

These are valid reasons to experiment with a later point.

## Late Braking as a Racecraft Weapon

This is where late braking earns its reputation. In a race situation, outbraking a competitor at a heavy braking zone is one of the cleanest overtaking moves available.

The key: you're not just braking later — you're getting alongside or past the car ahead before the apex. If you're genuinely deeper into the corner with a legitimate overlap, you've earned the position.

The difference between a clean overtake and a divebomb is whether you can actually make the corner after the later braking point. Divebombing means braking so late you can't make the apex — you're just using the other car as a barrier.

## What Late Braking Requires

To brake later than your normal point, you need:
- Confidence at your current point (if you're inconsistent there, later will be worse)
- Enough grip to stop from the later point
- A clear read on the car ahead's braking point
- An exit plan — where are you going after you're alongside?

## Build Consistency First

Learn your consistent braking point first. Know it so well you can hit it with your eyes closed. Then explore later. Never search for a later point when you don't own your current one.`,
    thumbnailColor: '#100A20',
    emoji: '⏱️',
    conceptIds: ['c-threshold-braking', 'c-trail-braking'],
    diagramIds: [],
    quizId: 'q-late-braking',
    relatedLessonIds: ['l-braking-points', 'l-threshold-braking', 'l-overtake-timing'],
    moduleId: 'mod-car-control',
    publishedAt: '2026-02-12T00:00:00Z',
    createdAt: '2026-02-12T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-racing-line',
    slug: 'racing-line',
    title: 'The Racing Line (Ideal vs Defensive)',
    summary: 'What the racing line is, why it\'s fastest, and how it changes when you\'re racing someone instead of chasing a lap time.',
    pillar: 'racing',
    category: 'cornering',
    difficulty: 'beginner',
    keyTakeaways: [
      'The racing line maximizes corner radius — bigger radius = more speed for the same grip demand',
      'Outside-inside-outside: start wide, hit the apex, track out to the exit',
      'Every deviation from the ideal line has a cost unless there\'s a reason',
      'The defensive line covers the inside — it\'s slower but protects your position',
      'Switching between ideal and defensive lines is a racecraft skill, not just a setup one',
    ],
    body: `## Why the Racing Line Is the Racing Line

The racing line exists because physics. The faster you go through a corner, the more cornering force your tires need to generate. The way to reduce that demand — without slowing down — is to increase the radius of the arc you drive through.

A larger radius means a gentler curve, which means less lateral force needed, which means you can carry more speed for the same tire grip demand.

The racing line maximizes this radius by using every inch of available track width.

## Outside-Inside-Outside

The classic line: approach from the outside edge of the road, turn in toward the apex at the inside edge, then track out to the outside edge at the exit.

This creates the widest possible arc through the corner. Deviation from it — turning in too early, missing the apex, not tracking out — all reduce that radius and cost speed.

## Turn-In and Apex Placement

Turn-in is where you start rotating the car toward the apex. Too early and you apex early — which runs you out of road before the exit and forces you to either scrub speed or run wide. Too late and you're on a tight line that doesn't use the track width.

The apex should feel like the car just brushes the inside edge. Not scraped — but close. If you're consistently a car width away from the apex, you're leaving radius on the table.

## The Defensive Line

In a race, the ideal line becomes a compromise the moment another car is behind you.

The defensive line covers the inside — it's positioned to deny the car behind access to the inside of the corner. It's slower than the ideal line because it typically involves a later turn-in and tighter arc.

The skill is knowing when to use each. On a clear lap, ideal line. When defending, cover the inside. When you've committed to a defensive move, don't abandon it mid-corner.

## Combining Both

A fast race driver can switch between ideal and defensive lines lap by lap — even corner by corner. The transition from defensive back to ideal should happen at the point where the threat is neutralized, not before.`,
    thumbnailColor: '#0A1A0A',
    emoji: '🛤️',
    conceptIds: ['c-racing-line', 'c-apex'],
    diagramIds: [],
    quizId: 'q-racing-line',
    relatedLessonIds: ['l-apex-types', 'l-corner-phases', 'l-slow-in-fast-out'],
    moduleId: 'mod-racing-line',
    publishedAt: '2026-02-13T00:00:00Z',
    createdAt: '2026-02-13T00:00:00Z',
    isFeatured: true,
  },

  {
    id: 'l-apex-types',
    slug: 'apex-types',
    title: 'Apex Types: Early, Late & Geometric',
    summary: 'The three types of apex and when to use each one — because hitting the same point every corner is leaving time on the table.',
    pillar: 'racing',
    category: 'cornering',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Geometric apex: the mathematical midpoint of the corner — maximizes radius through that corner alone',
      'Late apex: past the midpoint — allows earlier throttle and better exit speed, best before long straights',
      'Early apex: before the midpoint — runs out of road, forces a lift or wide exit, almost always wrong',
      'The default in sim racing is late apex — exit speed onto straights is almost always worth more',
      'Compromise corners exist — the apex of corner A is dictated by what sets you up for corner B',
    ],
    body: `## Not All Apexes Are Equal

Most drivers learn that the apex is the inside of a corner. True — but which point on the inside? That decision changes lap time more than almost any other.

There are three types: geometric, late, and early. Two of them are useful. One almost never is.

## Geometric Apex

The geometric apex is the exact mathematical midpoint of the corner. It gives you the largest radius through that specific corner in isolation.

The downside: it's often not the fastest apex for the overall lap. Hitting the geometric apex requires an earlier turn-in, which means you're committed to the tightest part of the corner earlier — and you need to start applying throttle at the apex, which means the throttle comes on while you still have significant steering lock.

## Late Apex

The late apex is past the geometric midpoint. You hold off slightly longer before turning in, and the tightest point of your arc comes later in the corner.

Why it's usually faster: by the time you reach the apex, the car is already pointing toward the exit. You can apply throttle with less steering lock, which means less chance of understeer and a faster, cleaner acceleration phase.

Exit speed onto a long straight is almost always worth more than slightly less entry speed into the corner.

Default rule: if there's a long straight after the corner, use a late apex.

## Early Apex

The early apex is before the geometric midpoint. You turn in too soon, hit the inside too early, and run out of track on the exit. To avoid the wall, you have to either run wide (losing track position) or lift (losing speed).

Early apexing is the most common mistake at every level of sim racing. It feels natural — the inside looks right there, you aim for it. Resist the instinct and hold off slightly longer.

## The Compromise Corner

Corners don't exist in isolation. The setup for corner B often requires a slightly different line through corner A.

In a double-apex corner or a complex section, the ideal apex for the first element is wherever it leaves you best positioned for the second. The second element is usually where the straight starts — so that exit is what you optimize.`,
    thumbnailColor: '#0A0A1A',
    emoji: '📐',
    conceptIds: ['c-apex', 'c-racing-line'],
    diagramIds: [],
    quizId: 'q-apex-types',
    relatedLessonIds: ['l-racing-line', 'l-corner-phases', 'l-slow-in-fast-out'],
    moduleId: 'mod-racing-line',
    publishedAt: '2026-02-14T00:00:00Z',
    createdAt: '2026-02-14T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-corner-phases',
    slug: 'corner-phases',
    title: 'Corner Phases: Entry, Apex, Exit',
    summary: 'Breaking a corner into three distinct phases — and knowing exactly what your job is in each one.',
    pillar: 'racing',
    category: 'cornering',
    difficulty: 'beginner',
    keyTakeaways: [
      'Entry: braking, weight management, rotation — get the car pointed before the apex',
      'Apex: transition point — brakes off, car pointed at exit, throttle about to come on',
      'Exit: throttle application, tracking out, carrying speed down the straight',
      'Each phase has one priority — mixing them up (e.g. throttle on entry) is the cause of most mistakes',
      'A bad entry can be saved. A bad apex usually costs the exit. A bad exit costs the whole straight.',
    ],
    body: `## Why Phases Matter

A corner isn't one thing — it's three sequential jobs. Entry, apex, exit. Each has a different priority. Confusing them, or trying to do exit things during entry, is the source of most corner mistakes.

Think of a corner as a sentence with three words. Get the words in the right order and it makes sense. Scramble them and the whole thing falls apart.

## Phase 1: Entry

Entry starts at your braking point and ends at the apex.

Your job during entry: get the car to the apex at the right speed and with the right attitude (pointed toward the exit). You're braking, managing weight transfer, and rotating the car.

The car should be decelerating, the weight should be loaded onto the fronts, and by the time you reach the apex the car should be pointed toward the exit.

If you arrive at the apex still going too fast, or with the car pointing at the wall instead of the exit, the whole corner is compromised.

## Phase 2: Apex

The apex is the transition point. Brakes are coming off (or are off). Steering is at its maximum angle. The car is at its closest to the inside edge.

This is the pivot — the moment the corner switches from braking/rotation to power/exit. The car should be balanced and settled here, not fighting you.

A good apex feels almost calm. The hard work happened on entry. The apex is just confirming it went well.

## Phase 3: Exit

Exit starts at the apex and ends when you're at full throttle on the straight.

Your job during exit: get to full throttle as early as possible without wheelspin or understeer, and track the car out to the outside edge to carry speed down the straight.

The exit is the most important phase for lap time. Speed here multiplies down the straight. A 5 km/h advantage at exit is a 5 km/h advantage for the next several hundred meters.

## The Chain Reaction

A problem in one phase usually hurts the next: too fast into entry → can't hit the apex → compromised exit. Or: too early apex → run wide on exit → lift to avoid the wall.

A good entry is the foundation. But if you make an entry mistake, recognizing it early gives you the best chance to minimize the damage at exit rather than making it worse.`,
    thumbnailColor: '#0A1510',
    emoji: '🔀',
    conceptIds: ['c-racing-line', 'c-apex', 'c-trail-braking'],
    diagramIds: [],
    quizId: 'q-corner-phases',
    relatedLessonIds: ['l-racing-line', 'l-apex-types', 'l-slow-in-fast-out'],
    moduleId: 'mod-racing-line',
    publishedAt: '2026-02-15T00:00:00Z',
    createdAt: '2026-02-15T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-slow-in-fast-out',
    slug: 'slow-in-fast-out',
    title: 'Slow In, Fast Out',
    summary: 'The oldest rule in racing — and why understanding it changes how you think about every corner on the track.',
    pillar: 'racing',
    category: 'cornering',
    difficulty: 'beginner',
    keyTakeaways: [
      'Exit speed carries down the straight — it compounds over distance in a way that entry speed doesn\'t',
      'A slightly slower entry that enables a much faster exit is always the correct trade',
      'The mistake: carrying too much entry speed, missing the apex, compromising the exit',
      'The fix is counterintuitive — lift slightly, get the car pointed, get to throttle early',
      'This principle applies at every corner where a straight follows — which is most of them',
    ],
    body: `## The Oldest Rule in Racing

"Slow in, fast out" has been racing wisdom for a hundred years. It survives because it's physically true — not a preference, not a style, a consequence of physics.

Exit speed carries down the following straight. Every km/h you have at the exit of a corner is a km/h you carry for the next 300, 500, or 800 meters. Entry speed vanishes into the corner. Exit speed pays you back on the straight.

## The Math

Imagine two drivers at the same corner before a 500m straight.

Driver A brakes 10 meters later, carries more entry speed, but has a compromised apex and exits at 140 km/h.

Driver B brakes 10 meters earlier, sacrifices some entry speed, hits the apex cleanly, and exits at 148 km/h.

Over 500 meters, Driver B arrives at the next braking point over a second ahead of Driver A — from one corner.

## Why Drivers Get It Wrong

The instinct is to carry as much speed as possible into the corner. Braking feels like giving up time. Speed feels like gaining it.

This instinct is wrong. The entry is a cost center. The exit is where you earn.

When you try to carry too much entry speed, you arrive at the apex going too fast, you run wide, and you have to either lift or run out of track on exit. The straight-line speed you saved at entry evaporates three times over on exit.

## What "Slow" Actually Means

"Slow in" doesn't mean crawling. It means controlled — whatever speed allows you to hit the apex precisely and begin throttle as early as possible.

The test: can you get to full throttle within two car lengths of the apex? If yes, your entry was right. If you're still not at full throttle halfway down the straight, your entry was too fast.

## Making It Instinctive

Pick any corner that exits onto a long straight. Spend a session only focusing on exit speed — not entry. Brake slightly earlier than normal, get the car pointed, hit the apex, get to throttle. Feel how much faster you exit. Then never forget that feeling.`,
    thumbnailColor: '#1A1500',
    emoji: '🐢➡️🐇',
    conceptIds: ['c-racing-line', 'c-apex'],
    diagramIds: [],
    quizId: 'q-slow-in-fast-out',
    relatedLessonIds: ['l-corner-phases', 'l-apex-types', 'l-racing-line'],
    moduleId: 'mod-racing-line',
    publishedAt: '2026-02-16T00:00:00Z',
    createdAt: '2026-02-16T00:00:00Z',
    isFeatured: false,
  },

  // ── Batch 3: Racecraft & Race Intelligence ───────────────────────────────────

  {
    id: 'l-overtake-timing',
    slug: 'overtake-timing',
    title: 'When to Attempt an Overtake',
    summary: 'The decision framework that separates calculated passes from desperate lunges — and why patience wins more positions than aggression.',
    pillar: 'racing',
    category: 'overtaking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'An overtake attempt only makes sense when you have a genuine performance advantage at that point',
      'Getting alongside before the braking zone is the prerequisite — not during it',
      'The run matters: a faster exit on the preceding corner creates the opportunity',
      'If the move isn\'t on, don\'t force it — wait for the next lap or corner',
      'Patience is a weapon: a driver forced to defend loses time and eventually makes a mistake',
    ],
    body: `## The Decision Moment

Every overtake starts with a decision: do I have a move here, or don\'t I? Getting this decision right consistently is what separates drivers who make clean passes from drivers who cause incidents.

The question isn\'t "can I physically get my car to that space?" — it\'s "can I get there cleanly, make the corner, and keep the position?"

## The Prerequisite: Getting Alongside

A pass only exists if you\'re alongside the car ahead before the braking zone. If you arrive at the braking point with your front wing at their rear wheels, you\'re behind them — not alongside. At that point, any braking move is a lunge, not a pass.

Getting alongside means building a run. That run comes from a faster exit on the preceding corner — more throttle earlier, better rotation, a speed advantage that carries into the braking zone.

If you don\'t have a run, you don\'t have a move. Extend your thinking back one corner.

## Reading the Opportunity

Signs that a move is on:
- You\'re clearly faster in the braking zone (closing rapidly)
- You\'re alongside or close to alongside before they start braking
- The corner is one where the inside line leads to a usable exit

Signs that a move is not on:
- You\'re behind them at braking with no overlap
- The corner exit after an inside pass is a wall or a slow sequence
- Your tires are in worse condition than theirs

## Patience as Racecraft

A driver under pressure makes mistakes. If you can\'t pass cleanly this lap, apply pressure consistently. Force the defender to alter their line, to brake differently, to think about you. That costs them time and creates the opportunity.

Three laps of pressure followed by one clean pass is faster than three divebombs that cost you track position, tire condition, and lap time.

## In the Sim

Every incident in sim racing has a cause. Forcing a move that wasn\'t there is a choice, not bad luck. Develop the discipline to recognize the difference between "I have a move" and "I want a move" — they\'re not the same thing.`,
    thumbnailColor: '#1A0808',
    emoji: '⚡',
    conceptIds: ['c-racing-line'],
    diagramIds: [],
    quizId: 'q-overtake-timing',
    relatedLessonIds: ['l-overtake-types', 'l-setting-up-pass', 'l-late-braking'],
    moduleId: 'mod-racecraft',
    publishedAt: '2026-02-17T00:00:00Z',
    createdAt: '2026-02-17T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-overtake-types',
    slug: 'overtake-types',
    title: 'Types of Overtakes: Inside, Outside & Cutback',
    summary: 'The three main types of passes, when each one works, and what the car ahead can and can\'t do to stop each of them.',
    pillar: 'racing',
    category: 'overtaking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Inside pass: most common, requires getting alongside before the braking zone',
      'Outside pass: rare, high-risk, requires the car ahead to run very wide',
      'Cutback: use the car ahead\'s defensive line against them — they take the inside, you take a better exit',
      'Each type has a specific setup — you can\'t use an inside move setup to attempt an outside pass',
      'The type of pass available depends on the circuit layout and what the car ahead does',
    ],
    body: `## Inside Pass

The inside pass is the most common in racing. You position the car on the inside of the corner — either under braking or by getting alongside on the run — and use the inside line to complete the corner ahead of them.

Requirements:
- Alongside or past the other car\'s door before the apex
- Enough speed advantage in the braking zone to make it stick
- An exit that allows you to hold the position

The defending driver can cover the inside by moving early. But once you\'re alongside, they have to leave room — slamming the door on a car that\'s genuinely beside you is a penalty or worse.

## Outside Pass

The outside pass is rare for good reason — it requires the car ahead to run wide enough that you can complete the corner on the outside and still come out ahead. This usually only happens when:

- The car ahead makes a mistake and goes wide
- The car ahead is defending the inside and overcommits
- The outside line happens to be genuinely faster at that circuit

Don\'t attempt an outside pass unless the space is already there. Manufacturing space on the outside almost never works.

## Cutback

The cutback is the underappreciated pass. It works like this: the car ahead defends the inside (taking a defensive line), which means they have a slow entry and compromised exit. You let them have the inside, take a wider entry with a better exit, and come out of the corner faster — completing the pass under acceleration rather than braking.

The cutback is cleaner than it looks because you\'re not fighting for the same piece of track. You\'re using their defensive move against them.

It requires patience — you have to resist the instinct to also go for the inside — and confidence in your exit speed. But when executed correctly, it\'s one of the most satisfying moves in racing.

## Choosing Your Type

The circuit layout and the defender\'s reaction dictate which type of pass is available. Read what the car ahead is doing and respond to it rather than committing to a specific move before you know what you\'re going to get.`,
    thumbnailColor: '#1A0A14',
    emoji: '🔄',
    conceptIds: ['c-racing-line', 'c-apex'],
    diagramIds: [],
    quizId: 'q-overtake-types',
    relatedLessonIds: ['l-overtake-timing', 'l-setting-up-pass', 'l-defensive-driving'],
    moduleId: 'mod-racecraft',
    publishedAt: '2026-02-18T00:00:00Z',
    createdAt: '2026-02-18T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-setting-up-pass',
    slug: 'setting-up-pass',
    title: 'Setting Up a Pass',
    summary: 'A pass doesn\'t start at the braking zone — it starts two corners earlier. Here\'s how to engineer the opportunity.',
    pillar: 'racing',
    category: 'overtaking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'The pass happens at the braking zone — the setup starts 2 corners before',
      'A faster exit on the corner before creates the run into the braking zone',
      'Compromising your own line to set up a pass is sometimes the right trade',
      'Know which corners at every circuit lead to passing opportunities before the race',
      'If you can\'t set up the move, pressure the driver until they make a mistake',
    ],
    body: `## The Pass Starts Earlier Than You Think

Most drivers watch a pass happen and see the braking zone move. What they don\'t see is the two corners before it where the move was built.

A passing opportunity isn\'t found — it\'s engineered. You create the conditions by managing your gap to the car ahead across several corners until the moment is right.

## Building the Run

The run is the speed advantage you carry into a braking zone. You get a run when you exit a corner faster than the car ahead.

That means: better traction on exit, earlier throttle, cleaner line. If you\'re behind a slower car and can outperform them on corner exit, you\'ll naturally build speed on the following straight.

The corner before the overtaking opportunity is the one to focus on. Even if it means a slightly suboptimal line overall, maximizing exit speed there creates the run.

## Compromising Your Line

Sometimes setting up a pass requires not driving the ideal line. If the ideal line for corner A means you don\'t get a run into corner B (where the passing opportunity is), you may deliberately adjust corner A to optimize the B setup.

This is advanced thinking — sacrificing pace in one section to create an opportunity in another. The math needs to add up. If you lose half a second compromising corner A and gain two seconds by making the pass at corner B, that\'s the right trade.

## Patience and Pressure

If the setup isn\'t available this lap, apply consistent pressure. Stay close. Force the driver ahead to defend. Defending costs lap time — a defending driver cannot drive their ideal line. Over several laps that pressure either creates an error or opens an opportunity.

The mistake is giving up after one or two laps without a move. Maintain pressure. Be the threat they can\'t ignore.`,
    thumbnailColor: '#0A1A1A',
    emoji: '🎯',
    conceptIds: ['c-racing-line'],
    diagramIds: [],
    quizId: 'q-setting-up-pass',
    relatedLessonIds: ['l-overtake-timing', 'l-overtake-types'],
    moduleId: 'mod-racecraft',
    publishedAt: '2026-02-19T00:00:00Z',
    createdAt: '2026-02-19T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-defensive-driving',
    slug: 'defensive-driving',
    title: 'Defensive Driving: Smart Positioning vs Blocking',
    summary: 'How to protect your position without causing incidents — the difference between legitimate defense and dangerous blocking.',
    pillar: 'racing',
    category: 'defense',
    difficulty: 'intermediate',
    keyTakeaways: [
      'One defensive move per corner — moving twice is blocking and causes incidents',
      'Position, don\'t react: cover the inside early, before they have a run',
      'The best defense is a gap — go faster and the car behind never gets close enough',
      'Late defensive moves (when they\'re already alongside) cause incidents, not prevent them',
      'Your reputation as a clean or dirty defender follows you on any serious server',
    ],
    body: `## The One-Move Rule

The standard in every serious racing series — real and sim — is one defensive move per corner. You can move once to cover a line. Move again and you\'re blocking: the car behind can\'t predict where you\'re going and you\'re creating an unavoidable situation.

This rule exists for safety. A defender who moves once establishes their line. The car behind can react to one move. Two moves is a trap.

## Positioning vs Reacting

The best defense is positional — it happens before the car behind is even close. Cover the inside line at the start of the straight, before they have a run. A car that never gets a run never has a move to attempt.

Reactive defense (waiting to see where they go and then moving to block) is always playing catch-up. You\'re reacting to their action, which means you\'re always slightly behind the situation.

Think two corners ahead. If you know a passing opportunity is at corner 8, your defensive position should be established exiting corner 7 — not as you approach corner 8\'s braking zone.

## When They\'re Already Alongside

If a car is genuinely alongside you before the braking zone, you have to leave them room. Closing the door on a car that\'s beside you is not defense — it\'s a collision.

Alongside means at least their front axle is at your rear wheels or further forward. At that point, you take your line and they take theirs. The corner will sort out who makes it through ahead.

## The Gap Is the Best Defense

If you\'re fast enough to build a gap, no amount of defensive driving is needed. A 2-second gap closes no one\'s doors, requires no reactive moves, and creates no incidents.

Focus on your own pace first. Check your gap regularly. If the gap is growing, you don\'t need to defend. If it\'s closing, focus on driving your ideal line faster — not covering the inside.`,
    thumbnailColor: '#0A0A1A',
    emoji: '🛡️',
    conceptIds: ['c-racing-line'],
    diagramIds: [],
    quizId: 'q-defensive-driving',
    relatedLessonIds: ['l-letting-someone-pass', 'l-situational-awareness', 'l-overtake-timing'],
    moduleId: 'mod-racecraft',
    publishedAt: '2026-02-20T00:00:00Z',
    createdAt: '2026-02-20T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-letting-someone-pass',
    slug: 'letting-someone-pass',
    title: 'When to Let Someone Pass',
    summary: 'Knowing when to yield is as important as knowing when to defend — and doing it well keeps you in the race.',
    pillar: 'racing',
    category: 'defense',
    difficulty: 'beginner',
    keyTakeaways: [
      'Blue flags mean yield — lapped cars give way to leaders without a fight, always',
      'If a faster car is genuinely quicker, fighting costs you more time than letting them through',
      'Choose the safest, cleanest place to yield — not in the middle of a braking zone',
      'A clean yield preserves your tires, your car, and your relationship with other drivers',
      'The best time to let someone through is before they\'re close enough to be a problem',
    ],
    body: `## Blue Flags: No Discussion

When you see a blue flag in a real race, or when a faster class car is on your bumper in a multi-class sim race, you yield. No debate. No "one more corner." You move aside safely and let them through.

Fighting a blue flag in real racing earns a penalty. In sim racing, it earns you a reputation and possibly a ban from the server. Lapped cars have no stake in the fight. Let the leaders race.

## When a Faster Car Is Behind You

In class racing, if a car in your own class is clearly and consistently faster, there\'s a calculation to make. How much time are you losing by defending versus how much position are you protecting?

If they\'re 2 seconds a lap faster, you will be overtaken. The question is whether you get overtaken cleanly in 5 laps or after an incident in 2 laps that damages both cars.

Giving way to a clearly faster car — especially if you\'re out of a championship fight in that race — is not weakness. It\'s intelligence.

## How to Yield Cleanly

Pick the right place. Don\'t yield in the middle of a corner or a braking zone — that\'s dangerous for both cars. Wait for a straight, lift, give them a clear line, and let them through without drama.

Signal your intention early if possible — a slightly wider line into a corner, a visible lift. Make it predictable. The car behind needs to be able to read what you\'re doing.

## Preserving the Race

Every yielded position cleanly given is a position you can potentially get back with strategy, tire management, or a safety car. Every contact incident from refusing to yield can end your race entirely.

Long races are won by cars that finish. Yielding a position cleanly and coming back to take it later is more valuable than a racing incident that parks you in the pits.`,
    thumbnailColor: '#101510',
    emoji: '🤝',
    conceptIds: [],
    diagramIds: [],
    quizId: 'q-letting-someone-pass',
    relatedLessonIds: ['l-defensive-driving', 'l-situational-awareness'],
    moduleId: 'mod-racecraft',
    publishedAt: '2026-02-21T00:00:00Z',
    createdAt: '2026-02-21T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-situational-awareness',
    slug: 'situational-awareness',
    title: 'Situational Awareness: Mirrors & Surroundings',
    summary: 'Racing is not a solo sport. Knowing where every car is around you — at all times — is the difference between a clean race and an avoidable incident.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Check your mirrors every straight — not just when you think someone is there',
      'Know the gap: is it growing, shrinking, or stable? That context changes every decision',
      'In traffic, expand your awareness bubble — not just the car ahead, but the car ahead of them',
      'In sim racing, use every visual aid available — HUD, proximity arrows, gap timers',
      'The most avoidable incidents are caused by a driver who simply didn\'t know the other car was there',
    ],
    body: `## Racing Is Not a Solo Sport

The biggest mistake beginner racers make is treating a race like a time trial with obstacles. It\'s not. Every car around you is a factor in every decision you make.

Situational awareness means knowing where everyone is — at all times — and using that information proactively, not reactively.

## Building Your Mirror Habit

Check your mirrors every straight. Not when you hear something, not when you feel pressure — every straight, as a habit.

You\'re building a mental map: who\'s behind you, how close, how fast are they approaching? With that map, you\'re never surprised. Without it, you\'re always reacting.

Specifically: braking zones are where incidents happen. Arriving at a braking zone without knowing who\'s behind you and how close is how you get punted.

## Reading the Gap

Knowing a car is behind you isn\'t enough. You need to know whether the gap is growing, holding, or closing — and at what rate.

A closing gap that was 1.5 seconds at the start of the straight and is 0.8 seconds at the braking zone means that car has a significant pace advantage. Expect an overtake attempt. Adjust your defense accordingly.

A stable gap means they\'re matched in pace. A growing gap means you can relax the defense.

## Awareness in Traffic

When you\'re in traffic — particularly after a safety car restart or early in the race — your awareness bubble needs to expand beyond just the car directly ahead.

What is the car two positions ahead doing? If they brake suddenly, the car directly ahead will brake suddenly, and you need to have already identified the space to react.

The golden rule: the more cars are around you, the more mental bandwidth you dedicate to awareness and the less you dedicate to finding the theoretical perfect apex.

## In the Sim

Use every tool available. HUD radar, proximity arrows, delta gaps. These aren\'t cheating — they\'re replacing information you\'d have through sound, peripheral vision, and feel in a real car. Build the habit of scanning them regularly alongside your visual checks.`,
    thumbnailColor: '#0F1020',
    emoji: '🔭',
    conceptIds: [],
    diagramIds: [],
    quizId: 'q-situational-awareness',
    relatedLessonIds: ['l-risk-vs-reward', 'l-defensive-driving'],
    moduleId: 'mod-race-iq',
    publishedAt: '2026-02-22T00:00:00Z',
    createdAt: '2026-02-22T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-risk-vs-reward',
    slug: 'risk-vs-reward',
    title: 'Risk vs Reward Decision Making',
    summary: 'Every aggressive move is a gamble. Learning to calculate whether the odds favor you — instantly, in the moment — is what race intelligence looks like.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Every racing decision is a risk/reward calculation — make it consciously, not emotionally',
      'The reward of a position must be weighed against the cost of contact, penalty, or retirement',
      'Context changes the math: lap 1 of a 60-minute race vs last lap of a sprint',
      'If you\'re faster, patience almost always has better expected value than aggression',
      'Incidents that end your race have infinite negative value — they remove all future opportunities',
    ],
    body: `## Every Move Is a Bet

Every overtake attempt, every late-braking move, every defensive action is a bet. You\'re betting that the reward (the position) is worth the risk (contact, penalty, spin, retirement).

Most drivers make this bet emotionally — they want the position, they go for it. Fast drivers make it analytically — they calculate the odds and act on the result.

## The Reward Side

A position in a race is worth a certain amount. In a championship, it\'s points. In a league race, it\'s pride and results. In a practice session, it\'s nothing material — but you can still use it as a context for the calculation.

The reward is higher: late in a race when the position is decisive, when the championship points gap is small, when this is the only opportunity you\'ll get.

The reward is lower: early in a race with plenty of time remaining, when you\'re already mathematically safe in the championship, when it\'s a non-points session.

## The Risk Side

The risk of a move failing includes:
- Making contact and damaging your car
- Spinning and losing multiple positions
- A penalty that drops you further back than the failed pass would have
- A retirement that loses all accumulated race points

An incident that retires you has infinite downside — you lose everything. That should make the risk side very heavy in the calculation.

## Context Changes Everything

Lap 1, corner 1, mid-pack, 60-minute race: the risk is high, the reward is low, patience has better expected value.

Last lap, racing for position that determines a championship: the math shifts significantly toward higher risk tolerance.

## The Practical Rule

If you\'re genuinely faster than the car ahead — not just equal, but faster — patience almost always wins. You will get the opportunity. Forcing a risky move when patience would produce a clean one is a mathematical mistake.

Save high-risk moves for when patience has genuinely run out.`,
    thumbnailColor: '#1A1000',
    emoji: '⚖️',
    conceptIds: [],
    diagramIds: [],
    quizId: 'q-risk-vs-reward',
    relatedLessonIds: ['l-situational-awareness', 'l-consistency', 'l-overtake-timing'],
    moduleId: 'mod-race-iq',
    publishedAt: '2026-02-23T00:00:00Z',
    createdAt: '2026-02-23T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-consistency',
    slug: 'consistency',
    title: 'Consistency Over Raw Speed',
    summary: 'Why the driver who runs 20 clean laps at 98% beats the driver who runs 5 fast laps and 15 messy ones — every time.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'A race is won over the full stint, not in individual fast laps',
      'Inconsistency costs more than a slower pace — because you can\'t predict or plan around it',
      'Consistent braking points, consistent lines, consistent inputs are the goal',
      'Tire and fuel management reward consistent drivers far more than aggressive ones',
      'Build consistency at 90% before pushing to 100% — the limit is only useful when you can access it repeatably',
    ],
    body: `## The Consistency Paradox

Here\'s something that surprises most beginners: a driver who is consistently 0.5 seconds off their theoretical best will often beat a driver who hits that theoretical best occasionally but varies by 2 seconds lap to lap.

Why? Because consistency is predictable and buildable. Inconsistency isn\'t.

## What Consistency Enables

When your lap times are consistent, you can:
- Make strategic decisions based on accurate pace data
- Manage tires deliberately — knowing how hard each lap is working them
- Plan overtakes and defenses based on reliable gap data
- Make incremental improvements because you have a stable baseline

An inconsistent driver can\'t do any of this. Their data is noise.

## What Inconsistency Costs

Every "off" lap has a compounding cost. A messy braking zone costs a position. A snap oversteer from an aggressive input causes a moment that costs 3 seconds. Over a 20-lap race, three or four of those moments can lose the equivalent of a pit stop.

Consistent drivers are the ones still running at the front at the end of the race. The aggressive drivers are often in the walls or recovering from incidents.

## Building Consistency

Pick one thing per session to focus on. Not lap time — a specific skill. Braking reference points. Trail braking release. Vision sequence through one particular corner. Do it for the whole session.

The next session, check whether it\'s automatic. If yes, add the next thing. Build skill layer by layer until each one is consistent before adding the next.

This is slower than just "going faster" in the short term. It is much faster in the long term.

## The 90% Rule

Learn the limit at 90% before you try to operate at 100%. The limit at 100% is only useful if you can access it reliably — and you can\'t access it reliably until you know exactly where it is. You find where it is by approaching it consistently from below, not by crashing into it from above.`,
    thumbnailColor: '#0F1510',
    emoji: '📊',
    conceptIds: [],
    diagramIds: [],
    quizId: 'q-consistency',
    relatedLessonIds: ['l-beginner-mistakes', 'l-braking-points', 'l-smooth-inputs'],
    moduleId: 'mod-race-iq',
    publishedAt: '2026-02-24T00:00:00Z',
    createdAt: '2026-02-24T00:00:00Z',
    isFeatured: true,
  },

  {
    id: 'l-beginner-mistakes',
    slug: 'beginner-mistakes',
    title: 'Common Beginner Mistakes',
    summary: 'The mistakes that cost new drivers the most time and most incidents — and exactly how to fix each one.',
    pillar: 'racing',
    category: 'racecraft',
    difficulty: 'beginner',
    keyTakeaways: [
      'Early apex: turning in too soon, running out of road — fix by holding the turn-in point later',
      'Looking at the wrong thing: fixating on the apex or barriers instead of the exit',
      'Braking too late too soon: going for a late braking point before owning the consistent one',
      'Divebombing: committing to a pass that was never there',
      'Chasing lap time instead of technique: the time comes from the technique, not from trying harder',
    ],
    body: `## The Early Apex

This is the most universal beginner mistake and it costs more time than any other single error. You see the inside of the corner and aim for it — too early. The car runs wide on exit. You have to lift or go off track. The straight is compromised.

The fix: hold your turn-in longer than feels natural. The inside will still be there. The difference between an early and correct turn-in is often only 1-2 car lengths of delay — but the effect on the exit is enormous.

## Looking at the Wrong Things

Beginners look at what\'s immediately in front of them. Fast drivers look at where they\'re going. If you\'re looking at the apex while approaching the braking zone, you\'re already late.

The fix: consciously lift your gaze. At the braking reference, look at the apex. At the apex, look at the exit. It will feel wrong at first because you\'re processing ahead of where you are. That\'s correct.

## Braking Too Late Before Owning "Right"

There\'s a version of "brave" braking that\'s actually just inconsistency. If you\'re already inconsistent at your standard braking point, braking later just adds more inconsistency. You need to own a point before you can usefully explore later.

The fix: establish your consistent point first. Spend several sessions hitting the same reference every single lap. Then — and only then — explore whether a slightly later point is sustainable.

## Divebombing

A lunge from three car lengths back into a corner is not an overtake — it\'s a gamble that the other driver will avoid you. It damages the car, damages trust with other drivers, and usually results in a net position loss after the incident.

The fix: ask "am I alongside before the braking zone?" If no, you don\'t have a pass. Wait.

## Chasing Lap Time Instead of Technique

The fastest way to go slower is to try harder. Trying harder means tensing up, making more aggressive inputs, pushing into areas you haven\'t built the skill to handle yet.

The fix: identify one specific technique to improve each session. Work that technique for the whole session. The lap time is a result — it\'s not what you work on directly.`,
    thumbnailColor: '#1A0808',
    emoji: '📋',
    conceptIds: ['c-apex', 'c-racing-line'],
    diagramIds: [],
    quizId: 'q-beginner-mistakes',
    relatedLessonIds: ['l-consistency', 'l-vision', 'l-apex-types'],
    moduleId: 'mod-race-iq',
    publishedAt: '2026-02-25T00:00:00Z',
    createdAt: '2026-02-25T00:00:00Z',
    isFeatured: false,
  },

  {
    id: 'l-trail-braking-basics',
    slug: 'trail-braking-basics',
    title: 'Trail Braking Basics',
    summary: 'The technique that connects your braking zone to your corner entry — and why finishing the brakes before you turn is leaving time on the table.',
    pillar: 'racing',
    category: 'braking',
    difficulty: 'intermediate',
    keyTakeaways: [
      'Trail braking means carrying decreasing brake pressure past turn-in, not releasing fully before turning',
      'It works by keeping weight on the front tires during corner entry, increasing their grip',
      'The release must be smooth and progressive — think of drawing a straight line from peak brake to zero at the apex',
      'Too much brake held too long unloads the rear and causes oversteer — this is the main risk',
      'Start with slow corners; the technique is more obvious and the consequences of mistakes are smaller',
    ],
    body: `## The Brake-Then-Turn Problem

Most drivers learn to brake, release, then turn. It's safe and predictable. But on a racetrack it's not the fastest approach — you're leaving one of your best tools for creating front grip completely unused.

Trail braking connects the braking phase to the corner entry. Instead of arriving at the turn-in point with zero brake pressure, you arrive with a small, decreasing amount that you progressively release through the corner.

## Why It Makes You Faster

Under braking, weight loads the front tires. That weight is grip. If you release all the brakes before turn-in, you lose that front load right before you need the front tires to work hardest — at corner entry.

Trail braking keeps that weight on the front tires. The fronts grip harder. The car rotates more easily. You can take a tighter line or carry more entry speed — both faster.

## The Technique

Think of a line from your peak brake pressure down to zero. That line ends at or just before the apex. It should be straight and smooth — not held constant, not released in a sudden drop.

At the turn-in point you might be at 20-30% of your initial braking force. By mid-entry you're at 10%. By the apex, zero.

The steering and braking overlap deliberately. As steering input increases, brake pressure decreases. You're moving around the grip circle, transferring budget from braking to cornering.

## What Goes Wrong

The main mistake is holding too much brake too long. The rear tires — already lightly loaded under braking — run out of grip and snap into oversteer. It's fast and violent.

The second mistake is releasing the brake too abruptly, which snaps weight off the front tires suddenly and either causes understeer or pitches the car.

Smooth, smooth, smooth. The technique only works if the release is controlled.

## How to Practice

Pick one corner — ideally a slow hairpin where mistakes are manageable. Spend 15 minutes doing nothing except trying to carry a small amount of brake past the turn-in. Don't worry about speed. Focus on feeling the weight on the front tires during entry. Once you feel it, you'll understand why every fast driver uses this.`,
    thumbnailColor: '#1A0D00',
    emoji: '🛑',
    conceptIds: ['c-trail-braking', 'c-weight-transfer', 'c-grip-circle'],
    diagramIds: [],
    quizId: 'q-trail-braking-basics',
    relatedLessonIds: ['l-threshold-braking', 'l-brake-release', 'l-grip-circle'],
    moduleId: 'mod-car-control',
    publishedAt: '2026-02-08T00:00:00Z',
    createdAt: '2026-02-08T00:00:00Z',
    isFeatured: true,
  },
]

// ─── Modules ──────────────────────────────────────────────────────────────────

export const MOCK_MODULES: Module[] = [
  {
    id: 'mod-fundamentals',
    slug: 'fundamentals',
    title: 'Driving Fundamentals',
    description: 'The foundation everything else is built on — hand position, vision, smooth inputs, grip, weight transfer, and the grip circle.',
    pillar: 'racing',
    lessonIds: [
      'l-hand-position',
      'l-vision',
      'l-smooth-inputs',
      'l-understanding-grip',
      'l-weight-transfer',
      'l-grip-circle',
    ],
    emoji: '🎓',
    color: '#4A9EDB',
  },
  {
    id: 'mod-car-control',
    slug: 'car-control',
    title: 'Car Control & Braking',
    description: 'Understeer, oversteer, trail braking, braking points, threshold technique, and late braking — how to control the car at the limit.',
    pillar: 'racing',
    lessonIds: [
      'l-understeer-oversteer',
      'l-trail-braking-basics',
      'l-braking-points',
      'l-threshold-braking',
      'l-brake-release',
      'l-late-braking',
    ],
    emoji: '🛑',
    color: '#E8322A',
  },
  {
    id: 'mod-racing-line',
    slug: 'racing-line',
    title: 'The Racing Line',
    description: 'The ideal line, apex types, corner phases, and the slow-in-fast-out principle — how to get the most out of every corner.',
    pillar: 'racing',
    lessonIds: [
      'l-racing-line',
      'l-apex-types',
      'l-corner-phases',
      'l-slow-in-fast-out',
    ],
    emoji: '🏎️',
    color: '#C9A84C',
  },
  {
    id: 'mod-racecraft',
    slug: 'racecraft',
    title: 'Racecraft & Overtaking',
    description: 'When to attack, how to pass, how to defend, and when to let someone through — the decisions that win races.',
    pillar: 'racing',
    lessonIds: [
      'l-overtake-timing',
      'l-overtake-types',
      'l-setting-up-pass',
      'l-defensive-driving',
      'l-letting-someone-pass',
    ],
    emoji: '⚡',
    color: '#E8322A',
  },
  {
    id: 'mod-race-iq',
    slug: 'race-iq',
    title: 'Race Intelligence',
    description: 'Situational awareness, risk vs reward, consistency, and the mistakes that cost beginners the most — the mental side of racing.',
    pillar: 'racing',
    lessonIds: [
      'l-situational-awareness',
      'l-risk-vs-reward',
      'l-consistency',
      'l-beginner-mistakes',
    ],
    emoji: '🧠',
    color: '#4A9EDB',
  },
]

// ─── Quizzes ──────────────────────────────────────────────────────────────────

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'q-hand-position',
    lessonId: 'l-hand-position',
    title: 'Hand Position & Steering Quiz',
    questions: [
      {
        id: 'hp-q1',
        question: 'What is the correct default hand position on the steering wheel?',
        options: [
          '10-and-2 for maximum leverage',
          '9-and-3 for balanced input range in both directions',
          '8-and-4 for a lower, relaxed grip',
          'Both hands at the bottom for stability at speed',
        ],
        correctIndex: 1,
        explanation: '9-and-3 gives you equal steering range in both directions without repositioning, and keeps your arms slightly bent so you can feel the wheel rather than fight it.',
      },
      {
        id: 'hp-q2',
        question: 'What is the advantage of push-pull steering over shuffling?',
        options: [
          'It allows faster maximum steering lock',
          'It reduces arm fatigue over a long stint',
          'It keeps your hands in a controlled position with no gaps in authority over the wheel',
          'It works better with a smaller diameter steering wheel',
        ],
        correctIndex: 2,
        explanation: 'Push-pull means one hand always has authority over the wheel. Shuffling creates a moment of reduced control — at speed, that moment matters.',
      },
      {
        id: 'hp-q3',
        question: 'When the rear of the car slides, good hand position helps you:',
        options: [
          'Apply the brakes faster to recover grip',
          'Apply opposite lock quickly without adjusting your grip',
          'Reduce body roll through the corner',
          'Return to neutral steering more slowly to avoid overcorrection',
        ],
        correctIndex: 1,
        explanation: 'With hands already at 9-and-3 and arms slightly bent, you can reach full opposite lock in either direction without repositioning — fast correction when you need it most.',
      },
    ],
  },
  {
    id: 'q-vision',
    lessonId: 'l-vision',
    title: 'Vision Quiz',
    questions: [
      {
        id: 'vis-q1',
        question: 'Where should your eyes be focused when approaching a corner?',
        options: [
          'On the front of your car to judge the apex precisely',
          'On the outside barrier to avoid it',
          'Further ahead than feels natural — at your braking reference, then already moving to the apex',
          'Directly ahead on the road surface to track surface changes',
        ],
        correctIndex: 2,
        explanation: 'Your vision should always be one step ahead of the car. At the braking point, your eyes should already be on the apex. The car goes where your eyes lead.',
      },
      {
        id: 'vis-q2',
        question: 'What happens when a driver fixates on a wall or barrier they want to avoid?',
        options: [
          'They slow down automatically as a safety reflex',
          'Their hands tend to steer toward where they are looking',
          'Their braking distance improves from the focused attention',
          'Nothing — what you look at has no effect on steering',
        ],
        correctIndex: 1,
        explanation: 'The brain steers toward what the eyes focus on. Fixating on a wall while trying to avoid it is one of the most common causes of drivers hitting exactly what they were trying to avoid.',
      },
      {
        id: 'vis-q3',
        question: 'At what point in a corner should you start looking toward the exit?',
        options: [
          'Before turn-in, while still on the straight',
          'At the turn-in point',
          'At or just before the apex',
          'Only after you have fully unwound the steering',
        ],
        correctIndex: 2,
        explanation: 'At the apex, your eyes should already be on the exit. This leads the hands — you see the exit and the car naturally follows. Waiting until after the apex means you\'re reacting instead of planning.',
      },
    ],
  },
  {
    id: 'q-smooth-inputs',
    lessonId: 'l-smooth-inputs',
    title: 'Smooth Inputs Quiz',
    questions: [
      {
        id: 'si-q1',
        question: 'Why do smooth inputs result in faster lap times?',
        options: [
          'Smooth inputs reduce aerodynamic drag through corners',
          'Smooth inputs keep weight distribution stable, preventing sudden spikes that exceed grip limits',
          'Smooth inputs reduce tire temperature and extend compound life',
          'Smooth inputs confuse other drivers and are harder to predict',
        ],
        correctIndex: 1,
        explanation: 'Every input shifts weight. Smooth inputs create gradual, manageable weight transfer that keeps tires inside their grip window. Sudden inputs create spikes that can exceed the limit.',
      },
      {
        id: 'si-q2',
        question: 'A sudden jerk of the steering wheel mid-corner is most likely to cause:',
        options: [
          'Improved rotation from the resulting weight shift',
          'A momentary spike in front grip from increased load',
          'A sudden weight transfer that can push a tire outside its grip limit',
          'No effect — only brake and throttle smoothness matters',
        ],
        correctIndex: 2,
        explanation: 'Jerky steering creates an instantaneous weight spike. If that spike pushes the tire\'s demand beyond its available grip, you get a slide — usually understeer as the front washes out.',
      },
      {
        id: 'si-q3',
        question: 'Which tool best reveals whether your inputs are smooth or jerky?',
        options: [
          'Lap timer — faster laps mean smoother inputs',
          'Tire temperature display — even temps mean smooth inputs',
          'Telemetry traces showing your steering angle, brake pressure, and throttle position over time',
          'The in-car camera — visual feedback of body roll indicates input quality',
        ],
        correctIndex: 2,
        explanation: 'Telemetry traces show the exact shape of your inputs over time. Smooth inputs look like smooth curves. Jerky inputs look like jagged lines. It\'s the clearest feedback available.',
      },
    ],
  },
  {
    id: 'q-understanding-grip',
    lessonId: 'l-understanding-grip',
    title: 'Understanding Grip Quiz',
    questions: [
      {
        id: 'ug-q1',
        question: 'Grip primarily comes from:',
        options: [
          'Tire pressure being set to the correct value',
          'The tire rubber deforming and bonding with the road surface',
          'Downforce pushing the car into the road',
          'The driver\'s weight being centered in the seat',
        ],
        correctIndex: 1,
        explanation: 'Grip is a combination of mechanical interlocking (rubber deforming into road texture) and chemical bonding between rubber and asphalt. It\'s not just friction — it\'s the tire working with the surface.',
      },
      {
        id: 'ug-q2',
        question: 'What happens when you demand more from a tire than its current grip level allows?',
        options: [
          'The tire grips harder temporarily before releasing',
          'Tire temperature increases automatically to compensate',
          'The tire starts to slide — you have exceeded the friction limit',
          'ABS or traction control always prevents this in modern cars',
        ],
        correctIndex: 2,
        explanation: 'Grip has a hard limit. Ask more than the limit allows and the tire slides — there\'s no mechanism to generate more grip than is currently available. This is why feeling the limit matters.',
      },
      {
        id: 'ug-q3',
        question: 'In terms of grip, more load on a tire means:',
        options: [
          'Less grip — the tire is being asked to do more work',
          'More grip, up to a point — higher load increases the friction force available',
          'The same grip — load doesn\'t affect the friction coefficient',
          'Less grip from the heat generated by additional load',
        ],
        correctIndex: 1,
        explanation: 'More load means more deformation and more bonding — more grip, up to the tire\'s structural limit. This is why weight transfer matters: it tells you which tires currently have the most grip.',
      },
    ],
  },
  {
    id: 'q-weight-transfer',
    lessonId: 'l-weight-transfer',
    title: 'Weight Transfer Quiz',
    questions: [
      {
        id: 'wt-q1',
        question: 'Under hard braking, weight transfers to the front. What is the result?',
        options: [
          'Rear grip increases and the car becomes more stable',
          'Front grip increases and rear grip decreases',
          'Weight distributes evenly across all four tires',
          'The car becomes harder to steer because the front is overloaded',
        ],
        correctIndex: 1,
        explanation: 'Braking pushes mass forward. The front tires carry more load and have more grip. The rear tires unload and have less. This is why trail braking works — you keep that front load into the corner.',
      },
      {
        id: 'wt-q2',
        question: 'Applying throttle mid-corner while still at significant steering lock is likely to cause:',
        options: [
          'Understeer — the front washes out as weight moves rearward and unloads it',
          'Better grip from the increased rear load',
          'Neutral handling — throttle and cornering forces cancel each other out',
          'Oversteer — rear load from throttle increases rear grip excessively',
        ],
        correctIndex: 0,
        explanation: 'Throttle transfers weight rearward, unloading the front. With steering lock still applied and fronts losing grip, the car understeers — it wants to go straight. Apply throttle after the car is pointed toward the exit.',
      },
      {
        id: 'wt-q3',
        question: 'Why is understanding weight transfer the foundation of fast driving?',
        options: [
          'It helps you choose the correct tire compound for the conditions',
          'It allows you to predict how much grip each tire has at any moment',
          'It determines the optimal brake bias setting',
          'It tells you when to adjust the differential settings',
        ],
        correctIndex: 1,
        explanation: 'Weight transfer is what moves grip around the car. If you know which direction weight is moving, you know which tires are gripping and which aren\'t — and that knowledge informs every driving decision.',
      },
    ],
  },
  {
    id: 'q-grip-circle',
    lessonId: 'l-grip-circle',
    title: 'The Grip Circle Quiz',
    questions: [
      {
        id: 'gc-q1',
        question: 'What does the grip circle represent?',
        options: [
          'The maximum turning radius of a race car at speed',
          'The total grip budget a tire has, which must be shared between all forces',
          'The optimal line through a circular corner',
          'The tire contact patch shape under cornering load',
        ],
        correctIndex: 1,
        explanation: 'The grip circle shows the total available grip as a budget. You can spend it on braking, cornering, or acceleration — but the total demanded cannot exceed the circle or the tire slides.',
      },
      {
        id: 'gc-q2',
        question: 'You are braking at maximum force approaching a corner. You turn the steering wheel. What happens?',
        options: [
          'The front tires generate extra grip from the combined load',
          'The tire slides — braking at maximum means there is no budget left for cornering',
          'Nothing changes — braking and cornering forces are independent',
          'The rear tires compensate by gripping harder',
        ],
        correctIndex: 1,
        explanation: 'At maximum braking, 100% of the grip budget is committed to deceleration. Adding any cornering demand pushes total demand past 100% — the tire cannot comply and slides.',
      },
      {
        id: 'gc-q3',
        question: 'Trail braking is best described as:',
        options: [
          'Braking harder than normal to heat the tires faster',
          'Managed sharing of the grip budget between braking and cornering during corner entry',
          'Using only longitudinal force through the entire corner',
          'Exceeding the grip circle intentionally to create rotation',
        ],
        correctIndex: 1,
        explanation: 'Trail braking is about moving around the edge of the grip circle — as braking demand decreases, cornering demand increases. You stay near the maximum without exceeding it.',
      },
    ],
  },
  {
    id: 'q-understeer-oversteer',
    lessonId: 'l-understeer-oversteer',
    title: 'Understeer vs Oversteer Quiz',
    questions: [
      {
        id: 'uo-q1',
        question: 'What is understeer?',
        options: [
          'The rear tires lose grip and the car rotates past the intended line',
          'The front tires lose grip and the car pushes wide of the intended line',
          'All four tires lose grip simultaneously on a slippery surface',
          'The car turns in too sharply due to excessive front grip',
        ],
        correctIndex: 1,
        explanation: 'Understeer is a front-end grip problem. The front tires are asked for more cornering force than they have available, so they slide — the car goes straight when you want to turn.',
      },
      {
        id: 'uo-q2',
        question: 'When oversteer occurs, the immediate correct response is:',
        options: [
          'Brake firmly to transfer weight to the front and regain control',
          'Add more throttle to pull the car straight with rear traction',
          'Countersteer — turn the wheel in the direction the rear is sliding',
          'Do nothing and wait for the car to self-correct',
        ],
        correctIndex: 2,
        explanation: 'Countersteering — turning into the slide — is the correct response to oversteer. Combined with careful throttle management (not a snap or floor), it catches the rotation before it becomes a spin.',
      },
      {
        id: 'uo-q3',
        question: 'Why is correct diagnosis of understeer vs oversteer critical before attempting a fix?',
        options: [
          'The fixes involve different setup pages in the sim menu',
          'The corrections are completely different — the fix for one makes the other worse',
          'Insurance and liability differ depending on which type caused an incident',
          'Understeer requires a pit stop while oversteer can be fixed on track',
        ],
        correctIndex: 1,
        explanation: 'Treating oversteer like understeer (or vice versa) makes things worse. Adding steering input to an oversteer moment increases the rotation and spins you. Countersteering into understeer does nothing useful.',
      },
    ],
  },
  // ── Batch 3 Quizzes ────────────────────────────────────────────────────────

  {
    id: 'q-overtake-timing',
    lessonId: 'l-overtake-timing',
    title: 'When to Overtake Quiz',
    questions: [
      {
        id: 'ot-q1',
        question: 'What is the prerequisite for a legitimate overtaking move under braking?',
        options: [
          'Being faster than the car ahead by at least 5 km/h on the straight',
          'Being alongside or close to alongside before the car ahead begins braking',
          'Having fresher tires than the car you are attempting to pass',
          'Starting the braking move from at least 3 car lengths behind',
        ],
        correctIndex: 1,
        explanation: 'A pass only exists if you\'re genuinely alongside before the braking zone. Arriving at the braking point behind the car means you don\'t have a move — any attempt from there is a lunge.',
      },
      {
        id: 'ot-q2',
        question: 'You\'ve been behind a car for 5 laps and haven\'t found a clean passing opportunity. You should:',
        options: [
          'Force a move on the next lap regardless — waiting longer never helps',
          'Maintain pressure consistently — a defending driver makes mistakes and opportunities will come',
          'Back off and wait for a pit stop to separate your strategies',
          'Accept that you cannot pass and focus on your own pace',
        ],
        correctIndex: 1,
        explanation: 'Consistent pressure costs the defender time and creates mistakes. Patience with sustained pressure almost always produces a cleaner opportunity than forcing a move that wasn\'t there.',
      },
      {
        id: 'ot-q3',
        question: 'The run into a passing opportunity is created by:',
        options: [
          'Braking harder than the car ahead to create a speed differential',
          'Getting a faster corner exit on the preceding corner to carry more speed into the braking zone',
          'Using a tow from the car ahead on the straight',
          'Reducing tire pressure to increase straight-line speed',
        ],
        correctIndex: 1,
        explanation: 'The run comes from exiting the preceding corner faster. Better traction, earlier throttle, cleaner line — all of these build speed on the following straight and create the gap that makes passing possible.',
      },
    ],
  },
  {
    id: 'q-overtake-types',
    lessonId: 'l-overtake-types',
    title: 'Types of Overtakes Quiz',
    questions: [
      {
        id: 'ott-q1',
        question: 'What makes an inside pass legitimate once you are alongside?',
        options: [
          'Being faster in a straight line gives automatic right to the position',
          'The defending car must leave room for a car that is genuinely alongside',
          'The inside line always belongs to the attacking car regardless of position',
          'Contact is acceptable when attempting an inside pass',
        ],
        correctIndex: 1,
        explanation: 'Once you\'re genuinely alongside — at minimum your front axle level with their rear axle — the defending car must leave room. Closing the door on a car that\'s clearly beside you causes an incident.',
      },
      {
        id: 'ott-q2',
        question: 'The cutback pass works because:',
        options: [
          'You can brake much later on the outside of the corner',
          'The defender\'s defensive inside line gives them a slow entry and poor exit — you use a wider entry for a faster exit',
          'The outside line is always faster than the inside line',
          'You deliberately make contact to push the defender wide',
        ],
        correctIndex: 1,
        explanation: 'A defensive inside line means a slow entry and compromised exit. By taking the outside and a better exit line, you can complete the pass under acceleration rather than braking — and without fighting for the same space.',
      },
      {
        id: 'ott-q3',
        question: 'An outside pass is most likely to succeed when:',
        options: [
          'You are significantly faster on the straight leading to the corner',
          'The car ahead has made a mistake and run wide, creating space on the outside',
          'You have fresher tires and can carry more speed through the corner',
          'The outside line is the racing line at that particular corner',
        ],
        correctIndex: 1,
        explanation: 'Outside passes require the space to already exist — usually from the car ahead running wide or overcommitting to the inside on a defensive move. Manufacturing space on the outside almost never works.',
      },
    ],
  },
  {
    id: 'q-setting-up-pass',
    lessonId: 'l-setting-up-pass',
    title: 'Setting Up a Pass Quiz',
    questions: [
      {
        id: 'sup-q1',
        question: 'A passing opportunity at corner 5 is typically set up by:',
        options: [
          'Braking very late at corner 5 itself',
          'Getting a faster exit from corner 4 to build a speed run into corner 5',
          'Following the car ahead very closely through corners 3 and 4',
          'Using a different tire compound to gain straight-line speed',
        ],
        correctIndex: 1,
        explanation: 'Passes happen at the braking zone, but the run that makes the pass possible comes from the corner before. Better exit speed from corner 4 builds the gap closure that puts you alongside at corner 5.',
      },
      {
        id: 'sup-q2',
        question: 'Compromising your own line at one corner to set up a pass at the next is:',
        options: [
          'Never correct — always drive the ideal line',
          'Correct when the time gained from the pass outweighs the time lost compromising the corner',
          'Only acceptable in the final laps of a race',
          'Incorrect because it signals your intent to the car ahead',
        ],
        correctIndex: 1,
        explanation: 'Racing is a series of cost-benefit calculations. If a slightly compromised corner A produces a clean pass at corner B worth more time than was lost, the compromise is mathematically correct.',
      },
      {
        id: 'sup-q3',
        question: 'What is the value of maintaining consistent pressure on a car you cannot immediately pass?',
        options: [
          'Pressure has no tactical value — either you have a move or you don\'t',
          'Pressure forces the defender to alter their line, costs them lap time, and eventually creates errors or opportunities',
          'Pressure conserves your tires for a later attempt',
          'Pressure confuses the defender about your intentions',
        ],
        correctIndex: 1,
        explanation: 'A driver under pressure can\'t drive their optimal line — they\'re partially focused on defense. This costs them time, creates inconsistency, and eventually produces either an error or an opportunity.',
      },
    ],
  },
  {
    id: 'q-defensive-driving',
    lessonId: 'l-defensive-driving',
    title: 'Defensive Driving Quiz',
    questions: [
      {
        id: 'dd-q1',
        question: 'The one-move rule in defensive driving means:',
        options: [
          'You may make one defensive move per lap',
          'You may make one defensive move per corner — a second move becomes blocking',
          'You must make your defensive move before the halfway point of the straight',
          'You are allowed one contact incident per race without penalty',
        ],
        correctIndex: 1,
        explanation: 'One defensive move per corner — move once to cover a line, and that\'s your allocation. Moving a second time to block a car that has responded to your first move creates an unpredictable situation and is considered dangerous driving.',
      },
      {
        id: 'dd-q2',
        question: 'The most effective defensive driving is:',
        options: [
          'Reactive — wait to see where the attacking car goes, then close the gap',
          'Positional — cover the inside line before the attacking car gets a run',
          'Aggressive — use the full width of the track on every straight',
          'Predictive — brake earlier to prevent the attacking car from getting a run',
        ],
        correctIndex: 1,
        explanation: 'Positioning before the threat exists is always better than reacting after it does. Cover the inside early — before the car behind has a run — and the passing opportunity is never created.',
      },
      {
        id: 'dd-q3',
        question: 'A car is genuinely alongside you entering the braking zone. You should:',
        options: [
          'Close the door — defending your position is always legitimate',
          'Leave them room and accept the racing situation',
          'Brake very late to force them past the corner',
          'Accelerate to prevent them from completing the pass',
        ],
        correctIndex: 1,
        explanation: 'Once a car is genuinely alongside, you must leave room. Closing the door on a car that is clearly beside you is not legitimate defense — it causes contact that will typically be judged as your fault.',
      },
    ],
  },
  {
    id: 'q-letting-someone-pass',
    lessonId: 'l-letting-someone-pass',
    title: 'Letting Someone Pass Quiz',
    questions: [
      {
        id: 'lsp-q1',
        question: 'Blue flags in a race mean:',
        options: [
          'The car behind is in a different class and you may race them normally',
          'A faster car or class leader is approaching and you must yield without fighting',
          'Caution ahead — reduce speed and cover the inside',
          'You are about to be lapped and should pull into the pits',
        ],
        correctIndex: 1,
        explanation: 'Blue flags signal that a faster or leading car is approaching and you must give way. Fighting blue flags earns penalties in real racing and damages your reputation in sim racing.',
      },
      {
        id: 'lsp-q2',
        question: 'The best place to yield your position to a faster car is:',
        options: [
          'Mid-corner where you can steer wide and they can take the inside',
          'Under heavy braking so both cars slow together',
          'On a straight where you can lift and give them a clear, predictable gap',
          'Immediately when you first see them in your mirrors',
        ],
        correctIndex: 2,
        explanation: 'Yield on a straight where both cars are predictable and there is clear space. Yielding mid-corner or under braking creates unpredictable situations that risk contact.',
      },
      {
        id: 'lsp-q3',
        question: 'Fighting to hold position against a car that is clearly 2 seconds per lap faster than you is:',
        options: [
          'Correct racing — every position matters',
          'Usually the wrong calculation — you will be passed eventually and cost yourself time fighting',
          'Only wrong in the final 10 laps of a race',
          'Correct as long as you stay within the one-move rule',
        ],
        correctIndex: 1,
        explanation: 'If a car is significantly faster, you will eventually be passed regardless. Fighting it costs you time in the defense and risks an incident. A clean yield preserves your pace, your car, and your race.',
      },
    ],
  },
  {
    id: 'q-situational-awareness',
    lessonId: 'l-situational-awareness',
    title: 'Situational Awareness Quiz',
    questions: [
      {
        id: 'sa-q1',
        question: 'How often should you check your mirrors during a race?',
        options: [
          'Only when you sense a car is close behind you',
          'Every straight, as a habit — regardless of whether you think anyone is near',
          'Before every braking zone only',
          'Only when defending a position',
        ],
        correctIndex: 1,
        explanation: 'Mirror checks should be habitual — every straight, every time. Waiting until you sense something means you\'re already reacting. The goal is to always know who\'s behind you before they become a problem.',
      },
      {
        id: 'sa-q2',
        question: 'A gap to the car behind goes from 1.5s at the start of a straight to 0.8s at the braking zone. This means:',
        options: [
          'The gap is stable and no action is needed',
          'The car behind has a pace advantage and an overtake attempt is likely',
          'You should brake earlier to maintain the gap',
          'The car behind is on a warm-up lap and not racing',
        ],
        correctIndex: 1,
        explanation: 'A closing gap means the car behind is faster in this section. They\'re building a run. Expect an overtake attempt and make your defensive position decisions based on that information.',
      },
      {
        id: 'sa-q3',
        question: 'In dense traffic early in a race, your primary focus should shift toward:',
        options: [
          'Finding the perfect apex on every corner',
          'Expanding your awareness to the cars ahead and around you, accepting slightly less optimal lines',
          'Driving faster to escape the traffic as quickly as possible',
          'Staying on the racing line regardless of cars around you',
        ],
        correctIndex: 1,
        explanation: 'In traffic, the cost of an incident is very high. Slightly compromising your line for safety and awareness is always the right trade in dense, unpredictable situations.',
      },
    ],
  },
  {
    id: 'q-risk-vs-reward',
    lessonId: 'l-risk-vs-reward',
    title: 'Risk vs Reward Quiz',
    questions: [
      {
        id: 'rvr-q1',
        question: 'On lap 1 of a 60-minute race, the risk/reward calculation for a risky overtake favors:',
        options: [
          'Going for it — early position is worth fighting for',
          'Patience — the reward is low (one position, race barely started) and the risk is high (potential retirement)',
          'Going for it only if you are on the same tire compound as the car ahead',
          'Going for it because early laps have less traffic',
        ],
        correctIndex: 1,
        explanation: 'Early in a long race, each position is worth less (many opportunities remain) and the cost of an incident is very high (potential retirement ending all future opportunity). Patience has better expected value.',
      },
      {
        id: 'rvr-q2',
        question: 'Why does a race-ending incident have "infinite negative value" in risk calculations?',
        options: [
          'Because it results in an automatic license penalty',
          'Because it eliminates all future lap-by-lap opportunity in that race',
          'Because it damages relationships with other drivers permanently',
          'Because it always involves contact with another car',
        ],
        correctIndex: 1,
        explanation: 'Retirement removes every future opportunity in that race — positions you would have earned, strategies you could have executed, incidents you could have avoided. The downside is unbounded, which is why it should weigh heavily in the risk calculation.',
      },
      {
        id: 'rvr-q3',
        question: 'If you are genuinely faster than the car ahead, the best expected-value strategy is usually:',
        options: [
          'Force a pass immediately — pace advantages only last a few laps',
          'Patience — maintain pressure and take the clean opportunity when it comes',
          'Pit early to undercut on strategy',
          'Contact the car ahead to slow them and create a gap',
        ],
        correctIndex: 1,
        explanation: 'If you\'re faster, the opportunity will come. Forcing a risky move when patience would produce a clean one turns a near-certain eventual pass into an uncertain gamble. Patience is the mathematically superior choice.',
      },
    ],
  },
  {
    id: 'q-consistency',
    lessonId: 'l-consistency',
    title: 'Consistency Quiz',
    questions: [
      {
        id: 'con-q1',
        question: 'Why might a driver with a 0.5s slower average lap but consistent times beat a driver who is occasionally faster but varies by 2 seconds?',
        options: [
          'Consistent drivers receive bonus points in most race series',
          'Consistent pace allows for accurate strategy, tire management, and fewer incidents across the full stint',
          'Tire wear is always lower for consistent drivers',
          'Consistent drivers get better pit stop times',
        ],
        correctIndex: 1,
        explanation: 'Consistency enables decision-making. You can plan strategy, manage degradation, and avoid incidents. Inconsistency makes your data noise — you can\'t plan around a baseline that changes every lap.',
      },
      {
        id: 'con-q2',
        question: 'The most effective way to build consistency is:',
        options: [
          'Try to hit your theoretical best lap time every single lap',
          'Focus on one specific technique per session until it becomes automatic, then add the next',
          'Drive at 60% pace for entire sessions to build muscle memory',
          'Watch onboard footage of faster drivers and copy their inputs exactly',
        ],
        correctIndex: 1,
        explanation: 'Building skills layer by layer — making one element consistent before adding the next — is how lasting consistency is developed. Trying to push everything at once creates multiple inconsistencies simultaneously.',
      },
      {
        id: 'con-q3',
        question: 'The "90% rule" for building consistency means:',
        options: [
          'Drive at 90% throttle until you learn the track',
          'Learn where the limit is by approaching it consistently from below before trying to operate at it',
          'Use 90% braking pressure at all corners',
          'Spend 90% of practice time on one corner',
        ],
        correctIndex: 1,
        explanation: 'You can only use the limit reliably if you know exactly where it is. Find it by consistently approaching from below — not by crashing into it. Once the limit is familiar and consistent, then you push to and through it.',
      },
    ],
  },
  {
    id: 'q-beginner-mistakes',
    lessonId: 'l-beginner-mistakes',
    title: 'Common Beginner Mistakes Quiz',
    questions: [
      {
        id: 'bm-q1',
        question: 'The early apex mistake (turning in too soon) most directly causes:',
        options: [
          'Understeer at the apex from the reduced corner radius',
          'Running out of road on the exit, forcing a lift or a wide line',
          'Oversteer on entry from the weight transfer direction',
          'A blocked inside line for the car behind',
        ],
        correctIndex: 1,
        explanation: 'Turning in too early means the car is already at the inside edge before the midpoint of the corner. The exit demands a path that isn\'t there — the car runs out of road. Fix: hold the turn-in longer than feels natural.',
      },
      {
        id: 'bm-q2',
        question: 'A divebomb differs from a legitimate late-braking pass because:',
        options: [
          'A divebomb involves more speed at the braking point',
          'A divebomb means you cannot make the corner properly after the late braking — the position was never there',
          'A divebomb only occurs at slow corners',
          'A divebomb requires contact to complete',
        ],
        correctIndex: 1,
        explanation: 'A legitimate pass means braking later but still making the corner cleanly. A divebomb means braking so late the corner is physically impossible — you\'re using the other car as a stopping point, which is dangerous and not a real pass.',
      },
      {
        id: 'bm-q3',
        question: 'Why does "trying harder" to go faster often result in going slower?',
        options: [
          'Physical tension in the body increases reaction time',
          'Trying harder leads to more aggressive inputs, which exceed grip limits and cause more mistakes',
          'Higher mental effort reduces the ability to process visual information',
          'Trying harder always works — the problem is trying in the wrong areas',
        ],
        correctIndex: 1,
        explanation: 'Trying harder usually means bigger, more aggressive inputs — which cause weight spikes, overshoot grip limits, and create the very mistakes you\'re trying to avoid. Technique is the path to speed, not effort.',
      },
    ],
  },

  // ── Batch 2 Quizzes ────────────────────────────────────────────────────────

  {
    id: 'q-braking-points',
    lessonId: 'l-braking-points',
    title: 'Braking Points Quiz',
    questions: [
      {
        id: 'bp-q1',
        question: 'Why must a braking point be tied to a visual reference marker rather than feel?',
        options: [
          'Reference markers are required by racing regulations',
          'Feel varies lap to lap — a fixed marker is consistent and repeatable',
          'Visual markers help you brake earlier for safety',
          'Feel is unreliable only in wet conditions',
        ],
        correctIndex: 1,
        explanation: 'Braking by feel introduces lap-to-lap variation. A fixed visual reference — a board, post, or track feature — gives you the same trigger every lap, enabling consistency.',
      },
      {
        id: 'bp-q2',
        question: 'When finding your braking point on a new circuit, you should:',
        options: [
          'Start at the latest possible point and work backwards',
          'Match the braking points of the fastest AI driver',
          'Start conservative and move the point later in small increments',
          'Use the same braking point from a similar circuit as a starting point',
        ],
        correctIndex: 2,
        explanation: 'Always start conservative. You can always move a braking point later — you can\'t un-crash from braking too late on an unfamiliar circuit. Move it in small steps and confirm each change over several laps.',
      },
      {
        id: 'bp-q3',
        question: 'As tire wear increases through a stint, you should generally:',
        options: [
          'Brake later — worn tires generate more heat and grip',
          'Keep the exact same braking point throughout the stint',
          'Brake slightly earlier — worn tires have less grip',
          'Only adjust braking points in wet conditions',
        ],
        correctIndex: 2,
        explanation: 'Worn tires have less grip and longer stopping distances. Moving the braking point slightly earlier compensates and keeps the car\'s behavior predictable as the stint progresses.',
      },
    ],
  },
  {
    id: 'q-threshold-braking',
    lessonId: 'l-threshold-braking',
    title: 'Threshold Braking Quiz',
    questions: [
      {
        id: 'thb-q1',
        question: 'Threshold braking means:',
        options: [
          'Braking as hard as possible regardless of lock-up',
          'Braking at maximum deceleration without the wheels locking',
          'Braking at 80% pressure to leave a safety margin',
          'Braking progressively from light to heavy over the entire braking zone',
        ],
        correctIndex: 1,
        explanation: 'Threshold braking targets the maximum deceleration available without crossing into lock-up. A locked wheel is slower than a threshold-braking rolling wheel.',
      },
      {
        id: 'thb-q2',
        question: 'Why is a locked wheel slower than a wheel at the braking threshold?',
        options: [
          'A locked wheel generates more heat and reduces tire compound life',
          'A rolling tire at maximum friction decelerates faster than a sliding tire',
          'A locked wheel creates aerodynamic drag that increases stopping distance',
          'Lock-up triggers ABS which reduces braking force',
        ],
        correctIndex: 1,
        explanation: 'A rolling tire at threshold generates more friction force than a sliding tire. Sliding rubber on asphalt has a lower friction coefficient than a tire at the edge of rolling grip.',
      },
      {
        id: 'thb-q3',
        question: 'How should the initial brake application feel when using threshold braking?',
        options: [
          'Very gradual — ease in from zero to avoid any instability',
          'Firm and quick — build to target pressure fast, not a slow progressive squeeze',
          'Full pressure immediately then reduce as speed drops',
          'Medium pressure throughout the entire braking zone',
        ],
        correctIndex: 1,
        explanation: 'A slow initial squeeze wastes the early part of the braking zone. The pedal should be pressed firmly and quickly to threshold. Then held and modulated from there.',
      },
    ],
  },
  {
    id: 'q-brake-release',
    lessonId: 'l-brake-release',
    title: 'Brake Release Quiz',
    questions: [
      {
        id: 'br-q1',
        question: 'What happens when the brakes are released abruptly rather than progressively at corner entry?',
        options: [
          'The car gains extra rotation from the sudden weight shift',
          'Weight transfers forward in a spike, unbalancing the car at the worst moment',
          'The rear tires regain grip faster due to the sudden unloading',
          'Nothing significant — release speed only matters under trail braking',
        ],
        correctIndex: 1,
        explanation: 'An abrupt release throws weight forward suddenly, creating a spike in load on the fronts and a sudden unloading of the rears. This can cause understeer, oversteer, or just a generally unsettled car at turn-in.',
      },
      {
        id: 'br-q2',
        question: 'During trail braking, what should the brake trace look like on telemetry?',
        options: [
          'Full pressure held constant until the apex, then instant release',
          'A smooth, straight line decreasing from peak pressure to zero at the apex',
          'Quick release to 50%, held constant, then final release at the apex',
          'No brake pressure past the turn-in point',
        ],
        correctIndex: 1,
        explanation: 'The ideal trail braking trace is a straight, smooth line from peak pressure down to zero. Steps, holds, or abrupt drops are all errors that cause weight spikes.',
      },
      {
        id: 'br-q3',
        question: 'During a straight-line stop, why should you ease off the brakes as the car slows?',
        options: [
          'To preserve brake pad life near the end of the stop',
          'Grip available changes as speed drops — holding full pressure at low speed causes lock-up',
          'ABS requires reduced pressure inputs at low speed to function correctly',
          'Rear brake bias increases at low speed, requiring less front pedal pressure',
        ],
        correctIndex: 1,
        explanation: 'As speed drops, aerodynamic downforce reduces and the dynamics change. Holding peak threshold pressure all the way to low speed typically causes lock-up. Progressive release matches the changing conditions.',
      },
    ],
  },
  {
    id: 'q-late-braking',
    lessonId: 'l-late-braking',
    title: 'Late Braking Quiz',
    questions: [
      {
        id: 'lb-q1',
        question: 'When does late braking actually gain lap time?',
        options: [
          'Always — later braking means more speed at entry which equals faster laps',
          'Only when combined with trail braking technique',
          'When you can still hit the apex and achieve a clean exit from the later point',
          'Late braking never gains lap time — it only works as a passing move',
        ],
        correctIndex: 2,
        explanation: 'Late braking only gains time if the rest of the corner — apex and exit — remains uncompromised. Braking later but missing the apex or ruining the exit loses more time than was saved.',
      },
      {
        id: 'lb-q2',
        question: 'What is the difference between a clean late-braking overtake and a divebomb?',
        options: [
          'A divebomb is faster — it uses the other car as a natural stopping point',
          'A clean overtake means you can make the apex after the late braking; a divebomb means you cannot',
          'A divebomb is only acceptable if you make contact with the other car\'s front wing',
          'There is no difference — both are valid racing moves',
        ],
        correctIndex: 1,
        explanation: 'A legitimate late-braking overtake means you\'ve braked later but can still make the apex. A divebomb means you\'ve braked so late the corner is impossible — you\'re relying on the other driver to avoid you.',
      },
      {
        id: 'lb-q3',
        question: 'Before exploring a later braking point, you should first:',
        options: [
          'Find the absolute limit by braking as late as possible each lap',
          'Watch reference onboard footage to copy another driver\'s point exactly',
          'Have a consistent, owned braking point that you can hit reliably lap after lap',
          'Reduce tire pressure to increase the stopping grip available',
        ],
        correctIndex: 2,
        explanation: 'You can only meaningfully explore a later point if you have something consistent to compare it against. Searching for a later point without owning your current one just creates inconsistency.',
      },
    ],
  },
  {
    id: 'q-racing-line',
    lessonId: 'l-racing-line',
    title: 'Racing Line Quiz',
    questions: [
      {
        id: 'rl-q1',
        question: 'Why does the racing line maximize cornering speed?',
        options: [
          'It keeps the car closer to the barrier which reduces aerodynamic drag',
          'It maximizes the radius of the arc the car travels, reducing the cornering force required',
          'It minimizes the total distance traveled through the corner',
          'It positions the car for the best view of upcoming corners',
        ],
        correctIndex: 1,
        explanation: 'A larger arc radius means less lateral force needed to maintain it — so more speed is possible for the same tire grip. The racing line uses the full track width to create the largest possible radius.',
      },
      {
        id: 'rl-q2',
        question: 'The defensive line differs from the ideal line because:',
        options: [
          'It is always faster due to the shorter distance traveled',
          'It covers the inside of the corner, denying the following car access — but is typically slower',
          'It uses the outside of the corner to maintain vision of cars behind',
          'It is the same line — there is no difference in racing',
        ],
        correctIndex: 1,
        explanation: 'The defensive line positions the car on the inside, cutting off the passing opportunity. It\'s slower than the ideal line — a deliberate trade of pace for position.',
      },
      {
        id: 'rl-q3',
        question: 'What is the cost of turning in earlier than the correct turn-in point?',
        options: [
          'Increased entry speed which can cause understeer',
          'An early apex that runs out of road on the exit, forcing a lift or wide exit',
          'Reduced visibility to the inside of the corner',
          'Earlier apex contact which adds tire wear',
        ],
        correctIndex: 1,
        explanation: 'Turning in too early leads to an early apex. With the car already at the inside of the corner, the only way out is straight ahead — which runs out of road. You\'re forced wide or forced to lift.',
      },
    ],
  },
  {
    id: 'q-apex-types',
    lessonId: 'l-apex-types',
    title: 'Apex Types Quiz',
    questions: [
      {
        id: 'at-q1',
        question: 'Why is the late apex usually faster than the geometric apex before a long straight?',
        options: [
          'A late apex means higher entry speed into the corner',
          'A late apex allows the car to be more pointed at the exit earlier, enabling earlier throttle application',
          'A late apex reduces the total distance traveled through the corner',
          'A late apex puts less load on the front tires during entry',
        ],
        correctIndex: 1,
        explanation: 'With a late apex, the car is already pointed toward the exit by the time the apex is reached. Throttle can begin earlier and with less steering lock — which means more exit speed carried down the straight.',
      },
      {
        id: 'at-q2',
        question: 'An early apex almost always results in:',
        options: [
          'Faster exit speed from the increased entry momentum',
          'Running out of road on the exit and being forced wide or to lift',
          'Better tire loading from the tighter cornering arc',
          'Earlier braking points on subsequent laps',
        ],
        correctIndex: 1,
        explanation: 'An early apex means the car is at the inside edge before the corner\'s midpoint. The exit demands a wide path that runs out of road — either the car goes wide or the driver lifts to avoid it.',
      },
      {
        id: 'at-q3',
        question: 'In a chicane or complex section, the apex of the first element is determined by:',
        options: [
          'The geometric midpoint of the first element in isolation',
          'Whatever gives the best entry speed into the first element',
          'What positions the car best for the exit of the second (final) element',
          'The same late-apex rule applied individually to each element',
        ],
        correctIndex: 2,
        explanation: 'The last corner before the straight is the priority. The apex of the first element in a complex is compromised — set wherever it best positions the car for a clean exit from the final element.',
      },
    ],
  },
  {
    id: 'q-corner-phases',
    lessonId: 'l-corner-phases',
    title: 'Corner Phases Quiz',
    questions: [
      {
        id: 'cp-q1',
        question: 'What is the primary job during the entry phase of a corner?',
        options: [
          'Achieving maximum entry speed before the apex',
          'Applying throttle to load the rear tires for rotation',
          'Getting the car to the apex at the right speed, pointed toward the exit',
          'Positioning the car on the defensive line',
        ],
        correctIndex: 2,
        explanation: 'Entry is about arriving at the apex correctly — right speed, right attitude. The car should be slowing, rotating, and arriving at the apex pointed toward the exit ready to begin the throttle phase.',
      },
      {
        id: 'cp-q2',
        question: 'The exit phase is considered most important for lap time because:',
        options: [
          'It determines the braking point for the next corner',
          'Exit speed is carried down the following straight, multiplying over distance',
          'Exit is where most accidents happen and safe exits protect the car',
          'Exit determines tire wear which affects the rest of the stint',
        ],
        correctIndex: 1,
        explanation: 'Every km/h at corner exit is carried for the entire length of the following straight. A 5 km/h advantage at exit translates to a 5 km/h advantage for hundreds of meters — easily a full second over a lap.',
      },
      {
        id: 'cp-q3',
        question: 'A driver makes an entry mistake and arrives at the apex too fast. The correct response is:',
        options: [
          'Add more steering lock to force the apex',
          'Brake sharply at the apex to scrub the excess speed',
          'Accept a slightly compromised exit but avoid making it worse with aggressive corrections',
          'Accelerate hard through the exit to compensate for the entry error',
        ],
        correctIndex: 2,
        explanation: 'When an entry error happens, aggressive corrections usually make it worse. Accepting the compromised exit smoothly is better than a panicked reaction that adds more instability. Recognize it, minimize it, and move on.',
      },
    ],
  },
  {
    id: 'q-slow-in-fast-out',
    lessonId: 'l-slow-in-fast-out',
    title: 'Slow In, Fast Out Quiz',
    questions: [
      {
        id: 'sifo-q1',
        question: 'Why does exit speed matter more than entry speed before a long straight?',
        options: [
          'Entry speed is limited by regulations in most race series',
          'Exit speed is carried for the full length of the straight — it compounds over distance',
          'Entry speed damages tires more due to higher cornering forces',
          'Exit speed determines pit stop strategy timing',
        ],
        correctIndex: 1,
        explanation: 'Entry speed disappears into the corner. Exit speed is maintained down the straight — every km/h of exit speed advantage is held for potentially hundreds of meters, making it worth far more than equivalent entry speed.',
      },
      {
        id: 'sifo-q2',
        question: 'A driver brakes 10 meters earlier than normal but exits the corner 8 km/h faster. This is:',
        options: [
          'A mistake — braking earlier always loses time',
          'Break-even — the entry loss and exit gain cancel out',
          'A net gain — the exit speed advantage over the straight more than compensates',
          'Only beneficial on straights longer than 1km',
        ],
        correctIndex: 2,
        explanation: 'Even a small exit speed gain over a long straight easily outweighs a slightly earlier braking point. The math strongly favors exit speed optimization in almost every scenario with a meaningful straight following.',
      },
      {
        id: 'sifo-q3',
        question: 'A simple test for whether your corner entry was correct is:',
        options: [
          'Did you hit the apex? If yes, the entry was correct',
          'Were you at full throttle within two car lengths of the apex?',
          'Did your lap time improve versus the previous lap?',
          'Was your entry speed higher than the previous lap?',
        ],
        correctIndex: 1,
        explanation: 'If you can get to full throttle very shortly after the apex, your entry speed was correct. If you\'re still not at full throttle well past the apex and down the straight, your entry was too fast — you\'re carrying the cost.',
      },
    ],
  },

  {
    id: 'q-trail-braking-basics',
    lessonId: 'l-trail-braking-basics',
    title: 'Trail Braking Basics Quiz',
    questions: [
      {
        id: 'tb-q1',
        question: 'What does trail braking mean?',
        options: [
          'Braking as hard as possible and fully releasing before the turn-in point',
          'Carrying decreasing brake pressure past turn-in and through corner entry',
          'Using only the rear brakes to create rotation on corner entry',
          'Following the car ahead\'s braking points to set your reference markers',
        ],
        correctIndex: 1,
        explanation: 'Trail braking means the brakes are still partially applied as you begin turning. The pressure decreases — trails off — progressively until you\'re fully off at the apex.',
      },
      {
        id: 'tb-q2',
        question: 'Trail braking loads the front tires during corner entry. Why is this beneficial?',
        options: [
          'It generates heat in the front brakes, improving stopping power',
          'More front load means more front grip at the moment you need the front tires to turn the car',
          'It reduces corner entry speed enough to allow early throttle application',
          'The brake pressure creates additional downforce over the front axle',
        ],
        correctIndex: 1,
        explanation: 'Weight on the front tires means grip. Trail braking keeps that weight on the fronts during the phase when they need to work hardest — corner entry — which improves both grip and rotation.',
      },
      {
        id: 'tb-q3',
        question: 'Holding too much brake pressure too far into the corner during trail braking is most likely to cause:',
        options: [
          'Understeer — the front locks and the car goes straight',
          'Oversteer — the rear unloads and steps out',
          'Better rotation — more brake means more weight transfer',
          'No effect — brake pressure does not affect rear grip',
        ],
        correctIndex: 1,
        explanation: 'Excessive trail braking overloads the front and heavily unloads the rear. The rear tires have almost no weight on them and lose grip — the car rotates into oversteer, potentially a spin.',
      },
    ],
  },
]
