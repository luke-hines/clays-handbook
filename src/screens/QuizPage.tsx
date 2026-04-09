import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { MOCK_LESSONS, MOCK_QUIZZES } from '@/lib/mockData'
import { Trophy, CheckCircle2, BookOpen, HelpCircle } from 'lucide-react'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import Icon from '@/components/shared/Icon'

type AnswerState = number | null

export default function QuizPage() {
  const [loading, done] = usePageLoader(380)
  const { lessonSlug } = useParams<{ lessonSlug: string }>()

  const lesson = MOCK_LESSONS.find(l => l.slug === lessonSlug)
  const quiz = lesson ? MOCK_QUIZZES.find(q => q.lessonId === lesson.id) : undefined

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerState[]>([])
  const [selected, setSelected] = useState<AnswerState>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [finished, setFinished] = useState(false)

  if (!lesson || !quiz) return <Navigate to="/lessons" replace />

  if (loading) return (
    <PageLoader
      icon={lesson ? <Icon name={lesson.emoji} size={40} /> : <HelpCircle size={40} />}
      label={lesson ? `${lesson.title} — Quiz` : 'Quiz'}
      color={lesson?.pillar === 'racing' ? '#E8322A' : '#4A9EDB'}
      duration={380}
      onDone={done}
    />
  )

  const question = quiz.questions[currentIndex]
  const totalQuestions = quiz.questions.length
  const isLast = currentIndex === totalQuestions - 1

  const accentColor = lesson.pillar === 'racing' ? 'var(--red)' : 'var(--pillar-car)'
  const accentHex = lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB'

  const handleSelect = (idx: number) => {
    if (showExplanation) return
    setSelected(idx)
    setShowExplanation(true)
  }

  const handleNext = () => {
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    if (isLast) {
      setFinished(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setShowExplanation(false)
    }
  }

  // ── Results screen ──────────────────────────────────────────────
  if (finished) {
    const finalScore = [...answers].filter((a, i) => a === quiz.questions[i].correctIndex).length
    const pct = Math.round((finalScore / totalQuestions) * 100)

    return (
      <div className="screen-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: pct === 100 ? 'rgba(201,168,76,0.15)' : pct >= 66 ? 'rgba(61,171,110,0.15)' : 'rgba(74,158,219,0.15)',
            color: pct === 100 ? '#C9A84C' : pct >= 66 ? '#3DAB6E' : '#4A9EDB',
            boxShadow: `0 0 24px ${pct === 100 ? 'rgba(201,168,76,0.2)' : pct >= 66 ? 'rgba(61,171,110,0.2)' : 'rgba(74,158,219,0.2)'}`,
          }}>
            {pct === 100 ? <Trophy size={36} /> : pct >= 66 ? <CheckCircle2 size={36} /> : <BookOpen size={36} />}
          </div>

          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {pct === 100 ? 'Perfect.' : pct >= 66 ? 'Solid run.' : 'Keep studying.'}
          </h1>

          <p style={{ margin: '0 0 32px', fontSize: 16, color: 'var(--text-secondary)' }}>
            You got {finalScore} of {totalQuestions} correct
          </p>

          {/* Score ring */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: `4px solid ${accentHex}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{pct}%</span>
          </div>

          {/* Answer review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, textAlign: 'left' }}>
            {quiz.questions.map((q, i) => {
              const correct = answers[i] === q.correctIndex
              return (
                <div
                  key={q.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 10,
                    background: correct ? 'rgba(61,171,110,0.08)' : 'rgba(232,50,42,0.08)',
                    border: `1px solid ${correct ? 'rgba(61,171,110,0.25)' : 'rgba(232,50,42,0.25)'}`,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{correct ? '✓' : '✗'}</span>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{q.question}</p>
                    {!correct && (
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)' }}>
                        Correct: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`/lessons/${lesson.slug}`} className="btn-ghost" style={{ textDecoration: 'none' }}>
              ← Back to Lesson
            </Link>
            <button
              className="btn-primary"
              onClick={() => {
                setCurrentIndex(0)
                setAnswers([])
                setSelected(null)
                setShowExplanation(false)
                setFinished(false)
              }}
            >
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Question screen ─────────────────────────────────────────────
  const isCorrect = selected === question.correctIndex

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '20px 24px',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <Link to={`/lessons/${lesson.slug}`} style={{ fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'none' }}>
              ← {lesson.title}
            </Link>
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 999, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 999,
                background: accentColor,
                width: `${((currentIndex) / totalQuestions) * 100}%`,
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
        <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          Question {currentIndex + 1}
        </p>
        <h2 style={{ margin: '0 0 32px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.35, color: 'var(--text)' }}>
          {question.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {question.options.map((option, idx) => {
            const isSelected = selected === idx
            const isCorrectOption = idx === question.correctIndex
            let bg = 'var(--surface)'
            let border = 'var(--border-strong)'
            let color = 'var(--text-secondary)'

            if (showExplanation) {
              if (isCorrectOption) {
                bg = 'rgba(61,171,110,0.1)'
                border = '#3DAB6E'
                color = '#3DAB6E'
              } else if (isSelected && !isCorrectOption) {
                bg = 'rgba(232,50,42,0.1)'
                border = '#E8322A'
                color = '#E8322A'
              }
            } else if (isSelected) {
              bg = `${accentHex}12`
              border = accentHex
              color = 'var(--text)'
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  border: `1px solid ${border}`,
                  background: bg,
                  color,
                  fontSize: 14,
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: showExplanation ? 'default' : 'pointer',
                  transition: 'all 0.15s',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
                onMouseEnter={e => {
                  if (!showExplanation && selected === null) {
                    e.currentTarget.style.borderColor = 'var(--text-tertiary)'
                    e.currentTarget.style.color = 'var(--text)'
                  }
                }}
                onMouseLeave={e => {
                  if (!showExplanation && selected === null) {
                    e.currentTarget.style.borderColor = 'var(--border-strong)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    border: `1px solid currentColor`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                    opacity: 0.7,
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 10,
              background: isCorrect ? 'rgba(61,171,110,0.08)' : 'rgba(232,50,42,0.08)',
              border: `1px solid ${isCorrect ? 'rgba(61,171,110,0.3)' : 'rgba(232,50,42,0.3)'}`,
              marginBottom: 24,
            }}
          >
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: isCorrect ? '#3DAB6E' : '#E8322A' }}>
              {isCorrect ? '✓ Correct' : '✗ Not quite'}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <button
            className="btn-primary"
            onClick={handleNext}
            style={{ width: '100%', padding: '12px', fontSize: 15 }}
          >
            {isLast ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
