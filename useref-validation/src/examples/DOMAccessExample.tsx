import { useRef } from 'react'

/**
 * Example 1: DOM Element Access
 * 
 * Validates:
 * - useRef can store a reference to a DOM element
 * - .current property contains the DOM node after mounting
 * - Can call DOM methods directly (focus, scrollIntoView, etc.)
 */
export default function DOMAccessExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const handleFocusInput = () => {
    inputRef.current?.focus()
  }

  const handleChangeBackground = () => {
    if (divRef.current) {
      const colors = ['#ffebee', '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      divRef.current.style.backgroundColor = randomColor
    }
  }

  return (
    <div className="example-card">
      <h2>1. DOM Element Access</h2>
      <p>Using useRef to access and manipulate DOM elements directly.</p>
      
      <input 
        ref={inputRef}
        type="text" 
        placeholder="Click button to focus me"
      />
      
      <div 
        ref={divRef}
        className="result"
        style={{ transition: 'background-color 0.3s' }}
      >
        This div's background can be changed!
      </div>

      <button onClick={handleFocusInput}>Focus Input</button>
      <button onClick={handleChangeBackground}>Change Background</button>
    </div>
  )
}

