'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  return (
    <div className="component-box client-rendered">
      <h4>🔢 Counter (Client Component)</h4>
      
      <div style={{ fontSize: '2rem', margin: '16px 0', fontWeight: 'bold' }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={() => setCount(count - step)}>- {step}</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + step)}>+ {step}</button>
      </div>

      <div style={{ marginTop: '12px' }}>
        <label style={{ fontSize: '0.9rem', color: '#4a5568' }}>
          Step: 
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ 
              marginLeft: '8px', 
              width: '60px', 
              padding: '4px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        ✅ Uses useState hook
      </p>
    </div>
  )
}

