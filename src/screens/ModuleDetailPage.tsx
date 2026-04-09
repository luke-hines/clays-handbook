import { Link, useParams, Navigate } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { MOCK_MODULES, MOCK_LESSONS } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import DifficultyBadge from '@/components/shared/DifficultyBadge'
import Icon from '@/components/shared/Icon'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'

export default function ModuleDetailPage() {
  const [loading, done] = usePageLoader(180)
  const { slug } = useParams<{ slug: string }>()
  const completedLessonIds = useAppStore(s => s.completedLessonIds)

  const mod = MOCK_MODULES.find(m => m.slug === slug)
  if (!mod) return <Navigate to="/modules" replace />

  const lessons = MOCK_LESSONS.filter(l => mod.lessonIds.includes(l.id))
  const completedCount = lessons.filter(l => completedLessonIds.includes(l.id)).length
  const progressPct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

  if (loading) return <PageLoader icon={<LayoutGrid size={40} />} label={mod.title} color={mod.color} duration={180} onDone={done} />

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(20px, 4vw, 40px) 24px clamp(16px, 3.5vw, 32px)',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Link to="/modules" style={{ fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>
            ← Modules
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, flexShrink: 0,
              background: `${mod.color}18`, border: `1px solid ${mod.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: mod.color,
            }}>
              <Icon name={mod.emoji} size={26} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                {mod.pillar === 'racing' ? 'Racing' : 'Car Knowledge'} · Module
              </p>
              <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                {mod.title}
              </h1>
              <p style={{ margin: '0 0 16px', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {mod.description}
              </p>

              {/* Progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1, maxWidth: 280, height: 6, background: 'var(--surface-3)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 999,
                    background: progressPct === 100 ? '#3DAB6E' : mod.color,
                    width: `${progressPct}%`,
                    transition: 'width 0.4s ease',
                  }} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {completedCount}/{lessons.length} complete
                </span>
                {progressPct === 100 && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                    background: 'rgba(61,171,110,0.12)', color: '#3DAB6E', border: '1px solid rgba(61,171,110,0.3)',
                  }}>
                    Module Done ✓
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(20px, 4vw, 36px) 24px clamp(40px, 8vw, 80px)' }}>
        <p style={{ margin: '0 0 18px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          {lessons.length} Lessons
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lessons.map((lesson, idx) => {
            const isCompleted = completedLessonIds.includes(lesson.id)
            return (
              <Link key={lesson.id} to={`/lessons/${lesson.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="card"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    transition: 'transform 0.12s, border-color 0.12s',
                    cursor: 'pointer',
                    borderLeft: isCompleted ? '3px solid #3DAB6E' : `3px solid ${mod.color}30`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateX(4px)'
                    e.currentTarget.style.borderColor = isCompleted ? '#3DAB6E' : `${mod.color}60`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.borderColor = isCompleted ? '#3DAB6E' : `${mod.color}30`
                  }}
                >
                  {/* Index or checkmark */}
                  <span style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: isCompleted ? 'rgba(61,171,110,0.12)' : `${mod.color}14`,
                    border: `1px solid ${isCompleted ? 'rgba(61,171,110,0.35)' : `${mod.color}30`}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700,
                    color: isCompleted ? '#3DAB6E' : mod.color,
                  }}>
                    {isCompleted ? '✓' : idx + 1}
                  </span>

                  <span style={{ flexShrink: 0, color: mod.color, opacity: 0.7 }}>
                    <Icon name={lesson.emoji} size={16} />
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                        {lesson.title}
                      </span>
                      <DifficultyBadge difficulty={lesson.difficulty} />
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lesson.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {lesson.quizId && (
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>Quiz</span>
                    )}
                    <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {lessons.length === 0 && (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            No lessons in this module yet.
          </div>
        )}
      </div>
    </div>
  )
}
