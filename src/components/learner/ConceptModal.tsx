import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Concept } from '@/types'
import { MOCK_CONCEPTS } from '@/lib/mockData'
import PillBadge from '@/components/shared/PillBadge'

interface Props {
  concept: Concept
  onClose: () => void
}

function renderParagraphs(text: string) {
  return text
    .split('\n\n')
    .filter(Boolean)
    .map((para, i) => (
      <p key={i} style={{ margin: '0 0 14px', color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: 14 }}>
        {para}
      </p>
    ))
}

export default function ConceptModal({ concept, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const related = MOCK_CONCEPTS.filter(c => concept.relatedConceptIds.includes(c.id))

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border-strong)',
          borderRadius: 16,
          maxWidth: 540,
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'screen-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ marginBottom: 8 }}>
              <PillBadge pillar={concept.pillar} />
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
              }}
            >
              {concept.title}
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {concept.summary}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--surface-3)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              width: 32,
              height: 32,
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: 18,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-3)')}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          <div>{renderParagraphs(concept.body)}</div>

          {related.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                Related Concepts
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {related.map(r => (
                  <Link
                    key={r.id}
                    to={`/glossary#${r.slug}`}
                    onClick={onClose}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: 'none',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      transition: 'border-color 0.15s, color 0.15s',
                    }}
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
