'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

export default function RoutingFilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [layoutCounter, setLayoutCounter] = useState(0);
  const pathname = usePathname();

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Persistent Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.headerTitle}>Layout.tsx Demo</h1>
            <p className={styles.headerSubtitle}>
              This header persists across all pages in this route segment
            </p>
          </div>
          <div className={styles.counterSection}>
            <p className={styles.counterLabel}>Layout State Counter:</p>
            <p className={styles.counterValue}>{layoutCounter}</p>
            <button
              onClick={() => setLayoutCounter(c => c + 1)}
              className={styles.button}
            >
              Increment Layout Counter
            </button>
          </div>
        </div>
      </header>

      <div className={styles.mainLayout}>
        {/* Persistent Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>📐 Layout Sidebar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{
              padding: '0.75rem',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.375rem'
            }}>
              <p style={{ fontWeight: '600', color: '#166534', margin: 0 }}>✅ Persists</p>
              <p style={{ color: '#4b5563', marginTop: '0.25rem', marginBottom: 0 }}>
                This sidebar stays mounted when you navigate
              </p>
            </div>
            <div style={{
              padding: '0.75rem',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '0.375rem'
            }}>
              <p style={{ fontWeight: '600', color: '#1e40af', margin: 0 }}>🔄 Path:</p>
              <p style={{
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                marginTop: '0.25rem',
                wordBreak: 'break-all',
                marginBottom: 0
              }}>{pathname}</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.main}>
          {children}
        </main>
      </div>

      {/* Persistent Footer */}
      <footer className={styles.footer}>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          Layout.tsx footer - persists across navigation
        </p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', marginBottom: 0 }}>
          Counter: {layoutCounter}
        </p>
      </footer>
    </div>
  );
}
