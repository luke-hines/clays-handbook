import { useState, useMemo } from 'react'
import { MOCK_CONCEPTS } from '@/lib/mockData'
import PillBadge from '@/components/shared/PillBadge'
import type { Pillar } from '@/types'

function ConceptCard({ concept }: { concept: (typeof MOCK_CONCEPTS)[0] }) {
  const [expanded, setExpanded] = useState(false)
  const paragraphs = concept.body.split('\n\n').filter(Boolean)

  return (
    <div
      id={concept.slug}
      className="card"
      style={{ overflow: 'hidden', transition: 'border-color 0.15s' }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 7 }}>
            <PillBadge pillar={concept.pillar} />
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            {concept.title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {concept.summary}
          </p>
        </div>
        <span
          style={{
            fontSize: 14,
            color: 'var(--text-tertiary)',
            flexShrink: 0,
            display: 'inline-block',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          ↓
        </span>
      </button>

      {expanded && (
        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid var(--border)' }}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [pillar, setPillar] = useState<Pillar | 'all'>('all')

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

  return (
    <div className="screen-enter" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '40px 24px 28px',
          background: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Reference
          </p>
          <h1 style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Glossary
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: 'var(--text-secondary)' }}>
            Key concepts, explained clearly.
          </p>

          <div style={{ position: 'relative', marginBottom: 16 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', fontSize: 14, pointerEvents: 'none' }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search concepts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 8,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface-2)',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { value: 'all' as const, label: 'All' },
              { value: 'racing' as const, label: '🏁 Racing' },
              { value: 'car' as const, label: '🔧 Car' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setPillar(opt.value)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  borderColor: pillar === opt.value ? 'var(--text-tertiary)' : 'var(--border)',
                  background: pillar === opt.value ? 'var(--surface-2)' : 'transparent',
                  color: pillar === opt.value ? 'var(--text)' : 'var(--text-secondary)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--text-tertiary)' }}>
          {filtered.length} {filtered.length === 1 ? 'concept' : 'concepts'}
        </p>

        {filtered.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)' }}>No concepts match your search.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(concept => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
