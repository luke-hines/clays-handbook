import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/lib/store'
import type { LessonDraft, DraftStatus } from '@/types'
import PillBadge from '@/components/shared/PillBadge'
import DifficultyBadge from '@/components/shared/DifficultyBadge'

const STATUS_CONFIG: Record<DraftStatus, { label: string; color: string; bg: string; border: string }> = {
  draft: {
    label: 'Draft',
    color: 'var(--text-secondary)',
    bg: 'var(--surface-3)',
    border: 'var(--border)',
  },
  reviewing: {
    label: 'Reviewing',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.12)',
    border: 'rgba(201,168,76,0.3)',
  },
  published: {
    label: 'Published',
    color: '#3DAB6E',
    bg: 'rgba(61,171,110,0.12)',
    border: 'rgba(61,171,110,0.3)',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  racecraft: 'Racecraft', braking: 'Braking', cornering: 'Cornering',
  overtaking: 'Overtaking', defense: 'Defense', 'sim-technique': 'Sim Technique',
  strategy: 'Strategy', suspension: 'Suspension', brakes: 'Brakes',
  drivetrain: 'Drivetrain', tires: 'Tires', aerodynamics: 'Aerodynamics',
  engine: 'Engine', setup: 'Setup',
}

function StatusBadge({ status }: { status: DraftStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '2px 8px',
      borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase',
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.label}
    </span>
  )
}

function DraftCard({ draft }: { draft: LessonDraft }) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { updateDraft, deleteDraft } = useAppStore()

  const accentHex = draft.pillar === 'racing' ? '#E8322A' : '#4A9EDB'
  const date = new Date(draft.updatedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  const cycleStatus = () => {
    const next: Record<DraftStatus, DraftStatus> = {
      draft: 'reviewing',
      reviewing: 'published',
      published: 'draft',
    }
    updateDraft(draft.id, { status: next[draft.status] })
  }

  return (
    <div
      className="card"
      style={{
        overflow: 'hidden',
        transition: 'border-color 0.15s',
        borderLeft: `3px solid ${accentHex}50`,
      }}
    >
      {/* Card header */}
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, justifyContent: 'space-between' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              <PillBadge pillar={draft.pillar} />
              <DifficultyBadge difficulty={draft.difficulty} />
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
                {CATEGORY_LABELS[draft.category] ?? draft.category}
              </span>
              <StatusBadge status={draft.status} />
            </div>
            <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
              {draft.generatedTitle ?? draft.topic}
            </h3>
            {draft.generatedSummary && (
              <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {draft.generatedSummary}
              </p>
            )}
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Updated {date}</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <button
              onClick={cycleStatus}
              title="Cycle status"
              style={{
                padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                border: '1px solid var(--border)', background: 'transparent',
                color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              Status ↻
            </button>

            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                border: '1px solid var(--border)', background: 'transparent',
                color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {expanded ? 'Collapse' : 'View'}
            </button>

            {confirmDelete ? (
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => deleteDraft(draft.id)}
                  style={{ padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid #E8322A', background: 'rgba(232,50,42,0.1)', color: '#E8322A', cursor: 'pointer' }}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  style={{ padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                title="Delete draft"
                style={{
                  width: 30, height: 30, borderRadius: 6, fontSize: 14,
                  border: '1px solid var(--border)', background: 'transparent',
                  color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8322A'; e.currentTarget.style.color = '#E8322A' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-tertiary)' }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)' }}>

          {/* Takeaways */}
          {draft.generatedTakeaways && draft.generatedTakeaways.length > 0 && (
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Takeaways
              </p>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {draft.generatedTakeaways.map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: accentHex, flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Body */}
          {draft.generatedBody && (
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Body
              </p>
              <div style={{ maxHeight: 200, overflow: 'hidden', position: 'relative' }}>
                {draft.generatedBody.split('\n\n').map((block, i) => {
                  if (block.startsWith('## ')) {
                    return <p key={i} style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{block.replace('## ', '')}</p>
                  }
                  return <p key={i} style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{block}</p>
                })}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, var(--surface))' }} />
              </div>
            </div>
          )}

          {/* Quiz questions count */}
          {draft.generatedQuizQuestions && draft.generatedQuizQuestions.length > 0 && (
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
                {draft.generatedQuizQuestions.length} quiz question{draft.generatedQuizQuestions.length > 1 ? 's' : ''} generated
              </span>
            </div>
          )}

          {/* Glossary suggestions */}
          {draft.generatedGlossarySuggestions && draft.generatedGlossarySuggestions.length > 0 && (
            <div style={{ padding: '12px 20px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginRight: 10 }}>
                Glossary
              </span>
              {draft.generatedGlossarySuggestions.map((term, i) => (
                <span key={i} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-tertiary)', marginRight: 6 }}>
                  {term}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function CreatorDashboard() {
  const drafts = useAppStore(s => s.drafts)

  const byStatus = (s: DraftStatus) => drafts.filter(d => d.status === s).length

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '40px 24px 28px',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Creator
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Draft Dashboard
            </h1>
            <Link to="/creator/generate" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14, whiteSpace: 'nowrap' }}>
              ⚡ Generate Lesson
            </Link>
          </div>

          {/* Stats */}
          {drafts.length > 0 && (
            <div style={{ display: 'flex', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Total', value: drafts.length, color: 'var(--text-secondary)' },
                { label: 'Draft', value: byStatus('draft'), color: 'var(--text-secondary)' },
                { label: 'Reviewing', value: byStatus('reviewing'), color: '#C9A84C' },
                { label: 'Published', value: byStatus('published'), color: '#3DAB6E' },
              ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: stat.color, letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Draft list */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {drafts.length === 0 ? (
          <div style={{
            padding: '80px 24px',
            textAlign: 'center',
            border: '1px dashed var(--border-strong)',
            borderRadius: 14,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              No drafts yet
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 15, color: 'var(--text-secondary)' }}>
              Generate your first lesson draft to get started.
            </p>
            <Link to="/creator/generate" className="btn-primary" style={{ textDecoration: 'none' }}>
              ⚡ Generate a Lesson
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {drafts.map(draft => (
              <DraftCard key={draft.id} draft={draft} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
