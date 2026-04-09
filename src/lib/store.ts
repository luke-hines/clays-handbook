import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, LessonDraft, Lesson } from '@/types'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      drafts: [],

      addDraft: (draft: LessonDraft) =>
        set((state) => ({ drafts: [draft, ...state.drafts] })),

      updateDraft: (id: string, updates: Partial<LessonDraft>) =>
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
          ),
        })),

      deleteDraft: (id: string) =>
        set((state) => ({ drafts: state.drafts.filter((d) => d.id !== id) })),

      // ── Video URLs ────────────────────────────────────────────────────────────
      videoUrls: {},

      setVideoUrl: (lessonId: string, url: string) =>
        set((state) => ({ videoUrls: { ...state.videoUrls, [lessonId]: url } })),

      removeVideoUrl: (lessonId: string) =>
        set((state) => {
          const next = { ...state.videoUrls }
          delete next[lessonId]
          return { videoUrls: next }
        }),

      // ── Learner progress ─────────────────────────────────────────────────────
      visitedLessonIds: [],
      completedLessonIds: [],
      quizScores: {},

      markVisited: (lessonId: string) =>
        set((state) => ({
          visitedLessonIds: state.visitedLessonIds.includes(lessonId)
            ? state.visitedLessonIds
            : [lessonId, ...state.visitedLessonIds],
        })),

      markCompleted: (lessonId: string) =>
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(lessonId)
            ? state.completedLessonIds
            : [...state.completedLessonIds, lessonId],
        })),

      saveQuizScore: (lessonId: string, score: number) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [lessonId]: Math.max(score, state.quizScores[lessonId] ?? 0),
          },
        })),

      // ── Bookmarks ─────────────────────────────────────────────────────────────
      bookmarkedLessonIds: [],

      toggleBookmark: (lessonId: string) =>
        set((state) => ({
          bookmarkedLessonIds: state.bookmarkedLessonIds.includes(lessonId)
            ? state.bookmarkedLessonIds.filter((id) => id !== lessonId)
            : [...state.bookmarkedLessonIds, lessonId],
        })),

      // ── Lesson notes ──────────────────────────────────────────────────────────
      lessonNotes: {},

      setLessonNote: (lessonId: string, note: string) =>
        set((state) => ({
          lessonNotes: { ...state.lessonNotes, [lessonId]: note },
        })),

      // ── Published lessons ─────────────────────────────────────────────────────
      publishedLessons: [],

      publishDraft: (draftId: string, overrides?: { emoji?: string; conceptIds?: string[] }) => {
        const { drafts } = get()
        const draft = drafts.find((d) => d.id === draftId)
        if (!draft) return

        const slug = (draft.generatedTitle ?? draft.topic)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')

        const lesson: Lesson = {
          id: `published-${draftId}`,
          slug,
          title: draft.generatedTitle ?? draft.topic,
          summary: draft.generatedSummary ?? draft.goal,
          pillar: draft.pillar,
          category: draft.category,
          difficulty: draft.difficulty,
          keyTakeaways: draft.generatedTakeaways ?? [],
          body: draft.generatedBody ?? '',
          thumbnailColor: draft.pillar === 'racing' ? '#1a0a0a' : '#0a101a',
          emoji: overrides?.emoji?.trim() || (draft.pillar === 'racing' ? 'Flag' : 'Wrench'),
          conceptIds: overrides?.conceptIds ?? [],
          diagramIds: [],
          relatedLessonIds: [],
          publishedAt: new Date().toISOString(),
          createdAt: draft.createdAt,
        }

        set((state) => ({
          publishedLessons: [lesson, ...state.publishedLessons],
          drafts: state.drafts.map((d) =>
            d.id === draftId ? { ...d, status: 'published', updatedAt: new Date().toISOString() } : d
          ),
        }))
      },
    }),
    { name: 'clays-handbook-store' }
  )
)
