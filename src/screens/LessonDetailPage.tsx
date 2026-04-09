import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { MOCK_LESSONS, MOCK_CONCEPTS, MOCK_QUIZZES, MOCK_MODULES } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import { parseVideoUrl } from '@/lib/videoUtils'
import { hasCourseAccess } from '@/lib/access'
import PillBadge from '@/components/shared/PillBadge'
import DifficultyBadge from '@/components/shared/DifficultyBadge'
import ConceptModal from '@/components/learner/ConceptModal'
import LessonCard from '@/components/learner/LessonCard'
import TrackDiagramView from '@/components/learner/TrackDiagram'
import PaywallBanner from '@/components/shared/PaywallBanner'
import Icon from '@/components/shared/Icon'
import { getDiagram } from '@/lib/diagramData'
import { Bookmark } from 'lucide-react'
import type { Concept } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  racecraft: 'Racecraft', braking: 'Braking', cornering: 'Cornering',
  overtaking: 'Overtaking', defense: 'Defense', 'sim-technique': 'Sim Technique',
  strategy: 'Strategy', suspension: 'Suspension', brakes: 'Brakes',
  drivetrain: 'Drivetrain', tires: 'Tires', aerodynamics: 'Aerodynamics',
  engine: 'Engine', setup: 'Setup',
}

