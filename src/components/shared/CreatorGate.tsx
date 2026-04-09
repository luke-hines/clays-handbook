import { useState, type ReactNode } from 'react'

export function isCreatorAuthed(): boolean {
  return sessionStorage.getItem('creatorAuth') === '1'
}

export default function CreatorGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(isCreatorAuthed)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  if (authed) return <>{children}</>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === import.meta.env.VITE_CREATOR_PASSWORD) {
      sessionStorage.setItem('creatorAuth', '1')
      setAuthed(true)
    } else {
      setError('Incorrect password')
      setInput('')
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 360,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '36px 32px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <span style={{ fontSize: 32 }}>🔒</span>
          <h1 style={{ margin: '12px 0 6px', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Creator Access
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
            Enter the password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError('') }}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '10px 14px',
              borderRadius: 8,
              border: error ? '1px solid #E8322A' : '1px solid var(--border)',
              background: 'var(--surface-2)',
              color: 'var(--text)',
              fontSize: 15,
              outline: 'none',
            }}
          />
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: '#E8322A', fontWeight: 600 }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: 4, fontSize: 15 }}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}
