import { useState, useEffect, useMemo, useCallback } from 'react'
import { MOCK_CONCEPTS } from '@/lib/mockData'
import PillBadge from '@/components/shared/PillBadge'
import { Flag, Wrench, List, LayoutGrid, BookOpen, FlipHorizontal, Brain, Trophy, Flame, ThumbsUp, Search, Library } from 'lucide-react'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import type { Pillar } from '@/types'

type PageMode = 'browse' | 'study' | 'quiz'
type ViewMode = 'list' | 'grid'
type ConceptType = (typeof MOCK_CONCEPTS)[0]

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Linkify ───────────────────────────────────────────────────────────────────

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function linkifyParagraph(
  text: string,
  allConcepts: ConceptType[],
  selfId: string,
  onNavigate: (slug: string) => void,
): React.ReactNode[] {
  const targets = allConcepts
    .filter(c => c.id !== selfId)
    .sort((a, b) => b.title.length - a.title.length)
  if (!targets.length) return [text]

  const pattern = targets.map(c => escapeRegex(c.title)).join('|')
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi')
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    const matched = match[0]
    const concept = targets.find(c => c.title.toLowerCase() === matched.toLowerCase())
    if (concept) {
      const linkColor = concept.pillar === 'racing' ? '#E8322A' : '#4A9EDB'
      nodes.push(
        <a
          key={match.index}
          href={`#${concept.slug}`}
          onClick={e => { e.preventDefault(); onNavigate(concept.slug) }}
          title={concept.summary}
          style={{
            color: linkColor, fontWeight: 600, cursor: 'pointer',
            textDecoration: 'underline', textDecorationStyle: 'dotted',
            textDecorationColor: `${linkColor}80`, textUnderlineOffset: '3px',
            transition: 'text-decoration-color 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecorationColor = linkColor }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecorationColor = `${linkColor}80` }}
        >
          {matched}
        </a>
      )
    } else {
      nodes.push(matched)
    }
    lastIndex = match.index + matched.length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

// ── Browse: List card ─────────────────────────────────────────────────────────

function ListCard({
  concept, allConcepts, onNavigate, shouldExpand,
}: {
  concept: ConceptType
  allConcepts: ConceptType[]
  onNavigate: (slug: string) => void
  shouldExpand: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const paragraphs = concept.body.split('\n\n').filter(Boolean)

  useEffect(() => { if (shouldExpand) setExpanded(true) }, [shouldExpand])

  return (
    <div id={concept.slug} className="card" style={{ overflow: 'hidden', transition: 'border-color 0.15s', scrollMarginTop: 80 }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, textAlign: 'left' }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 7 }}><PillBadge pillar={concept.pillar} /></div>
          <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            {concept.title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {concept.summary}
          </p>
        </div>
        <span style={{ fontSize: 14, color: 'var(--text-tertiary)', flexShrink: 0, display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ↓
        </span>
      </button>
      {expanded && (
        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid var(--border)' }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {linkifyParagraph(para, allConcepts, concept.id, onNavigate)}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Browse: Grid card ─────────────────────────────────────────────────────────

function GridCard({ concept }: { concept: ConceptType }) {
  const accentColor = concept.pillar === 'racing' ? '#E8322A' : '#4A9EDB'
  return (
    <div id={concept.slug} className="card" style={{ overflow: 'hidden', borderTop: `3px solid ${accentColor}40`, padding: '16px 18px' }}>
      <div style={{ marginBottom: 8 }}><PillBadge pillar={concept.pillar} /></div>
      <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.25 }}>
        {concept.title}
      </h3>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {concept.summary}
      </p>
    </div>
  )
}

// ── Browse: View toggle ───────────────────────────────────────────────────────

function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div style={{ display: 'flex', gap: 2, background: 'var(--surface-2)', borderRadius: 8, padding: 3, border: '1px solid var(--border)' }}>
      {([
        { id: 'list' as ViewMode, icon: <List size={14} />, label: 'List' },
        { id: 'grid' as ViewMode, icon: <LayoutGrid size={14} />, label: 'Grid' },
      ]).map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
            borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            transition: 'all 0.15s',
            background: view === opt.id ? 'var(--surface)' : 'transparent',
            color: view === opt.id ? 'var(--text)' : 'var(--text-tertiary)',
            boxShadow: view === opt.id ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {opt.icon}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Study: Flashcards ─────────────────────────────────────────────────────────

function FlashcardStudy({ pool }: { pool: ConceptType[] }) {
  const [deck] = useState<ConceptType[]>(() => shuffle(pool))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<string>>(new Set())
  const [stillLearning, setStillLearning] = useState<Set<string>>(new Set())
  const [finished, setFinished] = useState(false)

  const card = deck[index]
  const accentColor = card?.pillar === 'racing' ? '#E8322A' : '#4A9EDB'
  const paragraphs = card?.body.split('\n\n').filter(Boolean) ?? []

  const goNext = useCallback(() => {
    setFlipped(false)
    setTimeout(() => {
      if (index + 1 >= deck.length) setFinished(true)
      else setIndex(i => i + 1)
    }, 180)
  }, [index, deck.length])

  const goPrev = useCallback(() => {
    if (index === 0) return
    setFlipped(false)
    setTimeout(() => setIndex(i => i - 1), 180)
  }, [index])

  const markKnown = () => {
    setKnown(k => new Set([...k, card.id]))
    setStillLearning(s => { const n = new Set(s); n.delete(card.id); return n })
    goNext()
  }

  const markStillLearning = () => {
    setStillLearning(s => new Set([...s, card.id]))
    setKnown(k => { const n = new Set(k); n.delete(card.id); return n })
    goNext()
  }

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (finished) return
      if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f) }
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev, finished])

  if (pool.length === 0) {
    return <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 15 }}>No concepts match this filter.</div>
  }

  if (finished) {
    const knownCount = known.size
    const learningCount = stillLearning.size
    const skipped = deck.length - knownCount - learningCount
    return (
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '48px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎓</div>
        <h2 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
          Deck complete
        </h2>
        <p style={{ margin: '0 0 32px', fontSize: 15, color: 'var(--text-secondary)' }}>
          {deck.length} cards reviewed
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {[
            { label: 'Know it', value: knownCount, color: '#3DAB6E', bg: 'rgba(61,171,110,0.12)', border: 'rgba(61,171,110,0.3)' },
            { label: 'Still learning', value: learningCount, color: '#C9A84C', bg: 'rgba(201,168,76,0.12)', border: 'rgba(201,168,76,0.3)' },
            { label: 'Skipped', value: skipped, color: 'var(--text-tertiary)', bg: 'var(--surface-2)', border: 'var(--border)' },
          ].map(s => (
            <div key={s.label} style={{ padding: '14px 24px', borderRadius: 12, background: s.bg, border: `1px solid ${s.border}`, minWidth: 100 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => { setIndex(0); setFlipped(false); setKnown(new Set()); setStillLearning(new Set()); setFinished(false) }}
          className="btn-primary"
          style={{ fontSize: 14 }}
        >
          Study Again
        </button>
      </div>
    )
  }

  const isKnown = known.has(card.id)
  const isLearning = stillLearning.has(card.id)

  return (
    <div style={{ maxWidth: 620, margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {index + 1} / {deck.length}
          </span>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-tertiary)' }}>
            <span style={{ color: '#3DAB6E' }}>✓ {known.size}</span>
            <span style={{ color: '#C9A84C' }}>↺ {stillLearning.size}</span>
          </div>
        </div>
        <div style={{ height: 3, background: 'var(--surface-2)', borderRadius: 999 }}>
          <div style={{ height: '100%', width: `${(index / deck.length) * 100}%`, background: accentColor, borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Flip hint */}
      <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center', letterSpacing: '0.03em' }}>
        Click card to flip · Space · ← →
      </p>

      {/* Card */}
      <div className="flashcard-scene" style={{ marginBottom: 20 }}>
        <div
          className={`flashcard-card${flipped ? ' flipped' : ''}`}
          onClick={() => setFlipped(f => !f)}
        >
          {/* Front */}
          <div
            className="flashcard-face"
            style={{
              background: `linear-gradient(145deg, var(--surface-2) 0%, var(--surface) 100%)`,
              border: `1px solid ${accentColor}30`,
              boxShadow: `0 0 32px ${accentColor}12, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <div style={{ marginBottom: 16 }}><PillBadge pillar={card.pillar} /></div>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', textAlign: 'center', lineHeight: 1.2 }}>
              {card.title}
            </h2>
            <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}>
              tap to reveal definition
            </p>
          </div>

          {/* Back */}
          <div
            className="flashcard-face flashcard-back"
            style={{
              background: `linear-gradient(145deg, var(--surface-2) 0%, var(--surface) 100%)`,
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 32px ${accentColor}18, inset 0 1px 0 rgba(255,255,255,0.06)`,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              overflowY: 'auto',
            }}
          >
            <div style={{ marginBottom: 10 }}><PillBadge pillar={card.pillar} /></div>
            <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800, color: accentColor, letterSpacing: '-0.01em' }}>
              {card.title}
            </h3>
            <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.5 }}>
              {card.summary}
            </p>
            {paragraphs[0] && (
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={goPrev}
          disabled={index === 0}
          style={{
            padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            border: '1px solid var(--border)', background: 'transparent',
            color: index === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
            cursor: index === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
          }}
        >
          ← Back
        </button>

        {flipped && (
          <>
            <button
              onClick={markStillLearning}
              style={{
                padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                border: `1px solid ${isLearning ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.3)'}`,
                background: isLearning ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.08)',
                color: '#C9A84C', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              ↺ Still learning
            </button>
            <button
              onClick={markKnown}
              style={{
                padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                border: `1px solid ${isKnown ? 'rgba(61,171,110,0.6)' : 'rgba(61,171,110,0.3)'}`,
                background: isKnown ? 'rgba(61,171,110,0.15)' : 'rgba(61,171,110,0.08)',
                color: '#3DAB6E', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              ✓ Know it
            </button>
          </>
        )}

        <button
          onClick={goNext}
          style={{
            padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          Skip →
        </button>
      </div>

      {/* Status pill if already marked */}
      {(isKnown || isLearning) && (
        <p style={{ textAlign: 'center', fontSize: 12, color: isKnown ? '#3DAB6E' : '#C9A84C', margin: 0 }}>
          {isKnown ? '✓ Marked as known' : '↺ Marked as still learning'}
        </p>
      )}
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

interface QuizQuestion {
  concept: ConceptType
  options: ConceptType[]
  correctIndex: number
}

function buildQuestions(pool: ConceptType[]): QuizQuestion[] {
  if (pool.length < 4) return []
  return shuffle(pool).map(concept => {
    const distractors = shuffle(pool.filter(c => c.id !== concept.id)).slice(0, 3)
    const options = shuffle([concept, ...distractors])
    return { concept, options, correctIndex: options.indexOf(concept) }
  })
}

function VocabQuiz({ pool }: { pool: ConceptType[] }) {
  const [questions] = useState<QuizQuestion[]>(() => buildQuestions(pool))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[index]

  if (pool.length < 4) {
    return (
      <div style={{ padding: '64px 24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        <p style={{ fontSize: 15 }}>Need at least 4 concepts in this filter to run a quiz.</p>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const grade = pct === 100 ? 'Perfect' : pct >= 80 ? 'Strong' : pct >= 60 ? 'Decent' : 'Keep studying'
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 0', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: pct === 100 ? 'rgba(201,168,76,0.15)' : pct >= 80 ? 'rgba(232,50,42,0.15)' : pct >= 60 ? 'rgba(61,171,110,0.15)' : 'rgba(74,158,219,0.15)',
          color: pct === 100 ? '#C9A84C' : pct >= 80 ? '#E8322A' : pct >= 60 ? '#3DAB6E' : '#4A9EDB',
        }}>
          {pct === 100 ? <Trophy size={32} /> : pct >= 80 ? <Flame size={32} /> : pct >= 60 ? <ThumbsUp size={32} /> : <BookOpen size={32} />}
        </div>
        <h2 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
          {score} / {questions.length}
        </h2>
        <p style={{ margin: '0 0 4px', fontSize: 16, color: 'var(--text-secondary)' }}>{pct}% correct</p>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: 'var(--text-tertiary)' }}>{grade}</p>
        <button onClick={() => { setIndex(0); setSelected(null); setScore(0); setDone(false) }} className="btn-primary" style={{ fontSize: 14 }}>
          Try Again
        </button>
      </div>
    )
  }

  const advance = () => { setSelected(null); if (index + 1 >= questions.length) setDone(true); else setIndex(i => i + 1) }
  const choose = (i: number) => { if (selected !== null) return; setSelected(i); if (i === q.correctIndex) setScore(s => s + 1) }
  const answered = selected !== null
  const accentColor = q.concept.pillar === 'racing' ? '#E8322A' : '#4A9EDB'

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Question {index + 1} of {questions.length}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{score} correct</span>
        </div>
        <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(index / questions.length) * 100}%`, background: accentColor, borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ marginBottom: 24, padding: '24px', borderRadius: 12, background: 'var(--surface)', border: `1px solid var(--border)`, borderLeft: `3px solid ${accentColor}` }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          What term matches this definition?
        </p>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--text)', lineHeight: 1.6, fontWeight: 500 }}>
          {q.concept.summary}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex
          const isChosen = i === selected
          let bg = 'var(--surface)', border = 'var(--border-strong)', color = 'var(--text-secondary)'
          if (answered) {
            if (isCorrect) { bg = 'rgba(61,171,110,0.12)'; border = '#3DAB6E'; color = '#3DAB6E' }
            else if (isChosen) { bg = 'rgba(232,50,42,0.1)'; border = '#E8322A'; color = '#E8322A' }
          }
          return (
            <button
              key={opt.id}
              onClick={() => choose(i)}
              disabled={answered}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 10, border: `1px solid ${border}`,
                background: bg, color, fontSize: 14, fontWeight: 600, textAlign: 'left',
                cursor: answered ? 'default' : 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
              onMouseEnter={e => { if (!answered) e.currentTarget.style.borderColor = accentColor }}
              onMouseLeave={e => { if (!answered) e.currentTarget.style.borderColor = 'var(--border-strong)' }}
            >
              <span style={{
                width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                background: answered && isCorrect ? '#3DAB6E20' : answered && isChosen ? '#E8322A20' : 'var(--surface-2)',
                color: answered && isCorrect ? '#3DAB6E' : answered && isChosen ? '#E8322A' : 'var(--text-tertiary)',
                border: `1px solid ${answered && isCorrect ? '#3DAB6E40' : answered && isChosen ? '#E8322A40' : 'var(--border)'}`,
              }}>
                {answered && isCorrect ? '✓' : answered && isChosen ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {opt.title}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          <div style={{ padding: '16px 20px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 16 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: selected === q.correctIndex ? '#3DAB6E' : '#E8322A' }}>
              {selected === q.correctIndex ? '✓ Correct' : '✗ Incorrect'}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>{q.concept.title}</strong>: {q.concept.summary}
            </p>
          </div>
          <button onClick={advance} className="btn-primary" style={{ width: '100%', fontSize: 14, padding: '12px' }}>
            {index + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </button>
        </>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  const [loading, done] = usePageLoader(360)
  const [search, setSearch] = useState('')
  const [pillar, setPillar] = useState<Pillar | 'all'>('all')
  const [pageMode, setPageMode] = useState<PageMode>('browse')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return MOCK_CONCEPTS.filter(c => {
      if (pillar !== 'all' && c.pillar !== pillar) return false
      if (search) {
        const q = search.toLowerCase()
        return c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)
      }
      return true
    })
  }, [search, pillar])

  const handleNavigate = useCallback((slug: string) => {
    setPageMode('browse')
    setViewMode('list')
    setPillar('all')
    setSearch('')
    setActiveSlug(slug)
    requestAnimationFrame(() => {
      const el = document.getElementById(slug)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const ModeTab = ({ id, label, icon }: { id: PageMode; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setPageMode(id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px',
        borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
        transition: 'all 0.15s',
        background: pageMode === id ? 'var(--surface-2)' : 'transparent',
        color: pageMode === id ? 'var(--text)' : 'var(--text-tertiary)',
        boxShadow: pageMode === id ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {icon}
      {label}
    </button>
  )

  if (loading) return <PageLoader icon={<Library size={30} />} label="Glossary" color="#4A9EDB" duration={360} onDone={done} />
  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '40px 24px 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Reference
          </p>
          <h1 style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Glossary
          </h1>
          <p style={{ margin: '0 0 20px', fontSize: 15, color: 'var(--text-secondary)' }}>
            Key concepts, explained clearly.
          </p>

          {/* Search + filters — hide during study/quiz */}
          {pageMode === 'browse' && (
            <>
              <div style={{ position: 'relative', maxWidth: 400, marginBottom: 16 }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex' }}><Search size={14} /></span>
                <input
                  type="text"
                  placeholder="Search concepts..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', color: 'var(--text)', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                {([
                  { value: 'all' as const, label: 'All', icon: null },
                  { value: 'racing' as const, label: 'Racing', icon: <Flag size={11} /> },
                  { value: 'car' as const, label: 'Car', icon: <Wrench size={11} /> },
                ]).map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setPillar(opt.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '5px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                      border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                      borderColor: pillar === opt.value ? 'var(--text-tertiary)' : 'var(--border)',
                      background: pillar === opt.value ? 'var(--surface-2)' : 'transparent',
                      color: pillar === opt.value ? 'var(--text)' : 'var(--text-secondary)',
                    }}
                  >
                    {opt.icon}{opt.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Pillar filter for study/quiz too */}
          {pageMode !== 'browse' && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {([
                { value: 'all' as const, label: 'All', icon: null },
                { value: 'racing' as const, label: 'Racing', icon: <Flag size={11} /> },
                { value: 'car' as const, label: 'Car', icon: <Wrench size={11} /> },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setPillar(opt.value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '5px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                    border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                    borderColor: pillar === opt.value ? 'var(--text-tertiary)' : 'var(--border)',
                    background: pillar === opt.value ? 'var(--surface-2)' : 'transparent',
                    color: pillar === opt.value ? 'var(--text)' : 'var(--text-secondary)',
                  }}
                >
                  {opt.icon}{opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--border)', marginBottom: -1 }}>
            <ModeTab id="browse" icon={<BookOpen size={15} />}      label="Browse" />
            <ModeTab id="study"  icon={<FlipHorizontal size={15} />} label="Study"  />
            <ModeTab id="quiz"   icon={<Brain size={15} />}          label="Quiz"   />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
        {pageMode === 'browse' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-tertiary)' }}>
                {filtered.length} {filtered.length === 1 ? 'concept' : 'concepts'}
              </p>
              <ViewToggle view={viewMode} onChange={setViewMode} />
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <div style={{ fontSize: 36, marginBottom: 12, color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'center' }}><Search size={36} /></div>
                <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)' }}>No concepts match your search.</p>
              </div>
            ) : viewMode === 'list' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map(concept => (
                  <ListCard
                    key={concept.id}
                    concept={concept}
                    allConcepts={MOCK_CONCEPTS}
                    onNavigate={handleNavigate}
                    shouldExpand={activeSlug === concept.slug}
                  />
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {filtered.map(concept => (
                  <GridCard key={concept.id} concept={concept} />
                ))}
              </div>
            )}
          </>
        )}

        {pageMode === 'study' && (
          <FlashcardStudy key={`study-${pillar}`} pool={filtered} />
        )}

        {pageMode === 'quiz' && (
          <VocabQuiz key={`quiz-${pillar}`} pool={filtered} />
        )}
      </div>
    </div>
  )
}
