import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PenLine, Lock } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { parseVideoUrl } from '@/lib/videoUtils'
import { MOCK_LESSONS, MOCK_QUIZZES } from '@/lib/mockData'
import PageLoader, { usePageLoader } from '@/components/shared/PageLoader'
import type { LessonDraft, DraftStatus } from '@/types'
import PillBadge from '@/components/shared/PillBadge'

// ── Simplified Draft Card ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<DraftStatus, { label: string; color: string; bg: string; border: string }> = {
  draft:      { label: 'Draft',     color: 'var(--text-secondary)', bg: 'var(--surface-3)',          border: 'var(--border)' },
  reviewing:  { label: 'Reviewing', color: '#C9A84C',               bg: 'rgba(201,168,76,0.12)',      border: 'rgba(201,168,76,0.3)' },
  published:  { label: 'Published', color: '#3DAB6E',               bg: 'rgba(61,171,110,0.12)',      border: 'rgba(61,171,110,0.3)' },
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
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { updateDraft, deleteDraft, publishDraft } = useAppStore()
  const accentHex = draft.pillar === 'racing' ? '#E8322A' : '#4A9EDB'

  const cycleStatus = () => {
    const next: Record<DraftStatus, DraftStatus> = { draft: 'reviewing', reviewing: 'published', published: 'draft' }
    updateDraft(draft.id, { status: next[draft.status] })
  }

  return (
    <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderLeft: `3px solid ${accentHex}50` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
          <PillBadge pillar={draft.pillar} />
          <StatusBadge status={draft.status} />
        </div>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          {draft.generatedTitle ?? draft.topic}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <button onClick={cycleStatus} style={btnStyle}>Status ↻</button>
        {draft.status !== 'published' && (
          <button
            onClick={() => publishDraft(draft.id, { emoji: draft.pillar === 'racing' ? 'Flag' : 'Wrench', conceptIds: [] })}
            style={{ ...btnStyle, color: '#3DAB6E', borderColor: 'rgba(61,171,110,0.4)', background: 'rgba(61,171,110,0.08)' }}
          >
            Publish →
          </button>
        )}
        {confirmDelete ? (
          <>
            <button onClick={() => deleteDraft(draft.id)} style={{ ...btnStyle, color: '#E8322A', borderColor: 'rgba(232,50,42,0.4)' }}>
              Confirm
            </button>
            <button onClick={() => setConfirmDelete(false)} style={btnStyle}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} style={{ ...btnStyle, color: 'var(--text-tertiary)' }}>×</button>
        )}
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
  border: '1px solid var(--border)', background: 'transparent',
  color: 'var(--text-secondary)', cursor: 'pointer',
}

// ── Video Manager Row ──────────────────────────────────────────────────────────

function VideoManagerRow({ lessonId, title, emoji }: { lessonId: string; title: string; emoji: string }) {
  const videoUrls = useAppStore(s => s.videoUrls)
  const setVideoUrl = useAppStore(s => s.setVideoUrl)
  const removeVideoUrl = useAppStore(s => s.removeVideoUrl)
  const currentUrl = videoUrls[lessonId] ?? ''
  const [inputVal, setInputVal] = useState(currentUrl)
  const [saved, setSaved] = useState(false)
  const embedOk = !!parseVideoUrl(inputVal)
  const hasVideo = !!currentUrl

  const handleSave = () => {
    if (!inputVal.trim()) removeVideoUrl(lessonId)
    else setVideoUrl(lessonId, inputVal.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, borderLeft: `3px solid ${hasVideo ? '#3DAB6E' : 'var(--border)'}` }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="url"
            placeholder="Paste YouTube or Vimeo URL…"
            value={inputVal}
            onChange={e => { setInputVal(e.target.value); setSaved(false) }}
            style={{
              flex: 1, padding: '6px 10px', borderRadius: 6, fontSize: 13, outline: 'none',
              border: `1px solid ${inputVal && !embedOk ? '#E8322A60' : 'var(--border-strong)'}`,
              background: 'var(--surface-2)', color: 'var(--text)',
            }}
          />
          <button
            onClick={handleSave}
            disabled={!!inputVal && !embedOk}
            style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 700,
              border: '1px solid', cursor: inputVal && !embedOk ? 'not-allowed' : 'pointer',
              borderColor: saved ? '#3DAB6E' : 'var(--border)',
              background: saved ? 'rgba(61,171,110,0.12)' : 'transparent',
              color: saved ? '#3DAB6E' : 'var(--text-secondary)',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            {saved ? '✓ Saved' : inputVal ? 'Save URL' : 'Clear'}
          </button>
        </div>
      </div>
      <span style={{
        fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, flexShrink: 0,
        color: hasVideo ? '#3DAB6E' : 'var(--text-tertiary)',
        background: hasVideo ? 'rgba(61,171,110,0.12)' : 'var(--surface-2)',
        border: `1px solid ${hasVideo ? 'rgba(61,171,110,0.3)' : 'var(--border)'}`,
      }}>
        {hasVideo ? '▶ Recorded' : '⏳ Pending'}
      </span>
    </div>
  )
}

