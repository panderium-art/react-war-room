// This is a Server Component that fetches data
// Then passes it to Client Components for interactivity

import ChartClient from './ChartClient'
import FilterClient from './FilterClient'
import SortableTableClient from './SortableTableClient'

// Simulated API - fetches data on the server
async function fetchDashboardData() {
  await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5s delay

  return {
    revenue: [
      { month: 'Jan', value: 45000, growth: 12 },
      { month: 'Feb', value: 52000, growth: 15 },
      { month: 'Mar', value: 48000, growth: -8 },
      { month: 'Apr', value: 61000, growth: 27 },
      { month: 'May', value: 58000, growth: -5 },
      { month: 'Jun', value: 67000, growth: 15 }
    ],
    products: [
      { id: 1, name: 'Product A', category: 'Electronics', sales: 1250, revenue: 45000, status: 'active' },
      { id: 2, name: 'Product B', category: 'Clothing', sales: 890, revenue: 28000, status: 'active' },
      { id: 3, name: 'Product C', category: 'Electronics', sales: 2100, revenue: 67000, status: 'active' },
      { id: 4, name: 'Product D', category: 'Home', sales: 450, revenue: 15000, status: 'low' },
      { id: 5, name: 'Product E', category: 'Clothing', sales: 1680, revenue: 52000, status: 'active' },
      { id: 6, name: 'Product F', category: 'Home', sales: 780, revenue: 31000, status: 'active' }
    ],
    summary: {
      totalRevenue: 238000,
      totalSales: 7150,
      avgOrderValue: 33.29,
      conversionRate: 3.42
    }
  }
}

export default async function HybridDashboard() {
  // ✅ SERVER: Fetch data (can access databases, APIs with secrets, etc.)
  const data = await fetchDashboardData()

  return (
    <div style={{ margin: '1rem 0' }}>
      {/* Architecture Explanation */}
      <div style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ marginTop: 0 }}>🏗️ Hybrid Architecture Pattern</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <strong>Server Component (this):</strong>
            <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>Fetches data from API/database</li>
              <li>No JavaScript sent to client</li>
              <li>Can use secrets and server-only code</li>
              <li>Passes data as props to Client Components</li>
            </ul>
          </div>
          <div>
            <strong>Client Components (children):</strong>
            <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>Receive data as props</li>
              <li>Add interactivity (sorting, filtering, charts)</li>
              <li>Use React hooks and event handlers</li>
              <li>Only UI logic runs on client</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Cards - Server Rendered */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <SummaryCard
          title="Total Revenue"
          value={`$${data.summary.totalRevenue.toLocaleString()}`}
          icon="💰"
        />
        <SummaryCard
          title="Total Sales"
          value={data.summary.totalSales.toLocaleString()}
          icon="🛒"
        />
        <SummaryCard
          title="Avg Order Value"
          value={`$${data.summary.avgOrderValue}`}
          icon="📊"
        />
        <SummaryCard
          title="Conversion Rate"
          value={`${data.summary.conversionRate}%`}
          icon="🎯"
        />
      </div>

      {/* Interactive Chart - Client Component */}
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        border: '2px solid #e0e0e0',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>📈 Revenue Trend</h3>
          <span className="badge client">Client</span>
        </div>
        <ChartClient data={data.revenue} />
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem', marginBottom: 0 }}>
          💡 Data fetched on server, chart interactivity handled on client
        </p>
      </div>

      {/* Filterable Products - Client Component */}
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        border: '2px solid #e0e0e0',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>🔍 Filter Products</h3>
          <span className="badge client">Client</span>
        </div>
        <FilterClient products={data.products} />
      </div>

      {/* Sortable Table - Client Component */}
      <div style={{
        padding: '1.5rem',
        background: 'white',
        borderRadius: '8px',
        border: '2px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>📋 Sortable Product Table</h3>
          <span className="badge client">Client</span>
        </div>
        <SortableTableClient products={data.products} />
      </div>

      {/* Benefits Summary */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        background: '#e8f5e9',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <h3 style={{ marginTop: 0 }}>✅ Benefits of This Pattern</h3>
        <ul style={{ marginBottom: 0 }}>
          <li><strong>Security:</strong> Database queries and API keys stay on the server</li>
          <li><strong>Performance:</strong> Initial data fetch is fast (server-side), no client waterfalls</li>
          <li><strong>Bundle Size:</strong> Only interactive components ship JavaScript to browser</li>
          <li><strong>SEO:</strong> All data is in the initial HTML response</li>
          <li><strong>User Experience:</strong> Fast initial load + rich interactivity</li>
        </ul>
      </div>
    </div>
  )
}

// Server Component - Simple display card
function SummaryCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>{title}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#333' }}>{value}</div>
      <div style={{
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.75rem',
        color: '#999'
      }}>
        Rendered on server
      </div>
    </div>
  )
}
