import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div
      className="screen-enter"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(61,171,110,0.12)',
            color: '#3DAB6E',
            boxShadow: '0 0 28px rgba(61,171,110,0.2)',
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h1
          style={{
            margin: '0 0 12px',
            fontSize: 'clamp(26px, 4vw, 34px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}
        >
          You're in.
        </h1>
        <p style={{ margin: '0 0 32px', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Payment confirmed. Your access has been activated — it may take a few seconds to reflect.
          Refresh the page if content is still gated.
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/lessons"
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            Start Learning →
          </Link>
          <Link
            to="/"
            className="btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
