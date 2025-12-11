// This is a SERVER COMPONENT - fetches data
// Then passes it to CLIENT COMPONENTS that handle interactivity

import { InteractiveUserCard, InteractiveStatsCard, InteractiveActivityCard } from './InteractiveDataCard'

// Simulated API functions (same as ParallelFetchServer)
async function fetchUser() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Senior Developer'
  }
}

async function fetchStats() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return {
    projects: 12,
    commits: 1247,
    pullRequests: 89,
    reviews: 234
  }
}

async function fetchActivity() {
  await new Promise(resolve => setTimeout(resolve, 800))
  return [
    { id: 1, action: 'Pushed to main branch', time: '2 hours ago' },
    { id: 2, action: 'Merged PR #234', time: '5 hours ago' },
    { id: 3, action: 'Opened issue #456', time: '1 day ago' }
  ]
}

export default async function InteractiveParallelServer() {
  const startTime = Date.now()

  // ✅ SERVER: Fetch data in parallel (same as before)
  const [user, stats, activity] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchActivity()
  ])

  const loadTime = Date.now() - startTime

  // ✅ SERVER: Pass data as props to CLIENT components
  // The Server Component acts as a "data orchestrator"
  return (
    <div>
      {/* Architecture Explanation */}
      <div style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>🏗️ Server + Client Composition Pattern</h3>
        <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong>This Server Component:</strong> Fetches all data on the server in parallel ({loadTime}ms)
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Child Client Components:</strong> Receive data as props and handle all interactivity
            (clicks, state, animations)
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        margin: '1rem 0'
      }}>
        {/* ✅ Pass server-fetched data to client components */}
        <InteractiveUserCard user={user} />
        <InteractiveStatsCard stats={stats} />
        <InteractiveActivityCard activity={activity} />
      </div>

      {/* Code Example */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        background: '#1a202c',
        color: '#e2e8f0',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontFamily: 'monospace',
        overflowX: 'auto'
      }}>
        <div style={{ color: '#68d391', marginBottom: '0.5rem' }}>// Server Component (this file)</div>
        <div><span style={{ color: '#f687b3' }}>export default async function</span> InteractiveParallelServer() {'{'}</div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#68d391' }}>// ✅ Fetch data on server</span>
        </div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#f687b3' }}>const</span> [user, stats, activity] = <span style={{ color: '#f687b3' }}>await</span> Promise.all([...])
        </div>
        <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
          <span style={{ color: '#68d391' }}>// ✅ Pass to Client Components as props</span>
        </div>
        <div style={{ paddingLeft: '1rem' }}>
          <span style={{ color: '#f687b3' }}>return</span> {'<'}<span style={{ color: '#4299e1' }}>InteractiveUserCard</span> user={'{'}user{'}'} {'/>'}
        </div>
        <div>{'}'}</div>
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #4a5568' }}>
          <div style={{ color: '#68d391', marginBottom: '0.5rem' }}>// Client Component (InteractiveDataCard.tsx)</div>
          <div><span style={{ color: '#fbd38d' }}>'use client'</span></div>
          <div><span style={{ color: '#f687b3' }}>export function</span> InteractiveUserCard({'{'} user {'}'}{')'} {'{'}</div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: '#68d391' }}>// ✅ Use hooks for interactivity</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: '#f687b3' }}>const</span> [isExpanded, setIsExpanded] = useState(<span style={{ color: '#f687b3' }}>false</span>)
          </div>
          <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
            <span style={{ color: '#68d391' }}>// ✅ Handle events</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: '#f687b3' }}>return</span> {'<'}button onClick={'{'}() ={'>'} setIsExpanded(!isExpanded){'}'}{'>'}{'/button>'}
          </div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* Key Benefits */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        background: '#e8f5e9',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <h3 style={{ marginTop: 0 }}>✅ Why This Pattern is Powerful</h3>
        <ul style={{ marginBottom: 0, lineHeight: '1.8' }}>
          <li><strong>Security:</strong> Server Component keeps API keys, database queries on server</li>
          <li><strong>Performance:</strong> Server fetches all data in parallel before sending HTML</li>
          <li><strong>Minimal JS Bundle:</strong> Only interactive UI code is sent to the browser</li>
          <li><strong>Best UX:</strong> Fast initial load (server data) + rich interactivity (client components)</li>
          <li><strong>Clean Separation:</strong> Server = data fetching, Client = user interaction</li>
        </ul>
      </div>
    </div>
  )
}
