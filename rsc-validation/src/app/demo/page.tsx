import { Suspense } from 'react'
import Link from 'next/link'
import ParallelFetchServer from './components/ParallelFetchServer'
import SequentialFetchServer from './components/SequentialFetchServer'
import StreamingDataServer from './components/StreamingDataServer'
import InteractiveClient from './components/InteractiveClient'
import HybridDashboard from './components/HybridDashboard'
import InteractiveParallelServer from './components/InteractiveParallelServer'

// Simulated API delays for demonstration
export const dynamic = 'force-dynamic'

export default function DemoApp() {
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Full-Stack RSC Demo Application</h1>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      <p className="subtitle">
        A comprehensive demonstration of Server Components, Client Components, and Hybrid patterns
        with different data fetching strategies.
      </p>

      <div className="info-box info" style={{ marginBottom: '2rem' }}>
        <h3>🎯 What This Demo Shows</h3>
        <ul>
          <li><strong>Server Components:</strong> Parallel, Sequential, and Streaming data fetching</li>
          <li><strong>Client Components:</strong> Interactive UI with state and event handlers</li>
          <li><strong>Hybrid Components:</strong> Server data with client-side interactivity</li>
        </ul>
      </div>

      {/* SECTION 1: Server Component - Parallel Fetching */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="info-box success">
          <h2>
            1. Server Component - Parallel Fetching
            <span className="badge server" style={{ marginLeft: '1rem' }}>Server</span>
          </h2>
          <p>
            Fetches multiple data sources simultaneously using Promise.all().
            All requests start at the same time - fastest possible loading.
          </p>
        </div>
        <Suspense fallback={<LoadingCard message="Loading parallel data..." />}>
          <ParallelFetchServer />
        </Suspense>
      </section>

      {/* SECTION 1B: Interactive Server + Client Composition */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="info-box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}>
          <h2 style={{ color: 'white' }}>
            1B. Interactive Parallel Fetching (Server + Client)
            <span className="badge" style={{ background: 'rgba(255,255,255,0.3)', color: 'white', marginLeft: '1rem' }}>Hybrid</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>
            Same parallel fetching on the server, but now the cards have interactivity!
            Server fetches → passes data to Client Components → handles clicks and state.
          </p>
        </div>
        <Suspense fallback={<LoadingCard message="Loading interactive parallel data..." />}>
          <InteractiveParallelServer />
        </Suspense>
      </section>

      {/* SECTION 2: Server Component - Sequential Fetching */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="info-box warning">
          <h2>
            2. Server Component - Sequential Fetching
            <span className="badge server" style={{ marginLeft: '1rem' }}>Server</span>
          </h2>
          <p>
            Fetches data one after another - each request waits for the previous.
            Slower but useful when requests depend on each other.
          </p>
        </div>
        <Suspense fallback={<LoadingCard message="Loading sequential data (this takes longer)..." />}>
          <SequentialFetchServer />
        </Suspense>
      </section>

      {/* SECTION 3: Server Component - Streaming */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="info-box info">
          <h2>
            3. Server Component - Streaming
            <span className="badge server" style={{ marginLeft: '1rem' }}>Server</span>
          </h2>
          <p>
            Uses React Suspense to stream content as it becomes available.
            Fast content shows immediately while slow content loads in the background.
          </p>
        </div>
        <StreamingDataServer />
      </section>

      {/* SECTION 4: Client Component - Interactive */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="info-box error">
          <h2>
            4. Client Component - Interactive UI
            <span className="badge client" style={{ marginLeft: '1rem' }}>Client</span>
          </h2>
          <p>
            Pure client-side interactivity with React hooks, state management, and event handlers.
            Runs entirely in the browser.
          </p>
        </div>
        <InteractiveClient />
      </section>

      {/* SECTION 5: Hybrid Component */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="info-box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}>
          <h2>
            5. Hybrid Composition - Best of Both Worlds
            <span className="badge hybrid" style={{ marginLeft: '1rem' }}>Hybrid</span>
          </h2>
          <p>
            Server Component fetches data, then passes it to Client Components for interactivity.
            Combines server-side data access with client-side UX.
          </p>
        </div>
        <Suspense fallback={<LoadingCard message="Loading dashboard data..." />}>
          <HybridDashboard />
        </Suspense>
      </section>
    </div>
  )
}

function LoadingCard({ message }: { message: string }) {
  return (
    <div style={{
      padding: '2rem',
      background: '#f5f5f5',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '1rem 0'
    }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e0e0e0',
        borderTop: '4px solid #0070f3',
        margin: '0 auto 1rem'
      }} />
      <p style={{ color: '#666', margin: 0 }}>{message}</p>
    </div>
  )
}
