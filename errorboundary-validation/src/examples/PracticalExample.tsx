import { useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

/**
 * Example 4: Practical Real-World Example
 * 
 * Demonstrates:
 * - Error logging and reporting
 * - Recovery strategies
 * - User-friendly error messages
 * - Development vs Production modes
 */

// Simulated error logging service
const errorLogger = {
  log: (error: Error, errorInfo: any, context?: any) => {
    console.group('🔴 Error Logged to Service')
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)
    console.error('Component Stack:', errorInfo.componentStack)
    if (context) {
      console.info('Context:', context)
    }
    console.groupEnd()
    
    // In real app, send to service like Sentry, LogRocket, etc.
    // Sentry.captureException(error, { contexts: { react: errorInfo } })
  }
}

// Product card that might fail
interface Product {
  id: number
  name: string
  price: number
  image?: string
}

function ProductCard({ product, shouldCrash }: { product: Product; shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error(`Failed to render product: ${product.name}`)
  }

  return (
    <div className="demo-box success" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>📦</div>
      <h4>{product.name}</h4>
      <div style={{ color: '#28a745', fontWeight: 'bold' }}>
        ${product.price.toFixed(2)}
      </div>
      <button style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        Add to Cart
      </button>
    </div>
  )
}

// Simulated user feedback
function ErrorFeedbackForm({ onSubmit }: { onSubmit: (feedback: string) => void }) {
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback.trim()) {
      onSubmit(feedback)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="info-box success">
        <strong>✓ Thank you for your feedback!</strong>
        <p>Our team has been notified and will look into this issue.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>Help us improve:</strong>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: '5px 0' }}>
          What were you trying to do when this error occurred?
        </p>
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Describe what happened..."
        rows={3}
        style={{
          width: '100%',
          padding: '10px',
          border: '2px solid #dee2e6',
          borderRadius: '6px',
          fontSize: '1rem',
          resize: 'vertical'
        }}
      />
      <button type="submit" style={{ marginTop: '10px' }}>
        Send Feedback
      </button>
    </form>
  )
}

// Production-ready error fallback
function ProductionErrorFallback({ 
  error, 
  onReset, 
  productId 
}: { 
  error: Error; 
  onReset: () => void; 
  productId: number 
}) {
  const [showDetails, setShowDetails] = useState(false)
  const errorId = `ERR-${Date.now()}`

  return (
    <div className="error-display">
      <h3>😕 Oops! Something went wrong</h3>
      <p style={{ margin: '10px 0' }}>
        We're having trouble loading this product. Don't worry, we've been notified 
        and are working on it!
      </p>

      <div className="info-box" style={{ margin: '15px 0' }}>
        <strong>Error ID: {errorId}</strong>
        <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>
          Reference this ID when contacting support
        </p>
      </div>

      <div className="controls">
        <button onClick={onReset}>
          Try Again
        </button>
        <button 
          className="secondary"
          onClick={() => window.location.href = '/'}
        >
          Go to Homepage
        </button>
        <button
          className="secondary"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} Technical Details
        </button>
      </div>

      {showDetails && (
        <div style={{ marginTop: '15px' }}>
          <div className="error-message">
            <strong>Error:</strong> {error.message}
          </div>
        </div>
      )}

      <ErrorFeedbackForm 
        onSubmit={(feedback) => {
          errorLogger.log(error, { productId }, { feedback, errorId })
        }}
      />
    </div>
  )
}