// ── Video Prep Card ────────────────────────────────────────────────────────────

function VideoPrepCard({ lesson }: { lesson: typeof MOCK_LESSONS[0] }) {
  const [open, setOpen] = useState(false)
  const quiz = MOCK_QUIZZES.find(q => q.lessonId === lesson.id)
  const accentHex = lesson.pillar === 'racing' ? '#E8322A' : '#4A9EDB'

  return (
    <div className="card" style={{ overflow: 'hidden', borderLeft: `3px solid ${accentHex}50` }}>
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>{lesson.emoji}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
              <PillBadge pillar={lesson.pillar} />
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {lesson.difficulty}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {lesson.title}
            </p>
          </div>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          ▾
        </span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* What to cover */}
          <div style={{ padding: '16px 20px', borderBottom: quiz ? '1px solid var(--border)' : undefined }}>
            <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              What to cover
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: accentHex, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 1 }}>•</span>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz Q&A */}
          {quiz && (
            <div style={{ padding: '16px 20px' }}>
              <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Quiz Q&A — mention these
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {quiz.questions.map((q, i) => (
                  <div key={q.id} style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)' }}>
                    <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.45 }}>
                      <span style={{ color: accentHex, marginRight: 6 }}>Q{i + 1}.</span>
                      {q.question}
                    </p>
                    <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: '#3DAB6E', lineHeight: 1.45 }}>
                      ✓ {q.options[q.correctIndex]}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.55, fontStyle: 'italic' }}>
                      {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

type Tab = 'prep' | 'drafts' | 'videos'

export default function CreatorDashboard() {
  const navigate = useNavigate()
  const [loading, done] = usePageLoader(180)
  const drafts = useAppStore(s => s.drafts)
  const publishedLessons = useAppStore(s => s.publishedLessons)
  const videoUrls = useAppStore(s => s.videoUrls)
  const [tab, setTab] = useState<Tab>('prep')

  const allLessons = [...MOCK_LESSONS, ...publishedLessons]
  const recordedCount = allLessons.filter(l => !!(videoUrls[l.id] ?? l.videoUrl)).length

  const TabBtn = ({ id, label }: { id: Tab; label: string }) => (
    <button
      onClick={() => setTab(id)}
      style={{
        padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
        background: tab === id ? 'var(--surface-2)' : 'transparent',
        color: tab === id ? 'var(--text)' : 'var(--text-tertiary)',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )

  if (loading) return <PageLoader icon={<PenLine size={40} />} label="Creator" color="#C9A84C" duration={180} onDone={done} />

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: 'clamp(20px, 4vw, 40px) 24px 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Creator
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              {tab === 'prep' ? 'Video Guide' : tab === 'drafts' ? 'Drafts' : 'Videos'}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link to="/creator/generate" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14, whiteSpace: 'nowrap' }}>
                ⚡ Generate Lesson
              </Link>
              <button
                onClick={() => { sessionStorage.removeItem('creatorAuth'); navigate('/') }}
                title="Lock creator access"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: '1px solid var(--border)', background: 'var(--surface-2)',
                  color: 'var(--text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,50,42,0.4)'; e.currentTarget.style.color = '#E8322A' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                <Lock size={13} />
                Lock Creator
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--border)', marginBottom: -1 }}>
            <TabBtn id="prep"   label="Video Guide" />
            <TabBtn id="drafts" label={`Drafts${drafts.length ? ` (${drafts.length})` : ''}`} />
            <TabBtn id="videos" label={`Videos (${recordedCount}/${allLessons.length})`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(16px, 3.5vw, 32px) 24px' }}>

        {/* ── Video Guide ── */}
        {tab === 'prep' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Click any lesson to see what to cover and what quiz questions to mention in your recording.
            </p>
            {allLessons.map(lesson => (
              <VideoPrepCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}

        {/* ── Drafts ── */}
        {tab === 'drafts' && (
          drafts.length === 0 ? (
            <div style={{ padding: 'clamp(40px, 8vw, 80px) 24px', textAlign: 'center', border: '1px dashed var(--border-strong)', borderRadius: 14 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
              <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>No drafts yet</h2>
              <p style={{ margin: '0 0 28px', fontSize: 15, color: 'var(--text-secondary)' }}>Generate your first lesson draft to get started.</p>
              <Link to="/creator/generate" className="btn-primary" style={{ textDecoration: 'none' }}>⚡ Generate a Lesson</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {drafts.map(draft => <DraftCard key={draft.id} draft={draft} />)}
            </div>
          )
        )}

        {/* ── Videos ── */}
        {tab === 'videos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allLessons.map(lesson => (
              <VideoManagerRow key={lesson.id} lessonId={lesson.id} title={lesson.title} emoji={lesson.emoji} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
