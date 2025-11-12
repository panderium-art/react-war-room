import Link from 'next/link'

// ============================================
// MOCK DATA & API FUNCTIONS (simulate backend)
// ============================================

interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  title: string
  content: string
  userId: number
}

// Simulate database/API call with delay
async function getUsers(): Promise<User[]> {
  // Artificial delay to simulate network/database
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com' },
  ]
}

async function getPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return [
    { id: 1, title: 'Understanding RSC', content: 'Server components are amazing...', userId: 1 },
    { id: 2, title: 'Next.js Tips', content: 'App router brings many benefits...', userId: 2 },
    { id: 3, title: 'React Patterns', content: 'Composition is key...', userId: 1 },
  ]
}

async function getUserById(id: number): Promise<User | null> {
  const users = await getUsers()
  return users.find(u => u.id === id) || null
}

// ============================================
// SERVER COMPONENTS (async, no 'use client')
// ============================================

// Example 1: Simple Server Component with data fetching
async function UserList() {
  const users = await getUsers()
  
  return (
    <div className="component-box server-rendered">
      <h4>👥 User List (Server Component)</h4>
      <ul style={{ marginTop: '12px' }}>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '8px' }}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#718096' }}>
        ✅ Fetched on server, zero JS sent to client
      </p>
    </div>
  )
}

// Example 2: Server Component accessing "secret" data
async function DatabaseStats() {
  // In real app, this could access process.env, file system, or direct DB connection
  const secretApiKey = process.env.SECRET_API_KEY || 'mock-secret-key'
  
  return (
    <div className="component-box server-rendered">
      <h4>📊 Database Stats (Server Only)</h4>
      <p style={{ marginTop: '12px' }}>Total Users: 3</p>
      <p>Active Sessions: 127</p>
      <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '12px' }}>
        ✅ Can safely use secrets: {secretApiKey.slice(0, 4)}****
      </p>
      <p style={{ fontSize: '0.9rem', color: '#718096' }}>
        This data never reaches the client bundle
      </p>
    </div>
  )
}

// Example 3: Nested async component
async function PostWithAuthor({ postId }: { postId: number }) {
  const posts = await getPosts()
  const post = posts.find(p => p.id === postId)
  
  if (!post) return <div>Post not found</div>
  
  // Can await another call here! Nested async components
  const author = await getUserById(post.userId)
  
  return (
    <div className="component-box server-rendered">
      <h4>📝 {post.title}</h4>
      <p style={{ marginTop: '8px' }}>{post.content}</p>
      <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#718096' }}>
        By: {author?.name || 'Unknown'}
      </p>
    </div>
  )
}

// Example 4: Component that uses heavy dependencies
async function DataProcessor() {
  // In real app, you might import lodash, moment, or other heavy libraries
  // These NEVER reach the client bundle!
  
  const data = await getUsers()
  const processed = data.map(u => u.name.toUpperCase()).join(', ')
  
  return (
    <div className="component-box server-rendered">
      <h4>⚙️ Data Processor (Heavy Dependencies OK)</h4>
      <p style={{ marginTop: '12px' }}>Processed: {processed}</p>
      <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#718096' }}>
        ✅ Heavy libraries only run on server, zero client impact
      </p>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT (also Server Component)
// ============================================

export default async function ServerComponentsPage() {
  // This is also a server component and can be async!
  const startTime = Date.now()
  
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Home</Link>
      
      <h1>
        Server Components
        <span className="badge server">Server</span>
      </h1>
      <p className="subtitle">
        Components that render on the server and send HTML to the client
      </p>

      <div className="info-box success">
        <h3>✅ Server Component Benefits</h3>
        <ul>
          <li><strong>Zero JavaScript:</strong> No component code sent to client</li>
          <li><strong>Direct Backend Access:</strong> Database, file system, environment variables</li>
          <li><strong>Async/Await:</strong> Native async component support</li>
          <li><strong>Heavy Dependencies:</strong> Use any library without client bundle impact</li>
          <li><strong>Automatic Code Splitting:</strong> Each component is a natural split point</li>
          <li><strong>Better Security:</strong> Secrets never exposed to client</li>
        </ul>
      </div>

      <div className="section">
        <h2>📊 Live Examples</h2>
        
        <div className="demo-grid">
          {/* These will render in parallel (React 18 Suspense) */}
          <UserList />
          <DatabaseStats />
        </div>

        <div className="demo-grid">
          <PostWithAuthor postId={1} />
          <PostWithAuthor postId={2} />
        </div>

        <DataProcessor />
      </div>

      <div className="section">
        <h2>💻 Code Examples</h2>
        
        <div className="code-block">
          <div className="comment">// Server Component - NO 'use client' directive</div>
          <div><span className="keyword">async function</span> UserList() {'{'}</div>
          <div>  <span className="comment">// ✅ Can use async/await directly!</span></div>
          <div>  <span className="keyword">const</span> users = <span className="keyword">await</span> fetch(<span className="string">'api/users'</span>)</div>
          <div>  </div>
          <div>  <span className="comment">// ✅ Can access environment variables</span></div>
          <div>  <span className="keyword">const</span> apiKey = process.env.SECRET_KEY</div>
          <div>  </div>
          <div>  <span className="comment">// ✅ Can access file system</span></div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fs.readFile(<span className="string">'data.json'</span>)</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> &lt;div&gt;{'{users.map(...)}'}&lt;/div&gt;</div>
          <div>{'}'}</div>
        </div>

        <div className="code-block">
          <div className="comment">// ❌ CANNOT do in Server Components:</div>
          <div></div>
          <div><span className="keyword">function</span> ServerComponent() {'{'}</div>
          <div>  <span className="comment">// ❌ No hooks</span></div>
          <div>  <span className="keyword">const</span> [state, setState] = useState() <span className="comment">// ERROR!</span></div>
          <div>  </div>
          <div>  <span className="comment">// ❌ No event handlers</span></div>
          <div>  &lt;button onClick={'{() => {}}'}&gt; <span className="comment">// ERROR!</span></div>
          <div>  </div>
          <div>  <span className="comment">// ❌ No browser APIs</span></div>
          <div>  localStorage.setItem(...) <span className="comment">// ERROR!</span></div>
          <div>  </div>
          <div>  <span className="comment">// ❌ No useEffect, useContext, etc.</span></div>
          <div>{'}'}</div>
        </div>
      </div>

      <div className="info-box info">
        <h3>🎯 When to Use Server Components</h3>
        <ul>
          <li><strong>Data Fetching:</strong> Fetch data from APIs, databases, or file system</li>
          <li><strong>Static Content:</strong> Headers, footers, layouts, markdown content</li>
          <li><strong>Heavy Computations:</strong> Data processing, image optimization</li>
          <li><strong>Backend Integration:</strong> Direct database queries, authentication checks</li>
          <li><strong>SEO Critical:</strong> Content that needs to be in initial HTML for crawlers</li>
          <li><strong>Large Dependencies:</strong> When you need libraries that would bloat the client bundle</li>
        </ul>
      </div>

      <div className="info-box warning">
        <h3>⚠️ Remember</h3>
        <p>
          Server Components are the <strong>default</strong> in the Next.js App Router.
          You don't need to mark them - just avoid 'use client' and they're automatically server components.
        </p>
      </div>

      <div style={{ marginTop: '20px', color: '#718096', fontSize: '0.9rem' }}>
        Rendered in: {Date.now() - startTime}ms (server time)
      </div>
    </div>
  )
}