export default function LessonDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useUser()
  const [openConcept, setOpenConcept] = useState<Concept | null>(null)
  const videoUrls = useAppStore(s => s.videoUrls)
  const publishedLessons = useAppStore(s => s.publishedLessons)
  const completedLessonIds = useAppStore(s => s.completedLessonIds)
  const bookmarkedLessonIds = useAppStore(s => s.bookmarkedLessonIds)
  const toggleBookmark = useAppStore(s => s.toggleBookmark)
  const markVisited = useAppStore(s => s.markVisited)
  const markCompleted = useAppStore(s => s.markCompleted)
  const lessonNotes = useAppStore(s => s.lessonNotes)
  const setLessonNote = useAppStore(s => s.setLessonNote)
  const [noteSaved, setNoteSaved] = useState(false)

  const allLessons = [...MOCK_LESSONS, ...publishedLessons]
  const lesson = allLessons.find(l => l.slug === slug)

  // Mark as visited when the lesson loads
  useEffect(() => {
    if (lesson) markVisited(lesson.id)
  }, [lesson?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson) return <Navigate to="/lessons" replace />

  const accentColor = lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB'

  const concepts = MOCK_CONCEPTS.filter(c => lesson.conceptIds.includes(c.id))
  const quiz = MOCK_QUIZZES.find(q => q.lessonId === lesson.id)
  const relatedLessons = allLessons.filter(l => lesson.relatedLessonIds.includes(l.id))
  const diagrams = lesson.diagramIds.map(id => getDiagram(id)).filter(Boolean) as NonNullable<ReturnType<typeof getDiagram>>[]

  // Option D — fallback related lessons from same category
  const effectiveRelatedLessons = useMemo(() => {
    if (relatedLessons.length > 0) return relatedLessons
    return allLessons.filter(l => l.id !== lesson.id && l.category === lesson.category).slice(0, 3)
  }, [relatedLessons, allLessons, lesson.id, lesson.category])

  // Option A — module prev/next navigation
  const moduleNav = useMemo(() => {
    const mod = MOCK_MODULES.find(m => m.lessonIds.includes(lesson.id))
    if (!mod) return null
    const idx = mod.lessonIds.indexOf(lesson.id)
    const prevLesson = idx > 0 ? allLessons.find(l => l.id === mod.lessonIds[idx - 1]) ?? null : null
    const nextLesson = idx < mod.lessonIds.length - 1 ? allLessons.find(l => l.id === mod.lessonIds[idx + 1]) ?? null : null
    return { mod, prevLesson, nextLesson, isLast: idx === mod.lessonIds.length - 1 }
  }, [lesson.id, allLessons])

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
        <div className="lesson-body-wrap" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
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
              <button
                onClick={() => toggleBookmark(lesson.id)}
                title={bookmarkedLessonIds.includes(lesson.id) ? 'Remove bookmark' : 'Bookmark this lesson'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 8,
                  border: bookmarkedLessonIds.includes(lesson.id)
                    ? '1px solid rgba(201,168,76,0.4)'
                    : '1px solid var(--border-strong)',
                  background: bookmarkedLessonIds.includes(lesson.id)
                    ? 'rgba(201,168,76,0.12)'
                    : 'var(--surface-2)',
                  color: bookmarkedLessonIds.includes(lesson.id) ? '#C9A84C' : 'var(--text-tertiary)',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                <Bookmark size={14} fill={bookmarkedLessonIds.includes(lesson.id) ? 'currentColor' : 'none'} />
                {bookmarkedLessonIds.includes(lesson.id) ? 'Saved' : 'Save'}
              </button>
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

          {/* ── Notes ────────────────────────────────────────── */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Your Notes
              </p>
              {noteSaved && <span style={{ fontSize: 12, color: '#3DAB6E', fontWeight: 600 }}>Saved</span>}
            </div>
            <textarea
              key={lesson.id}
              defaultValue={lessonNotes[lesson.id] ?? ''}
              onBlur={e => {
                setLessonNote(lesson.id, e.target.value)
                setNoteSaved(true)
                setTimeout(() => setNoteSaved(false), 1500)
              }}
              placeholder="Your notes on this lesson..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface)',
                color: 'var(--text)',
                fontSize: 14,
                lineHeight: 1.6,
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* ── Body ──────────────────────────────────────────── */}
          {!hasCourseAccess(user) ? (
            <PaywallBanner type="course" />
          ) : lesson.body ? (
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

          {/* ── Mark Complete ─────────────────────────────────── */}
          <div style={{
            padding: '18px 20px',
            borderRadius: 10,
            border: `1px solid ${completedLessonIds.includes(lesson.id) ? 'rgba(61,171,110,0.35)' : 'var(--border)'}`,
            background: completedLessonIds.includes(lesson.id) ? 'rgba(61,171,110,0.06)' : 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                {completedLessonIds.includes(lesson.id) ? '✓ Lesson complete' : 'Done with this lesson?'}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
                {completedLessonIds.includes(lesson.id)
                  ? 'Marked as complete. It shows in your progress.'
                  : 'Mark it complete to track your progress across modules.'}
              </p>
            </div>
            {!completedLessonIds.includes(lesson.id) && (
              <button
                onClick={() => markCompleted(lesson.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: '1px solid rgba(61,171,110,0.5)',
                  background: 'rgba(61,171,110,0.1)',
                  color: '#3DAB6E',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(61,171,110,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(61,171,110,0.1)' }}
              >
                Mark Complete ✓
              </button>
            )}
          </div>

          {/* ── Module Navigation ─────────────────────────────── */}
          {moduleNav && (
            <div style={{ marginTop: 32 }}>
              {moduleNav.isLast && completedLessonIds.includes(lesson.id) ? (
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  borderRadius: 12,
                  background: 'rgba(61,171,110,0.06)',
                  border: '1px solid rgba(61,171,110,0.2)',
                }}>
                  <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#3DAB6E' }}>Module Complete!</p>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>{moduleNav.mod.title}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 12 }}>
                  {moduleNav.prevLesson ? (
                    <Link
                      to={`/lessons/${moduleNav.prevLesson.slug}`}
                      style={{
                        flex: 1,
                        padding: '14px 16px',
                        borderRadius: 10,
                        border: '1px solid var(--border-strong)',
                        background: 'var(--surface)',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>← Previous</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{moduleNav.prevLesson.title}</span>
                    </Link>
                  ) : <div style={{ flex: 1 }} />}
                  {moduleNav.nextLesson ? (
                    <Link
                      to={`/lessons/${moduleNav.nextLesson.slug}`}
                      style={{
                        flex: 1,
                        padding: '14px 16px',
                        borderRadius: 10,
                        border: `1px solid ${accentColor}30`,
                        background: `${accentColor}08`,
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: accentColor }}>Next →</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, textAlign: 'right' }}>{moduleNav.nextLesson.title}</span>
                    </Link>
                  ) : <div style={{ flex: 1 }} />}
                </div>
              )}
            </div>
          )}

          {/* ── Related Lessons ───────────────────────────────── */}
          {effectiveRelatedLessons.length > 0 && (
            <div style={{ marginTop: 32 }}>
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
                {relatedLessons.length > 0 ? 'Related Lessons' : 'More in This Category'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {effectiveRelatedLessons.map(l => (
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
