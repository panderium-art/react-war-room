'use client'

import { useState, useEffect } from 'react'

export function LocalStorageDemo() {
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('demo-value')
    if (stored) {
      setSaved(stored)
      setValue(stored)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('demo-value', value)
    setSaved(value)
  }

  const handleClear = () => {
    localStorage.removeItem('demo-value')
    setSaved('')
    setValue('')
  }

  return (
    <div className="component-box client-rendered">
      <h4>💾 LocalStorage Demo (Client Component)</h4>
      
      <div style={{ marginTop: '12px' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #cbd5e0',
            borderRadius: '4px',
            marginBottom: '8px'
          }}
        />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSave} disabled={!value}>
            Save to LocalStorage
          </button>
          <button onClick={handleClear} disabled={!saved}>
            Clear
          </button>
        </div>
      </div>

      {saved && (
        <div style={{ 
          marginTop: '12px', 
          padding: '8px', 
          background: '#bee3f8', 
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          Saved: "{saved}"
        </div>
      )}

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        ✅ Uses localStorage (browser API)
      </p>
    </div>
  )
}

