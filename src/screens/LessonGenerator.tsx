import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppStore } from '@/lib/store'
import { generateDraft, type GenerateInput, type GenerateOutput } from '@/lib/generate'
import { Flag, Wrench, Wand2 } from 'lucide-react'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import type { Pillar, Difficulty, LessonCategory, LessonDraft } from '@/types'
import PillBadge from '@/components/shared/PillBadge'
import DifficultyBadge from '@/components/shared/DifficultyBadge'

// ── Category options per pillar ───────────────────────────────────────────────

const RACING_CATEGORIES: { value: LessonCategory; label: string }[] = [
  { value: 'racecraft', label: 'Racecraft' },
  { value: 'braking', label: 'Braking' },
  { value: 'cornering', label: 'Cornering' },
  { value: 'overtaking', label: 'Overtaking' },
  { value: 'defense', label: 'Defense' },
  { value: 'sim-technique', label: 'Sim Technique' },
  { value: 'strategy', label: 'Strategy' },
]

const CAR_CATEGORIES: { value: LessonCategory; label: string }[] = [
  { value: 'suspension', label: 'Suspension' },
  { value: 'brakes', label: 'Brakes' },
  { value: 'drivetrain', label: 'Drivetrain' },
  { value: 'tires', label: 'Tires' },
  { value: 'aerodynamics', label: 'Aerodynamics' },
  { value: 'engine', label: 'Engine' },
  { value: 'setup', label: 'Setup' },
]

const GENERATING_STEPS = [
  'Analyzing topic...',
  'Drafting structure...',
  'Writing takeaways...',
  'Building quiz questions...',
  'Composing script outline...',
  'Finalizing draft...',
]

// ── Subcomponents ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: '0 0 10px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
    }}>
      {children}
    </p>
  )
}

function OutputSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: '20px 24px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10,
    }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: copied ? 'var(--diff-beginner)' : 'var(--text-tertiary)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        letterSpacing: '0.04em',
        transition: 'color 0.15s',
      }}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LessonGenerator() {
  const [loading, done] = usePageLoader(360)
  const navigate = useNavigate()
  const addDraft = useAppStore(s => s.addDraft)

  // Form state
  const [topic, setTopic] = useState('')
  const [pillar, setPillar] = useState<Pillar>('racing')
  const [category, setCategory] = useState<LessonCategory>('braking')
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate')
  const [goal, setGoal] = useState('')

  // Generation state
  const [generating, setGenerating] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [output, setOutput] = useState<GenerateOutput | null>(null)
  const [saved, setSaved] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const categories = pillar === 'racing' ? RACING_CATEGORIES : CAR_CATEGORIES

  const handlePillarChange = (p: Pillar) => {
    setPillar(p)
    setCategory(p === 'racing' ? 'braking' : 'suspension')
  }

  const canGenerate = topic.trim().length > 2 && goal.trim().length > 5

  const handleGenerate = async () => {
    if (!canGenerate || generating) return
    setOutput(null)
    setSaved(false)
    setGenError(null)
    setGenerating(true)
    setStepIndex(0)

    // Animate steps while API call is in flight
    const input: GenerateInput = { topic: topic.trim(), pillar, category, difficulty, goal: goal.trim() }
    const stepInterval = setInterval(() => {
      setStepIndex(i => Math.min(i + 1, GENERATING_STEPS.length - 1))
    }, 600)

    try {
      const result = await generateDraft(input)
      clearInterval(stepInterval)
      setOutput(result)
    } catch (err) {
      clearInterval(stepInterval)
      const message = err instanceof Error ? err.message : 'Generation failed. Please try again.'
      setGenError(message)
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = () => {
    if (!output) return
    const now = new Date().toISOString()
    const draft: LessonDraft = {
      id: `draft-${Date.now()}`,
      topic: topic.trim(),
      pillar,
      category,
      difficulty,
      goal: goal.trim(),
      status: 'draft',
      createdAt: now,
      updatedAt: now,
      ...output,
    }
    addDraft(draft)
    setSaved(true)
    setTimeout(() => navigate('/creator'), 800)
  }

  const accentColor = pillar === 'racing' ? 'var(--red)' : 'var(--pillar-car)'
  const accentHex = pillar === 'racing' ? '#E8322A' : '#4A9EDB'

  if (loading) return <PageLoader icon={<Wand2 size={40} />} label="Lesson Generator" color="#C9A84C" duration={360} onDone={done} />
  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(16px, 3.5vw, 32px) 24px 24px',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link to="/creator" style={{ fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'none' }}>
            ← Creator
          </Link>
          <div style={{ marginTop: 14 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              Creator Tool
            </p>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Generate Lesson Draft
            </h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(20px, 4vw, 36px) 24px clamp(40px, 8vw, 80px)' }}>
        {/* ── Form ────────────────────────────────────────────────── */}
        <div style={{
          padding: '28px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          marginBottom: 24,
        }}>
          <h2 style={{ margin: '0 0 24px', fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Lesson Brief
          </h2>

          {/* Topic */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Topic <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Heel-Toe Downshifting, Oversteer Management, Tire Scrub..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface-2)',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = accentHex)}
              onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
            />
          </div>

          {/* Pillar */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Pillar
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {([
                { value: 'racing' as Pillar, label: 'Racing',       icon: <Flag size={14} /> },
                { value: 'car' as Pillar,    label: 'Car Knowledge', icon: <Wrench size={14} /> },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handlePillarChange(opt.value)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    border: '1px solid',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.15s',
                    borderColor: pillar === opt.value
                      ? (opt.value === 'racing' ? '#E8322A' : '#4A9EDB')
                      : 'var(--border)',
                    background: pillar === opt.value
                      ? (opt.value === 'racing' ? 'rgba(232,50,42,0.1)' : 'rgba(74,158,219,0.1)')
                      : 'transparent',
                    color: pillar === opt.value
                      ? (opt.value === 'racing' ? '#E8322A' : '#4A9EDB')
                      : 'var(--text-secondary)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {opt.icon}{opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category + Difficulty row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as LessonCategory)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--border-strong)',
                  background: 'var(--surface-2)',
                  color: 'var(--text)',
                  fontSize: 14,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Difficulty
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    style={{
                      flex: 1,
                      padding: '9px 4px',
                      borderRadius: 7,
                      border: '1px solid',
                      cursor: 'pointer',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      transition: 'all 0.15s',
                      borderColor: difficulty === d
                        ? (d === 'beginner' ? '#3DAB6E' : d === 'intermediate' ? '#C9A84C' : '#E8322A')
                        : 'var(--border)',
                      background: difficulty === d
                        ? (d === 'beginner' ? 'rgba(61,171,110,0.12)' : d === 'intermediate' ? 'rgba(201,168,76,0.12)' : 'rgba(232,50,42,0.12)')
                        : 'transparent',
                      color: difficulty === d
                        ? (d === 'beginner' ? '#3DAB6E' : d === 'intermediate' ? '#C9A84C' : '#E8322A')
                        : 'var(--text-tertiary)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Goal */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Learning Goal <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <textarea
              placeholder="What should the reader understand or be able to do after this lesson? e.g. 'Understand why the brake release timing matters as much as the braking point itself'"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface-2)',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
                resize: 'vertical',
                lineHeight: 1.55,
                fontFamily: 'inherit',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = accentHex)}
              onBlur={e => (e.target.style.borderColor = 'var(--border-strong)')}
            />
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || generating}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: 15,
              opacity: (!canGenerate || generating) ? 0.5 : 1,
              cursor: (!canGenerate || generating) ? 'not-allowed' : 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            {generating ? `${GENERATING_STEPS[stepIndex]}` : '⚡ Generate Draft'}
          </button>

          {/* Generating progress bar */}
          {generating && (
            <div style={{ marginTop: 12, height: 3, background: 'var(--surface-3)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: accentColor,
                borderRadius: 999,
                width: `${((stepIndex + 1) / GENERATING_STEPS.length) * 100}%`,
                transition: 'width 0.6s ease',
              }} />
            </div>
          )}

          {/* Error state */}
          {genError && (
            <div style={{
              marginTop: 12,
              padding: '12px 16px',
              borderRadius: 8,
              background: 'rgba(232,50,42,0.08)',
              border: '1px solid rgba(232,50,42,0.3)',
            }}>
              <p style={{ margin: 0, fontSize: 13, color: '#E8322A', lineHeight: 1.5 }}>
                {genError}
              </p>
            </div>
          )}
        </div>

        {/* ── Output ──────────────────────────────────────────────── */}
        {output && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'screen-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}>

            {/* Title & Summary */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--surface)',
              border: `1px solid ${accentHex}40`,
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <PillBadge pillar={pillar} />
                <DifficultyBadge difficulty={difficulty} />
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                {output.generatedTitle}
              </h2>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {output.generatedSummary}
              </p>
            </div>

            {/* Key Takeaways */}
            <OutputSection label="Key Takeaways">
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {output.generatedTakeaways.map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      background: `${accentHex}18`, border: `1px solid ${accentHex}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: accentColor, marginTop: 1,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t}</span>
                  </li>
                ))}
              </ol>
            </OutputSection>

            {/* Body */}
            <OutputSection label="Lesson Body">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <CopyButton text={output.generatedBody} />
              </div>
              {output.generatedBody.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) {
                  return (
                    <h3 key={i} style={{ margin: '16px 0 8px', fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                      {block.replace('## ', '')}
                    </h3>
                  )
                }
                return (
                  <p key={i} style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {block}
                  </p>
                )
              })}
            </OutputSection>

            {/* Glossary Suggestions */}
            <OutputSection label="Glossary Suggestions">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {output.generatedGlossarySuggestions.map((term, i) => (
                  <span key={i} style={{
                    padding: '5px 12px', borderRadius: 6,
                    fontSize: 13, fontWeight: 500,
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}>
                    {term}
                  </span>
                ))}
              </div>
            </OutputSection>

            {/* Quiz Questions */}
            <OutputSection label={`Quiz Questions (${output.generatedQuizQuestions.length})`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {output.generatedQuizQuestions.map((q, i) => (
                  <div key={q.id} style={{
                    padding: '14px 16px',
                    borderRadius: 8,
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                  }}>
                    <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                      Q{i + 1}: {q.question}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                      {q.options.map((opt, j) => (
                        <div key={j} style={{
                          display: 'flex', gap: 8, alignItems: 'flex-start',
                          fontSize: 13, color: j === q.correctIndex ? '#3DAB6E' : 'var(--text-tertiary)',
                        }}>
                          <span style={{ fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + j)}.</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                      Explanation: {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </OutputSection>

            {/* Recording Brief */}
            <OutputSection label="Recording Brief">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <CopyButton text={output.generatedRecordingBrief} />
              </div>
              <pre style={{
                margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
                whiteSpace: 'pre-wrap', fontFamily: 'inherit',
              }}>
                {output.generatedRecordingBrief}
              </pre>
            </OutputSection>

            {/* Script Outline */}
            <OutputSection label="Script Outline">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <CopyButton text={output.generatedScriptOutline} />
              </div>
              <pre style={{
                margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
                whiteSpace: 'pre-wrap', fontFamily: 'inherit',
              }}>
                {output.generatedScriptOutline}
              </pre>
            </OutputSection>

            {/* Save bar */}
            <div style={{
              position: 'sticky',
              bottom: 24,
              display: 'flex',
              gap: 10,
              justifyContent: 'flex-end',
              padding: '14px 16px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              backdropFilter: 'blur(8px)',
            }}>
              <button
                onClick={handleGenerate}
                className="btn-ghost"
                style={{ fontSize: 14 }}
              >
                Regenerate
              </button>
              <button
                onClick={handleSave}
                className="btn-primary"
                style={{ fontSize: 14, minWidth: 120, opacity: saved ? 0.7 : 1 }}
                disabled={saved}
              >
                {saved ? '✓ Saved' : 'Save Draft'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
