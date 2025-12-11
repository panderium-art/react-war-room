# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **monorepo** containing independent React validation projects. Each subdirectory is a self-contained application for testing and validating specific React concepts, patterns, and behaviors. Projects are NOT interdependent - they exist to explore React framework specificities in isolated environments.

## Repository Structure

The repository uses a **flat monorepo structure** where each project is a standalone application in its own directory:

- **useref-validation/** - Vite + React 18 + TypeScript (validates useRef hook behaviors)
- **usecontext-validation/** - Vite + React 18 + TypeScript (validates Context API patterns and pitfalls)
- **errorboundary-validation/** - Vite + React 18 + TypeScript (validates ErrorBoundary patterns)
- **rsc-validation/** - Next.js 14 + React 18 + TypeScript (validates React Server Components)

Each project has its own `package.json`, dependencies, and build configuration. There is NO root-level package.json or workspace configuration.

## Development Commands

### Working with Individual Projects

Since each project is standalone, you must navigate into the project directory first:

```bash
# General pattern
cd <project-name>
npm install          # Install dependencies (only needed once)
npm run dev          # Start development server
npm run build        # Build for production (runs TypeScript check + build)
npm run preview      # Preview production build (Vite projects only)
```

### Project-Specific Commands

**Vite projects** (useref-validation, usecontext-validation, errorboundary-validation):
```bash
cd useref-validation
npm run dev          # Starts Vite dev server (usually http://localhost:5173)
npm run build        # Runs: tsc && vite build
npm run preview      # Preview the production build
```

**Next.js project** (rsc-validation):
```bash
cd rsc-validation
npm run dev          # Starts Next.js dev server (usually http://localhost:3000)
npm run build        # Runs: next build
npm run start        # Start production server
npm run lint         # Run Next.js linter
```

### Important Notes

- There are NO repository-wide commands - always work within a specific project directory
- Each project must have `npm install` run before first use
- TypeScript compilation is included in the build process (`tsc && vite build`)
- No test runners are configured in any project
- No linting is configured (except Next.js built-in linter for rsc-validation)

## Architecture Pattern

All projects follow a similar architectural pattern:

### Vite Projects Structure

```
project-name/
├── src/
│   ├── main.tsx              # Entry point, renders App
│   ├── App.tsx               # Main component that imports all examples
│   ├── examples/             # Individual example components
│   │   ├── ExampleOne.tsx    # Self-contained demonstration
│   │   └── ExampleTwo.tsx    # Self-contained demonstration
│   └── index.css             # Global styles
├── index.html                # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Key architectural principle**: Each example component in `examples/` is **self-contained** and demonstrates a specific pattern, edge case, or behavior. The `App.tsx` imports and renders all examples in a grid layout.

### Next.js Project Structure (rsc-validation)

```
rsc-validation/
├── src/
│   └── app/
│       ├── layout.tsx                    # Root layout (global styles)
│       ├── page.tsx                      # Home page with navigation
│       └── examples/                     # Example pages
│           ├── server-components/        # Server Component examples
│           ├── client-components/        # Client Component examples
│           ├── hybrid-composition/       # Mixed Server/Client patterns
│           ├── data-fetching/           # Data fetching patterns
│           ├── pitfalls/                # Common mistakes
│           └── best-practices/          # Best practices
├── package.json
└── tsconfig.json
```

**Key architectural principle**: Uses Next.js App Router file-system routing. Each subdirectory under `examples/` is a route with its own `page.tsx`. Demonstrates Server Components (default) vs Client Components (`'use client'` directive).

## When Creating New Validation Projects

If adding a new validation project to this repository:

1. **Create a new directory** at the root level with naming pattern: `<concept>-validation/`
2. **Use the same tech stack**: Vite + React 18 + TypeScript (or Next.js if validating RSC/App Router)
3. **Follow the examples pattern**: Create `src/examples/` directory with self-contained example components
4. **Keep it isolated**: Each project must be completely independent with its own dependencies
5. **Update README.md**: Add the new project to the projects list with status and description

## TypeScript Configuration

All projects use TypeScript with strict type checking. TypeScript compilation happens during build via `tsc && vite build` (or `next build`). Type errors will fail the build.

## Component Pattern Conventions

When working with example components:

- Each example should be **self-contained** (includes its own state, hooks, styles)
- Examples should **demonstrate one specific pattern** or edge case clearly
- Use **inline styles** or scoped className patterns to avoid style conflicts
- Include **explanatory text** within the component (using paragraphs, code blocks, or info boxes)
- Examples should be **interactive** where relevant (buttons, inputs, state changes)

## React Server Components (rsc-validation specific)

The rsc-validation project demonstrates Next.js App Router patterns:

- **All components are Server Components by default** - no `'use client'` needed
- **Add `'use client'`** only when you need: interactivity, hooks, browser APIs, event handlers
- **Client Components cannot import Server Components** - but can receive them as children/props
- **Server Components can be async** - use async/await for data fetching
- **Colocation pattern**: Client Components that need to be imported by Server Components live in `/components` subdirectories

## Project-Specific Notes

### useref-validation
Validates: DOM access, mutable values, previous value tracking, uncontrolled inputs, timers, callback refs

### usecontext-validation
Validates: Basic usage, performance pitfalls, context splitting, useReducer integration, context composition

### errorboundary-validation
Validates: What ErrorBoundaries catch (render/lifecycle/JSX errors), what they don't catch (event handlers/async/setTimeout), granular boundaries, error recovery

### rsc-validation
Validates: Server vs Client Components, when to use each, composition patterns, data fetching, common pitfalls, best practices
