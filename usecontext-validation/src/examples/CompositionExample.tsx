import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

/**
 * Example 5: Context Composition & Multiple Providers
 * 
 * Demonstrates:
 * - Nesting multiple context providers
 * - Context composition pattern
 * - Context accessing other contexts
 * - Building layered context architecture
 */

// Layer 1: User Context
interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => setUser(user)
  const logout = () => setUser(null)

  const value = useMemo(() => ({ 
    user, 
    login, 
    logout 
  }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Layer 2: Permissions Context (depends on User Context)
interface PermissionsContextType {
  canEdit: boolean
  canDelete: boolean
  canCreate: boolean
  canViewAdmin: boolean
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined)

function usePermissions() {
  const context = useContext(PermissionsContext)
  if (!context) throw new Error('usePermissions must be used within PermissionsProvider')
  return context
}

function PermissionsProvider({ children }: { children: ReactNode }) {
  const { user } = useUser() // Consuming another context!

  const value = useMemo(() => {
    if (!user) {
      return {
        canEdit: false,
        canDelete: false,
        canCreate: false,
        canViewAdmin: false
      }
    }

    return {
      canEdit: user.role === 'admin' || user.role === 'user',
      canDelete: user.role === 'admin',
      canCreate: user.role === 'admin' || user.role === 'user',
      canViewAdmin: user.role === 'admin'
    }
  }, [user])

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>
}

// Layer 3: Theme Context (independent)
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Combined provider for convenience
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <PermissionsProvider>
          {children}
        </PermissionsProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

// UI Components
function LoginPanel() {
  const { user, login, logout } = useUser()

  const mockUsers = [
    { id: 1, name: 'John Admin', email: 'admin@example.com', role: 'admin' as const },
    { id: 2, name: 'Jane User', email: 'user@example.com', role: 'user' as const }
  ]

  if (user) {
    return (
      <div className="component-box highlight">
        <strong>Logged in as:</strong>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
        <button onClick={logout} style={{ marginTop: '10px' }}>Logout</button>
      </div>
    )
  }

  return (
    <div className="component-box">
      <strong>Not logged in</strong>
      <div className="controls">
        {mockUsers.map(u => (
          <button key={u.id} onClick={() => login(u)}>
            Login as {u.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function PermissionsDisplay() {
  const { canEdit, canDelete, canCreate, canViewAdmin } = usePermissions()

  return (
    <div className="component-box">
      <strong>Your Permissions:</strong>
      <div style={{ marginTop: '10px' }}>
        <div>✏️ Can Edit: {canEdit ? '✅' : '❌'}</div>
        <div>🗑️ Can Delete: {canDelete ? '✅' : '❌'}</div>
        <div>➕ Can Create: {canCreate ? '✅' : '❌'}</div>
        <div>👑 Admin Access: {canViewAdmin ? '✅' : '❌'}</div>
      </div>
    </div>
  )
}

function ThemePanel() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div 
      className="theme-preview" 
      style={{ 
        background: theme === 'light' ? '#ffffff' : '#2d3748',
        color: theme === 'light' ? '#000000' : '#ffffff'
      }}
    >
      <strong>Current Theme: {theme}</strong>
      <button onClick={toggleTheme} style={{ marginTop: '10px' }}>
        Toggle Theme
      </button>
    </div>
  )
}

function ProtectedAction() {
  const { user } = useUser()
  const { canDelete } = usePermissions()

  const handleDelete = () => {
    alert('Item deleted!')
  }

  if (!user) {
    return (
      <div className="info-box warning">
        <strong>⚠️ Please login to perform actions</strong>
      </div>
    )
  }

  if (!canDelete) {
    return (
      <div className="info-box error">
        <strong>🚫 You don't have permission to delete items</strong>
        <p>Only admins can delete.</p>
      </div>
    )
  }

  return (
    <div className="info-box success">
      <strong>✓ You have delete permissions!</strong>
      <button className="danger" onClick={handleDelete} style={{ marginTop: '10px' }}>
        Delete Item
      </button>
    </div>
  )
}

export default function CompositionExample() {
  return (
    <div className="example-section">
      <h2>
        5. Context Composition
        <span className="badge good">✓ Best Practice</span>
      </h2>
      <p className="description">
        Demonstrates how to compose multiple contexts together. Permissions context 
        depends on User context, showing layered context architecture.
      </p>

      <AppProviders>
        <div className="demo-container">
          <div className="comparison">
            <div>
              <LoginPanel />
              <PermissionsDisplay />
            </div>
            <div>
              <ThemePanel />
              <ProtectedAction />
            </div>
          </div>
        </div>
      </AppProviders>

      <div className="info-box success">
        <strong>✓ Composition Benefits:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li><strong>Modularity:</strong> Each context handles one concern</li>
          <li><strong>Reusability:</strong> Contexts can be used independently</li>
          <li><strong>Layering:</strong> Contexts can build on top of each other</li>
          <li><strong>Clean API:</strong> Combined provider for convenience</li>
        </ul>
      </div>

      <div className="code-block">
        <div className="keyword">// ✓ Context can consume another context</div>
        <div><span className="keyword">function</span> <span className="function">PermissionsProvider</span>({'{ children }'}) {'{'}</div>
        <div>  <span className="keyword">const</span> {'{ user }'} = <span className="function">useUser</span>() <span className="keyword">// Use another context!</span></div>
        <div>  </div>
        <div>  <span className="keyword">const</span> permissions = <span className="function">useMemo</span>(<span className="keyword">()</span> <span className="keyword">=&gt;</span> {'{'}</div>
        <div>    <span className="keyword">return</span> calculatePermissions(user)</div>
        <div>  {'}'}, [user])</div>
        <div>  </div>
        <div>  <span className="keyword">return</span> {'<Provider value={permissions}>{children}</Provider>'}</div>
        <div>{'}'}</div>
      </div>

      <div className="info-box">
        <strong>💡 Composition Pattern:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Create a combined provider component for convenience</li>
          <li>Order matters: dependencies should be wrapped first</li>
          <li>Each provider can access contexts above it in the tree</li>
          <li>Keep contexts focused and single-purpose</li>
        </ul>
      </div>
    </div>
  )
}

