import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <h1>React Server Components</h1>
      <p className="subtitle">
        A comprehensive guide to understanding when and how to use Server vs Client Components
      </p>

      <div className="info-box info">
        <h3>🎯 What You'll Learn</h3>
        <ul>
          <li>The fundamental difference between Server and Client Components</li>
          <li>When to use each type and why</li>
          <li>Best practices for composition and data fetching</li>
          <li>Common pitfalls and how to avoid them</li>
          <li>Performance optimization techniques</li>
        </ul>
      </div>

      <div className="section">
        <h2>🚀 Full Demo Application</h2>
        <Link href="/demo" className="nav-card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: 'white' }}>
              Complete Demo App
              <span className="badge" style={{ background: 'rgba(255,255,255,0.3)', color: 'white', marginLeft: '1rem' }}>New!</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>
              Comprehensive application showcasing Server, Client, and Hybrid components with parallel, sequential, and streaming data fetching
            </p>
          </div>
        </Link>

        <h2>📚 Examples</h2>
        <div className="nav-grid">
          <Link href="/examples/server-components" className="nav-card">
            <div>
              <h3>
                Server Components
                <span className="badge server">Server</span>
              </h3>
              <p>
                Learn about async components, data fetching, and zero-bundle size benefits
              </p>
            </div>
          </Link>

          <Link href="/examples/client-components" className="nav-card">
            <div>
              <h3>
                Client Components
                <span className="badge client">Client</span>
              </h3>
              <p>
                Explore interactivity, hooks, browser APIs, and event handlers
              </p>
            </div>
          </Link>

          <Link href="/examples/hybrid-composition" className="nav-card">
            <div>
              <h3>
                Hybrid Composition
                <span className="badge hybrid">Hybrid</span>
              </h3>
              <p>
                Combine server and client components for optimal performance
              </p>
            </div>
          </Link>

          <Link href="/examples/data-fetching" className="nav-card">
            <div>
              <h3>
                Data Fetching Patterns
                <span className="badge server">Server</span>
              </h3>
              <p>
                Parallel fetching, streaming, and advanced patterns
              </p>
            </div>
          </Link>

          <Link href="/examples/pitfalls" className="nav-card">
            <div>
              <h3>
                Common Pitfalls
                <span className="badge warning">Warning</span>
              </h3>
              <p>
                Learn what NOT to do and how to fix common mistakes
              </p>
            </div>
          </Link>

          <Link href="/examples/best-practices" className="nav-card">
            <div>
              <h3>
                Best Practices
                <span className="badge best">Best</span>
              </h3>
              <p>
                Proven patterns for building scalable RSC applications
              </p>
            </div>
          </Link>

          <Link href="/examples/routing-files" className="nav-card">
            <div>
              <h3>
                Next.js Routing Files
                <span className="badge" style={{ background: '#10b981', color: 'white' }}>Practice</span>
              </h3>
              <p>
                Practice with all 7 Next.js routing files: layout, page, loading, error, not-found, template, and route
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="section">
        <h2>🔑 Key Concepts</h2>
        
        <div className="info-box success">
          <h3>✅ Server Components (Default)</h3>
          <ul>
            <li><strong>Zero JavaScript</strong> sent to the client</li>
            <li><strong>Direct backend access</strong> - databases, file system, secrets</li>
            <li><strong>Async/await</strong> support natively</li>
            <li><strong>Automatic code splitting</strong> per component</li>
            <li><strong>Better SEO</strong> - fully rendered HTML</li>
          </ul>
        </div>

        <div className="info-box error">
          <h3>🖱️ Client Components ('use client')</h3>
          <ul>
            <li><strong>Interactivity</strong> - onClick, onChange, etc.</li>
            <li><strong>React Hooks</strong> - useState, useEffect, useContext, etc.</li>
            <li><strong>Browser APIs</strong> - localStorage, window, navigator</li>
            <li><strong>Event listeners</strong> and custom hooks</li>
            <li><strong>Class components</strong> (if you still use them)</li>
          </ul>
        </div>
      </div>

      <div className="info-box warning">
        <h3>⚡ Important Rules</h3>
        <ul>
          <li><strong>Cannot import Server into Client:</strong> Client Components cannot import Server Components directly</li>
          <li><strong>Can pass as children:</strong> But you CAN pass Server Components as children/props to Client Components</li>
          <li><strong>'use client' is a boundary:</strong> Once you add 'use client', that component and all its imports become client components</li>
          <li><strong>Start with Server:</strong> Default to Server Components, add 'use client' only when needed</li>
        </ul>
      </div>
    </div>
  )
}

