import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MOCK_LESSONS } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import LessonCard from '@/components/learner/LessonCard'
import { Flag, Wrench, Search, BookOpen } from 'lucide-react'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import type { Pillar, Difficulty } from '@/types'

const PILLARS: { value: Pillar | 'all'; label: string; icon?: React.ReactNode }[] = [
  { value: 'all', label: 'All' },
  { value: 'racing', label: 'Racing', icon: <Flag size={12} /> },
  { value: 'car', label: 'Car Knowledge', icon: <Wrench size={12} /> },
]

const DIFFICULTIES: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'All levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

function FilterBtn({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        border: '1px solid',
        cursor: 'pointer',
        transition: 'all 0.15s',
        borderColor: active ? (color ?? 'var(--text-secondary)') : 'var(--border)',
        background: active ? `${color ? color + '18' : 'var(--surface-2)'}` : 'transparent',
        color: active ? (color ?? 'var(--text)') : 'var(--text-secondary)',
      }}
    >
      {children}
    </button>
  )
}

export default function LessonsPage() {
  const [loading, done] = usePageLoader(360)
  const [searchParams] = useSearchParams()
  const initialPillar = (searchParams.get('pillar') as Pillar | null) ?? 'all'

  const [pillar, setPillar] = useState<Pillar | 'all'>(initialPillar)
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [search, setSearch] = useState('')
  const publishedLessons = useAppStore(s => s.publishedLessons)
  const allLessons = useMemo(() => [...MOCK_LESSONS, ...publishedLessons], [publishedLessons])

  const filtered = useMemo(() => {
    return allLessons.filter(l => {
      if (pillar !== 'all' && l.pillar !== pillar) return false
      if (difficulty !== 'all' && l.difficulty !== difficulty) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.category.includes(q)
        )
      }
      return true
    })
  }, [pillar, difficulty, search, allLessons])

  if (loading) return <PageLoader icon={<BookOpen size={30} />} label="Lessons" color="#E8322A" duration={360} onDone={done} />
  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '40px 24px 28px',
          background: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Library
          </p>
          <h1 style={{ margin: '0 0 24px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Lessons
          </h1>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 360, marginBottom: 20 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex' }}>
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 8,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface-2)',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--text-tertiary)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
            />
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {PILLARS.map(p => (
                <FilterBtn
                  key={p.value}
                  active={pillar === p.value}
                  onClick={() => setPillar(p.value)}
                  color={p.value === 'racing' ? '#E8322A' : p.value === 'car' ? '#4A9EDB' : undefined}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    {p.icon}{p.label}
                  </span>
                </FilterBtn>
              ))}
            </div>

            <div style={{ width: 1, height: 20, background: 'var(--border)', flexShrink: 0 }} />

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {DIFFICULTIES.map(d => (
                <FilterBtn
                  key={d.value}
                  active={difficulty === d.value}
                  onClick={() => setDifficulty(d.value)}
                  color={
                    d.value === 'beginner' ? '#3DAB6E'
                    : d.value === 'intermediate' ? '#C9A84C'
                    : d.value === 'advanced' ? '#E8322A'
                    : undefined
                  }
                >
                  {d.label}
                </FilterBtn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            {filtered.length} {filtered.length === 1 ? 'lesson' : 'lessons'}
            {pillar !== 'all' || difficulty !== 'all' || search ? ' — filtered' : ''}
          </span>
          {(pillar !== 'all' || difficulty !== 'all' || search) && (
            <button
              onClick={() => { setPillar('all'); setDifficulty('all'); setSearch('') }}
              style={{
                fontSize: 13,
                color: 'var(--text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>No lessons match those filters</p>
            <p style={{ margin: '6px 0 0', fontSize: 14 }}>Try changing the pillar or difficulty.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
