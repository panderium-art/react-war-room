import { createContext, useContext, useState } from 'react'

/**
 * Example 1: Basic useContext Usage
 * 
 * Validates:
 * - How to create a context with createContext
 * - Providing values with Context.Provider
 * - Consuming values with useContext
 * - Prop drilling vs context
 * - TypeScript typing for context
 */

// 1. Create the context with proper TypeScript typing
interface UserContextType {
  username: string
  setUsername: (name: string) => void
  role: string
  setRole: (role: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// 2. Custom hook for consuming context (best practice)
function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// 3. Provider component
function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('Guest')
  const [role, setRole] = useState('user')

  return (
    <UserContext.Provider value={{ username, setUsername, role, setRole }}>
      {children}
    </UserContext.Provider>
  )
}

// Deeply nested components that need user data
function DeepComponent1() {
  return (
    <div className="component-box">
      <strong>Level 1 Component</strong>
      <DeepComponent2 />
    </div>
  )
}

function DeepComponent2() {
  return (
    <div className="component-box">
      <strong>Level 2 Component</strong>
      <DeepComponent3 />
    </div>
  )
}

function DeepComponent3() {
  return (
    <div className="component-box">
      <strong>Level 3 Component</strong>
      <UserDisplay />
    </div>
  )
}

function UserDisplay() {
  // Consuming context - no prop drilling needed!
  const { username, role } = useUser()
  
  return (
    <div className="component-box highlight">
      <strong>✨ User Display (Consuming Context)</strong>
      <div style={{ marginTop: '10px' }}>
        <div>👤 Username: <strong>{username}</strong></div>
        <div>🎭 Role: <strong>{role}</strong></div>
      </div>
    </div>
  )
}

function UserControls() {
  const { username, setUsername, role, setRole } = useUser()

  return (
    <div className="controls">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
      </select>
    </div>
  )
}

export default function BasicUsageExample() {
  return (
    <div className="example-section">
      <h2>
        1. Basic useContext Usage
        <span className="badge good">✓ Best Practice</span>
      </h2>
      <p className="description">
        Demonstrates the fundamentals of useContext: creating context, providing values, 
        and consuming them in deeply nested components without prop drilling.
      </p>

      <UserProvider>
        <div className="demo-container">
          <h3>Update User Data:</h3>
          <UserControls />
          
          <h3 style={{ marginTop: '20px' }}>Component Tree (No Prop Drilling!):</h3>
          <DeepComponent1 />
        </div>
      </UserProvider>

      <div className="info-box success">
        <strong>✓ Key Takeaways:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Context eliminates prop drilling through component trees</li>
          <li>Use TypeScript for type-safe context values</li>
          <li>Create custom hooks (useUser) for better error handling</li>
          <li>Throw errors if context is used outside Provider</li>
        </ul>
      </div>
    </div>
  )
}

