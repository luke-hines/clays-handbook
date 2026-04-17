import { Link } from 'react-router-dom'
import { Flag, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MOCK_LESSONS, MOCK_MODULES } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import LessonCard from '@/components/learner/LessonCard'
import Icon from '@/components/shared/Icon'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'


const featuredLessons = MOCK_LESSONS.filter(l => l.isFeatured)
const racingLessons   = MOCK_LESSONS.filter(l => l.pillar === 'racing')
const carLessons      = MOCK_LESSONS.filter(l => l.pillar === 'car')

function useCountUp(target: number, duration = 900, delay = 120) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return count
}

// Colors scale with value: highest = darkest blue, lowest = white
const STATS = [
  { target: MOCK_LESSONS.length, label: 'Lessons', delay: 120, color: '#1565A8' },
  { target: MOCK_MODULES.length, label: 'Modules', delay: 220, color: '#4A9EDB' },
  { target: 2,                   label: 'Pillars', delay: 320, color: '#F0EDE8' },
]

function StatPanel() {
  const counts = [
    useCountUp(STATS[0].target, 900, STATS[0].delay),
    useCountUp(STATS[1].target, 900, STATS[1].delay),
    useCountUp(STATS[2].target, 900, STATS[2].delay),
  ]
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}>
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span className="stat-panel-number" style={{
            display: 'block',
            fontSize: 'clamp(52px, 6vw, 74px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: s.color,
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            fontStyle: 'italic',
          }}>
            {counts[i]}
          </span>
          <span style={{
            display: 'block',
            marginTop: 10,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
          }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [loading, done] = usePageLoader(180)
  const isMobile = useIsMobile()
  const visitedLessonIds = useAppStore(s => s.visitedLessonIds)
  const completedLessonIds = useAppStore(s => s.completedLessonIds)
  // Up to 3 recently visited lessons not yet completed
  const continueLessons = visitedLessonIds
    .filter(id => !completedLessonIds.includes(id))
    .slice(0, 3)
    .map(id => MOCK_LESSONS.find(l => l.id === id))
    .filter(Boolean) as typeof MOCK_LESSONS

  if (loading) return <PageLoader icon={<Flag size={44} fill="#E8322A" />} label="Clay's Handbook" color="#E8322A" duration={180} onDone={done} />

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(160deg, #111 0%, #0D0D0D 60%, #0a0810 100%)',
        padding: isMobile ? '40px 20px' : '64px 24px',
        position: 'relative',
        zIndex: 5, // covers the fixed curbs while hero is on screen
      }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 36 : 64,
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
          <StatPanel />
        </div>
      </section>

      {/* ── Pillar split ──────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>

          {/* Racing */}
          <Link to="/lessons?pillar=racing" style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: isMobile ? '28px 20px' : '36px 40px',
                borderRight: isMobile ? 'none' : '1px solid var(--border)',
                borderBottom: isMobile ? '1px solid var(--border)' : 'none',
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
                padding: isMobile ? '28px 20px' : '36px 40px',
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

      {/* ── Continue Learning ─────────────────────────────────────────────── */}
      {continueLessons.length > 0 && (
        <section style={{ padding: isMobile ? '32px 16px 0' : '40px 24px 0' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                  Pick Up Where You Left Off
                </p>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                  Continue Learning
                </h2>
              </div>
              <Link to="/lessons" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                All lessons <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {continueLessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Lessons ──────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '32px 16px 0' : '40px 24px 0' }}>
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
      <section style={{ padding: isMobile ? '32px 16px 48px' : '40px 24px 56px' }}>
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
                <Link key={mod.id} to={`/modules/${mod.slug}`} style={{ textDecoration: 'none' }}>
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
