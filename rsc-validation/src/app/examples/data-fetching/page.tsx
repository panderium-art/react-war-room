import Link from 'next/link'
import { Suspense } from 'react'

// ============================================
// MOCK API FUNCTIONS
// ============================================

async function getSlowData() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return { message: 'This took 3 seconds to load', timestamp: Date.now() }
}

async function getFastData() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { message: 'This took 0.5 seconds to load', timestamp: Date.now() }
}

async function getUserProfile(id: number) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { id, name: `User ${id}`, email: `user${id}@example.com` }
}

async function getUserPosts(id: number) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return [
    { id: 1, title: 'First Post', content: 'Content 1' },
    { id: 2, title: 'Second Post', content: 'Content 2' },
  ]
}

// ============================================
// PATTERN 1: Sequential Fetching (Slow)
// ============================================

async function SequentialExample() {
  // ❌ BAD: Waits for each fetch to complete before starting the next
  const profile = await getUserProfile(1)
  const posts = await getUserPosts(1)
  
  return (
    <div className="component-box" style={{ borderColor: '#f56565' }}>
      <h4>❌ Sequential Fetching (Slow)</h4>
      <p style={{ marginTop: '8px' }}>User: {profile.name}</p>
      <p>Posts: {posts.length}</p>
      <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#e53e3e' }}>
        Total time: ~2.5s (1s + 1.5s) - requests wait for each other
      </p>
    </div>
  )
}

// ============================================
// PATTERN 2: Parallel Fetching (Fast)
// ============================================

async function ParallelExample() {
  // ✅ GOOD: Both requests start at the same time
  const [profile, posts] = await Promise.all([
    getUserProfile(2),
    getUserPosts(2),
  ])
  
  return (
    <div className="component-box" style={{ borderColor: '#48bb78' }}>
      <h4>✅ Parallel Fetching (Fast)</h4>
      <p style={{ marginTop: '8px' }}>User: {profile.name}</p>
      <p>Posts: {posts.length}</p>
      <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#38a169' }}>
        Total time: ~1.5s (max of 1s and 1.5s) - requests run in parallel
      </p>
    </div>
  )
}

// ============================================
// PATTERN 3: Streaming with Suspense
// ============================================

async function SlowComponent() {
  const data = await getSlowData()
  return (
    <div className="component-box server-rendered">
      <h4>🐢 Slow Component (3s)</h4>
      <p style={{ marginTop: '8px' }}>{data.message}</p>
      <p style={{ fontSize: '0.85rem', color: '#718096' }}>
        This streamed in after the rest of the page loaded
      </p>
    </div>
  )
}

