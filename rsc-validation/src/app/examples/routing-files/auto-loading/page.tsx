import Link from 'next/link';
import styles from '../styles.module.css';

// This entire page is async and will trigger loading.tsx automatically
export default async function AutoLoadingPage() {
  // Simulate slow data fetching - this will trigger loading.tsx
  await new Promise(resolve => setTimeout(resolve, 10000));

  return (
    <div className={styles.card}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        ✅ Page Loaded! (Auto loading.tsx)
      </h1>

      <div className={styles.infoBoxGreen}>
        <p style={{ fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>
          You should have seen the loading.tsx skeleton before this!
        </p>
        <p style={{ fontSize: '0.875rem', color: '#059669', margin: 0 }}>
          This page is an async Server Component. Next.js automatically wrapped it in Suspense
          and showed the loading.tsx file while it was loading.
        </p>
      </div>

      <div style={{
        background: '#f0fdf4',
        border: '2px solid #10b981',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginTop: '1.5rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534', marginBottom: '1rem' }}>
          How this works:
        </h2>
        <ol style={{
          fontSize: '0.875rem',
          color: '#374151',
          paddingLeft: '1.5rem',
          margin: 0,
          lineHeight: '1.8'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>
            This page component is async: <code style={{ background: '#bbf7d0', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>export default async function</code>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            It has a 3-second delay using <code style={{ background: '#bbf7d0', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>await new Promise</code>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            Next.js <strong>automatically</strong> wraps async pages in Suspense
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            The <code style={{ background: '#bbf7d0', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>loading.tsx</code> file in the parent directory provides the fallback UI
          </li>
          <li>
            No manual <code style={{ background: '#bbf7d0', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>&lt;Suspense&gt;</code> needed!
          </li>
        </ol>
      </div>

      <div style={{
        background: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginTop: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
          📝 Code Example:
        </h3>
        <pre style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '0.375rem',
          overflow: 'auto',
          fontSize: '0.875rem',
          margin: 0
        }}>
{`// app/examples/routing-files/auto-loading/page.tsx
export default async function AutoLoadingPage() {
  // Simulate slow data fetching
  await new Promise(resolve => setTimeout(resolve, 3000));

  return <div>Content loaded!</div>;
}

// app/examples/routing-files/loading.tsx
export default function RoutingFilesLoading() {
  return <div>Loading skeleton...</div>;
}`}
        </pre>
      </div>

      <div className={styles.infoBoxYellow} style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
          💡 loading.tsx vs Manual Suspense:
        </h3>
        <div className={styles.grid} style={{ gap: '1rem', marginTop: '1rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.375rem', border: '1px solid #fcd34d' }}>
            <h4 style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
              loading.tsx (This Page)
            </h4>
            <ul style={{ fontSize: '0.875rem', color: '#78350f', listStyle: 'disc', paddingLeft: '1.25rem', margin: 0 }}>
              <li>Automatic - no code needed</li>
              <li>Works for entire page/route</li>
              <li>Triggered by async page component</li>
              <li>Simpler for whole-page loading</li>
            </ul>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.375rem', border: '1px solid #fcd34d' }}>
            <h4 style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
              Manual &lt;Suspense&gt; (slow-page)
            </h4>
            <ul style={{ fontSize: '0.875rem', color: '#78350f', listStyle: 'disc', paddingLeft: '1.25rem', margin: 0 }}>
              <li>Explicit - you control it</li>
              <li>Works for specific components</li>
              <li>More granular control</li>
              <li>Better for partial page loading</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link
          href="/examples/routing-files"
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          ← Back to Routing Files
        </Link>
        <Link
          href="/examples/routing-files/slow-page"
          style={{
            background: '#a855f7',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          See Manual Suspense Example →
        </Link>
      </div>
    </div>
  );
}
