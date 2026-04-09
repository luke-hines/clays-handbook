import Anthropic from '@anthropic-ai/sdk'
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

export async function generateDraft(input: GenerateInput): Promise<GenerateOutput> {
  const { topic, pillar, category, difficulty, goal } = input
  const dl = DIFF_LABEL[difficulty]
  const ctx = PILLAR_CONTEXT[pillar]
  const t = topic.trim()

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set. Add it to your .env.local file.')
  }

  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  const prompt = `You are an expert content creator for Clay's Handbook — a racing and car knowledge education platform. The tone is direct, experienced, and honest — like paddock conversation between guys who actually know what they're talking about. Not a lecture. Not a blog. Functional and fast.

Generate a complete lesson draft for this brief:

Topic: ${t}
Pillar: ${pillar === 'racing' ? 'Racing' : 'Car Knowledge'}
Category: ${category}
Difficulty: ${difficulty} (targeting ${dl} drivers/enthusiasts)
Learning Goal: ${goal}
Context: ${ctx}

Return ONLY a valid JSON object. No markdown fences, no explanation before or after. Just the JSON.

{
  "generatedTitle": "string — sharp, specific lesson title",
  "generatedSummary": "string — 1-2 sentences: what this delivers and why it matters for ${dl} drivers",
  "generatedTakeaways": [
    "string — specific, actionable takeaway (no placeholders)",
    "string",
    "string",
    "string",
    "string"
  ],
  "generatedBody": "string — full lesson body in markdown. Use ## headings for sections: What is [topic], Why it matters, The common mistakes, How to practice this. Write real content — no [placeholder] text. Be specific about ${t} ${ctx}.",
  "generatedGlossarySuggestions": ["string", "string", "string", "string", "string"],
  "generatedQuizQuestions": [
    {
      "id": "gen-q1",
      "question": "string — specific question about ${t}",
      "options": ["string — correct answer", "string — plausible wrong", "string — common misconception", "string — partially right but misses the point"],
      "correctIndex": 0,
      "explanation": "string — why option A is correct and where B/C go wrong"
    },
    {
      "id": "gen-q2",
      "question": "string — different angle on ${t}",
      "options": ["string — correct answer", "string — plausible wrong", "string — common misconception", "string — partially right but misses the point"],
      "correctIndex": 0,
      "explanation": "string — clear, direct explanation"
    }
  ],
  "generatedRecordingBrief": "string — multi-line recording brief with target runtime (6-10 min), tone notes, and a 7-part structure using \\n for newlines",
  "generatedScriptOutline": "string — multi-line script outline: INTRO, SECTION 1-4, OUTRO using \\n for newlines"
}

Write actual content about ${t}. No placeholders, no brackets, no "e.g." — real substance that ${dl} drivers will find useful.`

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = response.content.find(b => b.type === 'text')?.text ?? ''

  // Strip markdown fences if present
  const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()

  // Extract JSON object
  const jsonStart = stripped.indexOf('{')
  const jsonEnd = stripped.lastIndexOf('}')
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Claude did not return valid JSON. Try again.')
  }

  const parsed = JSON.parse(stripped.slice(jsonStart, jsonEnd + 1))
  return parsed as GenerateOutput
}
