'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function RoutingFilesTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [templateCounter, setTemplateCounter] = useState(0);
  const [mountTime, setMountTime] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // This runs every time the template mounts (on every navigation)
    setMountTime(new Date().toLocaleTimeString());
    console.log('🔄 Template mounted at:', new Date().toLocaleTimeString());

    // Trigger animation on mount
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Template Wrapper - Re-mounts on every navigation with animation */}
      <div
        className={styles.templateWrapper}
        style={{
          animation: isAnimating ? 'slideInFromTop 0.6s ease-out, fadeIn 0.6s ease-out' : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{
            animation: isAnimating ? 'slideInFromLeft 0.8s ease-out' : 'none',
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#7c2d12', margin: 0 }}>
              🔄 Template.tsx Wrapper
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#c2410c', margin: '0.25rem 0' }}>
              This re-mounts on every navigation (unlike layout)
            </p>
            <p style={{ fontSize: '0.75rem', color: '#ea580c', marginTop: '0.25rem', marginBottom: 0 }}>
              Last mounted: <strong>{mountTime}</strong>
            </p>
          </div>
          <div style={{
            textAlign: 'right',
            animation: isAnimating ? 'slideInFromRight 0.8s ease-out' : 'none',
          }}>
            <p style={{ fontSize: '0.875rem', color: '#c2410c', margin: 0 }}>Template Counter:</p>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#7c2d12',
              margin: '0.25rem 0',
              animation: isAnimating ? 'bounce 1s ease-out' : 'none',
            }}>{templateCounter}</p>
            <button
              onClick={() => setTemplateCounter(c => c + 1)}
              style={{
                marginTop: '0.5rem',
                background: '#ea580c',
                color: 'white',
                padding: '0.5rem 0.75rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = '#c2410c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#ea580c';
              }}
            >
              Increment Template
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'white',
          borderRadius: '0.375rem',
          border: '1px solid #fed7aa',
          animation: isAnimating ? 'fadeInUp 1s ease-out 0.3s both' : 'none',
        }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#7c2d12', marginBottom: '0.5rem' }}>
            🧪 Experiment:
          </p>
          <ol style={{ fontSize: '0.875rem', color: '#374151', paddingLeft: '1.5rem', margin: 0 }}>
            <li style={{ marginBottom: '0.25rem' }}>Increment both counters (layout in header, template here)</li>
            <li style={{ marginBottom: '0.25rem' }}>Navigate to another page in this section</li>
            <li style={{ marginBottom: '0.25rem' }}>Come back to this page</li>
            <li>
              <strong>Observe:</strong> Layout counter persists, template counter resets to 0!
            </li>
          </ol>
        </div>

        {/* Animation indicator */}
        {isAnimating && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#fef3c7',
            borderRadius: '0.375rem',
            border: '2px solid #fbbf24',
            animation: 'pulse 0.8s ease-in-out',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', margin: 0 }}>
              ✨ Animation triggered! This happens every time you navigate here!
            </p>
          </div>
        )}
      </div>

      {/* Children get rendered inside the template with stagger animation */}
      <div style={{
        animation: isAnimating ? 'fadeInUp 1s ease-out 0.5s both' : 'none',
      }}>
        {children}
      </div>

      {/* Add keyframes styles */}
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(0.95);
          }
          75% {
            transform: scale(1.1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
