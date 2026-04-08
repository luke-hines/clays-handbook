import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SearchPalette from './SearchPalette'

const NAV_LINKS = [
  { to: '/lessons',  label: 'Lessons'  },
  { to: '/modules',  label: 'Modules'  },
  { to: '/glossary', label: 'Glossary' },
  { to: '/tools',    label: 'Tools'    },
]

export default function Nav() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Deepen the nav shadow once user scrolls
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return
    const onScroll = () => setScrolled(root.scrollTop > 8)
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => root.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="sticky top-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(16,16,16,0.92)'
            : 'rgba(22,22,22,0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${scrolled ? 'rgba(240,237,232,0.12)' : 'rgba(240,237,232,0.07)'}`,
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.45)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 24px',
            height: 58,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}
          >
            <span
              style={{
                color: '#E8322A',
                filter: 'drop-shadow(0 0 6px rgba(232,50,42,0.5))',
                transition: 'filter 0.2s',
                display: 'flex',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 12px rgba(232,50,42,0.8))' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 6px rgba(232,50,42,0.5))' }}
            >
              🏁
            </span>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              Clay's{' '}
              <span style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #E8322A, #ff6b65)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}>
                Handbook
              </span>
            </span>
          </Link>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>

            {/* Nav links */}
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  position: 'relative',
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : 'rgba(240,237,232,0.5)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(232,50,42,0.18) 0%, rgba(232,50,42,0.08) 100%)'
                    : 'transparent',
                  border: isActive ? '1px solid rgba(232,50,42,0.25)' : '1px solid transparent',
                  boxShadow: isActive
                    ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 12px rgba(232,50,42,0.12)'
                    : 'none',
                  transition: 'all 0.18s',
                  letterSpacing: isActive ? '-0.01em' : '0',
                })}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  if (!el.dataset.active) {
                    el.style.color = 'rgba(240,237,232,0.9)'
                    el.style.background = 'rgba(240,237,232,0.06)'
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  if (!el.dataset.active) {
                    el.style.color = 'rgba(240,237,232,0.5)'
                    el.style.background = 'transparent'
                  }
                }}
              >
                {label}
              </NavLink>
            ))}

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'rgba(240,237,232,0.1)', margin: '0 10px' }} />

            {/* Search button — liquid glass pill */}
            <button
              onClick={() => setSearchOpen(true)}
              title="Search (⌘K)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                border: '1px solid rgba(240,237,232,0.12)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'rgba(240,237,232,0.5)',
                cursor: 'pointer',
                transition: 'all 0.18s',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.color = 'rgba(240,237,232,0.9)'
                el.style.borderColor = 'rgba(240,237,232,0.22)'
                el.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)'
                el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 16px rgba(255,255,255,0.04)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.color = 'rgba(240,237,232,0.5)'
                el.style.borderColor = 'rgba(240,237,232,0.12)'
                el.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
                el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08)'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13 }}>Search</span>
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'rgba(240,237,232,0.1)', margin: '0 10px' }} />

            {/* Creator — red gradient CTA */}
            <Link
              to="/creator"
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                color: '#fff',
                background: 'linear-gradient(135deg, #E8322A 0%, #c42a22 100%)',
                border: '1px solid rgba(232,50,42,0.4)',
                letterSpacing: '0.01em',
                transition: 'all 0.18s',
                boxShadow: '0 0 16px rgba(232,50,42,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, #f03d35 0%, #d42e26 100%)'
                el.style.boxShadow = '0 0 24px rgba(232,50,42,0.45), inset 0 1px 0 rgba(255,255,255,0.16)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, #E8322A 0%, #c42a22 100%)'
                el.style.boxShadow = '0 0 16px rgba(232,50,42,0.25), inset 0 1px 0 rgba(255,255,255,0.12)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Creator
            </Link>
          </div>
        </div>
      </nav>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
