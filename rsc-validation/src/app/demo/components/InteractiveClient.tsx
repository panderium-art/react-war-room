'use client'

// This is a Client Component - requires 'use client' directive
// Demonstrates pure client-side interactivity with React hooks

import { useState, useEffect } from 'react'

export default function InteractiveClient() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on client
  useEffect(() => {
    setMounted(true)
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('demo-todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('demo-todos', JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()])
      setInput('')
    }
  }

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const themeStyles = theme === 'dark' ? {
    background: '#1a1a1a',
    color: '#ffffff',
    borderColor: '#333'
  } : {
    background: '#ffffff',
    color: '#000000',
    borderColor: '#e0e0e0'
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      margin: '1rem 0'
    }}>
      {/* Counter Card */}
      <div style={{
        padding: '1.5rem',
        ...themeStyles,
        borderRadius: '8px',
        border: `2px solid ${themeStyles.borderColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>🎯 Counter (useState)</h3>
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#0070f3',
            marginBottom: '1rem'
          }}>
            {count}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={() => setCount(count - 1)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              -
            </button>
            <button
              onClick={() => setCount(0)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#9e9e9e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              +
            </button>
          </div>
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
          borderRadius: '4px',
          fontSize: '0.85rem'
        }}>
          💡 State managed with useState hook
        </div>
      </div>

      {/* Todo List Card */}
      <div style={{
        padding: '1.5rem',
        ...themeStyles,
        borderRadius: '8px',
        border: `2px solid ${themeStyles.borderColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>📝 Todo List (localStorage)</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a todo..."
            style={{
              flex: 1,
              padding: '0.75rem',
              background: theme === 'dark' ? '#2a2a2a' : 'white',
              color: themeStyles.color,
              border: `1px solid ${themeStyles.borderColor}`,
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Add
          </button>
        </div>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {todos.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '2rem 0' }}>
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map((todo, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  background: theme === 'dark' ? '#2a2a2a' : '#f9f9f9',
                  borderRadius: '4px'
                }}
              >
                <span>{todo}</span>
                <button
                  onClick={() => removeTodo(index)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
          borderRadius: '4px',
          fontSize: '0.85rem'
        }}>
          💡 Persisted with localStorage API
        </div>
      </div>

      {/* Theme Switcher Card */}
      <div style={{
        padding: '1.5rem',
        ...themeStyles,
        borderRadius: '8px',
        border: `2px solid ${themeStyles.borderColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>🎨 Theme Switcher</h3>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '0.75rem 2rem',
              background: theme === 'dark' ? '#ffa726' : '#7e57c2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
          borderRadius: '4px',
          fontSize: '0.85rem'
        }}>
          💡 State updates all cards simultaneously
        </div>
      </div>

      {/* Info Card */}
      <div style={{
        gridColumn: '1 / -1',
        padding: '1.5rem',
        background: '#fce4ec',
        borderRadius: '8px',
        border: '2px solid #f06292'
      }}>
        <h3 style={{ marginTop: 0, color: '#c2185b' }}>🖱️ Client Component Features</h3>
        <ul style={{ marginBottom: 0 }}>
          <li><strong>Event Handlers:</strong> onClick, onChange, onKeyPress work because this runs in the browser</li>
          <li><strong>React Hooks:</strong> useState for state management, useEffect for side effects</li>
          <li><strong>Browser APIs:</strong> localStorage for data persistence</li>
          <li><strong>Instant Interactivity:</strong> No server round-trips needed for UI updates</li>
        </ul>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '4px'
        }}>
          <strong>⚠️ Trade-off:</strong> This component's JavaScript is sent to the browser,
          increasing bundle size. Use Client Components only when you need interactivity!
        </div>
      </div>
    </div>
  )
}
