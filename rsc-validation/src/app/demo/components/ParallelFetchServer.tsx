// This is a Server Component (default in App Router)
// It demonstrates parallel data fetching using Promise.all()

// Simulated API functions with delays
async function fetchUser() {
  await new Promise(resolve => setTimeout(resolve, 1000)) // 1s delay
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Senior Developer'
  }
}

async function fetchStats() {
  await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5s delay
  return {
    projects: 12,
    commits: 1247,
    pullRequests: 89,
    reviews: 234
  }
}

async function fetchActivity() {
  await new Promise(resolve => setTimeout(resolve, 800)) // 0.8s delay
  return [
    { id: 1, action: 'Pushed to main branch', time: '2 hours ago' },
    { id: 2, action: 'Merged PR #234', time: '5 hours ago' },
    { id: 3, action: 'Opened issue #456', time: '1 day ago' }
  ]
}

export default async function ParallelFetchServer() {
  const startTime = Date.now()

  // ✅ PARALLEL FETCHING - All three requests start simultaneously
  // Total time = slowest request (1.5s), not sum of all (3.3s)
  const [user, stats, activity] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchActivity()
  ])

  const loadTime = Date.now() - startTime

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      margin: '1rem 0'
    }}>
      {/* User Card */}
      <DataCard title="User Profile" loadTime={loadTime}>
        <div style={{ padding: '0.5rem 0' }}>
          <p style={{ margin: '0.5rem 0' }}><strong>Name:</strong> {user.name}</p>
          <p style={{ margin: '0.5rem 0' }}><strong>Email:</strong> {user.email}</p>
          <p style={{ margin: '0.5rem 0' }}><strong>Role:</strong> {user.role}</p>
        </div>
      </DataCard>

      {/* Stats Card */}
      <DataCard title="Statistics" loadTime={loadTime}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: '0.5rem 0'
        }}>
          <Stat label="Projects" value={stats.projects} />
          <Stat label="Commits" value={stats.commits} />
          <Stat label="PRs" value={stats.pullRequests} />
          <Stat label="Reviews" value={stats.reviews} />
        </div>
      </DataCard>

      {/* Activity Card */}
      <DataCard title="Recent Activity" loadTime={loadTime}>
        <div style={{ padding: '0.5rem 0' }}>
          {activity.map(item => (
            <div key={item.id} style={{
              padding: '0.5rem',
              marginBottom: '0.5rem',
              background: '#f9f9f9',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              <div style={{ fontWeight: 500 }}>{item.action}</div>
              <div style={{ color: '#666', fontSize: '0.8rem' }}>{item.time}</div>
            </div>
          ))}
        </div>
      </DataCard>

      {/* Performance Info */}
      <div style={{
        gridColumn: '1 / -1',
        padding: '1rem',
        background: '#e8f5e9',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <strong>⚡ Performance:</strong> Loaded all 3 data sources in <strong>{loadTime}ms</strong>
        <br />
        <small style={{ color: '#666' }}>
          (User: 1000ms, Stats: 1500ms, Activity: 800ms - but fetched in parallel!)
        </small>
      </div>
    </div>
  )
}

function DataCard({ title, loadTime, children }: { title: string; loadTime: number; children: React.ReactNode }) {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>{title}</h3>
      {children}
      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.8rem',
        color: '#999'
      }}>
        Rendered on server
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0070f3' }}>{value}</div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>{label}</div>
    </div>
  )
}
