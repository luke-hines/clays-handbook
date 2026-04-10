import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

interface PaywallBannerProps {
  type: 'course' | 'subscription'
}

const COPY = {
  course: {
    headline: 'Full lesson access requires Course Access',
    sub: 'One-time $67.99 — unlock all lessons and modules forever.',
    cta: 'Get Course Access',
  },
  subscription: {
    headline: 'Quizzes and tools require a subscription',
    sub: '$9.99/month — quizzes, racing tools, and the AI generator.',
    cta: 'Start Subscription',
  },
}

export default function PaywallBanner({ type }: PaywallBannerProps) {
  const { isSignedIn } = useUser()
  const copy = COPY[type]

  return (
    <div
      style={{
        margin: '32px 0',
        padding: '28px 28px',
        borderRadius: 14,
        background: 'rgba(232,50,42,0.05)',
        border: '1px solid rgba(232,50,42,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 6px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#E8322A',
          }}
        >
          Paid Content
        </p>
        <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
          {copy.headline}
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {copy.sub}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link
          to="/pricing"
          style={{
            padding: '10px 22px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #E8322A 0%, #c42a22 100%)',
            color: '#fff',
            boxShadow: '0 0 16px rgba(232,50,42,0.3)',
            transition: 'box-shadow 0.15s',
          }}
        >
          {copy.cta} →
        </Link>
        {!isSignedIn && (
          <Link
            to="/sign-in"
            style={{
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid var(--border-strong)',
              background: 'var(--surface)',
              color: 'var(--text-secondary)',
              transition: 'color 0.15s',
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}
