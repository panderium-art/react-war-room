import BasicUsageExample from './examples/BasicUsageExample'
import PerformancePitfallExample from './examples/PerformancePitfallExample'
import ContextSplittingExample from './examples/ContextSplittingExample'
import ReducerPatternExample from './examples/ReducerPatternExample'
import CompositionExample from './examples/CompositionExample'
import PracticalExample from './examples/PracticalExample'

function App() {
  return (
    <>
      <h1>useContext Validation Tests</h1>
      <p className="subtitle">
        Master React Context API: Learn best practices, avoid common pitfalls, 
        and build performant applications
      </p>

      <div className="examples-container">
        <BasicUsageExample />
        <PerformancePitfallExample />
        <ContextSplittingExample />
        <ReducerPatternExample />
        <CompositionExample />
        <PracticalExample />
      </div>

      <div className="example-section" style={{ background: '#f8f9fa', border: '2px dashed #11998e' }}>
        <h2>🎓 Summary: useContext Best Practices</h2>
        
        <div className="comparison">
          <div>
            <h3 style={{ color: '#dc3545' }}>❌ Don't</h3>
            <ul style={{ lineHeight: 1.8 }}>
              <li>Create huge context objects</li>
              <li>Forget to memoize context values</li>
              <li>Put all state in one context</li>
              <li>Create new objects/functions in render</li>
              <li>Use context for frequently changing values</li>
              <li>Forget error boundaries</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: '#28a745' }}>✓ Do</h3>
            <ul style={{ lineHeight: 1.8 }}>
              <li>Split contexts by concern</li>
              <li>Use useMemo and useCallback</li>
              <li>Create custom hooks for contexts</li>
              <li>Throw errors if used outside Provider</li>
              <li>Separate state and dispatch contexts</li>
              <li>Use TypeScript for type safety</li>
            </ul>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '20px' }}>
          <strong>🎯 When to Use Context:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li><strong>Theme:</strong> UI theming (colors, fonts, spacing)</li>
            <li><strong>Auth:</strong> Current user, permissions</li>
            <li><strong>Localization:</strong> Language, translations</li>
            <li><strong>UI State:</strong> Modals, sidebars, notifications</li>
            <li><strong>Configuration:</strong> App settings, feature flags</li>
          </ul>
        </div>

        <div className="info-box warning" style={{ marginTop: '15px' }}>
          <strong>⚠️ When NOT to Use Context:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Frequently updating data (use state management library)</li>
            <li>Simple prop passing (just use props!)</li>
            <li>Data that only 1-2 components need</li>
            <li>Performance-critical frequent updates</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App

