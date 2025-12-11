import Link from 'next/link';
import styles from '../styles.module.css';

export default function TemplateDemoPage() {
  return (
    <div className={styles.card}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🔄 Template Demo Page</h1>

      <div className={styles.infoBoxOrange}>
        <p style={{ fontWeight: '600', color: '#7c2d12', marginBottom: '0.5rem' }}>
          Notice the animations and template counter above!
        </p>
        <p style={{ fontSize: '0.875rem', color: '#c2410c', margin: 0 }}>
          The template.tsx wrapper re-mounted when you navigated to this page,
          so the counter reset AND the animations re-triggered! But the layout counter in the header persisted!
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>🧪 Experiment with Template vs Layout:</h2>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#374151', paddingLeft: '1.5rem' }}>
          <li style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{
              background: '#3b82f6',
              color: 'white',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>1</span>
            <span>
              Increment both counters:
              <ul style={{ marginLeft: '1rem', marginTop: '0.25rem', fontSize: '0.875rem', listStyle: 'disc', paddingLeft: '1rem' }}>
                <li>Layout counter in the header (persists)</li>
                <li>Template counter in the orange box (resets)</li>
              </ul>
            </span>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{
              background: '#3b82f6',
              color: 'white',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>2</span>
            <span>Navigate between pages in this section (watch for animations!)</span>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{
              background: '#3b82f6',
              color: 'white',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>3</span>
            <span>
              Observe the difference:
              <ul style={{ marginLeft: '1rem', marginTop: '0.25rem', fontSize: '0.875rem', listStyle: 'disc', paddingLeft: '1rem' }}>
                <li><strong>Layout counter:</strong> Keeps its value ✅</li>
                <li><strong>Template counter:</strong> Resets to 0 🔄</li>
                <li><strong>Animations:</strong> Re-trigger on every navigation ✨</li>
              </ul>
            </span>
          </li>
        </ol>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
          ← Main Page
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
          Slow Page →
        </Link>
      </div>

      <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '1.5rem' }}>
        <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>📚 Template vs Layout:</h3>
        <div className={styles.grid} style={{ gap: '1rem' }}>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.375rem',
            border: '2px solid #86efac'
          }}>
            <h4 style={{ fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>📐 layout.tsx</h4>
            <ul style={{ fontSize: '0.875rem', color: '#374151', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.25rem' }}>✅ Persists across navigation</li>
              <li style={{ marginBottom: '0.25rem' }}>✅ State is maintained</li>
              <li style={{ marginBottom: '0.25rem' }}>✅ No re-render on route change</li>
              <li style={{ marginBottom: '0.25rem' }}>✅ Better for performance</li>
              <li>✅ Use for persistent UI (nav, sidebar)</li>
            </ul>
          </div>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.375rem',
            border: '2px solid #fdba74'
          }}>
            <h4 style={{ fontWeight: '600', color: '#7c2d12', marginBottom: '0.5rem' }}>🔄 template.tsx</h4>
            <ul style={{ fontSize: '0.875rem', color: '#374151', listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.25rem' }}>✅ Re-mounts on navigation</li>
              <li style={{ marginBottom: '0.25rem' }}>✅ State is reset</li>
              <li style={{ marginBottom: '0.25rem' }}>✅ Full re-render on route change</li>
              <li style={{ marginBottom: '0.25rem' }}>✅ Use for animations ✨</li>
              <li>✅ Use when you need fresh state</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.infoBoxBlue} style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>💡 When to use template.tsx:</h3>
        <ul style={{ fontSize: '0.875rem', color: '#1e40af', listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.25rem' }}>Page enter/exit animations that need to re-trigger</li>
          <li style={{ marginBottom: '0.25rem' }}>Resetting forms or state on navigation</li>
          <li style={{ marginBottom: '0.25rem' }}>Tracking page views (useEffect runs on every mount)</li>
          <li>Features that depend on useEffect with empty dependencies</li>
        </ul>
      </div>
    </div>
  );
}
