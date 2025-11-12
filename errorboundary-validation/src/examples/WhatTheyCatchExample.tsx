import { useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

/**
 * Example 1: What ErrorBoundaries CATCH ✓
 * 
 * Demonstrates errors that ErrorBoundaries successfully catch:
 * - Errors in render methods
 * - Errors in lifecycle methods
 * - Errors in constructors of child components
 */

// Component that throws during render
function RenderError({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('💥 Error thrown during render!')
  }
  return <div className="demo-box success">✅ Component rendered successfully</div>
}

// Component that throws in useEffect (caught if it affects render)
function EffectError({ shouldError }: { shouldError: boolean }) {
  const [count, setCount] = useState(0)

  if (shouldError && count > 0) {
    throw new Error('💥 Error thrown during render triggered by state update!')
  }

  return (
    <div className="demo-box">
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment (will crash on first click)
      </button>
    </div>
  )
}

// Component with JSX error
function JSXError({ shouldError }: { shouldError: boolean }) {
  const user = shouldError ? null : { name: 'John' }
  
  return (
    <div className="demo-box">
      {/* This will crash if user is null */}
      User: {user!.name}
    </div>
  )
}

// Component with undefined property access
function UndefinedError({ shouldError }: { shouldError: boolean }) {
  const data: any = shouldError ? null : { items: [1, 2, 3] }
  
  return (
    <div className="demo-box">
      Items count: {data.items.length}
    </div>
  )
}

export default function WhatTheyCatchExample() {
  const [renderError, setRenderError] = useState(false)
  const [effectError, setEffectError] = useState(false)
  const [jsxError, setJSXError] = useState(false)
  const [undefinedError, setUndefinedError] = useState(false)

  return (
    <div className="example-section">
      <h2>
        1. What ErrorBoundaries CATCH
        <span className="badge good">✓ Caught Errors</span>
      </h2>
      <p className="description">
        ErrorBoundaries catch errors that occur during rendering, in lifecycle methods, 
        and in constructors of the entire tree below them.
      </p>

      <div className="info-box">
        <strong>💡 Tip:</strong> Open your browser console to see the error logging!
      </div>

      {/* Example 1: Render Error */}
      <div className="demo-container">
        <h3>1.1 Render Phase Errors</h3>
        <p>Errors thrown during the render phase are caught:</p>
        
        <button onClick={() => setRenderError(!renderError)}>
          {renderError ? 'Fix Component' : 'Trigger Render Error'}
        </button>

        <ErrorBoundary
          onReset={() => setRenderError(false)}
          fallback={(error) => (
            <div className="error-display">
              <h3>🛡️ Caught by ErrorBoundary!</h3>
              <div className="error-message">{error.message}</div>
              <button onClick={() => setRenderError(false)}>Reset</button>
            </div>
          )}
        >
          <RenderError shouldError={renderError} />
        </ErrorBoundary>
      </div>

      {/* Example 2: State Update Error */}
      <div className="demo-container">
        <h3>1.2 Errors After State Updates</h3>
        <p>Errors triggered by state updates during render:</p>
        
        <button onClick={() => setEffectError(!effectError)}>
          {effectError ? 'Reset' : 'Enable Error Mode'}
        </button>

        <ErrorBoundary onReset={() => setEffectError(false)}>
          {effectError && <EffectError shouldError={true} />}
          {!effectError && <div className="demo-box success">Safe to interact</div>}
        </ErrorBoundary>
      </div>

      {/* Example 3: JSX Errors */}
      <div className="demo-container">
        <h3>1.3 JSX/Null Reference Errors</h3>
        <p>Accessing properties on null/undefined during render:</p>
        
        <button onClick={() => setJSXError(!jsxError)}>
          {jsxError ? 'Fix Data' : 'Trigger Null Error'}
        </button>

        <ErrorBoundary onReset={() => setJSXError(false)}>
          <JSXError shouldError={jsxError} />
        </ErrorBoundary>
      </div>

      {/* Example 4: Undefined Property Access */}
      <div className="demo-container">
        <h3>1.4 Undefined Property Access</h3>
        <p>Accessing nested properties on undefined:</p>
        
        <button onClick={() => setUndefinedError(!undefinedError)}>
          {undefinedError ? 'Provide Data' : 'Remove Data'}
        </button>

        <ErrorBoundary onReset={() => setUndefinedError(false)}>
          <UndefinedError shouldError={undefinedError} />
        </ErrorBoundary>
      </div>

      <div className="info-box success">
        <strong>✓ Key Takeaways:</strong>
        <ul>
          <li>ErrorBoundaries catch errors during render phase</li>
          <li>They catch errors in child component constructors</li>
          <li>They catch errors in lifecycle methods</li>
          <li>The error UI is displayed instead of the crashed component</li>
          <li>The rest of the app continues to work</li>
        </ul>
      </div>
    </div>
  )
}

