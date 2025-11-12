# Quick Start Guide - React Server Components

This guide will get you up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
# Navigate to the project
cd rsc-validation

# Install dependencies
npm install
```

## Running the App

```bash
# Start development server
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000)

## Project Tour

### 1. Home Page (/)
Start here to see an overview and navigation to all examples.

### 2. Server Components (/examples/server-components)
Learn about:
- Async data fetching
- Direct backend access
- Zero JavaScript to client
- Heavy dependencies usage

### 3. Client Components (/examples/client-components)
Explore:
- Interactive forms and buttons
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Event handlers

### 4. Hybrid Composition (/examples/hybrid-composition)
Understand:
- Combining Server + Client components
- Composition patterns
- Performance optimization

### 5. Data Fetching (/examples/data-fetching)
Master:
- Parallel vs sequential fetching
- Streaming with Suspense
- Loading states

### 6. Common Pitfalls (/examples/pitfalls)
Avoid:
- Importing Server into Client
- Using hooks without 'use client'
- Exposing secrets
- Making entire pages client components

### 7. Best Practices (/examples/best-practices)
Apply:
- Component boundaries
- Data fetching strategies
- Security patterns
- Performance optimization

## Key Concepts in 60 Seconds

### Server Components (Default)
```tsx
// No 'use client' needed
async function MyComponent() {
  const data = await fetchData() // ✅ Async works!
  return <div>{data}</div>
}
```

**Use for:** Data fetching, static content, SEO

### Client Components
```tsx
'use client' // ✅ Must add this!

import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0) // ✅ Hooks work!
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Use for:** Interactivity, hooks, browser APIs

## Common Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Next Steps

1. Explore each example page in order
2. Read the code in `src/app/examples/`
3. Try modifying examples
4. Build your own RSC app!

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the inline code comments in each example
- Read the info boxes on each example page

## Pro Tips

1. **Start with Server Components** - only add 'use client' when needed
2. **Push 'use client' down** - keep it as close to interactive parts as possible
3. **Use composition** - pass Server Components as children to Client Components
4. **Fetch in parallel** - use Promise.all() for multiple requests
5. **Add Suspense** - stream content for better UX

Happy learning! 🚀

