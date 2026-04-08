import { Link } from 'react-router-dom'
import { MOCK_LESSONS, MOCK_MODULES } from '@/lib/mockData'
import LessonCard from '@/components/learner/LessonCard'
import Icon from '@/components/shared/Icon'

const featuredLessons = MOCK_LESSONS.filter(l => l.isFeatured)

export default function HomePage() {
  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
          padding: '72px 24px 64px',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--red)',
              }}
            >
              Racing · Car Knowledge
            </span>
          </div>

          <h1
            style={{
              margin: '0 0 16px',
              fontSize: 'clamp(36px, 6vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              color: 'var(--text)',
              maxWidth: 640,
            }}
          >
            Drive smarter.
            <br />
            Know your car.
          </h1>

          <p
            style={{
              margin: '0 0 40px',
              fontSize: 17,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            Racing technique and car knowledge — explained like experienced guys
            talking in the paddock, not a generic course site.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/lessons" className="btn-primary" style={{ textDecoration: 'none', fontSize: 15 }}>
              Browse Lessons
            </Link>
            <Link to="/modules" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 15 }}>
              View Modules
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pillar Cards ─────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            <Link to="/lessons?pillar=racing" style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{
                  padding: '28px 28px 24px',
                  borderLeft: '3px solid var(--red)',
                  transition: 'transform 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>🏁</div>
                <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Racing
                </h2>
                <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Sim-first racecraft: trail braking, overtaking, defense, and everything that separates a fast lap from a race win.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {MOCK_LESSONS.filter(l => l.pillar === 'racing').length} lessons
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--red)' }}>Explore →</span>
                </div>
              </div>
            </Link>

            <Link to="/lessons?pillar=car" style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{
                  padding: '28px 28px 24px',
                  borderLeft: '3px solid var(--pillar-car)',
                  transition: 'transform 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>🔧</div>
                <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Car Knowledge
                </h2>
                <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  How suspension, brakes, differentials, and tires actually work — and what the settings actually change.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {MOCK_LESSONS.filter(l => l.pillar === 'car').length} lessons
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--pillar-car)' }}>Explore →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Lessons ─────────────────────────────────────── */}
      <section style={{ padding: '0 24px 56px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Featured
              </p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                Start Here
              </h2>
            </div>
            <Link to="/lessons" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              All lessons →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {featuredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: '48px 24px 64px',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Structured Learning
              </p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                Modules
              </h2>
            </div>
            <Link to="/modules" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              All modules →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {MOCK_MODULES.map(mod => {
              const lessons = MOCK_LESSONS.filter(l => mod.lessonIds.includes(l.id))
              return (
                <Link key={mod.id} to="/modules" style={{ textDecoration: 'none' }}>
                  <div
                    className="card-elevated"
                    style={{
                      padding: '24px',
                      transition: 'transform 0.15s, border-color 0.15s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.borderColor = 'var(--border-strong)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 10,
                          background: `${mod.color}20`,
                          border: `1px solid ${mod.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: mod.color,
                        }}
                      >
                        <Icon name={mod.emoji} size={20} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                        {lessons.length} lessons
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                      {mod.title}
                    </h3>
                    <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {mod.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {lessons.slice(0, 3).map(l => (
                        <span
                          key={l.id}
                          style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 4,
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {l.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
