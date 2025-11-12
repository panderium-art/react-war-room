# React Tests

A collection of standalone React applications designed to validate and test React framework specificities, behaviors, and edge cases.

## 📋 Purpose

This repository contains isolated React projects, each focused on exploring and validating specific React concepts, hooks, patterns, or behaviors. Each project is self-contained with its own dependencies and can be run independently.

## 🗂️ Projects

### 1. [useRef Validation](/useref-validation)
**Status:** ✅ Complete

Comprehensive testing of React's `useRef` hook, including:
- DOM element access and manipulation
- Mutable value storage without re-renders
- Previous value tracking patterns
- Uncontrolled components
- Timer/interval management
- Callback refs

**Run it:**
```bash
cd useref-validation
npm install
npm run dev
```

---

### 2. [useContext Validation](/usecontext-validation)
**Status:** ✅ Complete

Master React's Context API with best practices and pitfall demonstrations:
- Basic useContext usage and prop drilling elimination
- Performance pitfalls and unnecessary re-renders
- Context splitting pattern for optimization
- useContext + useReducer for complex state
- Context composition and layered architecture
- Real-world application with theme, auth, and notifications

**Run it:**
```bash
cd usecontext-validation
npm install
npm run dev
```

---

### 3. [ErrorBoundary Validation](/errorboundary-validation)
**Status:** ✅ Complete

Master React ErrorBoundaries with hands-on examples and best practices:
- What ErrorBoundaries catch (render errors, lifecycle errors, JSX errors)
- What they DON'T catch (event handlers, async code, setTimeout)
- Granular boundary placement strategies
- Production-ready error handling with logging
- Error recovery and user feedback patterns
- Integration with error monitoring services

**Run it:**
```bash
cd errorboundary-validation
npm install
npm run dev
```

---

## 🚀 Getting Started

Each project is standalone and can be run independently:

1. Navigate to the project directory
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Open the displayed URL in your browser

## 🎯 Goals

- **Validation**: Test and confirm React behaviors and patterns
- **Learning**: Document findings and edge cases
- **Reference**: Create reusable examples for future projects
- **Experimentation**: Try out new patterns in isolated environments

## 📚 Future Projects

Potential topics for future validation projects:
- useState edge cases and batch updates
- useEffect cleanup and dependency arrays
- useMemo/useCallback performance validation
- Custom hooks development patterns
- React 18 concurrent features
- Suspense and lazy loading behaviors
- Portal usage and event bubbling
- Server Components (React 19)
- Form handling patterns
- Animation techniques
- useTransition and useDeferredValue
- React DevTools profiling

## 🛠️ Tech Stack

Each project may use different configurations, but generally includes:
- React 18+
- TypeScript for type safety
- Vite for fast development
- Modern CSS for styling

## 📝 Contributing

Feel free to add new validation projects or enhance existing ones!

## 📄 License

MIT - These are learning and testing projects, free to use and modify.

