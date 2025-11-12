'use client'

import { useState } from 'react'

export function BrowserAPIDemo() {
  const [info, setInfo] = useState<Record<string, string>>({})

  const detectBrowserInfo = () => {
    setInfo({
      'User Agent': navigator.userAgent,
      'Platform': navigator.platform,
      'Language': navigator.language,
      'Online': navigator.onLine ? 'Yes' : 'No',
      'Screen Width': `${window.screen.width}px`,
      'Screen Height': `${window.screen.height}px`,
      'Window Width': `${window.innerWidth}px`,
      'Window Height': `${window.innerHeight}px`,
    })
  }

  return (
    <div className="component-box client-rendered">
      <h4>🌐 Browser APIs (Client Component)</h4>
      
      <button onClick={detectBrowserInfo} style={{ marginTop: '12px' }}>
        Detect Browser Info
      </button>

      {Object.keys(info).length > 0 && (
        <div style={{ 
          marginTop: '12px', 
          fontSize: '0.85rem',
          background: '#f7fafc',
          padding: '12px',
          borderRadius: '4px',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {Object.entries(info).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '4px' }}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#718096' }}>
        ✅ Uses window, navigator APIs
      </p>
    </div>
  )
}