async function FastComponent() {
  const data = await getFastData()
  return (
    <div className="component-box server-rendered">
      <h4>🚀 Fast Component (0.5s)</h4>
      <p style={{ marginTop: '8px' }}>{data.message}</p>
      <p style={{ fontSize: '0.85rem', color: '#718096' }}>
        This loaded immediately
      </p>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      Loading...
    </div>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function DataFetchingPage() {
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Home</Link>
      
      <h1>
        Data Fetching Patterns
        <span className="badge server">Server</span>
      </h1>
      <p className="subtitle">
        Learn how to fetch data efficiently in Server Components
      </p>

      <div className="section">
        <h2>⚡ Pattern 1: Sequential vs Parallel</h2>
        
        <div className="info-box warning">
          <strong>⚠️ Common Mistake:</strong> Fetching data sequentially when you could 
          fetch in parallel!
        </div>

        <div className="demo-grid">
          <Suspense fallback={<LoadingFallback />}>
            <SequentialExample />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <ParallelExample />
          </Suspense>
        </div>

        <div className="code-block">
          <div className="comment">// ❌ BAD: Sequential (slower)</div>
          <div><span className="keyword">async function</span> Page() {'{'}</div>
          <div>  <span className="keyword">const</span> user = <span className="keyword">await</span> fetchUser() <span className="comment">// Wait...</span></div>
          <div>  <span className="keyword">const</span> posts = <span className="keyword">await</span> fetchPosts() <span className="comment">// Then wait again...</span></div>
          <div>  <span className="keyword">return</span> &lt;div&gt;...&lt;/div&gt;</div>
          <div>{'}'}</div>
          <div></div>
          <div className="comment">// ✅ GOOD: Parallel (faster)</div>
          <div><span className="keyword">async function</span> Page() {'{'}</div>
          <div>  <span className="keyword">const</span> [user, posts] = <span className="keyword">await</span> Promise.all([</div>
          <div>    fetchUser(), <span className="comment">// Both start at the same time!</span></div>
          <div>    fetchPosts(),</div>
          <div>  ])</div>
          <div>  <span className="keyword">return</span> &lt;div&gt;...&lt;/div&gt;</div>
          <div>{'}'}</div>
        </div>
      </div>

      <div className="section">
        <h2>🌊 Pattern 2: Streaming with Suspense</h2>
        
        <div className="info-box success">
          <strong>✅ Pro Tip:</strong> Use Suspense to stream slow components while 
          showing fast content immediately!
        </div>

        <div className="demo-grid">
          <Suspense fallback={<LoadingFallback />}>
            <FastComponent />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <SlowComponent />
          </Suspense>
        </div>

        <div className="code-block">
          <div className="comment">// ✅ Streaming: Fast content shows immediately, slow content streams in</div>
          <div></div>
          <div><span className="keyword">export default function</span> Page() {'{'}</div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;&gt;</div>
          <div>      &lt;Header /&gt; <span className="comment">{'// Shows immediately'}</span></div>
          <div>      </div>
          <div>      <span className="comment">{'// Fast component (0.5s) shows quickly'}</span></div>
          <div>      &lt;Suspense fallback={'{<Loading />}'}&gt;</div>
          <div>        &lt;FastComponent /&gt;</div>
          <div>      &lt;/Suspense&gt;</div>
          <div>      </div>
          <div>      <span className="comment">{'// Slow component (3s) streams in later'}</span></div>
          <div>      &lt;Suspense fallback={'{<Loading />}'}&gt;</div>
          <div>        &lt;SlowComponent /&gt;</div>
          <div>      &lt;/Suspense&gt;</div>
          <div>    &lt;/&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>
      </div>

      <div className="section">
        <h2>📋 Best Practices Summary</h2>
        
        <div className="info-box info">
          <h3>✅ DO:</h3>
          <ul>
            <li><strong>Fetch in parallel:</strong> Use Promise.all() for independent requests</li>
            <li><strong>Use Suspense:</strong> Stream slow content, show fast content immediately</li>
            <li><strong>Fetch at component level:</strong> Each component fetches what it needs</li>
            <li><strong>Cache when possible:</strong> Use Next.js fetch caching options</li>
            <li><strong>Colocate queries:</strong> Fetch data near where you use it</li>
          </ul>
        </div>

        <div className="info-box warning">
          <h3>❌ DON'T:</h3>
          <ul>
            <li><strong>Sequential fetching:</strong> Unless data depends on previous response</li>
            <li><strong>Fetch everything at top:</strong> Let components fetch their own data</li>
            <li><strong>Over-fetch:</strong> Only fetch data you actually need</li>
            <li><strong>Forget error boundaries:</strong> Handle errors gracefully</li>
          </ul>
        </div>
      </div>

      <div className="code-block">
        <div className="comment">// 🎯 Real-world example: Dashboard with optimized fetching</div>
        <div></div>
        <div><span className="keyword">export default function</span> Dashboard() {'{'}</div>
        <div>  <span className="keyword">return</span> (</div>
        <div>    &lt;&gt;</div>
        <div>      <span className="comment">{'// Critical content (no Suspense, loads first)'}</span></div>
        <div>      &lt;Header /&gt;</div>
        <div>      </div>
        <div>      <span className="comment">{'// Important but can stream'}</span></div>
        <div>      &lt;Suspense fallback={'{<StatsSkeleton />}'}&gt;</div>
        <div>        &lt;Stats /&gt; <span className="comment">{'// Fetches in parallel inside'}</span></div>
        <div>      &lt;/Suspense&gt;</div>
        <div>      </div>
        <div>      <span className="comment">{'// Less critical, can load later'}</span></div>
        <div>      &lt;Suspense fallback={'{<ChartSkeleton />}'}&gt;</div>
        <div>        &lt;ExpensiveChart /&gt; <span className="comment">{'// Heavy query'}</span></div>
        <div>      &lt;/Suspense&gt;</div>
        <div>      </div>
        <div>      <span className="comment">{'// Optional content'}</span></div>
        <div>      &lt;Suspense fallback={'{<RecommendationsSkeleton />}'}&gt;</div>
        <div>        &lt;Recommendations /&gt; <span className="comment">{'// AI/ML query'}</span></div>
        <div>      &lt;/Suspense&gt;</div>
        <div>    &lt;/&gt;</div>
        <div>  )</div>
        <div>{'}'}</div>
      </div>

      <div className="info-box success">
        <h3>🚀 Performance Benefits</h3>
        <ul>
          <li><strong>Faster Initial Render:</strong> Show content as it arrives (streaming)</li>
          <li><strong>Better UX:</strong> Users see something immediately, not a blank page</li>
          <li><strong>Optimal Waterfall:</strong> Parallel fetching reduces total load time</li>
          <li><strong>Progressive Enhancement:</strong> Critical content first, nice-to-haves later</li>
        </ul>
      </div>
    </div>
  )
}

