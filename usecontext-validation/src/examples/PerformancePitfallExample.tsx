import { createContext, useContext, useState, useRef, useEffect } from 'react'

/**
 * Example 2: Performance Pitfalls ⚠️
 * 
 * Demonstrates the BIGGEST pitfall:
 * - ALL consumers re-render when ANY part of context changes
 * - Creating new objects/functions on every render
 * - How to identify unnecessary re-renders
 */

interface AppStateType {
  count: number
  incrementCount: () => void
  text: string
  setText: (text: string) => void
  theme: string
  setTheme: (theme: string) => void
}

const AppStateContext = createContext<AppStateType | undefined>(undefined)

function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }
  return context
}

// ⚠️ BAD: This provider creates new objects on every render
function BadAppStateProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [theme, setTheme] = useState('light')

  // ⚠️ PROBLEM: New object created on every render
  // This causes ALL consumers to re-render even if they don't use changed values
  const value = {
    count,
    incrementCount: () => setCount(c => c + 1), // New function every render!
    text,
    setText,
    theme,
    setTheme,
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

// Component that only cares about count
function CountDisplay() {
  const { count } = useAppState()
  const renderCount = useRef(0)
  renderCount.current++
  
  useEffect(() => {
    console.log('CountDisplay rendered')
  })

  return (
    <div className="component-box rendered">
      <strong>Count Display</strong>
      <div>Count: {count}</div>
      <div className="render-count">Renders: {renderCount.current}</div>
    </div>
  )
}

// Component that only cares about text
function TextDisplay() {
  const { text } = useAppState()
  const renderCount = useRef(0)
  renderCount.current++
  
  useEffect(() => {
    console.log('TextDisplay rendered')
  })

  return (
    <div className="component-box rendered">
      <strong>Text Display</strong>
      <div>Text: {text || '(empty)'}</div>
      <div className="render-count">Renders: {renderCount.current}</div>
    </div>
  )
}

// Component that only cares about theme
function ThemeDisplay() {
  const { theme } = useAppState()
  const renderCount = useRef(0)
  renderCount.current++
  
  useEffect(() => {
    console.log('ThemeDisplay rendered')
  })

  return (
    <div className="component-box rendered">
      <strong>Theme Display</strong>
      <div>Theme: {theme}</div>
      <div className="render-count">Renders: {renderCount.current}</div>
    </div>
  )
}

function Controls() {
  const { incrementCount, setText, theme, setTheme } = useAppState()

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

export default function PerformancePitfallExample() {
  return (
    <div className="example-section">
      <h2>
        2. Performance Pitfalls
        <span className="badge bad">⚠️ Common Mistake</span>
      </h2>
      <p className="description">
        This example demonstrates the biggest Context pitfall: ALL consumers re-render 
        when ANY value in the context changes, even if they don't use that value!
      </p>

      <BadAppStateProvider>
        <div className="demo-container">
          <h3>Try changing any value:</h3>
          <Controls />
          
          <div className="info-box error">
            <strong>🚨 Watch the render counts!</strong>
            <p>When you change ONE value, ALL three components re-render, even though each only uses one specific value.</p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <CountDisplay />
            <TextDisplay />
            <ThemeDisplay />
          </div>
        </div>
      </BadAppStateProvider>

      <div className="info-box warning">
        <strong>⚠️ Why This Happens:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>The provider creates a new object on every render</li>
          <li>React sees the new object and notifies ALL consumers</li>
          <li>Each consumer re-renders, even if their specific value didn't change</li>
          <li>This can cause serious performance issues in large apps</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="keyword">// ⚠️ BAD - Creates new object every render</div>
        <div><span className="keyword">const</span> value = {'{'}</div>
        <div>  count,</div>
        <div>  incrementCount: <span className="keyword">()</span> <span className="keyword">=&gt;</span> <span className="function">setCount</span>(c <span className="keyword">=&gt;</span> c + <span className="string">1</span>),</div>
        <div>  text,</div>
        <div>  setText,</div>
        <div>{'}'}</div>
      </div>

      <div className="info-box">
        <strong>💡 Solutions (shown in next examples):</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Split contexts (separate contexts for separate concerns)</li>
          <li>Use useMemo to memoize context value</li>
          <li>Use useCallback for functions</li>
          <li>Use React.memo for components</li>
        </ul>
      </div>
    </div>
  )
}

