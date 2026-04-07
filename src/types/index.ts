// ─── Core enums ───────────────────────────────────────────────────────────────

export type Pillar = 'racing' | 'car'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type RacingCategory =
  | 'racecraft'
  | 'braking'
  | 'cornering'
  | 'overtaking'
  | 'defense'
  | 'sim-technique'
  | 'strategy'

export type CarCategory =
  | 'suspension'
  | 'brakes'
  | 'drivetrain'
  | 'tires'
  | 'aerodynamics'
  | 'engine'
  | 'setup'

export type LessonCategory = RacingCategory | CarCategory

// ─── Concept (glossary term) ──────────────────────────────────────────────────

export interface Concept {
  id: string
  slug: string
  title: string
  summary: string            // one sentence
  body: string               // full explanation (markdown)
  pillar: Pillar
  relatedConceptIds: string[]
  diagramId?: string
  createdAt: string
}

// ─── Diagram ──────────────────────────────────────────────────────────────────

export interface Diagram {
  id: string
  title: string
  description: string
  imageUrl?: string
  svgContent?: string        // inline SVG for custom diagrams
  lessonId?: string
  conceptId?: string
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string
  question: string
  options: string[]          // 4 options
  correctIndex: number       // 0-3
  explanation: string        // shown after answering
}

export interface Quiz {
  id: string
  lessonId: string
  title: string
  questions: QuizQuestion[]
}

// ─── Lesson ───────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string
  slug: string
  title: string
  summary: string            // 1-2 sentences
  pillar: Pillar
  category: LessonCategory
  difficulty: Difficulty
  keyTakeaways: string[]     // 3-5 bullet points
  body: string               // markdown content
  videoUrl?: string
  thumbnailUrl?: string
  thumbnailColor: string     // fallback bg color
  emoji: string
  conceptIds: string[]       // inline linked concepts
  diagramIds: string[]
  quizId?: string
  relatedLessonIds: string[]
  moduleId?: string
  publishedAt: string
  createdAt: string
  isFeatured?: boolean
}

// ─── Module ───────────────────────────────────────────────────────────────────

export interface Module {
  id: string
  slug: string
  title: string
  description: string
  pillar: Pillar
  lessonIds: string[]
  emoji: string
  color: string
}

// ─── Lesson Draft (creator side) ─────────────────────────────────────────────

export type DraftStatus = 'draft' | 'reviewing' | 'published'

export interface LessonDraft {
  id: string
  topic: string
  pillar: Pillar
  category: LessonCategory
  difficulty: Difficulty
  goal: string

  // Generated output
  generatedTitle?: string
  generatedSummary?: string
  generatedTakeaways?: string[]
  generatedBody?: string
  generatedGlossarySuggestions?: string[]
  generatedQuizQuestions?: QuizQuestion[]
  generatedDiagramSuggestions?: string[]
  generatedRecordingBrief?: string
  generatedScriptOutline?: string

  status: DraftStatus
  createdAt: string
  updatedAt: string
}

// ─── Store ────────────────────────────────────────────────────────────────────

export interface AppState {
  drafts: LessonDraft[]
  addDraft: (draft: LessonDraft) => void
  updateDraft: (id: string, updates: Partial<LessonDraft>) => void
  deleteDraft: (id: string) => void
}
