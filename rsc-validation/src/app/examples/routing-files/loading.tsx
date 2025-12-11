export default function RoutingFilesLoading() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <div className="skeleton-pulse">
        {/* Header Skeleton */}
        <div style={{
          height: '3rem',
          background: '#d1d5db',
          borderRadius: '0.5rem',
          width: '75%',
          marginBottom: '1.5rem'
        }}></div>

        {/* Info Box Skeleton */}
        <div style={{
          height: '6rem',
          background: '#e5e7eb',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}></div>

        {/* Grid Skeleton */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1.5rem'
              }}
            >
              <div style={{
                height: '2rem',
                background: '#d1d5db',
                borderRadius: '0.375rem',
                width: '50%',
                marginBottom: '0.75rem'
              }}></div>
              <div style={{
                height: '1rem',
                background: '#e5e7eb',
                borderRadius: '0.375rem',
                width: '100%',
                marginBottom: '0.5rem'
              }}></div>
              <div style={{
                height: '1rem',
                background: '#e5e7eb',
                borderRadius: '0.375rem',
                width: '85%',
                marginBottom: '1rem'
              }}></div>
              <div style={{
                height: '5rem',
                background: '#f3f4f6',
                borderRadius: '0.375rem',
                marginBottom: '1rem'
              }}></div>
              <div style={{
                height: '2.5rem',
                background: '#d1d5db',
                borderRadius: '0.375rem',
                width: '33%'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#a855f7',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div className="spinner" style={{
          width: '1.5rem',
          height: '1.5rem',
          border: '2px solid transparent',
          borderTopColor: 'white',
          borderRadius: '50%'
        }}></div>
        <div>
          <p style={{ fontWeight: '600', margin: 0 }}>⏳ loading.tsx Active</p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Loading page content...
          </p>
        </div>
      </div>
    </div>
  );
}
