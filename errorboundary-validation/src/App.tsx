import WhatTheyCatchExample from './examples/WhatTheyCatchExample'
import WhatTheyDontCatchExample from './examples/WhatTheyDontCatchExample'
import GranularBoundariesExample from './examples/GranularBoundariesExample'
import PracticalExample from './examples/PracticalExample'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary
      fallback={(error, errorInfo) => (
        <div className="example-section">
          <h2 style={{ color: '#dc3545' }}>🚨 Top-Level Error Boundary</h2>
          <div className="error-display">
            <h3>The app encountered an unexpected error</h3>
            <div className="error-message">{error.message}</div>
            <details style={{ marginTop: '15px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Component Stack
              </summary>
              <div className="stack-trace">{errorInfo.componentStack}</div>
            </details>
            <button onClick={() => window.location.reload()} style={{ marginTop: '15px' }}>
              Reload Application
            </button>
          </div>
        </div>
      )}
    >
      <h1>ErrorBoundary Validation</h1>
      <p className="subtitle">
        Master React ErrorBoundaries: Learn what they catch, what they don't, 
        and how to use them effectively in production
      </p>

      <div className="examples-container">
        <WhatTheyCatchExample />
        <WhatTheyDontCatchExample />
        <GranularBoundariesExample />
        <PracticalExample />
      </div>

      <div className="example-section" style={{ background: '#f8f9fa', border: '2px dashed #ee0979' }}>
        <h2>📚 ErrorBoundary Quick Reference</h2>
        
        <div className="comparison">
          <div>
            <h3 style={{ color: '#28a745' }}>✓ What They CATCH</h3>
            <ul style={{ lineHeight: 1.8 }}>
              <li>Errors during rendering</li>
              <li>Errors in lifecycle methods</li>
              <li>Errors in constructors</li>
              <li>Errors in component tree below</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: '#dc3545' }}>❌ What They DON'T CATCH</h3>
            <ul style={{ lineHeight: 1.8 }}>
              <li>Event handlers</li>
              <li>Async code (setTimeout, promises)</li>
              <li>Server-side rendering</li>
              <li>Errors in the boundary itself</li>
            </ul>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '20px' }}>
          <strong>🎯 Best Practices:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li><strong>Always use a top-level boundary</strong> - Catch unexpected errors</li>
            <li><strong>Use granular boundaries</strong> - Isolate failures to specific features</li>
            <li><strong>Log errors</strong> - Integrate with Sentry, LogRocket, etc.</li>
            <li><strong>Provide recovery options</strong> - Let users try again</li>
            <li><strong>User-friendly messages</strong> - Hide technical details in production</li>
            <li><strong>Use try-catch for events</strong> - ErrorBoundaries don't catch them</li>
            <li><strong>Test error states</strong> - Verify boundaries work as expected</li>
          </ul>
        </div>

        <div className="code-block" style={{ marginTop: '20px' }}>
          <div className="comment">// Minimal ErrorBoundary Implementation</div>
          <div><span className="keyword">class</span> <span className="class">ErrorBoundary</span> <span className="keyword">extends</span> <span className="class">Component</span> {'{'}</div>
          <div>  <span className="keyword">static</span> <span className="method">getDerivedStateFromError</span>(error) {'{'}</div>
          <div>    <span className="keyword">return</span> {'{ hasError: true }'}</div>
          <div>  {'}'}</div>
          <div>  </div>
          <div>  <span className="method">componentDidCatch</span>(error, errorInfo) {'{'}</div>
          <div>    <span className="comment">// Log to error service</span></div>
          <div>    logErrorToService(error, errorInfo)</div>
          <div>  {'}'}</div>
          <div>  </div>
          <div>  <span className="method">render</span>() {'{'}</div>
          <div>    <span className="keyword">if</span> (<span className="keyword">this</span>.state.hasError) {'{'}</div>
          <div>      <span className="keyword">return</span> {'<FallbackUI />'}</div>
          <div>    {'}'}</div>
          <div>    <span className="keyword">return this</span>.props.children</div>
          <div>  {'}'}</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box warning" style={{ marginTop: '20px' }}>
          <strong>⚠️ Important Limitations:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Must be class components (cannot use hooks)</li>
            <li>Cannot catch their own errors (need parent boundary)</li>
            <li>Don't catch errors in event handlers (use try-catch)</li>
            <li>Don't catch errors in async code (use try-catch)</li>
            <li>In development, errors still show (React feature for debugging)</li>
          </ul>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App

