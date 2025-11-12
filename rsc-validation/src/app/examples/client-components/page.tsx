import Link from 'next/link'
import { Counter } from './components/Counter'
import { InteractiveForm } from './components/InteractiveForm'
import { LocalStorageDemo } from './components/LocalStorageDemo'
import { UseEffectDemo } from './components/UseEffectDemo'
import { EventHandlerDemo } from './components/EventHandlerDemo'
import { BrowserAPIDemo } from './components/BrowserAPIDemo'

// This page component is still a SERVER component
// It imports and renders CLIENT components
export default function ClientComponentsPage() {
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Home</Link>
      
      <h1>
        Client Components
        <span className="badge client">Client</span>
      </h1>
      <p className="subtitle">
        Components that need interactivity, hooks, or browser APIs
      </p>

      <div className="info-box error">
        <h3>🖱️ When You NEED Client Components</h3>
        <ul>
          <li><strong>Interactivity:</strong> onClick, onChange, onSubmit, etc.</li>
          <li><strong>State Management:</strong> useState, useReducer</li>
          <li><strong>Lifecycle Hooks:</strong> useEffect, useLayoutEffect</li>
          <li><strong>Browser APIs:</strong> localStorage, window, geolocation, etc.</li>
          <li><strong>Event Listeners:</strong> keyboard, mouse, scroll events</li>
          <li><strong>Context:</strong> useContext (consumer side)</li>
          <li><strong>Custom Hooks:</strong> Any hook that uses the above</li>
        </ul>
      </div>

      <div className="section">
        <h2>📊 Live Examples</h2>
        
        <div className="info-box info" style={{ marginBottom: '20px' }}>
          <strong>💡 Note:</strong> The page component itself is a Server Component, 
          but it renders these Client Components. This is the recommended pattern!
        </div>

        <div className="demo-grid">
          <Counter />
          <InteractiveForm />
        </div>

        <div className="demo-grid">
          <LocalStorageDemo />
          <UseEffectDemo />
        </div>

        <div className="demo-grid">
          <EventHandlerDemo />
          <BrowserAPIDemo />
        </div>
      </div>

      <div className="section">
        <h2>💻 Code Structure</h2>
        
        <div className="code-block">
          <div className="comment">// Client Component - MUST have 'use client' at the top</div>
          <div><span className="string">'use client'</span></div>
          <div></div>
          <div><span className="keyword">import</span> {'{ useState }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export function</span> Counter() {'{'}</div>
          <div>  <span className="comment">// ✅ Can use hooks!</span></div>
          <div>  <span className="keyword">const</span> [count, setCount] = useState(0)</div>
          <div>  </div>
          <div>  <span className="comment">// ✅ Can use event handlers!</span></div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;button onClick={'{() => setCount(count + 1)}'}&gt;</div>
          <div>      Count: {'{count}'}</div>
          <div>    &lt;/button&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>

        <div className="code-block">
          <div className="comment">// ❌ CANNOT do in Client Components:</div>
          <div></div>
          <div><span className="string">'use client'</span></div>
          <div></div>
          <div><span className="keyword">export function</span> ClientComponent() {'{'}</div>
          <div>  <span className="comment">// ❌ Cannot use async/await at component level</span></div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fetch(...) <span className="comment">// ERROR!</span></div>
          <div>  </div>
          <div>  <span className="comment">// ❌ Cannot access server-only APIs</span></div>
          <div>  <span className="keyword">const</span> secret = process.env.SECRET_KEY <span className="comment">// ⚠️ Exposed to client!</span></div>
          <div>  </div>
          <div>  <span className="comment">// ❌ Cannot directly import Server Components</span></div>
          <div>  <span className="keyword">import</span> ServerComp <span className="keyword">from</span> <span className="string">'./server'</span> <span className="comment">// ERROR!</span></div>
          <div>{'}'}</div>
        </div>
      </div>

      <div className="info-box warning">
        <h3>⚡ Important Notes</h3>
        <ul>
          <li>
            <strong>'use client' is a boundary:</strong> Once added, that component and ALL 
            its imports become client components
          </li>
          <li>
            <strong>Bundle size matters:</strong> Everything in a client component goes to 
            the browser bundle
          </li>
          <li>
            <strong>Push 'use client' down:</strong> Keep it as close to the interactive 
            parts as possible
          </li>
          <li>
            <strong>Server Components can render Client Components:</strong> But not the 
            other way around (directly)
          </li>
        </ul>
      </div>

      <div className="info-box info">
        <h3>🎯 Best Practice: Split Your Components</h3>
        <p style={{ marginTop: '12px' }}>
          Instead of making a whole page a Client Component because you need one button, 
          extract just the interactive part into a separate Client Component:
        </p>
        <div className="code-block" style={{ marginTop: '12px' }}>
          <div className="comment">// ✅ GOOD: Only the button is a client component</div>
          <div></div>
          <div><span className="comment">// page.tsx (Server Component)</span></div>
          <div><span className="keyword">export default async function</span> Page() {'{'}</div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fetchData() <span className="comment">// Server-side fetch</span></div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;StaticContent data={'{data}'} /&gt; <span className="comment">// Server</span></div>
          <div>      &lt;InteractiveButton /&gt; <span className="comment">// Client</span></div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>
      </div>
    </div>
  )
}

