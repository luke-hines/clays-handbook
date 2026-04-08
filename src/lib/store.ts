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

      // ── Published lessons ─────────────────────────────────────────────────────
      publishedLessons: [],

      publishDraft: (draftId: string) => {
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
          emoji: draft.pillar === 'racing' ? 'Flag' : 'Wrench',
          conceptIds: [],
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
