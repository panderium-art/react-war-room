import Link from 'next/link';
import styles from './styles.module.css';

export default function RoutingFilesPage() {
  return (
    <div className={styles.card}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
        Next.js Routing Files Practice
      </h1>

      <div className={styles.infoBoxBlue}>
        <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
          This section demonstrates all 7 special Next.js routing files and their behaviors.
          Navigate through the examples below to see each file in action.
        </p>
        <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>
          Check the file structure in <code style={{ background: '#e5e7eb', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>src/app/examples/routing-files/</code>
        </p>
      </div>

      <div className={styles.grid}>
        {/* Layout Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          transition: 'box-shadow 0.2s',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>📐 layout.tsx</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Defines persistent UI that wraps pages and doesn't re-render on navigation.
            Maintains state across route changes.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              Look at the sidebar/header on this page - they persist as you navigate!
            </code>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            ✅ Active on this page<br/>
            📍 File: <code>layout.tsx</code>
          </p>
        </div>

        {/* Template Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>🔄 template.tsx</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Similar to layout but re-mounts on every navigation. Useful for animations
            or resetting state.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              Counter in template resets when you navigate away and back!
            </code>
          </div>
          <Link
            href="/examples/routing-files/template-demo"
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            See Template Demo →
          </Link>
        </div>

        {/* Loading Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>⏳ loading.tsx</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Automatic loading UI shown while page is loading. Works with React Suspense
            boundaries.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              Shows skeleton/spinner while async Server Components load
            </code>
          </div>
          <Link
            href="/examples/routing-files/slow-page"
            style={{
              display: 'inline-block',
              background: '#a855f7',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            Trigger Loading State →
          </Link>
        </div>

        {/* Error Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>❌ error.tsx</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Error boundary that catches errors in Server/Client Components. Must be
            a Client Component with reset functionality.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              Catches errors and provides recovery UI
            </code>
          </div>
          <Link
            href="/examples/routing-files/error-trigger"
            style={{
              display: 'inline-block',
              background: '#ef4444',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            Trigger Error →
          </Link>
        </div>

        {/* Not Found Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>🔍 not-found.tsx</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Custom 404 page shown when notFound() is called or route doesn't exist.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              Custom UI for missing pages
            </code>
          </div>
          <Link
            href="/examples/routing-files/this-does-not-exist"
            style={{
              display: 'inline-block',
              background: '#eab308',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            Trigger 404 →
          </Link>
        </div>

        {/* Route Handler Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>🛣️ route.ts</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            API Route handler for handling HTTP requests (GET, POST, etc).
            Cannot coexist with page.tsx in same segment.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              Server-side API endpoints
            </code>
          </div>
          <Link
            href="/examples/routing-files/api-demo"
            style={{
              display: 'inline-block',
              background: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            Test API Routes →
          </Link>
        </div>

        {/* Dynamic Routes Example */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>🎯 Dynamic Routes</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Dynamic segments using [param] syntax. Demonstrates how params work with
            all the routing files above.
          </p>
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              [id]/page.tsx, [slug]/route.ts patterns
            </code>
          </div>
          <Link
            href="/examples/routing-files/dynamic"
            style={{
              display: 'inline-block',
              background: '#6366f1',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none'
            }}
          >
            See Dynamic Routes →
          </Link>
        </div>

        {/* Page.tsx Info */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(to bottom right, #eff6ff, #f5f3ff)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>📄 page.tsx</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            The UI for a route. This file makes the route segment publicly accessible.
            Can be Server or Client Component.
          </p>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <code style={{ fontSize: '0.875rem' }}>
              You're viewing a page.tsx right now! 👋
            </code>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            ✅ Currently active<br/>
            📍 File: <code>page.tsx</code>
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link
          href="/"
          className={styles.link}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
