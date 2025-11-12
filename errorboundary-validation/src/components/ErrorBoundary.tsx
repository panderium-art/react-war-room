import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode)
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  onReset?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary Component
 * 
 * Must be a class component (cannot be functional)
 * Catches errors during rendering, in lifecycle methods, and in constructors
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  /**
   * getDerivedStateFromError
   * - Static method called during render phase
   * - Used to update state so next render shows fallback UI
   * - Should NOT have side effects
   */
  static getDerivedStateFromError(error: Error): Partial<State> {
    console.log('📊 getDerivedStateFromError called:', error.message)
    return { hasError: true }
  }

  /**
   * componentDidCatch
   * - Called during commit phase
   * - Used for side effects like logging errors
   * - Receives error and errorInfo with component stack
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('🚨 ErrorBoundary caught an error:', error)
    console.error('📍 Component stack:', errorInfo.componentStack)
    
    this.setState({
      error,
      errorInfo
    })

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error!, this.state.errorInfo!)
      }
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="error-display">
          <h3>⚠️ Something went wrong</h3>
          <div className="error-message">
            <strong>Error:</strong> {this.state.error?.message || 'Unknown error'}
          </div>
          {this.state.errorInfo && (
            <details style={{ marginTop: '15px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                View Component Stack
              </summary>
              <div className="stack-trace">
                {this.state.errorInfo.componentStack}
              </div>
            </details>
          )}
          <button onClick={this.handleReset} style={{ marginTop: '15px' }}>
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

