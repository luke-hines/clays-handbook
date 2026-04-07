import type { Pillar, Difficulty, LessonCategory, QuizQuestion } from '@/types'

export interface GenerateInput {
  topic: string
  pillar: Pillar
  category: LessonCategory
  difficulty: Difficulty
  goal: string
}

export interface GenerateOutput {
  generatedTitle: string
  generatedSummary: string
  generatedTakeaways: string[]
  generatedBody: string
  generatedGlossarySuggestions: string[]
  generatedQuizQuestions: QuizQuestion[]
  generatedRecordingBrief: string
  generatedScriptOutline: string
}

const DIFF_LABEL: Record<Difficulty, string> = {
  beginner: 'first-time',
  intermediate: 'developing',
  advanced: 'experienced',
}

const PILLAR_CONTEXT: Record<Pillar, string> = {
  racing: 'on track and in sim racing',
  car: 'in terms of car setup and mechanics',
}

export function generateDraft(input: GenerateInput): GenerateOutput {
  const { topic, pillar, category, difficulty, goal } = input
  const dl = DIFF_LABEL[difficulty]
  const ctx = PILLAR_CONTEXT[pillar]
  const t = topic.trim()

  return {
    generatedTitle: t,

    generatedSummary:
      `What ${t.toLowerCase()} actually means ${ctx}, and why it's a turning point for ${dl} drivers. ${goal}.`,

    generatedTakeaways: [
      `${t} is about [core principle] — not just [common misconception drivers have]`,
      `The key variable is [X] — everything else follows from getting that right`,
      `The most common mistake is [mistake] — and it's slower because [reason]`,
      `In sim racing specifically, [sim-specific note] — the physics are honest`,
      `Practice drill: [exercise] — three deliberate laps beats thirty accidental ones`,
    ],

    generatedBody: [
      `## What is ${t}?`,
      `${t} is one of those concepts that sounds straightforward but takes time to feel in the car. The principle is simple — the execution is where most ${dl} drivers leave time on the table.`,
      `## Why it matters`,
      `Understanding ${t.toLowerCase()} properly changes how you approach [specific situation]. This applies ${ctx}, and it's one of the highest-leverage areas you can work on at this stage.`,
      `The reason it's so impactful is [mechanical/physics reason]. When you get it right, [positive outcome]. When you don't, [failure mode] — and most drivers don't notice they're doing it wrong.`,
      `## The common mistakes`,
      `Most ${dl} drivers approach this by [common incorrect approach]. The result is [negative consequence]. The fix isn't complex — it's [fix] — but it requires deliberate practice.`,
      `## How to practice this`,
      `Pick a single corner and work [specific element] for an entire session. Don't worry about lap time. Focus on [feel/data indicator]. After 10-15 minutes you'll feel the difference, and the lap time will follow.`,
    ].join('\n\n'),

    generatedGlossarySuggestions: [
      t,
      'Weight Transfer',
      'Grip Limit',
      pillar === 'racing' ? 'Apex' : 'Setup Balance',
      pillar === 'racing' ? 'Trail Braking' : 'Brake Bias',
    ],

    generatedQuizQuestions: [
      {
        id: 'gen-q1',
        question: `What is the primary purpose of ${t.toLowerCase()} in a ${pillar === 'racing' ? 'race scenario' : 'car setup context'}?`,
        options: [
          `[Correct answer — the actual purpose]`,
          `[Common misconception — sounds plausible but wrong]`,
          `[Partially correct — gets the surface right but misses the point]`,
          `[Unrelated — plausible but clearly off-topic on reflection]`,
        ],
        correctIndex: 0,
        explanation: `The correct answer is the first option because [reason tied directly to the concept]. Options B and C are common confusions — ${t.toLowerCase()} isn't about [misconception], it's about [core truth].`,
      },
      {
        id: 'gen-q2',
        question: `When ${t.toLowerCase()} is applied incorrectly, what is the most likely result?`,
        options: [
          `[Most likely failure outcome]`,
          `[Secondary failure — also bad, but less direct]`,
          `[No effect — wrong, but drivers sometimes assume this]`,
          `[Counterintuitive outcome — sounds like it could be right]`,
        ],
        correctIndex: 0,
        explanation: `The failure mode is [outcome] because [mechanical reason]. Recognizing this in the data or by feel is the first step to correcting it.`,
      },
    ] as QuizQuestion[],

    generatedRecordingBrief: [
      `**Topic:** ${t}`,
      `**Pillar:** ${pillar === 'racing' ? 'Racing' : 'Car Knowledge'} — ${category}`,
      `**Difficulty:** ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
      `**Target runtime:** 6–10 minutes`,
      `**Tone:** Direct, experienced. Paddock conversation — not a lecture.`,
      ``,
      `**Opening hook:** Start with the problem. What goes wrong when drivers don't understand this? Make them feel it before you explain it.`,
      ``,
      `**Suggested structure:**`,
      `1. The problem / hook (60s)`,
      `2. What ${t} actually is — one clear sentence (45s)`,
      `3. Why it changes things — the physics or logic (90s)`,
      `4. The common mistake and why it's slower (2min)`,
      `5. The fix — concrete, actionable (2min)`,
      `6. Practice drill — what to do next session (60s)`,
      `7. Recap — three bullets (30s)`,
      ``,
      `**Things to avoid:** Don't be vague. Don't say "it depends" without following up. Don't assume they know [related concept] — link to the glossary instead.`,
    ].join('\n'),

    generatedScriptOutline: [
      `**INTRO**`,
      `"So ${t.toLowerCase()} — most ${dl} drivers have heard the term. But there's a gap between knowing what it is and actually using it. Today we're closing that gap."`,
      ``,
      `**SECTION 1 — The Core Concept**`,
      `— Define it in one clean sentence`,
      `— Contrast with what drivers assume it means`,
      `— "Here's the simplest way to think about it..."`,
      ``,
      `**SECTION 2 — Why It Changes Your Lap**`,
      `— The physics or mechanical reason (keep it brief)`,
      `— What it feels like when you get it right`,
      `— Data point or visual if recording a sim session`,
      ``,
      `**SECTION 3 — The Mistake**`,
      `— Walk through what most ${dl} drivers do`,
      `— Show or describe the result (lap time, feel, data)`,
      `— "This is why you're losing [time/traction/whatever] — and you don't even know it"`,
      ``,
      `**SECTION 4 — The Fix**`,
      `— Concrete technique or adjustment`,
      `— Step by step if needed`,
      `— One drill they can run next session`,
      ``,
      `**OUTRO**`,
      `"Next time you're in the sim, pick one corner and work this deliberately. Three focused laps will teach you more than thirty where you're not thinking about it."`,
    ].join('\n'),
  }
}
