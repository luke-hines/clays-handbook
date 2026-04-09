import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { MOCK_MODULES, MOCK_LESSONS } from '@/lib/mockData'
import DifficultyBadge from '@/components/shared/DifficultyBadge'
import Icon from '@/components/shared/Icon'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'

export default function ModulesPage() {
  const [loading, done] = usePageLoader(360)
  if (loading) return <PageLoader icon={<LayoutGrid size={40} />} label="Modules" color="#C9A84C" duration={360} onDone={done} />
  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '40px 24px 32px',
          background: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Structured Learning
          </p>
          <h1 style={{ margin: '0 0 8px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Modules
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)' }}>
            Grouped lessons — jump in anywhere, no locked progression.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {MOCK_MODULES.map(mod => {
            const lessons = MOCK_LESSONS.filter(l => mod.lessonIds.includes(l.id))
            return (
              <section key={mod.id}>
                {/* Module header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 20,
                    paddingBottom: 18,
                    borderBottom: `2px solid ${mod.color}30`,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: `${mod.color}18`,
                      border: `1px solid ${mod.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: mod.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={mod.emoji} size={24} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                        {mod.title}
                      </h2>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: `${mod.color}18`,
                          color: mod.color,
                          border: `1px solid ${mod.color}35`,
                        }}
                      >
                        {lessons.length} lessons
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Lesson list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {lessons.map((lesson, idx) => (
                    <Link key={lesson.id} to={`/lessons/${lesson.slug}`} style={{ textDecoration: 'none' }}>
                      <div
                        className="card"
                        style={{
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          transition: 'transform 0.12s, border-color 0.12s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateX(4px)'
                          e.currentTarget.style.borderColor = `${mod.color}50`
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateX(0)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 7,
                            background: `${mod.color}14`,
                            border: `1px solid ${mod.color}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            color: mod.color,
                            flexShrink: 0,
                          }}
                        >
                          {idx + 1}
                        </span>

                        <span style={{ flexShrink: 0, color: mod.color, opacity: 0.7 }}>
                          <Icon name={lesson.emoji} size={16} />
                        </span>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                              {lesson.title}
                            </span>
                            <DifficultyBadge difficulty={lesson.difficulty} />
                          </div>
                          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {lesson.summary}
                          </p>
                        </div>

                        <span style={{ fontSize: 14, color: 'var(--text-tertiary)', flexShrink: 0 }}>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
