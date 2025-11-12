import { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from 'react'

/**
 * Example 3: Context Splitting Pattern ✓
 * 
 * Demonstrates the solution:
 * - Split large contexts into smaller, focused contexts
 * - Each component subscribes only to data it needs
 * - Use useMemo and useCallback to prevent unnecessary re-renders
 */

// Split into separate contexts for separate concerns
interface CountContextType {
  count: number
  incrementCount: () => void
}

interface TextContextType {
  text: string
  setText: (text: string) => void
}

interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
}

const CountContext = createContext<CountContextType | undefined>(undefined)
const TextContext = createContext<TextContextType | undefined>(undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Custom hooks for each context
function useCount() {
  const context = useContext(CountContext)
  if (!context) throw new Error('useCount must be used within CountProvider')
  return context
}

function useText() {
  const context = useContext(TextContext)
  if (!context) throw new Error('useText must be used within TextProvider')
  return context
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// ✓ GOOD: Separate providers with memoized values
function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  // Memoize the callback
  const incrementCount = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  // Memoize the context value
  const value = useMemo(() => ({ 
    count, 
    incrementCount 
  }), [count, incrementCount])

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  )
}

function TextProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('')

  const value = useMemo(() => ({ 
    text, 
    setText 
  }), [text])

  return (
    <TextContext.Provider value={value}>
      {children}
    </TextContext.Provider>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')

  const value = useMemo(() => ({ 
    theme, 
    setTheme 
  }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Component that only subscribes to count
function CountDisplay() {
  const { count } = useCount()
  const renderCount = useRef(0)
  renderCount.current++
  
  useEffect(() => {
    console.log('✓ CountDisplay rendered (optimized)')
  })

  return (
    <div className="component-box" style={{ borderColor: '#28a745' }}>
      <strong>✓ Count Display (Optimized)</strong>
      <div>Count: {count}</div>
      <div className="render-count" style={{ background: '#28a745' }}>
        Renders: {renderCount.current}
      </div>
    </div>
  )
}

// Component that only subscribes to text
function TextDisplay() {
  const { text } = useText()
  const renderCount = useRef(0)
  renderCount.current++
  
  useEffect(() => {
    console.log('✓ TextDisplay rendered (optimized)')
  })

  return (
    <div className="component-box" style={{ borderColor: '#28a745' }}>
      <strong>✓ Text Display (Optimized)</strong>
      <div>Text: {text || '(empty)'}</div>
      <div className="render-count" style={{ background: '#28a745' }}>
        Renders: {renderCount.current}
      </div>
    </div>
  )
}

// Component that only subscribes to theme
function ThemeDisplay() {
  const { theme } = useTheme()
  const renderCount = useRef(0)
  renderCount.current++
  
  useEffect(() => {
    console.log('✓ ThemeDisplay rendered (optimized)')
  })

  return (
    <div className="component-box" style={{ borderColor: '#28a745' }}>
      <strong>✓ Theme Display (Optimized)</strong>
      <div>Theme: {theme}</div>
      <div className="render-count" style={{ background: '#28a745' }}>
        Renders: {renderCount.current}
      </div>
    </div>
  )
}

function Controls() {
  const { incrementCount } = useCount()
  const { setText } = useText()
  const { theme, setTheme } = useTheme()

  return (
    <div className="controls">
      <button onClick={incrementCount}>Increment Count</button>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  )
}

export default function ContextSplittingExample() {
  return (
    <div className="example-section">
      <h2>
        3. Context Splitting Pattern
        <span className="badge good">✓ Best Practice</span>
      </h2>
      <p className="description">
        The solution to performance issues: Split large contexts into smaller, focused contexts. 
        Now each component only re-renders when its specific data changes!
      </p>

      <CountProvider>
        <TextProvider>
          <ThemeProvider>
            <div className="demo-container">
              <h3>Try changing any value:</h3>
              <Controls />
              
              <div className="info-box success">
                <strong>✓ Notice the difference!</strong>
                <p>Now only the component that uses the changed value re-renders. 
                The other components stay untouched!</p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <CountDisplay />
                <TextDisplay />
                <ThemeDisplay />
              </div>
            </div>
          </ThemeProvider>
        </TextProvider>
      </CountProvider>

      <div className="info-box success">
        <strong>✓ Best Practices Applied:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li><strong>Context Splitting:</strong> Separate contexts for separate concerns</li>
          <li><strong>useMemo:</strong> Memoize context values to prevent unnecessary re-renders</li>
          <li><strong>useCallback:</strong> Memoize callback functions</li>
          <li><strong>Custom Hooks:</strong> Clean API for consuming contexts</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="keyword">// ✓ GOOD - Memoized context value</div>
        <div><span className="keyword">const</span> value = <span className="function">useMemo</span>(<span className="keyword">()</span> <span className="keyword">=&gt;</span> ({'{'}</div>
        <div>  count,</div>
        <div>  incrementCount</div>
        <div>{'}'}, [count, incrementCount])</div>
      </div>

      <div className="comparison">
        <div className="info-box error">
          <strong>❌ Before (Single Context)</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>All components re-render together</li>
            <li>Wasted renders</li>
            <li>Poor performance</li>
          </ul>
        </div>
        <div className="info-box success">
          <strong>✓ After (Split Contexts)</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Only affected component re-renders</li>
            <li>Optimized renders</li>
            <li>Better performance</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