export default function PracticalExample() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 },
    { id: 4, name: 'Monitor', price: 299.99 },
  ])

  const [crashedProducts, setCrashedProducts] = useState<number[]>([])
  const [errorLogs, setErrorLogs] = useState<string[]>([])

  const toggleProductCrash = (productId: number) => {
    setCrashedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleError = (error: Error, errorInfo: any, productId: number) => {
    // Log to external service
    errorLogger.log(error, errorInfo, { productId, timestamp: new Date().toISOString() })
    
    // Track locally for demo
    setErrorLogs(prev => [...prev, `Product ${productId}: ${error.message}`])
    
    // In real app: Send to Sentry, DataDog, etc.
    // Sentry.captureException(error, {
    //   tags: { productId },
    //   extra: { componentStack: errorInfo.componentStack }
    // })
  }

  return (
    <div className="example-section">
      <h2>
        4. Production-Ready Example
        <span className="badge info">🔧 Real-World</span>
      </h2>
      <p className="description">
        A complete e-commerce product listing with proper error handling, logging, 
        and user-friendly recovery options.
      </p>

      <div className="info-box">
        <strong>💡 This example demonstrates:</strong>
        <ul>
          <li>Error logging to external services</li>
          <li>User-friendly error messages</li>
          <li>Multiple recovery options</li>
          <li>Error feedback collection</li>
          <li>Error ID tracking for support</li>
        </ul>
      </div>

      <div className="demo-container">
        <h3>Product Catalog</h3>
        
        <div className="controls">
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => toggleProductCrash(product.id)}
              className={crashedProducts.includes(product.id) ? 'danger' : 'success'}
            >
              {crashedProducts.includes(product.id) ? 'Fix' : 'Crash'} {product.name}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {products.map(product => (
            <ErrorBoundary
              key={`${product.id}-${crashedProducts.includes(product.id)}`}
              onError={(error, errorInfo) => handleError(error, errorInfo, product.id)}
              fallback={
                <ProductionErrorFallback
                  error={new Error(`Failed to load ${product.name}`)}
                  onReset={() => toggleProductCrash(product.id)}
                  productId={product.id}
                />
              }
            >
              <ProductCard 
                product={product} 
                shouldCrash={crashedProducts.includes(product.id)}
              />
            </ErrorBoundary>
          ))}
        </div>
      </div>

      {errorLogs.length > 0 && (
        <div className="demo-container">
          <h3>📊 Error Logs (Simulated Dashboard)</h3>
          <div className="info-box warning">
            <strong>Errors captured ({errorLogs.length}):</strong>
            <ul style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {errorLogs.map((log, index) => (
                <li key={index} style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {log}
                </li>
              ))}
            </ul>
          </div>
          <button 
            className="secondary"
            onClick={() => setErrorLogs([])}
          >
            Clear Logs
          </button>
        </div>
      )}

      <div className="info-box success">
        <strong>✓ Best Practices in Action:</strong>
        <ul>
          <li><strong>Error Logging:</strong> All errors sent to logging service</li>
          <li><strong>User Experience:</strong> Friendly messages instead of technical jargon</li>
          <li><strong>Recovery Options:</strong> Multiple ways to continue</li>
          <li><strong>Error IDs:</strong> Trackable references for support</li>
          <li><strong>Feedback Collection:</strong> Learn what users were doing</li>
          <li><strong>Graceful Degradation:</strong> Other products still work</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="comment">// Production ErrorBoundary with logging</div>
        <div><span className="keyword">{'<ErrorBoundary'}</span></div>
        <div>  onError={'={(error, errorInfo) => {'}</div>
        <div>    <span className="comment">// Log to Sentry, DataDog, etc.</span></div>
        <div>    Sentry.<span className="method">captureException</span>(error, {'{'}</div>
        <div>      tags: {'{ productId }'}, </div>
        <div>      extra: {'{ componentStack: errorInfo.componentStack }'}</div>
        <div>    {'})'}</div>
        <div>  {'}'}</div>
        <div>  fallback={'={<UserFriendlyError />}'}</div>
        <div>{'>'}</div>
        <div>  {'<ProductCard />'}</div>
        <div><span className="keyword">{'</ErrorBoundary>'}</span></div>
      </div>

      <div className="comparison">
        <div className="info-box error">
          <strong>❌ Bad Error Handling</strong>
          <ul style={{ fontSize: '0.9rem' }}>
            <li>Show raw error messages</li>
            <li>No recovery options</li>
            <li>Don't log errors</li>
            <li>Crash entire page</li>
          </ul>
        </div>
        <div className="info-box success">
          <strong>✓ Good Error Handling</strong>
          <ul style={{ fontSize: '0.9rem' }}>
            <li>Friendly user messages</li>
            <li>Multiple recovery paths</li>
            <li>Log with context</li>
            <li>Isolate failures</li>
          </ul>
        </div>
      </div>

      <div className="info-box">
        <strong>🔧 Integration with Error Services:</strong>
        <ul>
          <li><strong>Sentry:</strong> Most popular, great React support</li>
          <li><strong>LogRocket:</strong> Session replay with errors</li>
          <li><strong>DataDog:</strong> Full observability platform</li>
          <li><strong>Bugsnag:</strong> Error monitoring and reporting</li>
          <li><strong>Rollbar:</strong> Real-time error tracking</li>
        </ul>
      </div>
    </div>
  )
}

