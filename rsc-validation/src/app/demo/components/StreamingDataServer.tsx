// This is a Server Component that demonstrates streaming with React Suspense
// Fast content shows immediately, slow content streams in progressively

import { Suspense } from 'react'

// Fast data source
async function fetchFastData() {
  await new Promise(resolve => setTimeout(resolve, 60000)) // 0.5s delay
  return {
    title: 'Quick Stats',
    data: [
      { label: 'Online Users', value: '1,234' },
      { label: 'Active Sessions', value: '89' },
      { label: 'Page Views', value: '45.2K' }
    ]
  }
}

// Medium speed data source
async function fetchMediumData() {
  await new Promise(resolve => setTimeout(resolve, 5000)) // 2s delay
  return {
    title: 'Analytics Report',
    items: [
      { metric: 'Conversion Rate', value: '3.42%', trend: '+0.5%' },
      { metric: 'Avg. Session Duration', value: '4m 32s', trend: '+12s' },
      { metric: 'Bounce Rate', value: '42.1%', trend: '-2.3%' }
    ]
  }
}

// Slow data source
async function fetchSlowData() {
  await new Promise(resolve => setTimeout(resolve, 7000)) // 4s delay
  return {
    title: 'Heavy Computation',
    items: [
      'Analyzed 10M data points',
      'Generated ML predictions',
      'Processed time-series data',
      'Calculated complex aggregations'
    ]
  }
}

export default function StreamingDataServer() {
  return (
    <div style={{ margin: '1rem 0' }}>
      <div style={{
        padding: '1rem',
        background: '#e3f2fd',
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #2196f3'
      }}>
        <strong>🌊 Streaming Behavior:</strong> Watch how content appears progressively!
        Fast data shows first, while slower content streams in as it becomes available.
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {/* Fast data - shows immediately (~0.5s) */}
        <Suspense fallback={<StreamingCard title="Quick Stats" loading />}>
          <FastDataCard />
        </Suspense>

        {/* Medium data - shows after ~2s */}
        <Suspense fallback={<StreamingCard title="Analytics Report" loading />}>
          <MediumDataCard />
        </Suspense>

        {/* Slow data - shows after ~4s */}
        <Suspense fallback={<StreamingCard title="Heavy Computation" loading />}>
          <SlowDataCard />
        </Suspense>
      </div>

      {/* Explanation */}
      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        background: '#f0f4ff',
        borderRadius: '8px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ marginTop: 0 }}>🎯 How Streaming Works</h3>
        <ol style={{ marginBottom: 0 }}>
          <li>
            <strong>Initial HTML:</strong> Server sends page shell immediately with Suspense fallbacks
          </li>
          <li>
            <strong>Progressive Enhancement:</strong> As data becomes available, server streams it to the client
          </li>
          <li>
            <strong>React Hydration:</strong> Client replaces fallbacks with real content as it arrives
          </li>
          <li>
            <strong>User Experience:</strong> Users see content progressively instead of waiting for everything
          </li>
        </ol>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '4px'
        }}>
          <strong>💡 Key Benefit:</strong> Time to First Byte (TTFB) is fast, and users see content as soon as possible
          rather than staring at a blank page or spinner for 4 seconds!
        </div>
      </div>
    </div>
  )
}

// Component with fast data
async function FastDataCard() {
  const data = await fetchFastData()

  return (
    <StreamingCard title={data.title} timing="~500ms">
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {data.data.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem',
            background: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>{item.label}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </StreamingCard>
  )
}

// Component with medium speed data
async function MediumDataCard() {
  const data = await fetchMediumData()

  return (
    <StreamingCard title={data.title} timing="~2000ms">
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {data.items.map((item, index) => (
          <div key={index} style={{
            padding: '0.75rem',
            background: '#fff3e0',
            borderRadius: '4px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
              {item.metric}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.value}</span>
              <span style={{
                fontSize: '0.85rem',
                color: item.trend.startsWith('+') ? '#4caf50' : '#f44336',
                fontWeight: 500
              }}>
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </StreamingCard>
  )
}

// Component with slow data
async function SlowDataCard() {
  const data = await fetchSlowData()

  return (
    <StreamingCard title={data.title} timing="~4000ms">
      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
        {data.items.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.75rem', color: '#333' }}>
            {item}
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#e8f5e9',
        borderRadius: '4px',
        fontSize: '0.85rem'
      }}>
        ✅ Complex computation completed on server
      </div>
    </StreamingCard>
  )
}

// Reusable card component
function StreamingCard({
  title,
  timing,
  loading,
  children
}: {
  title: string
  timing?: string
  loading?: boolean
  children?: React.ReactNode
}) {
  if (loading) {
    return (
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        border: '2px dashed #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#999' }}>{title}</h3>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f0f0f0',
            borderTop: '4px solid #0070f3',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>Streaming data...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '2px solid #4caf50',
      boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)',
      animation: 'fadeIn 0.5s ease-in'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#333' }}>{title}</h3>
        {timing && (
          <span style={{
            padding: '0.25rem 0.5rem',
            background: '#e8f5e9',
            color: '#4caf50',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {timing}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
