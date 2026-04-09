import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'

const TIERS = [
  {
    id: 'course',
    label: 'Course Access',
    price: '$97',
    period: 'one-time',
    description: 'Full access to all lessons and modules. Pay once, own it forever.',
    features: [
      'All racing and car knowledge lessons',
      'Full lesson bodies and diagrams',
      'Module progression tracking',
      'Bookmarks and notes',
    ],
    accent: '#E8322A',
    priceIdEnv: 'VITE_STRIPE_COURSE_PRICE_ID',
  },
  {
    id: 'subscription',
    label: 'Monthly Subscription',
    price: '$19',
    period: '/month',
    description: 'Everything in Course Access, plus quizzes, racing tools, and the AI generator.',
    features: [
      'Everything in Course Access',
      'Quizzes for every lesson',
      'Strategy calculator and lap analyzer',
      'AI lesson & quiz generator',
    ],
    accent: '#4A9EDB',
    priceIdEnv: 'VITE_STRIPE_SUBSCRIPTION_PRICE_ID',
  },
]

export default function PricingPage() {
  const { user, isSignedIn } = useUser()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleCheckout(tierId: string) {
    if (!isSignedIn) {
      window.location.href = '/sign-in?redirect_url=/pricing'
      return
    }

    const priceId =
      tierId === 'course'
        ? (import.meta.env.VITE_STRIPE_COURSE_PRICE_ID as string)
        : (import.meta.env.VITE_STRIPE_SUBSCRIPTION_PRICE_ID as string)

    setLoading(tierId)
    setError('')

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      })

      if (!res.ok) throw new Error('Failed to create checkout session')
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div
      className="screen-enter"
      style={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) 24px' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p
          style={{
            margin: '0 0 10px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#E8322A',
          }}
        >
          Pricing
        </p>
        <h1
          style={{
            margin: '0 0 14px',
            fontSize: 'clamp(30px, 5vw, 46px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}
        >
          Unlock the full handbook
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--text-secondary)', maxWidth: 480, marginInline: 'auto', lineHeight: 1.6 }}>
          Start browsing free. Pay when you're ready to go deep.
        </p>
      </div>

      {/* Tier cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: 40,
        }}
      >
        {TIERS.map(tier => (
          <div
            key={tier.id}
            style={{
              padding: '32px 28px',
              borderRadius: 16,
              background: 'var(--surface)',
              border: `1px solid ${tier.accent}30`,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                borderRadius: '16px 16px 0 0',
                background: tier.accent,
              }}
            />

            <div>
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: tier.accent,
                }}
              >
                {tier.label}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text)' }}>
                  {tier.price}
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  {tier.period}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {tier.description}
              </p>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tier.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: tier.accent, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(tier.id)}
              disabled={loading === tier.id}
              style={{
                marginTop: 'auto',
                padding: '13px 0',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 800,
                border: 'none',
                cursor: loading === tier.id ? 'wait' : 'pointer',
                background:
                  tier.id === 'course'
                    ? 'linear-gradient(135deg, #E8322A 0%, #c42a22 100%)'
                    : 'linear-gradient(135deg, #4A9EDB 0%, #2d7fc4 100%)',
                color: '#fff',
                opacity: loading === tier.id ? 0.7 : 1,
                boxShadow: `0 0 20px ${tier.accent}33`,
                transition: 'opacity 0.15s, box-shadow 0.15s',
              }}
            >
              {loading === tier.id ? 'Redirecting...' : 'Get Access →'}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <p style={{ textAlign: 'center', fontSize: 14, color: '#E8322A' }}>{error}</p>
      )}

      {/* Free tier note */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          borderRadius: 12,
          border: '1px solid var(--border)',
          color: 'var(--text-tertiary)',
        }}
      >
        <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
          Free forever
        </p>
        <p style={{ margin: 0, fontSize: 13 }}>
          Lesson titles, module listings, and the full glossary are always free. No account required.
        </p>
      </div>
    </div>
  )
}
