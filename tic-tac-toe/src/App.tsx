import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Playground</h1>
      <p>A general-purpose React app for experimentation and trying things out.</p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p style={{ marginTop: '1rem', color: '#666' }}>
          Click the button to test the counter
        </p>
      </div>
    </div>
  )
}

export default App
