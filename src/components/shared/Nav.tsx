import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text)' }}
        >
          <span style={{ fontSize: 18 }}>🏁</span>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>
            Clay's <span style={{ color: 'var(--red)' }}>Handbook</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {[
            { to: '/lessons', label: 'Lessons' },
            { to: '/glossary', label: 'Glossary' },
            { to: '/modules', label: 'Modules' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                padding: '5px 12px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                background: isActive ? 'var(--surface-2)' : 'transparent',
                transition: 'color 0.15s, background 0.15s',
              })}
            >
              {label}
            </NavLink>
          ))}

          <div
            style={{ width: 1, height: 18, background: 'var(--border-strong)', margin: '0 10px' }}
          />

          <Link
            to="/creator"
            style={{
              padding: '5px 14px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-strong)',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.color = 'var(--text)'
              el.style.borderColor = 'var(--text-tertiary)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.color = 'var(--text-secondary)'
              el.style.borderColor = 'var(--border-strong)'
            }}
          >
            Creator
          </Link>
        </div>
      </div>
    </nav>
  )
}
