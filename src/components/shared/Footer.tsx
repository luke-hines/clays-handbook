import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '32px 24px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🏁</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
            Clay's <span style={{ color: 'var(--red)' }}>Handbook</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { to: '/lessons', label: 'Lessons' },
            { to: '/glossary', label: 'Glossary' },
            { to: '/modules', label: 'Modules' },
            { to: '/creator', label: 'Creator' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 13,
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              {label}
            </Link>
          ))}
        </div>

        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
          Drive fast. Know your car.
        </span>
      </div>
    </footer>
  )
}
