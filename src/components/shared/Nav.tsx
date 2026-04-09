import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useIsMobile'
import SearchPalette from './SearchPalette'

const NAV_LINKS = [
  { to: '/lessons',  label: 'Lessons'  },
  { to: '/modules',  label: 'Modules'  },
  { to: '/glossary', label: 'Glossary' },
  { to: '/progress', label: 'Progress' },
  { to: '/tools',    label: 'Tools'    },
]

export default function Nav() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(o => !o)
      }
      if (e.key === 'Escape') setMenuOpen(false)
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

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

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
        ref={menuRef}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 20px',
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

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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

              <div style={{ width: 1, height: 20, background: 'rgba(240,237,232,0.1)', margin: '0 10px' }} />

              {/* Search */}
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
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.color = 'rgba(240,237,232,0.5)'
                  el.style.borderColor = 'rgba(240,237,232,0.12)'
                  el.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
                <span>Search</span>
              </button>

              <div style={{ width: 1, height: 20, background: 'rgba(240,237,232,0.1)', margin: '0 10px' }} />

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
          )}

          {/* Mobile right — search icon + hamburger */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => setSearchOpen(true)}
                style={{
                  width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(240,237,232,0.12)',
                  background: 'transparent', color: 'rgba(240,237,232,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>

              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(240,237,232,0.12)',
                  background: menuOpen ? 'rgba(232,50,42,0.12)' : 'transparent',
                  borderColor: menuOpen ? 'rgba(232,50,42,0.3)' : 'rgba(240,237,232,0.12)',
                  color: menuOpen ? '#E8322A' : 'rgba(240,237,232,0.7)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 4, transition: 'all 0.15s', padding: '9px',
                }}
              >
                <span style={{
                  display: 'block', width: 16, height: 1.5, borderRadius: 1,
                  background: 'currentColor', transition: 'transform 0.2s',
                  transform: menuOpen ? 'rotate(45deg) translate(3px, 4px)' : 'none',
                }} />
                <span style={{
                  display: 'block', width: 16, height: 1.5, borderRadius: 1,
                  background: 'currentColor', transition: 'opacity 0.2s',
                  opacity: menuOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', width: 16, height: 1.5, borderRadius: 1,
                  background: 'currentColor', transition: 'transform 0.2s',
                  transform: menuOpen ? 'rotate(-45deg) translate(3px, -4px)' : 'none',
                }} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(18,18,18,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(240,237,232,0.12)',
            padding: '12px 20px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 100,
          }}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '12px 14px',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                  color: isActive ? '#E8322A' : 'rgba(240,237,232,0.7)',
                  background: isActive ? 'rgba(232,50,42,0.08)' : 'transparent',
                  marginBottom: 4,
                })}
              >
                {label}
              </NavLink>
            ))}
            <div style={{ height: 1, background: 'rgba(240,237,232,0.08)', margin: '8px 0 12px' }} />
            <Link
              to="/creator"
              style={{
                display: 'block',
                padding: '12px 14px',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                color: '#E8322A',
                background: 'rgba(232,50,42,0.08)',
                border: '1px solid rgba(232,50,42,0.2)',
                textAlign: 'center',
              }}
            >
              Creator ⚡
            </Link>
          </div>
        )}
      </nav>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
