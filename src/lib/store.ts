import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, LessonDraft } from '@/types'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
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
    }),
    { name: 'clays-handbook-store' }
  )
)
