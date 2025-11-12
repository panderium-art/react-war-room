import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

/**
 * Example 6: Practical Real-World Example
 * 
 * A complete mini-app demonstrating:
 * - Theme switching
 * - User authentication
 * - Notification system
 * - All best practices combined
 */

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto'
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  colors: {
    background: string
    text: string
    primary: string
    secondary: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light')

  const colors = useMemo(() => {
    const isDark = theme === 'dark'
    return {
      background: isDark ? '#1a202c' : '#ffffff',
      text: isDark ? '#e2e8f0' : '#2d3748',
      primary: isDark ? '#4299e1' : '#3182ce',
      secondary: isDark ? '#ed64a6' : '#d53f8c'
    }
  }, [theme])

  const value = useMemo(() => ({ 
    theme, 
    setTheme, 
    colors 
  }), [theme, colors])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Notification Context
interface Notification {
  id: number
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type: Notification['type']) => void
  removeNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type: Notification['type']) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => removeNotification(id), 3000)
  }

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const value = useMemo(() => ({ 
    notifications, 
    addNotification, 
    removeNotification 
  }), [notifications])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

// Auth Context
interface AuthUser {
  id: number
  name: string
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (name: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const notifications = useNotifications()

  const login = (name: string) => {
    const newUser = {
      id: Date.now(),
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    }
    setUser(newUser)
    notifications.addNotification(`Welcome back, ${name}!`, 'success')
  }

  const logout = () => {
    setUser(null)
    notifications.addNotification('You have been logged out', 'info')
  }

  const value = useMemo(() => ({ 
    user, 
    login, 
    logout, 
    isAuthenticated: !!user 
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Combined Providers
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

// UI Components
function NotificationList() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, width: '300px' }}>
      {notifications.map(notif => (
        <div
          key={notif.id}
          className="info-box"
          style={{
            marginBottom: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <strong>{notif.message}</strong>
            <button
              onClick={() => removeNotification(notif.id)}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0 5px'
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function Header() {
  const { theme, setTheme, colors } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div 
      style={{ 
        background: colors.background,
        color: colors.text,
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>🚀 My Application</h3>
        {isAuthenticated && <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Welcome, {user?.name}</div>}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value as any)}
          style={{ 
            background: colors.background, 
            color: colors.text, 
            border: `2px solid ${colors.primary}` 
          }}
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="auto">🔄 Auto</option>
        </select>
        
        {isAuthenticated && (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  )
}

function LoginForm() {
  const { login } = useAuth()
  const notifications = useNotifications()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('username') as HTMLInputElement
    if (input.value.trim()) {
      login(input.value)
      input.value = ''
    } else {
      notifications.addNotification('Please enter a username', 'warning')
    }
  }

  return (
    <div className="component-box">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

function Dashboard() {
  const { colors } = useTheme()
  const notifications = useNotifications()

  return (
    <div 
      style={{ 
        background: colors.background,
        color: colors.text,
        padding: '20px',
        borderRadius: '8px'
      }}
    >
      <h3>Dashboard</h3>
      <p>You are now logged in! Here's what you can do:</p>
      
      <div className="controls">
        <button onClick={() => notifications.addNotification('Task completed!', 'success')}>
          Complete Task
        </button>
        <button 
          className="secondary"
          onClick={() => notifications.addNotification('New message received', 'info')}
        >
          Show Info
        </button>
        <button 
          className="danger"
          onClick={() => notifications.addNotification('Something went wrong', 'error')}
        >
          Trigger Error
        </button>
      </div>

      <div style={{ marginTop: '20px', opacity: 0.7 }}>
        <p>This dashboard demonstrates:</p>
        <ul>
          <li>✓ Theme switching (try changing the theme!)</li>
          <li>✓ Authentication state</li>
          <li>✓ Notification system</li>
          <li>✓ All contexts working together</li>
        </ul>
      </div>
    </div>
  )
}

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Header />
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </>
  )
}

export default function PracticalExample() {
  return (
    <div className="example-section">
      <h2>
        6. Real-World Application
        <span className="badge good">✓ Complete Example</span>
      </h2>
      <p className="description">
        A practical mini-application combining theme, authentication, and notifications. 
        This demonstrates how multiple contexts work together in a real app.
      </p>

      <AppProviders>
        <div className="demo-container" style={{ position: 'relative' }}>
          <AppContent />
          <NotificationList />
        </div>
      </AppProviders>

      <div className="info-box success">
        <strong>✓ Best Practices in Action:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Multiple contexts working together seamlessly</li>
          <li>Each context has a single, clear responsibility</li>
          <li>Custom hooks provide clean, type-safe APIs</li>
          <li>Memoization prevents unnecessary re-renders</li>
          <li>Contexts can interact with each other (Auth uses Notifications)</li>
        </ul>
      </div>

      <div className="info-box">
        <strong>💡 Real-World Takeaways:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Start with basic contexts and compose them as needed</li>
          <li>Keep context values focused and minimal</li>
          <li>Use custom hooks to encapsulate context logic</li>
          <li>Combine with other React patterns (reducers, memoization, etc.)</li>
          <li>Consider using state management libraries for very complex apps</li>
        </ul>
      </div>
    </div>
  )
}

