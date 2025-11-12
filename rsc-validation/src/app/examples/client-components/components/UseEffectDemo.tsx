'use client'

import { useState, useEffect } from 'react'

export function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // Cleanup function
    return () => clearInterval(interval)
  }, [isRunning])

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <div className="component-box client-rendered">
      <h4>⏱️ Timer (Client Component)</h4>
      
      <div style={{ fontSize: '2rem', margin: '16px 0', fontWeight: 'bold' }}>
        {seconds}s
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        ✅ Uses useEffect + setInterval
      </p>
    </div>
  )
}

