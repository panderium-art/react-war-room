import { useRef, useState } from 'react'

/**
 * Example 2: Mutable Value Storage
 * 
 * Validates:
 * - useRef can store any mutable value (not just DOM refs)
 * - Changing ref.current does NOT trigger a re-render
 * - Value persists across renders
 * - Difference between ref and state
 */
export default function MutableValueExample() {
  const [renderCount, setRenderCount] = useState(0)
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)

  const incrementRef = () => {
    refCount.current += 1
    console.log('Ref count:', refCount.current)
    // Note: This does NOT cause a re-render
  }

  const incrementState = () => {
    setStateCount(prev => prev + 1)
    // This DOES cause a re-render
  }

  const forceRerender = () => {
    setRenderCount(prev => prev + 1)
  }

  return (
    <div className="example-card">
      <h2>2. Mutable Value Storage</h2>
      <p>
        Demonstrates that changing a ref doesn't trigger re-renders, 
        unlike state updates.
      </p>

      <div className="result">
        <div>Render count: <span className="highlight">{renderCount}</span></div>
        <div>State count: <span className="highlight">{stateCount}</span></div>
        <div>Ref count: <span className="highlight">{refCount.current}</span></div>
      </div>

      <button onClick={incrementRef}>
        Increment Ref (No re-render)
      </button>
      <button onClick={incrementState}>
        Increment State (Triggers re-render)
      </button>
      <button onClick={forceRerender}>
        Force Re-render
      </button>

      <p style={{ fontSize: '0.85rem', marginTop: '12px', color: '#999' }}>
        💡 Notice: Incrementing ref doesn't update the display until you force a re-render!
      </p>
    </div>
  )
}

