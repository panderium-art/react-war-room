'use client'

// Client Component for interactive chart visualization

import { useState } from 'react'

type ChartData = {
  month: string
  value: number
  growth: number
}

export default function ChartClient({ data }: { data: ChartData[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showGrowth, setShowGrowth] = useState(false)

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div>
      {/* Controls */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showGrowth}
            onChange={(e) => setShowGrowth(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.9rem' }}>Show Growth %</span>
        </label>
        {hoveredIndex !== null && (
          <div style={{
            padding: '0.5rem 1rem',
            background: '#0070f3',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            {data[hoveredIndex].month}: ${data[hoveredIndex].value.toLocaleString()}
          </div>
        )}
      </div>

      {/* Chart */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: '250px',
        padding: '1rem',
        background: '#f9f9f9',
        borderRadius: '8px',
        gap: '0.5rem'
      }}>
        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100
          const isHovered = hoveredIndex === index

          return (
            <div
              key={item.month}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {/* Growth indicator */}
              {showGrowth && (
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: item.growth >= 0 ? '#4caf50' : '#f44336',
                  marginBottom: '0.25rem'
                }}>
                  {item.growth >= 0 ? '▲' : '▼'} {Math.abs(item.growth)}%
                </div>
              )}

              {/* Bar */}
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: '100%',
                  height: `${heightPercent}%`,
                  background: isHovered
                    ? 'linear-gradient(180deg, #0070f3 0%, #0051cc 100%)'
                    : 'linear-gradient(180deg, #4caf50 0%, #388e3c 100%)',
                  borderRadius: '4px 4px 0 0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                  boxShadow: isHovered
                    ? '0 4px 12px rgba(0, 112, 243, 0.4)'
                    : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />

              {/* Month label */}
              <div style={{
                fontSize: '0.85rem',
                fontWeight: isHovered ? 'bold' : 'normal',
                color: isHovered ? '#0070f3' : '#666'
              }}>
                {item.month}
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive note */}
      <div style={{
        marginTop: '0.75rem',
        padding: '0.75rem',
        background: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '0.85rem',
        color: '#1976d2'
      }}>
        🖱️ Hover over bars to see details • Toggle growth indicators with checkbox
      </div>
    </div>
  )
}
