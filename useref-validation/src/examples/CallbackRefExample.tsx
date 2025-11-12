import { useState, useCallback } from 'react'

/**
 * Example 6: Callback Refs
 * 
 * Validates:
 * - Alternative to useRef: callback refs
 * - Called when element mounts/unmounts
 * - Useful for dynamic measurements or conditional refs
 */
export default function CallbackRefExample() {
  const [height, setHeight] = useState<number>(0)
  const [mounted, setMounted] = useState(false)
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
      setMounted(true)
      console.log('Element mounted, measured height:', node.getBoundingClientRect().height)
    } else {
      setMounted(false)
      console.log('Element unmounted')
    }
  }, [])

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }

  const removeItem = () => {
    setItems(prev => prev.slice(0, -1))
  }

  return (
    <div className="example-card">
      <h2>6. Callback Refs</h2>
      <p>Using callback refs to measure elements dynamically.</p>

      <div 
        ref={measuredRef}
        className="result"
        style={{ padding: '16px' }}
      >
        <div><strong>Dynamic Content:</strong></div>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div className="result">
        <div>Element mounted: {mounted ? '✅' : '❌'}</div>
        <div>Measured height: <span className="highlight">{height.toFixed(2)}px</span></div>
        <div>Items count: <span className="highlight">{items.length}</span></div>
      </div>

      <button onClick={addItem}>Add Item</button>
      <button onClick={removeItem} disabled={items.length === 0}>
        Remove Item
      </button>

      <p style={{ fontSize: '0.85rem', marginTop: '12px', color: '#999' }}>
        💡 Watch the height update as you add/remove items!
      </p>
    </div>
  )
}

