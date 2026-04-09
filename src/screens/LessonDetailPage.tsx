import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { MOCK_LESSONS, MOCK_CONCEPTS, MOCK_QUIZZES } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import { parseVideoUrl } from '@/lib/videoUtils'
import PillBadge from '@/components/shared/PillBadge'
import DifficultyBadge from '@/components/shared/DifficultyBadge'
import ConceptModal from '@/components/learner/ConceptModal'
import LessonCard from '@/components/learner/LessonCard'
import TrackDiagramView from '@/components/learner/TrackDiagram'
import Icon from '@/components/shared/Icon'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import { getDiagram } from '@/lib/diagramData'
import type { Concept } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  racecraft: 'Racecraft', braking: 'Braking', cornering: 'Cornering',
  overtaking: 'Overtaking', defense: 'Defense', 'sim-technique': 'Sim Technique',
  strategy: 'Strategy', suspension: 'Suspension', brakes: 'Brakes',
  drivetrain: 'Drivetrain', tires: 'Tires', aerodynamics: 'Aerodynamics',
  engine: 'Engine', setup: 'Setup',
}

export default function LessonDetailPage() {
  const [loading, done] = usePageLoader(400)
  const { slug } = useParams<{ slug: string }>()
  const [openConcept, setOpenConcept] = useState<Concept | null>(null)
  const videoUrls = useAppStore(s => s.videoUrls)
  const publishedLessons = useAppStore(s => s.publishedLessons)

  const allLessons = [...MOCK_LESSONS, ...publishedLessons]
  const lesson = allLessons.find(l => l.slug === slug)
  if (!lesson) return <Navigate to="/lessons" replace />

  const accentColor = lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB'
  if (loading) return (
    <PageLoader
      icon={<Icon name={lesson.emoji} size={40} />}
      label={lesson.title}
      color={accentColor}
      duration={400}
      onDone={done}
    />
  )

  const concepts = MOCK_CONCEPTS.filter(c => lesson.conceptIds.includes(c.id))
  const quiz = MOCK_QUIZZES.find(q => q.lessonId === lesson.id)
  const relatedLessons = allLessons.filter(l => lesson.relatedLessonIds.includes(l.id))
  const diagrams = lesson.diagramIds.map(id => getDiagram(id)).filter(Boolean) as NonNullable<ReturnType<typeof getDiagram>>[]

  const rawVideoUrl = videoUrls[lesson.id] ?? lesson.videoUrl
  const embedUrl = rawVideoUrl ? parseVideoUrl(rawVideoUrl) : null


  return (
    <>
      <div className="screen-enter" style={{ minHeight: '100vh' }}>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            height: 240,
            background: lesson.thumbnailColor,
            overflow: 'hidden',
          }}
        >
          {lesson.thumbnailUrl && (
            <img
              src={lesson.thumbnailUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
            />
          )}
          {/* Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(13,13,13,0.95) 100%)',
            }}
          />
          {/* Pillar accent bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 3,
              background: accentColor,
            }}
          />
        </div>

        {/* ── Content ───────────────────────────────────────────── */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
          {/* Back link */}
          <div style={{ padding: '20px 0 0' }}>
            <Link
              to="/lessons"
              style={{ fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              ← Lessons
            </Link>
          </div>

          {/* Title block */}
          <div style={{ marginTop: 20, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: 14,
                background: lesson.pillar === 'racing' ? 'rgba(232,50,42,0.12)' : 'rgba(74,158,219,0.12)',
                border: `1px solid ${lesson.pillar === 'racing' ? 'rgba(232,50,42,0.25)' : 'rgba(74,158,219,0.25)'}`,
                color: lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB',
              }}>
                <Icon name={lesson.emoji} size={26} />
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              <PillBadge pillar={lesson.pillar} />
              <DifficultyBadge difficulty={lesson.difficulty} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                  padding: '3px 0',
                }}
              >
                {CATEGORY_LABELS[lesson.category] ?? lesson.category}
              </span>
            </div>
            <h1
              style={{
                margin: '0 0 12px',
                fontSize: 'clamp(26px, 4vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--text)',
              }}
            >
              {lesson.title}
            </h1>
            <p style={{ margin: 0, fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {lesson.summary}
            </p>
          </div>

          {/* ── Video ─────────────────────────────────────────── */}
          {embedUrl ? (
            <div
              style={{
                marginBottom: 32,
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                position: 'relative',
                paddingBottom: '56.25%', // 16:9
                height: 0,
                background: '#000',
              }}
            >
              <iframe
                src={embedUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                marginBottom: 32,
                padding: '28px 24px',
                borderRadius: 12,
                background: 'var(--surface)',
                border: '1px dashed var(--border-strong)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 32, flexShrink: 0 }}>🎬</span>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                  Video coming soon
                </p>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-tertiary)' }}>
                  The recording for this lesson hasn't been uploaded yet. Check back later.
                </p>
              </div>
            </div>
          )}

          {/* ── Interactive Diagrams ──────────────────────────── */}
          {diagrams.map(diagram => (
            <TrackDiagramView
              key={diagram.id}
              diagram={diagram}
              accentColor={accentColor}
            />
          ))}

          {/* ── Key Takeaways ──────────────────────────────────── */}
          <div
            style={{
              marginBottom: 32,
              padding: '20px 24px',
              borderRadius: 12,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${accentColor}`,
            }}
          >
            <p
              style={{
                margin: '0 0 16px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
              }}
            >
              Key Takeaways
            </p>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: `${accentColor}18`,
                      border: `1px solid ${accentColor}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: accentColor,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {point}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Body ──────────────────────────────────────────── */}
          {lesson.body ? (
            <div
              style={{ marginBottom: 32 }}
            >
              {lesson.body.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{ margin: '0 0 16px', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <div
              style={{
                marginBottom: 32,
                padding: '20px 24px',
                borderRadius: 10,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                Full lesson content coming soon — the takeaways and concepts above cover the essentials.
              </p>
            </div>
          )}

          {/* ── Concepts ──────────────────────────────────────── */}
          {concepts.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <p
                style={{
                  margin: '0 0 14px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                }}
              >
                Key Concepts
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {concepts.map(concept => (
                  <button
                    key={concept.id}
                    onClick={() => setOpenConcept(concept)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      border: '1px solid var(--border-strong)',
                      background: 'var(--surface)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--text)'
                      e.currentTarget.style.borderColor = accentColor
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-secondary)'
                      e.currentTarget.style.borderColor = 'var(--border-strong)'
                    }}
                  >
                    <span style={{ fontSize: 10, color: accentColor }}>●</span>
                    {concept.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Quiz CTA ──────────────────────────────────────── */}
          {quiz && (
            <div
              style={{
                marginBottom: 40,
                padding: '24px',
                borderRadius: 12,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                  Test yourself
                </p>
                <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>
                  {quiz.title}
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
                  {quiz.questions.length} questions · multiple choice
                </p>
              </div>
              <Link
                to={`/quiz/${lesson.slug}`}
                className="btn-primary"
                style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                Take Quiz →
              </Link>
            </div>
          )}

          {/* ── Related Lessons ───────────────────────────────── */}
          {relatedLessons.length > 0 && (
            <div>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                }}
              >
                Related Lessons
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {relatedLessons.map(l => (
                  <LessonCard key={l.id} lesson={l} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Concept modal */}
      {openConcept && (
        <ConceptModal concept={openConcept} onClose={() => setOpenConcept(null)} />
      )}
    </>
  )
}
