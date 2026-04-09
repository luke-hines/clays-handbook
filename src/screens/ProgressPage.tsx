import { Link } from 'react-router-dom'
import { MOCK_LESSONS, MOCK_MODULES } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import Icon from '@/components/shared/Icon'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import DifficultyBadge from '@/components/shared/DifficultyBadge'
import PillBadge from '@/components/shared/PillBadge'
import { CheckCircle2, BookOpen, Trophy, Bookmark, TrendingUp, Circle } from 'lucide-react'

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
          {value}
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>
          {label}
        </p>
      </div>
    </div>
  )
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        flex: 1,
        height: 6,
        borderRadius: 999,
        background: 'var(--surface-2)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${score}%`,
          background: score >= 80 ? '#3DAB6E' : score >= 50 ? '#C9A84C' : '#E8322A',
          borderRadius: 999,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <span style={{
        fontSize: 13,
        fontWeight: 700,
        color,
        minWidth: 38,
        textAlign: 'right',
      }}>
        {score}%
      </span>
    </div>
  )
}

export default function ProgressPage() {
  const [loading, done] = usePageLoader(180)

  const visitedLessonIds    = useAppStore(s => s.visitedLessonIds)
  const completedLessonIds  = useAppStore(s => s.completedLessonIds)
  const quizScores          = useAppStore(s => s.quizScores)
  const bookmarkedLessonIds = useAppStore(s => s.bookmarkedLessonIds)
  const publishedLessons    = useAppStore(s => s.publishedLessons)

  const allLessons = [...MOCK_LESSONS, ...publishedLessons]

  // Summary stats
  const visitedCount   = visitedLessonIds.length
  const completedCount = completedLessonIds.length
  const totalLessons   = allLessons.length
  const scoreValues    = Object.values(quizScores)
  const avgScore       = scoreValues.length
    ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
    : null
  const bookmarkCount  = bookmarkedLessonIds.length

  // Lessons with quiz scores
  const scoredLessons = allLessons
    .filter(l => quizScores[l.id] !== undefined)
    .sort((a, b) => (quizScores[b.id] ?? 0) - (quizScores[a.id] ?? 0))

  // Bookmarked lessons
  const savedLessons = allLessons.filter(l => bookmarkedLessonIds.includes(l.id))

  // Module progress
  const moduleProgress = MOCK_MODULES.map(mod => {
    const total     = mod.lessonIds.length
    const completed = mod.lessonIds.filter(id => completedLessonIds.includes(id)).length
    const pct       = total > 0 ? Math.round((completed / total) * 100) : 0
    return { mod, total, completed, pct }
  })

  const isEmpty = visitedCount === 0 && completedCount === 0 && scoreValues.length === 0

  if (loading) return <PageLoader icon={<TrendingUp size={40} />} label="Progress" color="#C9A84C" duration={180} onDone={done} />

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(20px, 3vw, 32px) clamp(16px, 3vw, 24px)' }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Learner
          </p>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Your Progress
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(16px, 3vw, 32px) clamp(16px, 3vw, 24px) 64px' }}>

        {isEmpty ? (
          /* ── Empty state ────────────────────────────────────────── */
          <div style={{
            padding: '80px 0',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#C9A84C',
            }}>
              <TrendingUp size={28} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                Nothing tracked yet
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-tertiary)' }}>
                Open a lesson to start tracking your progress.
              </p>
            </div>
            <Link
              to="/lessons"
              style={{
                marginTop: 4,
                padding: '9px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                color: '#fff',
                background: 'linear-gradient(135deg, #E8322A, #c42a22)',
                border: '1px solid rgba(232,50,42,0.4)',
              }}
            >
              Browse Lessons
            </Link>
          </div>
        ) : (
          <>
            {/* ── Summary stats ─────────────────────────────────────── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 40,
            }}>
              <StatCard
                icon={<BookOpen size={18} />}
                label={`of ${totalLessons} lessons visited`}
                value={visitedCount}
                color="#4A9EDB"
              />
              <StatCard
                icon={<CheckCircle2 size={18} />}
                label="lessons completed"
                value={completedCount}
                color="#3DAB6E"
              />
              <StatCard
                icon={<Trophy size={18} />}
                label="average quiz score"
                value={avgScore !== null ? `${avgScore}%` : '—'}
                color="#C9A84C"
              />
              <StatCard
                icon={<Bookmark size={18} />}
                label="lessons bookmarked"
                value={bookmarkCount}
                color="#C9A84C"
              />
            </div>

            {/* ── Module progress ───────────────────────────────────── */}
            {completedCount > 0 && (
              <section style={{ marginBottom: 40 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Module Progress
                </h2>
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                  {moduleProgress.map(({ mod, total, completed, pct }, i) => (
                    <div
                      key={mod.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '14px 18px',
                        borderBottom: i < moduleProgress.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <div style={{
                        flexShrink: 0,
                        width: 36, height: 36, borderRadius: 9,
                        background: `${mod.color}18`,
                        border: `1px solid ${mod.color}30`,
                        color: mod.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name={mod.emoji} size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Link
                            to={`/modules/${mod.slug}`}
                            style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}
                          >
                            {mod.title}
                          </Link>
                          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 12 }}>
                            {completed}/{total}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 5, borderRadius: 999, background: 'var(--surface-2)', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%',
                              width: `${pct}%`,
                              background: pct === 100 ? '#3DAB6E' : mod.color,
                              borderRadius: 999,
                              transition: 'width 0.4s ease',
                            }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: pct === 100 ? '#3DAB6E' : 'var(--text-tertiary)', minWidth: 32, textAlign: 'right' }}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                      {pct === 100 && (
                        <CheckCircle2 size={16} color="#3DAB6E" style={{ flexShrink: 0 }} />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Quiz scores ───────────────────────────────────────── */}
            {scoredLessons.length > 0 && (
              <section style={{ marginBottom: 40 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Quiz Scores
                </h2>
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                  {scoredLessons.map((lesson, i) => {
                    const score = quizScores[lesson.id]
                    const scoreColor = score >= 80 ? '#3DAB6E' : score >= 50 ? '#C9A84C' : '#E8322A'
                    return (
                      <div
                        key={lesson.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '12px 18px',
                          borderBottom: i < scoredLessons.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        <div style={{
                          flexShrink: 0,
                          width: 32, height: 32, borderRadius: 8,
                          background: lesson.pillar === 'racing' ? 'rgba(232,50,42,0.1)' : 'rgba(74,158,219,0.1)',
                          color: lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Icon name={lesson.emoji} size={14} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                            <Link
                              to={`/lessons/${lesson.slug}`}
                              style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                              {lesson.title}
                            </Link>
                            <PillBadge pillar={lesson.pillar} />
                            <DifficultyBadge difficulty={lesson.difficulty} />
                          </div>
                          <ScoreBar score={score} color={scoreColor} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── Bookmarked lessons ────────────────────────────────── */}
            {savedLessons.length > 0 && (
              <section>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Saved Lessons
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 10,
                }}>
                  {savedLessons.map(lesson => {
                    const isCompleted = completedLessonIds.includes(lesson.id)
                    const score = quizScores[lesson.id]
                    return (
                      <Link
                        key={lesson.id}
                        to={`/lessons/${lesson.slug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div
                          className="card"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 14px',
                            transition: 'border-color 0.15s, transform 0.15s',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget
                            el.style.borderColor = 'var(--border-strong)'
                            el.style.transform = 'translateY(-1px)'
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget
                            el.style.borderColor = 'var(--border)'
                            el.style.transform = 'translateY(0)'
                          }}
                        >
                          <div style={{
                            flexShrink: 0,
                            width: 38, height: 38, borderRadius: 9,
                            background: lesson.pillar === 'racing' ? 'rgba(232,50,42,0.1)' : 'rgba(74,158,219,0.1)',
                            color: lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Icon name={lesson.emoji} size={17} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {lesson.title}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                              <PillBadge pillar={lesson.pillar} />
                              {score !== undefined && (
                                <span style={{ fontSize: 11, fontWeight: 700, color: score >= 80 ? '#3DAB6E' : '#C9A84C' }}>
                                  {score}% quiz
                                </span>
                              )}
                            </div>
                          </div>
                          {isCompleted ? (
                            <CheckCircle2 size={15} color="#3DAB6E" style={{ flexShrink: 0 }} />
                          ) : (
                            <Circle size={15} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── Visited but not completed ─────────────────────────── */}
            {visitedCount > 0 && visitedCount !== completedCount && (
              <section style={{ marginTop: 40 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  In Progress
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 10,
                }}>
                  {allLessons
                    .filter(l => visitedLessonIds.includes(l.id) && !completedLessonIds.includes(l.id))
                    .map(lesson => (
                      <Link
                        key={lesson.id}
                        to={`/lessons/${lesson.slug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div
                          className="card"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 14px',
                            transition: 'border-color 0.15s, transform 0.15s',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget
                            el.style.borderColor = 'var(--border-strong)'
                            el.style.transform = 'translateY(-1px)'
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget
                            el.style.borderColor = 'var(--border)'
                            el.style.transform = 'translateY(0)'
                          }}
                        >
                          <div style={{
                            flexShrink: 0,
                            width: 38, height: 38, borderRadius: 9,
                            background: lesson.pillar === 'racing' ? 'rgba(232,50,42,0.1)' : 'rgba(74,158,219,0.1)',
                            color: lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Icon name={lesson.emoji} size={17} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {lesson.title}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                              <PillBadge pillar={lesson.pillar} />
                              <DifficultyBadge difficulty={lesson.difficulty} />
                            </div>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C', flexShrink: 0 }}>
                            Continue →
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
