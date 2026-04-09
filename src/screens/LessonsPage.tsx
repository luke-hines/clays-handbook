import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MOCK_LESSONS } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import LessonCard from '@/components/learner/LessonCard'
import { Flag, Wrench, Search, BookOpen, X, Bookmark } from 'lucide-react'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import type { Pillar, Difficulty, LessonCategory } from '@/types'

// ── Filter definitions ────────────────────────────────────────────────────────

const PILLARS: { value: Pillar | 'all'; label: string; color: string }[] = [
  { value: 'all',    label: 'All',          color: 'var(--text)' },
  { value: 'racing', label: 'Racing',       color: '#E8322A' },
  { value: 'car',    label: 'Car Knowledge', color: '#4A9EDB' },
]

const DIFFICULTIES: { value: Difficulty | 'all'; label: string; color: string }[] = [
  { value: 'all',          label: 'All levels',   color: 'var(--text)' },
  { value: 'beginner',     label: 'Beginner',     color: '#3DAB6E' },
  { value: 'intermediate', label: 'Intermediate', color: '#C9A84C' },
  { value: 'advanced',     label: 'Advanced',     color: '#E8322A' },
]

const RACING_CATS: { value: LessonCategory | 'all'; label: string }[] = [
  { value: 'all',           label: 'All topics' },
  { value: 'racecraft',     label: 'Racecraft' },
  { value: 'braking',       label: 'Braking' },
  { value: 'cornering',     label: 'Cornering' },
  { value: 'overtaking',    label: 'Overtaking' },
  { value: 'defense',       label: 'Defense' },
  { value: 'sim-technique', label: 'Sim Technique' },
]

const CAR_CATS: { value: LessonCategory | 'all'; label: string }[] = [
  { value: 'all',          label: 'All topics' },
  { value: 'suspension',   label: 'Suspension' },
  { value: 'brakes',       label: 'Brakes' },
  { value: 'drivetrain',   label: 'Drivetrain' },
  { value: 'tires',        label: 'Tires' },
  { value: 'aerodynamics', label: 'Aerodynamics' },
  { value: 'engine',       label: 'Engine' },
  { value: 'setup',        label: 'Setup' },
]

// ── Segment control ───────────────────────────────────────────────────────────

