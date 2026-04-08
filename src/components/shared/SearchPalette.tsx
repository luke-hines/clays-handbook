import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_LESSONS, MOCK_CONCEPTS, MOCK_MODULES } from '@/lib/mockData'
import { useAppStore } from '@/lib/store'
import Icon from '@/components/shared/Icon'

import type { Lesson } from '@/types'

interface SearchResult {
  id: string
  type: 'lesson' | 'concept' | 'module'
  title: string
  subtitle: string
  emoji: string
  url: string
}

function buildIndex(publishedLessons: Lesson[]): SearchResult[] {
  const results: SearchResult[] = []

  const allLessons = [...MOCK_LESSONS, ...publishedLessons]

  for (const l of allLessons) {
    results.push({
      id: l.id,
      type: 'lesson',
      title: l.title,
      subtitle: l.summary,
      emoji: l.emoji,
      url: `/lessons/${l.slug}`,
    })
  }

  for (const c of MOCK_CONCEPTS) {
    results.push({
      id: c.id,
      type: 'concept',
      title: c.title,
      subtitle: c.summary,
      emoji: c.pillar === 'racing' ? 'Flag' : 'Wrench',
      url: `/glossary`,
    })
  }

  for (const m of MOCK_MODULES) {
    results.push({
      id: m.id,
      type: 'module',
      title: m.title,
      subtitle: m.description,
      emoji: m.emoji,
      url: `/modules`,
    })
  }

  return results
}

function score(result: SearchResult, q: string): number {
  const lq = q.toLowerCase()
  const titleLower = result.title.toLowerCase()
  const subtitleLower = result.subtitle.toLowerCase()

  if (titleLower === lq) return 100
  if (titleLower.startsWith(lq)) return 80
  if (titleLower.includes(lq)) return 60
  if (subtitleLower.includes(lq)) return 30
  return 0
}

const TYPE_LABEL: Record<SearchResult['type'], string> = {
  lesson: 'Lesson',
  concept: 'Concept',
  module: 'Module',
}

const TYPE_COLOR: Record<SearchResult['type'], string> = {
  lesson: 'var(--red)',
  concept: '#C9A84C',
  module: '#4A9EDB',
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchPalette({ open, onClose }: Props) {
  const navigate = useNavigate()
  const publishedLessons = useAppStore(s => s.publishedLessons)
  const index = useMemo(() => buildIndex(publishedLessons), [publishedLessons])

  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim()
    return index
      .map(r => ({ ...r, _score: score(r, q) }))
      .filter(r => r._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 12)
  }, [query, index])

  // Reset when opening
  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Clamp cursor
  useEffect(() => {
    setCursor(c => Math.min(c, Math.max(results.length - 1, 0)))
  }, [results.length])

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const select = useCallback((result: SearchResult) => {
    navigate(result.url)
    onClose()
  }, [navigate, onClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)); return }
    if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); return }
    if (e.key === 'Enter' && results[cursor]) { select(results[cursor]); return }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 200,
        }}
      />

      {/* Palette */}
      <div
        style={{
          position: 'fixed',
          top: '12vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(600px, calc(100vw - 32px))',
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 14,
          overflow: 'hidden',
          zIndex: 201,
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 16, color: 'var(--text-tertiary)', flexShrink: 0 }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons, concepts, modules…"
            value={query}
            onChange={e => { setQuery(e.target.value); setCursor(0) }}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 16,
              color: 'var(--text)',
              fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: 11,
            padding: '2px 6px',
            borderRadius: 4,
            border: '1px solid var(--border-strong)',
            color: 'var(--text-tertiary)',
            background: 'var(--surface-2)',
            flexShrink: 0,
          }}>
            esc
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{ maxHeight: 400, overflowY: 'auto', padding: query ? '8px 0' : 0 }}
        >
          {query.trim() === '' && (
            <div style={{ padding: '32px 24px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-tertiary)' }}>
                Type to search lessons, glossary terms, and modules
              </p>
              <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-tertiary)', opacity: 0.6 }}>
                ↑↓ to navigate · Enter to open · Esc to close
              </p>
            </div>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div style={{ padding: '32px 24px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-tertiary)' }}>
                No results for <strong style={{ color: 'var(--text-secondary)' }}>"{query}"</strong>
              </p>
            </div>
          )}

          {results.map((result, idx) => {
            const isActive = idx === cursor
            return (
              <button
                key={result.id}
                data-idx={idx}
                onClick={() => select(result)}
                onMouseEnter={() => setCursor(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '10px 18px',
                  border: 'none',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.1s',
                }}
              >
                <span style={{
                  flexShrink: 0,
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8,
                  background: result.type === 'lesson'  ? 'rgba(232,50,42,0.1)'  :
                              result.type === 'module'  ? 'rgba(201,168,76,0.1)' :
                                                          'rgba(74,158,219,0.1)',
                  color:      result.type === 'lesson'  ? '#E8322A' :
                              result.type === 'module'  ? '#C9A84C' :
                                                          '#4A9EDB',
                }}>
                  <Icon name={result.emoji} size={16} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {result.title}
                  </p>
                  <p style={{
                    margin: '2px 0 0',
                    fontSize: 12,
                    color: 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {result.subtitle}
                  </p>
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '2px 7px',
                  borderRadius: 999,
                  flexShrink: 0,
                  color: TYPE_COLOR[result.type],
                  background: `${TYPE_COLOR[result.type]}18`,
                  border: `1px solid ${TYPE_COLOR[result.type]}30`,
                }}>
                  {TYPE_LABEL[result.type]}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
