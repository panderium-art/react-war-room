import { useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

/**
 * Example 2: What ErrorBoundaries DON'T CATCH ⚠️
 * 
 * Demonstrates errors that ErrorBoundaries CANNOT catch:
 * - Event handlers
 * - Asynchronous code (setTimeout, promises, async/await)
 * - Server-side rendering
 * - Errors in the ErrorBoundary itself
 */

// Event handler errors are NOT caught
function EventHandlerError() {
  const [status, setStatus] = useState('Ready to crash')

  const handleClick = () => {
    setStatus('Crashing...')
    // This error will NOT be caught by ErrorBoundary!
    throw new Error('💥 Error in event handler - NOT CAUGHT!')
  }

  return (
    <div className="demo-box">
      <div>Status: {status}</div>
      <button className="danger" onClick={handleClick}>
        Click to Crash (Event Handler)
      </button>
      <div className="info-box warning" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        ⚠️ This will crash the entire app! Errors in event handlers are NOT caught.
      </div>
    </div>
  )
}

// Async errors are NOT caught
function AsyncError() {
  const [status, setStatus] = useState('Ready')

  const handleAsyncError = async () => {
    setStatus('Starting async operation...')
    
    // Simulate async work
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setStatus('About to crash asynchronously...')
    
    // This error will NOT be caught by ErrorBoundary!
    throw new Error('💥 Async error - NOT CAUGHT!')
  }

  return (
    <div className="demo-box">
      <div>Status: {status}</div>
      <button className="danger" onClick={handleAsyncError}>
        Trigger Async Error
      </button>
      <div className="info-box warning" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        ⚠️ Async errors escape ErrorBoundaries!
      </div>
    </div>
  )
}

// setTimeout errors are NOT caught
function SetTimeoutError() {
  const [status, setStatus] = useState('Ready')

  const handleTimeoutError = () => {
    setStatus('Timer started...')
    
    setTimeout(() => {
      // This error will NOT be caught by ErrorBoundary!
      throw new Error('💥 setTimeout error - NOT CAUGHT!')
    }, 1000)
  }

  return (
    <div className="demo-box">
      <div>Status: {status}</div>
      <button className="danger" onClick={handleTimeoutError}>
        Trigger Timeout Error (1s delay)
      </button>
      <div className="info-box warning" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        ⚠️ Errors in setTimeout are NOT caught!
      </div>
    </div>
  )
}

// The CORRECT way to handle event handler errors
function SafeEventHandler() {
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('Ready')

  const handleClick = () => {
    try {
      setStatus('Processing...')
      // Simulate error
      throw new Error('Something went wrong!')
    } catch (err) {
      // Manually handle the error
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('Error occurred')
      console.error('Caught in try-catch:', err)
    }
  }

  const handleReset = () => {
    setError(null)
    setStatus('Ready')
  }

  return (
    <div className="demo-box success">
      <div>Status: {status}</div>
      {error && (
        <div className="error-display" style={{ marginTop: '10px' }}>
          <h4>Error (caught in try-catch):</h4>
          <div className="error-message">{error}</div>
        </div>
      )}
      <div className="controls">
        <button onClick={handleClick}>Trigger Error (Safe)</button>
        {error && <button onClick={handleReset}>Reset</button>}
      </div>
      <div className="info-box success" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        ✓ This uses try-catch to handle event handler errors properly!
      </div>
    </div>
  )
}

// The CORRECT way to handle async errors
function SafeAsyncHandler() {
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('Ready')

  const handleAsyncOperation = async () => {
    try {
      setStatus('Starting async operation...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('Processing...')
      
      // Simulate async error
      throw new Error('Async operation failed!')
    } catch (err) {
      // Properly handle async errors
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('Error occurred')
      console.error('Caught async error:', err)
    }
  }

  const handleReset = () => {
    setError(null)
    setStatus('Ready')
  }

  return (
    <div className="demo-box success">
      <div>Status: {status}</div>
      {error && (
        <div className="error-display" style={{ marginTop: '10px' }}>
          <h4>Error (caught with try-catch):</h4>
          <div className="error-message">{error}</div>
        </div>
      )}
      <div className="controls">
        <button onClick={handleAsyncOperation}>
          Trigger Async Error (Safe)
        </button>
        {error && <button onClick={handleReset}>Reset</button>}
      </div>
      <div className="info-box success" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        ✓ This properly handles async errors with try-catch!
      </div>
    </div>
  )
}

export default function WhatTheyDontCatchExample() {
  return (
    <div className="example-section">
      <h2>
        2. What ErrorBoundaries DON'T CATCH
        <span className="badge bad">⚠️ Not Caught</span>
      </h2>
      <p className="description">
        Understanding what ErrorBoundaries DON'T catch is crucial. These errors will crash 
        your app unless handled differently!
      </p>

      <div className="info-box error">
        <strong>🚨 Warning:</strong> The examples below will crash if you click them! 
        They demonstrate the limitations of ErrorBoundaries. Refresh the page if needed.
      </div>

      <div className="comparison">
        <div>
          <h3 style={{ color: '#dc3545' }}>❌ NOT Caught by ErrorBoundary</h3>
          
          <ErrorBoundary>
            <div className="demo-container">
              <h4>Event Handler Errors</h4>
              <EventHandlerError />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <div className="demo-container">
              <h4>Async Errors</h4>
              <AsyncError />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <div className="demo-container">
              <h4>setTimeout Errors</h4>
              <SetTimeoutError />
            </div>
          </ErrorBoundary>
        </div>

        <div>
          <h3 style={{ color: '#28a745' }}>✓ Correct Error Handling</h3>
          
          <div className="demo-container">
            <h4>Event Handler (Safe)</h4>
            <SafeEventHandler />
          </div>

          <div className="demo-container">
            <h4>Async Operations (Safe)</h4>
            <SafeAsyncHandler />
          </div>
        </div>
      </div>

      <div className="info-box warning">
        <strong>⚠️ What ErrorBoundaries DON'T Catch:</strong>
        <ul>
          <li><strong>Event handlers</strong> - Use try-catch in the handler</li>
          <li><strong>Async code</strong> - Use try-catch with async/await</li>
          <li><strong>setTimeout/setInterval</strong> - Handle errors in the callback</li>
          <li><strong>Server-side rendering</strong> - Different error handling needed</li>
          <li><strong>Errors in the boundary itself</strong> - Need parent boundary</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="comment">// ❌ BAD - Error in event handler (NOT caught)</div>
        <div><span className="keyword">const</span> handleClick = <span className="keyword">()</span> <span className="keyword">=&gt;</span> {'{'}</div>
        <div>  <span className="keyword">throw new</span> <span className="class">Error</span>(<span className="string">'Crash!'</span>) <span className="comment">// NOT caught!</span></div>
        <div>{'}'}</div>
        <br />
        <div className="comment">// ✓ GOOD - Proper error handling</div>
        <div><span className="keyword">const</span> handleClick = <span className="keyword">()</span> <span className="keyword">=&gt;</span> {'{'}</div>
        <div>  <span className="keyword">try</span> {'{'}</div>
        <div>    <span className="comment">// risky operation</span></div>
        <div>  {'}'} <span className="keyword">catch</span> (error) {'{'}</div>
        <div>    <span className="method">setError</span>(error)</div>
        <div>  {'}'}</div>
        <div>{'}'}</div>
      </div>

      <div className="info-box">
        <strong>💡 Best Practice:</strong>
        <ul>
          <li>Use ErrorBoundaries for component errors</li>
          <li>Use try-catch for event handlers and async code</li>
          <li>Consider using error state management for complex apps</li>
          <li>Always have a top-level ErrorBoundary as a safety net</li>
        </ul>
      </div>
    </div>
  )
}