function Segment<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; color?: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div style={{
      display: 'flex',
      gap: 2,
      background: 'var(--surface-2)',
      borderRadius: 9,
      padding: 3,
      border: '1px solid var(--border)',
    }}>
      {options.map(opt => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: '5px 12px',
              borderRadius: 7,
              fontSize: 12,
              fontWeight: active ? 700 : 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: active ? 'var(--surface-3)' : 'transparent',
              color: active ? (opt.color ?? 'var(--text)') : 'var(--text-tertiary)',
              boxShadow: active ? '0 1px 4px rgba(0,0,0,0.35)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Category pill ─────────────────────────────────────────────────────────────

function CatPill({
  active,
  onClick,
  children,
  accentColor,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  accentColor: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 11px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        border: `1px solid ${active ? accentColor + '60' : 'var(--border)'}`,
        background: active ? accentColor + '18' : 'transparent',
        color: active ? accentColor : 'var(--text-tertiary)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const [loading, done] = usePageLoader(180)
  const [searchParams] = useSearchParams()
  const initialPillar = (searchParams.get('pillar') as Pillar | null) ?? 'all'

  const [pillar, setPillar] = useState<Pillar | 'all'>(initialPillar)
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [category, setCategory] = useState<LessonCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [savedOnly, setSavedOnly] = useState(false)
  const publishedLessons = useAppStore(s => s.publishedLessons)
  const bookmarkedLessonIds = useAppStore(s => s.bookmarkedLessonIds)
  const allLessons = useMemo(() => [...MOCK_LESSONS, ...publishedLessons], [publishedLessons])

  const handlePillarChange = (p: Pillar | 'all') => {
    setPillar(p)
    setCategory('all') // reset category when switching pillar
  }

  const filtered = useMemo(() => {
    return allLessons.filter(l => {
      if (savedOnly && !bookmarkedLessonIds.includes(l.id)) return false
      if (pillar !== 'all' && l.pillar !== pillar) return false
      if (difficulty !== 'all' && l.difficulty !== difficulty) return false
      if (category !== 'all' && l.category !== category) return false
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
  }, [pillar, difficulty, category, search, savedOnly, allLessons, bookmarkedLessonIds])

  // Stats
  const racingCount = allLessons.filter(l => l.pillar === 'racing').length
  const carCount    = allLessons.filter(l => l.pillar === 'car').length
  const advCount    = allLessons.filter(l => l.difficulty === 'advanced').length

  const isFiltered = pillar !== 'all' || difficulty !== 'all' || category !== 'all' || search !== '' || savedOnly
  const clearAll   = () => { setPillar('all'); setDifficulty('all'); setCategory('all'); setSearch(''); setSavedOnly(false) }

  const accentColor = pillar === 'racing' ? '#E8322A' : pillar === 'car' ? '#4A9EDB' : '#E8322A'
  const cats = pillar === 'car' ? CAR_CATS : RACING_CATS

  if (loading) return <PageLoader icon={<BookOpen size={40} />} label="Lessons" color="#E8322A" duration={180} onDone={done} />

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>

      {/* ── Hero bar ──────────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 24px 0' }}>

          {/* Top row: title + search */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 20,
          }}>
            {/* Left: title + stat chips */}
            <div>
              <p style={{
                margin: '0 0 4px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
              }}>
                Library
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <h1 style={{
                  margin: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  lineHeight: 1,
                }}>
                  Lessons
                </h1>
                {/* Stat chips */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 9px',
                    borderRadius: 999, background: 'rgba(232,50,42,0.1)',
                    border: '1px solid rgba(232,50,42,0.25)', color: '#E8322A',
                  }}>
                    {racingCount} Racing
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 9px',
                    borderRadius: 999, background: 'rgba(74,158,219,0.1)',
                    border: '1px solid rgba(74,158,219,0.25)', color: '#4A9EDB',
                  }}>
                    {carCount} Car
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 9px',
                    borderRadius: 999, background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C',
                  }}>
                    {advCount} Advanced
                  </span>
                </div>
              </div>
            </div>

            {/* Right: search */}
            <div className="lessons-search" style={{ position: 'relative', maxWidth: 260, flexShrink: 1, width: '100%' }}>
              <span style={{
                position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex',
              }}>
                <Search size={13} />
              </span>
              <input
                type="text"
                placeholder="Search lessons..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 32px 8px 32px',
                  borderRadius: 8,
                  border: '1px solid var(--border-strong)',
                  background: 'var(--surface-2)',
                  color: 'var(--text)',
                  fontSize: 13,
                  outline: 'none',
                  transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = accentColor + '80')}
                onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    color: 'var(--text-tertiary)', display: 'flex',
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Filter row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            paddingBottom: 16,
          }}>
            {/* Pillar segment */}
            <Segment
              options={PILLARS}
              value={pillar}
              onChange={handlePillarChange}
            />

            <div style={{ width: 1, height: 24, background: 'var(--border)', flexShrink: 0 }} />

            {/* Difficulty segment */}
            <Segment
              options={DIFFICULTIES}
              value={difficulty}
              onChange={setDifficulty}
            />

            <div style={{ width: 1, height: 24, background: 'var(--border)', flexShrink: 0 }} />

            {/* Saved toggle */}
            <button
              onClick={() => setSavedOnly(s => !s)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 12px',
                borderRadius: 7,
                fontSize: 12,
                fontWeight: savedOnly ? 700 : 500,
                border: savedOnly ? '1px solid rgba(201,168,76,0.4)' : '1px solid var(--border)',
                background: savedOnly ? 'rgba(201,168,76,0.12)' : 'transparent',
                color: savedOnly ? '#C9A84C' : 'var(--text-tertiary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              <Bookmark size={11} fill={savedOnly ? 'currentColor' : 'none'} />
              Saved
              {bookmarkedLessonIds.length > 0 && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 5px',
                  borderRadius: 999,
                  background: savedOnly ? 'rgba(201,168,76,0.3)' : 'var(--surface-2)',
                  color: savedOnly ? '#C9A84C' : 'var(--text-tertiary)',
                }}>
                  {bookmarkedLessonIds.length}
                </span>
              )}
            </button>

            {isFiltered && (
              <>
                <div style={{ width: 1, height: 24, background: 'var(--border)', flexShrink: 0 }} />
                <button
                  onClick={clearAll}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
                    borderRadius: 6,
                  }}
                >
                  <X size={11} /> Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Category strip */}
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <div style={{
            maxWidth: 1120, margin: '0 auto', padding: '10px 24px',
            display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center',
          }}>
            {pillar !== 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginRight: 4 }}>
                {pillar === 'racing'
                  ? <Flag size={11} color={accentColor} />
                  : <Wrench size={11} color={accentColor} />}
                <span style={{ fontSize: 11, fontWeight: 700, color: accentColor, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {pillar === 'racing' ? 'Racing' : 'Car Knowledge'}
                </span>
              </div>
            )}
            {cats.map(c => (
              <CatPill
                key={c.value}
                active={category === c.value}
                onClick={() => setCategory(c.value)}
                accentColor={accentColor}
              >
                {c.label}
              </CatPill>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px) 48px' }}>

        {/* Result count */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 18,
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>
            {filtered.length} {filtered.length === 1 ? 'lesson' : 'lessons'}
            {isFiltered ? ' — filtered' : ''}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{
            padding: '64px 0', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: 'var(--surface)',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--text-tertiary)',
            }}>
              <Search size={22} />
            </div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text-secondary)' }}>
              No lessons match those filters
            </p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-tertiary)' }}>
              Try adjusting the pillar, difficulty, or topic.
            </p>
            <button
              onClick={clearAll}
              className="btn-ghost"
              style={{ marginTop: 4 }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 14,
          }}>
            {filtered.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
