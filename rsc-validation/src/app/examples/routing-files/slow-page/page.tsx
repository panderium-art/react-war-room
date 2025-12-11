import { Suspense } from 'react';
import Link from 'next/link';
import styles from '../styles.module.css';

// Simulate slow data fetching
async function SlowData() {
  await new Promise(resolve => setTimeout(resolve, 3000));

  return (
    <div style={{
      background: '#f0fdf4',
      border: '2px solid #10b981',
      borderRadius: '0.5rem',
      padding: '1.5rem'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534', marginBottom: '0.75rem' }}>
        ✅ Data Loaded Successfully!
      </h2>
      <p style={{ color: '#166534', marginBottom: '1rem' }}>
        This content took 3 seconds to load. While waiting, you saw the pulsing skeleton UI.
      </p>
      <div style={{ background: 'white', padding: '1rem', borderRadius: '0.375rem', border: '1px solid #86efac' }}>
        <p style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '600', marginBottom: '0.5rem' }}>
          <strong>How it works:</strong>
        </p>
        <ul style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem', listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.25rem' }}>This is an async Server Component with a 3-second delay</li>
          <li style={{ marginBottom: '0.25rem' }}>Wrapped in Suspense boundary</li>
          <li style={{ marginBottom: '0.25rem' }}>Shows skeleton UI while loading</li>
          <li>Works with streaming Server Components!</li>
        </ul>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingSkeleton() {
  return (
    <div style={{
      background: '#eff6ff',
      border: '2px solid #3b82f6',
      borderRadius: '0.5rem',
      padding: '1.5rem'
    }}>
      <div className="skeleton-pulse" style={{
        height: '2rem',
        background: '#bfdbfe',
        borderRadius: '0.375rem',
        marginBottom: '1rem',
        width: '60%'
      }}></div>
      <div className="skeleton-pulse" style={{
        height: '1rem',
        background: '#bfdbfe',
        borderRadius: '0.375rem',
        marginBottom: '0.5rem',
        width: '100%'
      }}></div>
      <div className="skeleton-pulse" style={{
        height: '1rem',
        background: '#bfdbfe',
        borderRadius: '0.375rem',
        marginBottom: '1rem',
        width: '80%'
      }}></div>
      <div className="skeleton-pulse" style={{
        height: '6rem',
        background: '#dbeafe',
        borderRadius: '0.375rem',
        marginBottom: '0.5rem'
      }}></div>
      <p style={{ fontSize: '0.875rem', color: '#1e40af', textAlign: 'center', marginTop: '1rem', fontWeight: '600' }}>
        ⏳ Loading data from server...
      </p>
    </div>
  );
}

export default function SlowPage() {
  return (
    <div className={styles.card}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>⏳ Loading State Demo</h1>

      <div className={styles.infoBoxPurple}>
        <p style={{ fontWeight: '600', color: '#7e22ce', marginBottom: '0.5rem' }}>
          Watch the skeleton loading animation below!
        </p>
        <p style={{ fontSize: '0.875rem', color: '#a855f7', margin: 0 }}>
          The data below takes 3 seconds to load. You'll see a pulsing skeleton while it loads.
          Refresh the page or navigate away and back to see it again!
        </p>
      </div>

      {/* Suspense wrapper to show loading state */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Suspense fallback={<LoadingSkeleton />}>
          <SlowData />
        </Suspense>
      </div>

      <div className={styles.infoBoxBlue}>
        <h3 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>💡 About loading.tsx:</h3>
        <ul style={{ fontSize: '0.875rem', color: '#1e40af', listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.25rem' }}>Automatically wraps page in Suspense boundary</li>
          <li style={{ marginBottom: '0.25rem' }}>Shows instantly while page content streams in</li>
          <li style={{ marginBottom: '0.25rem' }}>Can be a Server Component (no 'use client' needed)</li>
          <li style={{ marginBottom: '0.25rem' }}>Great for skeleton UIs and loading spinners</li>
          <li>Works with streaming Server Components</li>
        </ul>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <Link
          href="/examples/routing-files"
          className={styles.link}
        >
          ← Back to Routing Files
        </Link>
      </div>
    </div>
  );
}
