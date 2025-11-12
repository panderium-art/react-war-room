# ErrorBoundary Validation Project

A comprehensive standalone React application demonstrating ErrorBoundary concepts, best practices, limitations, and real-world usage patterns.

## 🎯 Purpose

This project provides hands-on examples to understand React's ErrorBoundary feature, including what they catch, what they don't catch, and how to implement them effectively in production applications.

## 🚀 Getting Started

### Installation

```bash
cd errorboundary-validation
npm install
```

### Running the Project

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

## 📚 What's Being Validated

### 1. **What ErrorBoundaries CATCH** ✓
- ✅ Errors during component rendering
- ✅ Errors in lifecycle methods
- ✅ Errors in constructors of child components
- ✅ JSX errors (null reference, undefined properties)
- ✅ Errors triggered by state updates

**Key Learning:** ErrorBoundaries catch synchronous errors in the React component tree during render phase.

### 2. **What ErrorBoundaries DON'T CATCH** ⚠️
- ❌ Event handler errors
- ❌ Asynchronous code (setTimeout, promises, async/await)
- ❌ Server-side rendering errors
- ❌ Errors in the ErrorBoundary itself
- ❌ Errors outside React components

**Key Learning:** ErrorBoundaries have important limitations. Understanding what they DON'T catch is crucial for proper error handling.

### 3. **Granular ErrorBoundaries** ✓
- ✅ Strategic boundary placement
- ✅ Isolating failures to specific UI sections
- ✅ Keeping rest of app functional
- ✅ Widget-level vs page-level boundaries
- ✅ Critical vs optional component protection

**Key Learning:** Place boundaries strategically to isolate failures and maximize app resilience.

### 4. **Production-Ready Implementation** 🔧
- ✅ Error logging integration (Sentry, LogRocket)
- ✅ User-friendly error messages
- ✅ Multiple recovery options
- ✅ Error ID tracking
- ✅ User feedback collection
- ✅ Graceful degradation

**Key Learning:** Production ErrorBoundaries need logging, good UX, and recovery options.

## 🏗️ Project Structure

```
errorboundary-validation/
├── src/
│   ├── components/
│   │   └── ErrorBoundary.tsx          # Reusable ErrorBoundary component
│   ├── examples/
│   │   ├── WhatTheyCatchExample.tsx   # Demonstrating caught errors
│   │   ├── WhatTheyDontCatchExample.tsx  # Demonstrating limitations
│   │   ├── GranularBoundariesExample.tsx  # Strategic placement
│   │   └── PracticalExample.tsx       # Real-world implementation
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔍 Key Concepts

### ErrorBoundary Lifecycle Methods

#### `getDerivedStateFromError(error)`
- **Phase:** Render phase
- **Purpose:** Update state to show fallback UI
- **Must be:** Static method
- **Should NOT:** Have side effects

```typescript
static getDerivedStateFromError(error: Error) {
  return { hasError: true }
}
```

#### `componentDidCatch(error, errorInfo)`
- **Phase:** Commit phase  
- **Purpose:** Side effects like logging
- **Receives:** Error object and component stack
- **Use for:** Logging to error services

```typescript
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  logErrorToService(error, errorInfo)
}
```

### What ErrorBoundaries Catch

| Error Type | Caught? | Example |
|------------|---------|---------|
| Render errors | ✅ Yes | `throw new Error()` in render |
| Lifecycle method errors | ✅ Yes | Error in `useEffect` that triggers render |
| Constructor errors | ✅ Yes | Error in class constructor |
| JSX errors | ✅ Yes | `user.name` when user is null |

### What ErrorBoundaries DON'T Catch

| Error Type | Caught? | Solution |
|------------|---------|----------|
| Event handlers | ❌ No | Use try-catch |
| Async code | ❌ No | Use try-catch with async/await |
| setTimeout/setInterval | ❌ No | Handle errors in callback |
| SSR | ❌ No | Server-side error handling |
| Boundary itself | ❌ No | Parent ErrorBoundary |

## 💡 Best Practices

### 1. Always Use a Top-Level Boundary

```tsx
// App.tsx
<ErrorBoundary fallback={<AppCrashedScreen />}>
  <App />
</ErrorBoundary>
```

**Why:** Catches any unexpected errors and prevents white screen of death.

### 2. Use Granular Boundaries

```tsx
// Dashboard.tsx
<Dashboard>
  <CriticalHeader /> {/* No boundary - let it bubble */}
  
  <ErrorBoundary fallback={<WidgetError />}>
    <WeatherWidget />
  </ErrorBoundary>
  
  <ErrorBoundary fallback={<WidgetError />}>
    <StockWidget />
  </ErrorBoundary>
</Dashboard>
```

**Why:** Isolates failures so one widget crashing doesn't break everything.

### 3. Log Errors to External Services

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: { react: errorInfo }
    })
  }}
>
  <Component />
</ErrorBoundary>
```

**Why:** Track and debug production errors.

### 4. Provide Recovery Options

```tsx
function ErrorFallback({ error, onReset }) {
  return (
    <div>
      <h3>Something went wrong</h3>
      <button onClick={onReset}>Try Again</button>
      <button onClick={() => navigate('/home')}>Go Home</button>
    </div>
  )
}
```

**Why:** Give users ways to continue using your app.

### 5. Use Try-Catch for Event Handlers

```tsx
// ❌ BAD - Not caught by ErrorBoundary
<button onClick={() => {
  throw new Error('Crash!')
}}>Click</button>

// ✅ GOOD - Properly handled
<button onClick={() => {
  try {
    riskyOperation()
  } catch (error) {
    setError(error)
  }
}}>Click</button>
```

### 6. Handle Async Errors

