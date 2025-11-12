import Link from 'next/link'

export default function BestPracticesPage() {
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Home</Link>
      
      <h1>
        Best Practices
        <span className="badge best">Best</span>
      </h1>
      <p className="subtitle">
        Proven patterns for building production-ready RSC applications
      </p>

      {/* BEST PRACTICE 1 */}
      <div className="section">
        <h2>✅ 1. Default to Server Components</h2>
        
        <div className="info-box success">
          <strong>The Golden Rule:</strong> Start with Server Components. Only add 
          'use client' when you need interactivity, hooks, or browser APIs.
        </div>

        <div className="code-block">
          <div className="comment">// ✅ Decision tree:</div>
          <div></div>
          <div className="comment">// Do you need onClick, onChange, or event handlers?</div>
          <div className="comment">// → YES: Use Client Component</div>
          <div className="comment">// → NO: Continue...</div>
          <div></div>
          <div className="comment">// Do you need useState, useEffect, or other hooks?</div>
          <div className="comment">// → YES: Use Client Component</div>
          <div className="comment">// → NO: Continue...</div>
          <div></div>
          <div className="comment">// Do you need browser APIs (localStorage, window, etc)?</div>
          <div className="comment">// → YES: Use Client Component</div>
          <div className="comment">// → NO: Use Server Component! ✅</div>
        </div>

        <div className="comparison">
          <div className="component-box server-rendered">
            <h4>✅ Server Component</h4>
            <ul style={{ marginTop: '12px', fontSize: '0.9rem' }}>
              <li>Static content</li>
              <li>Data fetching</li>
              <li>Layouts, headers, footers</li>
              <li>Markdown/content rendering</li>
              <li>SEO-critical content</li>
            </ul>
          </div>

          <div className="component-box client-rendered">
            <h4>🖱️ Client Component</h4>
            <ul style={{ marginTop: '12px', fontSize: '0.9rem' }}>
              <li>Buttons, forms, inputs</li>
              <li>Interactive widgets</li>
              <li>Real-time updates</li>
              <li>Animations</li>
              <li>Browser API usage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BEST PRACTICE 2 */}
      <div className="section">
        <h2>✅ 2. Push 'use client' Down the Tree</h2>
        
        <div className="info-box success">
          <strong>Minimize Client Bundles:</strong> Extract only the interactive parts 
          into Client Components. Keep everything else as Server Components.
        </div>

        <div className="code-block">
          <div className="comment">// ❌ BAD: Whole page is client component</div>
          <div></div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">export default function</span> BlogPost() {'{'}</div>
          <div>  <span className="keyword">const</span> [liked, setLiked] = useState(false)</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;&gt;</div>
          <div>      &lt;article&gt;</div>
          <div>        &lt;h1&gt;My Post&lt;/h1&gt;</div>
          <div>        &lt;p&gt;...5000 words of content...&lt;/p&gt;</div>
          <div>      &lt;/article&gt;</div>
          <div>      &lt;button onClick={'{() => setLiked(!liked)}'}&gt;</div>
          <div>        {'Like'}</div>
          <div>      &lt;/button&gt;</div>
          <div>    &lt;/&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// Bundle: ~50KB (entire component + all imports)</div>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ GOOD: Extract button to separate client component</div>
          <div></div>
          <div className="comment">// LikeButton.tsx</div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">export function</span> LikeButton() {'{'}</div>
          <div>  <span className="keyword">const</span> [liked, setLiked] = useState(false)</div>
          <div>  <span className="keyword">return</span> &lt;button onClick={'{() => setLiked(!liked)}'}&gt;Like&lt;/button&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// BlogPost.tsx (Server Component - no 'use client')</div>
          <div><span className="keyword">export default function</span> BlogPost() {'{'}</div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;&gt;</div>
          <div>      &lt;article&gt;</div>
          <div>        &lt;h1&gt;My Post&lt;/h1&gt;</div>
          <div>        &lt;p&gt;...5000 words of content...&lt;/p&gt;</div>
          <div>      &lt;/article&gt;</div>
          <div>      &lt;LikeButton /&gt;</div>
          <div>    &lt;/&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// Bundle: ~2KB (only button component)</div>
        </div>

        <div className="info-box info">
          <strong>💰 Result:</strong> 96% smaller bundle! Content is Server-rendered HTML, 
          only the button needs JavaScript.
        </div>
      </div>

      {/* BEST PRACTICE 3 */}
      <div className="section">
        <h2>✅ 3. Composition Pattern for Mixed Components</h2>
        
        <div className="info-box success">
          <strong>Use Children Props:</strong> When a Client Component needs to wrap 
          Server Components, use the children pattern.
        </div>

        <div className="code-block">
          <div className="comment">// ✅ Pattern: Client wrapper with Server children</div>
          <div></div>
          <div className="comment">// ClientTabs.tsx</div>
          <div className="string">'use client'</div>
          <div></div>
          <div><span className="keyword">export function</span> ClientTabs({'{ children }'}) {'{'}</div>
          <div>  <span className="keyword">const</span> [activeTab, setActiveTab] = useState(0)</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;TabButtons active={'{activeTab}'} onChange={'{setActiveTab}'} /&gt;</div>
          <div>      &lt;div&gt;{'{children[activeTab]}'}&lt;/div&gt;</div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// Page.tsx (Server Component)</div>
          <div><span className="keyword">export default async function</span> Page() {'{'}</div>
          <div>  <span className="keyword">const</span> [data1, data2] = <span className="keyword">await</span> Promise.all([</div>
          <div>    fetchTab1Data(),</div>
          <div>    fetchTab2Data(),</div>
          <div>  ])</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;ClientTabs&gt;</div>
          <div>      &lt;Tab1Content data={'{data1}'} /&gt; <span className="comment">{'// Server Component'}</span></div>
          <div>      &lt;Tab2Content data={'{data2}'} /&gt; <span className="comment">{'// Server Component'}</span></div>
          <div>    &lt;/ClientTabs&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box info">
          <strong>🎯 Benefits:</strong>
          <ul style={{ marginTop: '8px' }}>
            <li>Tab content is Server-rendered (SEO-friendly)</li>
            <li>Data fetching happens on server (faster, secure)</li>
            <li>Only tab switching logic is client-side</li>
          </ul>
        </div>
      </div>

      {/* BEST PRACTICE 4 */}
      <div className="section">
        <h2>✅ 4. Fetch Data Where You Need It</h2>
        
        <div className="info-box success">
          <strong>Colocate Data Fetching:</strong> Let each component fetch its own data. 
          Next.js automatically deduplicates requests.
        </div>

        <div className="code-block">
          <div className="comment">// ✅ GOOD: Each component fetches what it needs</div>
          <div></div>
          <div className="comment">// layout.tsx</div>
          <div><span className="keyword">async function</span> Layout({'{ children }'}) {'{'}</div>
          <div>  <span className="keyword">const</span> user = <span className="keyword">await</span> getUser() <span className="comment">{'// Fetch 1'}</span></div>
          <div>  <span className="keyword">return</span> &lt;Header user={'{user}'} /&gt;{'{children}'}&lt;/Header&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// page.tsx</div>
          <div><span className="keyword">async function</span> Page() {'{'}</div>
          <div>  <span className="keyword">const</span> user = <span className="keyword">await</span> getUser() <span className="comment">{'// Same fetch!'}</span></div>
          <div>  <span className="keyword">const</span> posts = <span className="keyword">await</span> getUserPosts(user.id)</div>
          <div>  <span className="keyword">return</span> &lt;Posts data={'{posts}'} /&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// Next.js automatically deduplicates getUser()!</div>
          <div className="comment">// Only makes ONE request, result is cached per-request</div>
        </div>

        <div className="info-box info">
          <strong>🚀 Why This Works:</strong>
          <ul style={{ marginTop: '8px' }}>
            <li>React deduplicates identical fetch requests automatically</li>
            <li>Components are self-contained and reusable</li>
            <li>No prop drilling through multiple layers</li>
            <li>Easy to understand data dependencies</li>
          </ul>
        </div>
      </div>

      {/* BEST PRACTICE 5 */}
      <div className="section">
        <h2>✅ 5. Use Suspense for Loading States</h2>
        
        <div className="info-box success">
          <strong>Stream Content:</strong> Wrap slow components in Suspense to show 
          fast content immediately.
        </div>

        <div className="code-block">
          <div className="comment">// ✅ Progressive rendering with Suspense</div>
          <div></div>
          <div><span className="keyword">import</span> {'{ Suspense }'} <span className="keyword">from</span> <span className="string">'react'</span></div>
          <div></div>
          <div><span className="keyword">export default function</span> Dashboard() {'{'}</div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;&gt;</div>
          <div>      <span className="comment">{'// Instant: No async, shows immediately'}</span></div>
          <div>      &lt;DashboardHeader /&gt;</div>
          <div>      </div>
          <div>      <span className="comment">{'// Fast: ~100ms, shows quickly'}</span></div>
          <div>      &lt;Suspense fallback={'{<StatsSkeleton />}'}&gt;</div>
          <div>        &lt;QuickStats /&gt;</div>
          <div>      &lt;/Suspense&gt;</div>
          <div>      </div>
          <div>      <span className="comment">{'// Medium: ~500ms, streams in'}</span></div>
          <div>      &lt;Suspense fallback={'{<ChartSkeleton />}'}&gt;</div>
          <div>        &lt;SalesChart /&gt;</div>
          <div>      &lt;/Suspense&gt;</div>
          <div>      </div>
          <div>      <span className="comment">{'// Slow: ~2s, loads last'}</span></div>
          <div>      &lt;Suspense fallback={'{<TableSkeleton />}'}&gt;</div>
          <div>        &lt;DetailedTable /&gt;</div>
          <div>      &lt;/Suspense&gt;</div>
          <div>    &lt;/&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>

        <div className="info-box info">
          <strong>📈 User Experience:</strong>
          <ul style={{ marginTop: '8px' }}>
            <li><strong>0ms:</strong> Header visible</li>
            <li><strong>100ms:</strong> Stats appear</li>
            <li><strong>500ms:</strong> Chart renders</li>
            <li><strong>2s:</strong> Table populates</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            Without Suspense, user waits 2s to see ANYTHING. With Suspense, they see 
            content progressively!
          </p>
        </div>
      </div>

      {/* BEST PRACTICE 6 */}
      <div className="section">
        <h2>✅ 6. Parallel Data Fetching</h2>
        
        <div className="code-block">
          <div className="comment">// ✅ Fetch in parallel, not sequentially</div>
          <div></div>
          <div><span className="keyword">async function</span> Page() {'{'}</div>
          <div>  <span className="comment">// ✅ All start at the same time</span></div>
          <div>  <span className="keyword">const</span> [user, posts, comments, stats] = <span className="keyword">await</span> Promise.all([</div>
          <div>    fetchUser(),      <span className="comment">{'// 1s'}</span></div>
          <div>    fetchPosts(),     <span className="comment">{'// 1.5s'}</span></div>
          <div>    fetchComments(),  <span className="comment">{'// 0.8s'}</span></div>
          <div>    fetchStats(),     <span className="comment">{'// 0.5s'}</span></div>
          <div>  ])</div>
          <div>  </div>
          <div>  <span className="comment">// Total time: ~1.5s (slowest request)</span></div>
          <div>  <span className="comment">// vs Sequential: ~3.8s (sum of all)</span></div>
          <div>  </div>
          <div>  <span className="keyword">return</span> &lt;Dashboard data={'{...}'} /&gt;</div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* BEST PRACTICE 7 */}
      <div className="section">
        <h2>✅ 7. Keep Secrets on the Server</h2>
        
        <div className="code-block">
          <div className="comment">// ✅ Environment variables naming convention</div>
          <div></div>
          <div className="comment">// .env.local</div>
          <div></div>
          <div className="comment">// ❌ Without prefix: Available to both server AND client</div>
          <div>NEXT_PUBLIC_API_URL=https://api.example.com</div>
          <div></div>
          <div className="comment">// ✅ Without prefix: Server-only (secure)</div>
          <div>DATABASE_URL=postgresql://...</div>
          <div>API_SECRET_KEY=super-secret-key</div>
          <div>STRIPE_SECRET_KEY=sk_test_...</div>
          <div></div>
          <div className="comment">// Rule: Only NEXT_PUBLIC_* variables are sent to client</div>
          <div className="comment">// Everything else is server-only by default</div>
        </div>

        <div className="info-box warning">
          <strong>🔐 Security Rule:</strong> NEVER use process.env in Client Components 
          unless the variable starts with NEXT_PUBLIC_. Server-only secrets should only 
          be accessed in Server Components or API routes.
        </div>
      </div>

      {/* SUMMARY */}
      <div className="section">
        <h2>📋 Quick Reference</h2>
        
        <div className="info-box success">
          <h3>✅ DO:</h3>
          <ul>
            <li>Default to Server Components</li>
            <li>Push 'use client' as far down as possible</li>
            <li>Use composition (children) to pass Server Components to Client Components</li>
            <li>Fetch data where you need it (colocate)</li>
            <li>Use Promise.all() for parallel fetching</li>
            <li>Wrap slow components in Suspense</li>
            <li>Keep secrets in Server Components</li>
            <li>Use TypeScript for better type safety</li>
          </ul>
        </div>

        <div className="info-box error">
          <h3>❌ DON'T:</h3>
          <ul>
            <li>Import Server Components in Client Components</li>
            <li>Make entire pages Client Components unnecessarily</li>
            <li>Fetch data sequentially when you can parallelize</li>
            <li>Expose secrets in Client Components</li>
            <li>Use hooks without 'use client'</li>
            <li>Make async Client Components</li>
            <li>Forget error boundaries for async components</li>
          </ul>
        </div>
      </div>

      <div className="info-box info">
        <h3>🎯 Mental Model</h3>
        <p style={{ marginTop: '12px' }}>
          Think of your app as a tree:
        </p>
        <ul style={{ marginTop: '12px' }}>
          <li><strong>Root (Server):</strong> Layout, page structure</li>
          <li><strong>Branches (Server):</strong> Content sections, data-heavy components</li>
          <li><strong>Leaves (Client):</strong> Interactive elements, buttons, forms</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          The trunk and branches provide structure (server), the leaves provide 
          interactivity (client). Use the right component for the right job!
        </p>
      </div>
    </div>
  )
}

