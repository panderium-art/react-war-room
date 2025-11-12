import { createContext, useContext, useReducer, useRef, useEffect } from 'react'

/**
 * Example 4: useContext + useReducer Pattern
 * 
 * Demonstrates:
 * - Combining useContext with useReducer for complex state
 * - Separation of state and dispatch contexts
 * - Scalable state management pattern
 * - TypeScript typing for actions and state
 */

// Define state shape
interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

// Define action types
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' }

// Reducer function
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false }
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    default:
      return state
  }
}

// Create separate contexts for state and dispatch (best practice!)
const TodoStateContext = createContext<TodoState | undefined>(undefined)
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | undefined>(undefined)

// Custom hooks
function useTodoState() {
  const context = useContext(TodoStateContext)
  if (!context) {
    throw new Error('useTodoState must be used within TodoProvider')
  }
  return context
}

function useTodoDispatch() {
  const context = useContext(TodoDispatchContext)
  if (!context) {
    throw new Error('useTodoDispatch must be used within TodoProvider')
  }
  return context
}

// Provider component
function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Learn useContext', completed: true },
      { id: 2, text: 'Master useReducer', completed: false },
      { id: 3, text: 'Build awesome apps', completed: false }
    ],
    filter: 'all'
  })

  // Dispatch never changes, so no need to memoize
  // State is automatically optimized by useReducer

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

// Component that only reads state
function TodoStats() {
  const { todos } = useTodoState()
  const renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    console.log('TodoStats rendered')
  })

  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const active = total - completed

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="value">{total}</span>
        <span className="label">Total Todos</span>
      </div>
      <div className="stat-card">
        <span className="value">{active}</span>
        <span className="label">Active</span>
      </div>
      <div className="stat-card">
        <span className="value">{completed}</span>
        <span className="label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="value">{renderCount.current}</span>
        <span className="label">Renders</span>
      </div>
    </div>
  )
}

// Component that adds todos (only uses dispatch)
function AddTodo() {
  const dispatch = useTodoDispatch()
  const renderCount = useRef(0)
  renderCount.current++

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('todo') as HTMLInputElement
    if (input.value.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input.value })
      input.value = ''
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          name="todo"
          placeholder="What needs to be done?"
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>
        Renders: {renderCount.current} (doesn't re-render when todos change!)
      </div>
    </div>
  )
}

// Filter buttons
function TodoFilters() {
  const { filter } = useTodoState()
  const dispatch = useTodoDispatch()

  return (
    <div className="controls">
      <button 
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        style={{ opacity: filter === 'all' ? 1 : 0.6 }}
      >
        All
      </button>
      <button 
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        style={{ opacity: filter === 'active' ? 1 : 0.6 }}
      >
        Active
      </button>
      <button 
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        style={{ opacity: filter === 'completed' ? 1 : 0.6 }}
      >
        Completed
      </button>
      <button 
        className="danger"
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
      >
        Clear Completed
      </button>
    </div>
  )
}

// Todo list display
function TodoList() {
  const { todos, filter } = useTodoState()
  const dispatch = useTodoDispatch()

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div>
      {filteredTodos.map(todo => (
        <div 
          key={todo.id} 
          className="component-box"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            opacity: todo.completed ? 0.6 : 1
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          />
          <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button 
            className="danger"
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
          >
            Delete
          </button>
        </div>
      ))}
      {filteredTodos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
          No todos to display
        </div>
      )}
    </div>
  )
}

export default function ReducerPatternExample() {
  return (
    <div className="example-section">
      <h2>
        4. useContext + useReducer Pattern
        <span className="badge good">✓ Best Practice</span>
      </h2>
      <p className="description">
        For complex state logic, combine useContext with useReducer. Separate state and 
        dispatch contexts so components that only dispatch actions don't re-render!
      </p>

      <TodoProvider>
        <div className="demo-container">
          <TodoStats />
          <AddTodo />
          <TodoFilters />
          <TodoList />
        </div>
      </TodoProvider>

      <div className="info-box success">
        <strong>✓ Key Benefits:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li><strong>Scalability:</strong> Reducer pattern handles complex state logic</li>
          <li><strong>Predictability:</strong> All state changes go through defined actions</li>
          <li><strong>Performance:</strong> Separate contexts for state and dispatch</li>
          <li><strong>Type Safety:</strong> TypeScript ensures action types are correct</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="keyword">// ✓ Separate state and dispatch contexts</div>
        <div><span className="keyword">const</span> StateContext = <span className="function">createContext</span>()</div>
        <div><span className="keyword">const</span> DispatchContext = <span className="function">createContext</span>()</div>
        <br />
        <div className="keyword">// Components using only dispatch won't re-render!</div>
        <div><span className="keyword">const</span> dispatch = <span className="function">useContext</span>(DispatchContext)</div>
      </div>

      <div className="info-box">
        <strong>💡 When to use useContext + useReducer:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Complex state logic with multiple sub-values</li>
          <li>State transitions that depend on previous state</li>
          <li>When you want to separate state and actions</li>
          <li>Building a mini-Redux without external dependencies</li>
        </ul>
      </div>
    </div>
  )
}

