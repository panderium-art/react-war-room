'use client'

import { useState, KeyboardEvent } from 'react'

export function EventHandlerDemo() {
  const [log, setLog] = useState<string[]>([])

  const handleMouseEnter = () => {
    setLog(prev => [...prev, '🖱️ Mouse entered'])
  }

  const handleMouseLeave = () => {
    setLog(prev => [...prev, '🖱️ Mouse left'])
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setLog(prev => [...prev, `⌨️ Pressed: ${e.key}`])
    }
  }

  const handleClear = () => {
    setLog([])
  }

  return (
    <div className="component-box client-rendered">
      <h4>🎮 Event Handlers (Client Component)</h4>
      
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          marginTop: '12px',
          padding: '16px',
          background: '#edf2f7',
          borderRadius: '4px',
          border: '2px dashed #a0aec0',
          textAlign: 'center'
        }}
      >
        Hover over me!
      </div>

      <input
        type="text"
        placeholder="Type and press Enter..."
        onKeyDown={handleKeyPress}
        style={{
          width: '100%',
          marginTop: '12px',
          padding: '8px',
          border: '1px solid #cbd5e0',
          borderRadius: '4px'
        }}
      />

      <div style={{ 
        marginTop: '12px', 
        maxHeight: '100px', 
        overflowY: 'auto',
        fontSize: '0.85rem',
        background: '#f7fafc',
        padding: '8px',
        borderRadius: '4px'
      }}>
        {log.length === 0 ? (
          <span style={{ color: '#a0aec0' }}>Event log empty...</span>
        ) : (
          log.map((entry, i) => <div key={i}>{entry}</div>)
        )}
      </div>

      <button onClick={handleClear} style={{ marginTop: '8px' }}>
        Clear Log
      </button>

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        ✅ Uses onMouseEnter, onKeyDown events
      </p>
    </div>
  )
}

