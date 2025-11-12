'use client'

import { useState, FormEvent } from 'react'

export function InteractiveForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="component-box client-rendered">
      <h4>📝 Interactive Form (Client Component)</h4>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px'
            }}
          />
        </div>

        <button type="submit" disabled={!name || !email}>
          Submit
        </button>
      </form>

      {submitted && (
        <div style={{ 
          marginTop: '12px', 
          padding: '8px', 
          background: '#c6f6d5', 
          borderRadius: '4px',
          color: '#22543d'
        }}>
          ✓ Form submitted!
        </div>
      )}

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        ✅ Uses onChange, onSubmit events
      </p>
    </div>
  )
}

