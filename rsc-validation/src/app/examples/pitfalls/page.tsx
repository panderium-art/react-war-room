import Link from 'next/link'
import { WrongClientImport } from './components/Examples'

export default function PitfallsPage() {
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Home</Link>
      
      <h1>
        Common Pitfalls
        <span className="badge warning">Warning</span>
      </h1>
      <p className="subtitle">
        Learn what NOT to do and how to avoid common RSC mistakes
      </p>

      <div className="info-box error">
        <strong>⚠️ These are actual mistakes developers make!</strong>
        <p style={{ marginTop: '8px' }}>
          Learning from these will save you hours of debugging.
        </p>
      </div>

      {/* PITFALL 1 */}
      <div className="section">
        <h2>❌ Pitfall 1: Importing Server Component into Client</h2>
        
        <div className="code-block">
          <div className="comment">// ❌ WRONG: Client Component tries to import Server Component</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">import</span> ServerComponent <span className="keyword">from</span> <span className="string">'./ServerComponent'</span></div>
          <div></div>
          <div><span className="keyword">export function</span> ClientComponent() {'{'}</div>
          <div>  <span className="keyword">return</span> &lt;ServerComponent /&gt; <span className="comment">{'// ERROR!'}</span></div>
          <div>{'}'}</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ RIGHT: Pass Server Component as children</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">export function</span> ClientWrapper({'{ children }'}) {'{'}</div>
          <div>  <span className="keyword">return</span> &lt;div className=<span className="string">"wrapper"</span>&gt;{'{children}'}&lt;/div&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// In parent Server Component:</div>
          <div>&lt;ClientWrapper&gt;</div>
          <div>  &lt;ServerComponent /&gt; <span className="comment">{'// ✅ Works!'}</span></div>
          <div>&lt;/ClientWrapper&gt;</div>
        </div>

        <WrongClientImport />
      </div>

      {/* PITFALL 2 */}
      <div className="section">
        <h2>❌ Pitfall 2: Using Hooks in Server Components</h2>
        
        <div className="code-block">
          <div className="comment">// ❌ WRONG: Server Component using hooks</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ useState }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="comment">// No 'use client' directive!</span></div>
          <div><span className="keyword">export function</span> ServerComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> [count, setCount] = useState(0) <span className="comment">{'// ERROR!'}</span></div>
          <div>  <span className="keyword">return</span> &lt;button onClick={'{() => setCount(count + 1)}'}&gt;{'{count}'}&lt;/button&gt;</div>
          <div>{'}'}</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ RIGHT: Add 'use client' directive</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ useState }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export function</span> ClientComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> [count, setCount] = useState(0) <span className="comment">{'// ✅ Works!'}</span></div>
          <div>  <span className="keyword">return</span> &lt;button onClick={'{() => setCount(count + 1)}'}&gt;{'{count}'}&lt;/button&gt;</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box warning">
          <strong>Remember:</strong> useState, useEffect, useContext, useReducer, etc. 
          ALL require 'use client'!
        </div>
      </div>

      {/* PITFALL 3 */}
      <div className="section">
        <h2>❌ Pitfall 3: Exposing Secrets in Client Components</h2>
        
        <div className="code-block">
          <div className="comment">// ❌ DANGEROUS: Exposing API key to client</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">export function</span> ClientComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> apiKey = process.env.SECRET_API_KEY</div>
          <div>  <span className="comment">{'// ⚠️ This is now in your client bundle!'}</span></div>
          <div>  <span className="comment">{'// Anyone can see it in browser DevTools'}</span></div>
          <div>  </div>
          <div>  fetch(<span className="string">'https://api.com'</span>, {'{'}</div>
          <div>    headers: {'{ Authorization: `Bearer ${apiKey}` }'}</div>
          <div>  {'})'}</div>
          <div>{'}'}</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ RIGHT: Keep secrets in Server Components or API routes</div>
          <div></div>
          <div className="comment">// Server Component (or API route)</div>
          <div><span className="keyword">async function</span> ServerComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> apiKey = process.env.SECRET_API_KEY</div>
          <div>  <span className="comment">{'// ✅ Safe! Never sent to client'}</span></div>
          <div>  </div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fetch(<span className="string">'https://api.com'</span>, {'{'}</div>
          <div>    headers: {'{ Authorization: `Bearer ${apiKey}` }'}</div>
          <div>  {'})'}</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> &lt;div&gt;{'{data}'}&lt;/div&gt;</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box error">
          <strong>🚨 Security Alert:</strong> NEVER put secrets, API keys, or sensitive 
          credentials in Client Components. They will be visible in the browser!
        </div>
      </div>

      {/* PITFALL 4 */}
      <div className="section">
        <h2>❌ Pitfall 4: Making Entire Page Client Component</h2>
        
        <div className="code-block">
          <div className="comment">// ❌ INEFFICIENT: Whole page is client component</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ useState }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export default function</span> Page() {'{'}</div>
          <div>  <span className="keyword">const</span> [liked, setLiked] = useState(false)</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;h1&gt;My Blog Post&lt;/h1&gt;</div>
          <div>      &lt;article&gt;...lots of static content...&lt;/article&gt;</div>
          <div>      &lt;button onClick={'{() => setLiked(!liked)}'}&gt;</div>
          <div>        {'Like'}</div>
          <div>      &lt;/button&gt;</div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// Problem: Entire page + all imports go to client bundle!</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ EFFICIENT: Extract interactive parts</div>
          <div></div>
          <div className="comment">// components/LikeButton.tsx</div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ useState }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export function</span> LikeButton() {'{'}</div>
          <div>  <span className="keyword">const</span> [liked, setLiked] = useState(false)</div>
          <div>  <span className="keyword">return</span> &lt;button onClick={'{() => setLiked(!liked)}'}&gt;Like&lt;/button&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// page.tsx (Server Component)</div>
          <div><span className="keyword">import</span> {'{ LikeButton }'} <span className="keyword">from</span> <span className="string">'./components/LikeButton'</span></div>
          <div></div>
          <div><span className="keyword">export default function</span> Page() {'{'}</div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;h1&gt;My Blog Post&lt;/h1&gt;</div>
          <div>      &lt;article&gt;...lots of static content...&lt;/article&gt;</div>
          <div>      &lt;LikeButton /&gt; <span className="comment">{'// Only this is client JS'}</span></div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box success">
          <strong>💡 Rule of Thumb:</strong> Push 'use client' as far down the component 
          tree as possible. Only make interactive parts client components!
        </div>
      </div>

      {/* PITFALL 5 */}
      <div className="section">
        <h2>❌ Pitfall 5: Async Client Components</h2>
        
        <div className="code-block">
          <div className="comment">// ❌ WRONG: Client components cannot be async</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">export default async function</span> ClientComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fetch(<span className="string">'/api/data'</span>) <span className="comment">{'// ERROR!'}</span></div>
          <div>  <span className="keyword">return</span> &lt;div&gt;{'{data}'}&lt;/div&gt;</div>
          <div>{'}'}</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ RIGHT: Use useEffect or Server Component</div>
          <div></div>
          <div className="comment">// Option 1: Use useEffect in Client Component</div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ useState, useEffect }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export function</span> ClientComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> [data, setData] = useState(null)</div>
          <div>  </div>
          <div>  useEffect(() =&gt; {'{'}</div>
          <div>    fetch(<span className="string">'/api/data'</span>)</div>
          <div>      .then(r =&gt; r.json())</div>
          <div>      .then(setData)</div>
          <div>  {'}'}, [])</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> &lt;div&gt;{'{data}'}&lt;/div&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// Option 2: Fetch in Server Component, pass as props</div>
          <div><span className="keyword">async function</span> ServerComponent() {'{'}</div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fetch(<span className="string">'/api/data'</span>) <span className="comment">{'// ✅ Better!'}</span></div>
          <div>  <span className="keyword">return</span> &lt;ClientComponent data={'{data}'} /&gt;</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box info">
          <strong>💡 Best Practice:</strong> Prefer fetching in Server Components and passing 
          data as props. It's faster and more efficient!
        </div>
      </div>

      {/* PITFALL 6 */}
      <div className="section">
        <h2>❌ Pitfall 6: Not Using Suspense for Async Components</h2>
        
        <div className="code-block">
          <div className="comment">// ❌ SUBOPTIMAL: No loading state</div>
          <div></div>
          <div><span className="keyword">export default function</span> Page() {'{'}</div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;Header /&gt;</div>
          <div>      &lt;SlowComponent /&gt; <span className="comment">{'// Page waits for this!'}</span></div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// User sees blank page until SlowComponent finishes</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ BETTER: Wrap in Suspense</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ Suspense }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export default function</span> Page() {'{'}</div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;Header /&gt; <span className="comment">{'// Shows immediately'}</span></div>
          <div>      &lt;Suspense fallback={'{<Loading />}'}&gt;</div>
          <div>        &lt;SlowComponent /&gt; <span className="comment">{'// Streams in when ready'}</span></div>
          <div>      &lt;/Suspense&gt;</div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// User sees Header + Loading, then SlowComponent streams in</div>
        </div>
      </div>

      <div className="section">
        <h2>📋 Pitfalls Checklist</h2>
        
        <div className="info-box warning">
          <h3>Before deploying, check:</h3>
          <ul>
            <li>❌ No Server Component imports in Client Components</li>
            <li>❌ No hooks in Server Components (without 'use client')</li>
            <li>❌ No secrets/API keys in Client Components</li>
            <li>❌ 'use client' isn't on every page (push it down!)</li>
            <li>❌ No async Client Components</li>
            <li>✅ Suspense used for slow Server Components</li>
            <li>✅ Data fetching happens in parallel when possible</li>
            <li>✅ Error boundaries in place</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