```tsx
// ✅ GOOD - Async error handling
async function fetchData() {
  try {
    const data = await api.fetch()
    setData(data)
  } catch (error) {
    setError(error) // This will trigger re-render
  }
}
```

## 🎓 Strategic Boundary Placement

### Critical Components (No Boundary)
- Navigation/Header
- Core app structure
- Authentication gates

**Reason:** If these fail, the whole app should fail (fail-fast principle).

### Optional Components (Individual Boundaries)
- Widgets/Cards
- Third-party components
- Analytics
- Non-essential features

**Reason:** Failure should be isolated; rest of app continues working.

### Feature Sections (Section Boundaries)
- Settings page
- User profile
- Admin panel

**Reason:** Balance between granularity and maintenance.

### Lists/Grids (Item-Level Boundaries)
```tsx
{products.map(product => (
  <ErrorBoundary key={product.id}>
    <ProductCard product={product} />
  </ErrorBoundary>
))}
```

**Reason:** One bad item doesn't break the entire list.

## 🔧 Integration with Error Services

### Sentry (Most Popular)

```typescript
import * as Sentry from '@sentry/react'

Sentry.init({ dsn: 'your-dsn' })

const SentryErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: <ErrorFallback />,
  showDialog: true,
})
```

### LogRocket (Session Replay)

```typescript
import LogRocket from 'logrocket'

LogRocket.init('your-app-id')

componentDidCatch(error, errorInfo) {
  LogRocket.captureException(error, {
    extra: errorInfo
  })
}
```

### Custom Logging

```typescript
function logError(error: Error, errorInfo: ErrorInfo) {
  fetch('/api/log-error', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    })
  })
}
```

## 🐛 Development vs Production

### Development Mode
- Errors still show in console
- React shows overlay with error details
- Component stack is visible
- Easier debugging

### Production Mode
- Clean fallback UI shown
- No technical details to users
- Errors logged to services
- Better user experience

**Note:** In development with StrictMode, `componentDidCatch` might be called twice.

## ⚡ Performance Considerations

### ErrorBoundary Re-renders

ErrorBoundaries cause re-renders in two scenarios:
1. When error is caught (shows fallback)
2. When reset (shows children again)

**Tip:** Use `key` prop to force unmount and remount on reset:

```tsx
<ErrorBoundary key={resetKey}>
  <Component />
</ErrorBoundary>
```

### Minimize Boundary Count

Too many boundaries = more React overhead.

**Balance:**
- Critical path: Fewer boundaries
- Complex features: More granular
- Simple components: Can share boundaries

## 📊 Testing ErrorBoundaries

### Unit Testing

```typescript
import { render } from '@testing-library/react'

function BrokenComponent() {
  throw new Error('Test error')
}

test('ErrorBoundary catches errors', () => {
  const { getByText } = render(
    <ErrorBoundary fallback={<div>Error caught</div>}>
      <BrokenComponent />
    </ErrorBoundary>
  )
  
  expect(getByText('Error caught')).toBeInTheDocument()
})
```

### Integration Testing

Test with real components:
- Trigger errors through user interactions
- Verify fallback UI appears
- Test recovery mechanisms
- Verify logging calls

## 🛠️ Technologies Used

- **React 18** - Latest React with improved error handling
- **TypeScript** - Type safety for error handling
- **Vite** - Fast development server
- **Modern CSS** - Beautiful error displays

## 📖 Common Patterns

### Pattern 1: Fallback with Props

```tsx
<ErrorBoundary
  fallback={(error) => (
    <ErrorDisplay 
      title="Widget Failed" 
      message={error.message}
    />
  )}
>
  <Widget />
</ErrorBoundary>
```

### Pattern 2: Retry Logic

```tsx
function ComponentWithRetry() {
  const [key, setKey] = useState(0)
  
  return (
    <ErrorBoundary 
      key={key}
      onReset={() => setKey(k => k + 1)}
    >
      <Component />
    </ErrorBoundary>
  )
}
```

### Pattern 3: Error Context

```tsx
const ErrorContext = createContext()

function ErrorBoundaryWithContext({ children }) {
  const [error, setError] = useState(null)
  
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <ErrorBoundary onError={setError}>
        {children}
      </ErrorBoundary>
    </ErrorContext.Provider>
  )
}
```

## 🎯 Quick Reference Checklist

**Implementation:**
- [ ] Top-level ErrorBoundary wraps entire app
- [ ] Granular boundaries for optional features
- [ ] Custom fallback UI for each boundary type
- [ ] Error logging integration
- [ ] Recovery mechanisms (retry, navigate)

**Error Handling:**
- [ ] Try-catch in all event handlers
- [ ] Try-catch with async/await
- [ ] Error states for async operations
- [ ] Validation before dangerous operations

**User Experience:**
- [ ] User-friendly error messages
- [ ] Hide technical details in production
- [ ] Provide error IDs for support
- [ ] Multiple recovery options
- [ ] Feedback collection mechanism

**Monitoring:**
- [ ] Integrated with error service (Sentry, etc.)
- [ ] Errors include context (user, action, state)
- [ ] Error rates monitored
- [ ] Alerts for critical errors

## 📚 Resources

- [React Docs - Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [React Docs - Error Boundary RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Kent C. Dodds - Use Error Boundaries](https://kentcdodds.com/blog/use-react-error-boundary)

## 🤝 Contributing

This is a learning project. Feel free to:
- Add more error scenarios
- Improve fallback UIs
- Add testing examples
- Enhance documentation

## 📄 License

MIT - Free to use for learning and reference.

---

**Remember:** ErrorBoundaries are a safety net, not a substitute for proper error handling. Use them wisely! 🛡️

