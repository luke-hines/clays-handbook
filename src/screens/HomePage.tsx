import { Link } from 'react-router-dom'
import { Flag, ArrowRight } from 'lucide-react'
import { MOCK_LESSONS, MOCK_MODULES } from '@/lib/mockData'
import LessonCard from '@/components/learner/LessonCard'
import Icon from '@/components/shared/Icon'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'

const featuredLessons = MOCK_LESSONS.filter(l => l.isFeatured)
const racingLessons   = MOCK_LESSONS.filter(l => l.pillar === 'racing')
const carLessons      = MOCK_LESSONS.filter(l => l.pillar === 'car')

const RACING_CATS = ['Racecraft', 'Braking', 'Cornering', 'Overtaking', 'Defense']
const CAR_CATS    = ['Suspension', 'Brakes', 'Tires', 'Drivetrain', 'Engine']

export default function HomePage() {
  const [loading, done] = usePageLoader(380)
  if (loading) return <PageLoader icon={<Flag size={30} fill="#E8322A" />} label="Clay's Handbook" color="#E8322A" duration={380} onDone={done} />

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(160deg, #111 0%, #0D0D0D 60%, #0a0810 100%)',
        padding: '56px 24px 52px',
      }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 48,
          alignItems: 'center',
        }}>

          {/* Left: headline + CTAs */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#E8322A',
              }}>
                Racing
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-tertiary)' }} />
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#4A9EDB',
              }}>
                Car Knowledge
              </span>
            </div>

            <h1 style={{
              margin: '0 0 18px',
              fontSize: 'clamp(34px, 4.5vw, 54px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.06,
              color: 'var(--text)',
            }}>
              Drive smarter.
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #E8322A 0%, #ff7a6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Know your car.
              </span>
            </h1>

            <p style={{
              margin: '0 0 36px',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: 460,
            }}>
              Racing technique and car knowledge — explained the way experienced guys talk in the paddock. No fluff, no filler.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/lessons" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14 }}>
                Browse Lessons
              </Link>
              <Link to="/modules" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 14 }}>
                View Modules
              </Link>
            </div>
          </div>

          {/* Right: stat panel */}
          <div style={{
            borderRadius: 14,
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}>
            {/* Total bar */}
            <div style={{
              padding: '22px 28px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              gap: 32,
            }}>
              {[
                { n: MOCK_LESSONS.length, label: 'Lessons' },
                { n: MOCK_MODULES.length, label: 'Modules' },
                { n: 2, label: 'Pillars' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1 }}>
                    {s.n}
                  </p>
                  <p style={{ margin: '5px 0 0', fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Racing block */}
            <Link to="/lessons?pillar=racing" style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ padding: '22px 28px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,50,42,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>🏁</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Racing</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 9px',
                      borderRadius: 999, background: 'rgba(232,50,42,0.12)',
                      border: '1px solid rgba(232,50,42,0.25)', color: '#E8322A',
                    }}>
                      {racingLessons.length} lessons
                    </span>
                  </div>
                  <ArrowRight size={14} color="#E8322A" />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Racecraft', 'Braking', 'Cornering', 'Overtaking', 'Defense', 'Sim Technique'].map(c => (
                    <span key={c} style={{
                      fontSize: 11, padding: '4px 10px', borderRadius: 6,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      color: 'var(--text-tertiary)',
                    }}>{c}</span>
                  ))}
                </div>
              </div>
            </Link>

            {/* Car Knowledge block */}
            <Link to="/lessons?pillar=car" style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ padding: '22px 28px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,158,219,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>🔧</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Car Knowledge</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 9px',
                      borderRadius: 999, background: 'rgba(74,158,219,0.12)',
                      border: '1px solid rgba(74,158,219,0.25)', color: '#4A9EDB',
                    }}>
                      {carLessons.length} lessons
                    </span>
                  </div>
                  <ArrowRight size={14} color="#4A9EDB" />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Suspension', 'Brakes', 'Tires', 'Drivetrain', 'Engine', 'Aerodynamics', 'Setup'].map(c => (
                    <span key={c} style={{
                      fontSize: 11, padding: '4px 10px', borderRadius: 6,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      color: 'var(--text-tertiary)',
                    }}>{c}</span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pillar split ──────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

          {/* Racing */}
          <Link to="/lessons?pillar=racing" style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '36px 40px',
                borderRight: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,50,42,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Accent line top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#E8322A' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 38, height: 38, borderRadius: 10, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    background: 'rgba(232,50,42,0.1)', border: '1px solid rgba(232,50,42,0.2)',
                  }}>🏁</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Racing</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#E8322A', fontWeight: 700 }}>{racingLessons.length} lessons</p>
                  </div>
                </div>
                <ArrowRight size={16} color="#E8322A" />
              </div>

              <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 340 }}>
                Sim-first racecraft — trail braking, corner linking, overtaking strategy, tire deg management, and the mental side of racing.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Racecraft', 'Braking', 'Cornering', 'Overtaking', 'Defense', 'Sim Technique'].map(c => (
                  <span key={c} style={{
                    fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                    background: 'rgba(232,50,42,0.08)', border: '1px solid rgba(232,50,42,0.2)',
                    color: '#E8322A',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </Link>

          {/* Car Knowledge */}
          <Link to="/lessons?pillar=car" style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '36px 40px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,158,219,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Accent line top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#4A9EDB' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 38, height: 38, borderRadius: 10, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    background: 'rgba(74,158,219,0.1)', border: '1px solid rgba(74,158,219,0.2)',
                  }}>🔧</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Car Knowledge</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#4A9EDB', fontWeight: 700 }}>{carLessons.length} lessons</p>
                  </div>
                </div>
                <ArrowRight size={16} color="#4A9EDB" />
              </div>

              <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 340 }}>
                How the hardware actually works — suspension geometry, brake systems, differential tuning, turbo power delivery, and setup philosophy.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Suspension', 'Brakes', 'Tires', 'Drivetrain', 'Engine', 'Setup', 'Aerodynamics'].map(c => (
                  <span key={c} style={{
                    fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                    background: 'rgba(74,158,219,0.08)', border: '1px solid rgba(74,158,219,0.2)',
                    color: '#4A9EDB',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* ── Featured Lessons ──────────────────────────────────────────────── */}
      <section style={{ padding: '40px 24px 0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Start Here
              </p>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                Featured Lessons
              </h2>
            </div>
            <Link to="/lessons" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              All lessons <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {featuredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 24px 56px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Structured Learning
              </p>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                Modules
              </h2>
            </div>
            <Link to="/modules" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              All modules <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
          }}>
            {MOCK_MODULES.map(mod => {
              const count = MOCK_LESSONS.filter(l => mod.lessonIds.includes(l.id)).length
              return (
                <Link key={mod.id} to="/modules" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      padding: '18px 20px',
                      borderRadius: 10,
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, transform 0.15s',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = mod.color + '60'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: `${mod.color}18`,
                      border: `1px solid ${mod.color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: mod.color,
                    }}>
                      <Icon name={mod.emoji} size={17} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                        {mod.title}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>
                        {count} lessons
                      </p>
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
