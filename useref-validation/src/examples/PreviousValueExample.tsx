import { useRef, useState, useEffect } from 'react'

/**
 * Example 3: Storing Previous Value
 * 
 * Validates:
 * - useRef can store previous state/prop values
 * - Updates happen after render (in useEffect)
 * - Useful for comparing current vs previous values
 */
export default function PreviousValueExample() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const prevCountRef = useRef<number>()
  const prevNameRef = useRef<string>()

  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  useEffect(() => {
    prevNameRef.current = name
  }, [name])

  return (
    <div className="example-card">
      <h2>3. Previous Value Tracking</h2>
      <p>Track previous state values using useRef + useEffect.</p>

      <div className="result">
        <div>
          Current count: <span className="highlight">{count}</span>
        </div>
        <div>
          Previous count: <span className="highlight">{prevCountRef.current ?? 'N/A'}</span>
        </div>
        <div style={{ marginTop: '8px' }}>
          Current name: <span className="highlight">{name || '(empty)'}</span>
        </div>
        <div>
          Previous name: <span className="highlight">{prevNameRef.current || '(empty)'}</span>
        </div>
      </div>

      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>
      <button onClick={() => setCount(c => c - 1)}>
        Decrement Count
      </button>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
      />
    </div>
  )
}

