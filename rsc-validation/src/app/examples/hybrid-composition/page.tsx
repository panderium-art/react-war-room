import Link from 'next/link'
import { LikeButton } from './components/LikeButton'
import { SearchBar } from './components/SearchBar'

// ============================================
// SERVER COMPONENTS (data fetching)
// ============================================

interface Product {
  id: number
  name: string
  price: number
  description: string
  likes: number
}

async function getProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop', likes: 42 },
    { id: 2, name: 'Mouse', price: 29, description: 'Wireless mouse', likes: 28 },
    { id: 3, name: 'Keyboard', price: 79, description: 'Mechanical keyboard', likes: 35 },
    { id: 4, name: 'Monitor', price: 299, description: '4K display', likes: 56 },
  ]
}

// Server Component: Fetches data
async function ProductCard({ product }: { product: Product }) {
  return (
    <div className="component-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '8px' }}>{product.name}</h4>
          <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '8px' }}>
            {product.description}
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
            ${product.price}
          </p>
        </div>
        
        {/* CLIENT COMPONENT embedded in SERVER COMPONENT */}
        <LikeButton productId={product.id} initialLikes={product.likes} />
      </div>
      
      <div style={{ 
        marginTop: '12px', 
        paddingTop: '12px', 
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.85rem',
        color: '#a0aec0'
      }}>
        📦 Fetched on server (Server Component)
        <br />
        ❤️ Like button is interactive (Client Component)
      </div>
    </div>
  )
}

// Server Component: Displays product list
async function ProductList() {
  const products = await getProducts()
  
  return (
    <div className="demo-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// Server Component: Static header
function StaticHeader() {
  return (
    <div className="component-box server-rendered" style={{ textAlign: 'center' }}>
      <h3>🛍️ Product Catalog</h3>
      <p style={{ marginTop: '8px', color: '#718096' }}>
        Server-rendered header with zero JavaScript
      </p>
    </div>
  )
}

// ============================================
// MAIN PAGE (Server Component)
// ============================================

export default function HybridCompositionPage() {
  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Home</Link>
      
      <h1>
        Hybrid Composition
        <span className="badge hybrid">Hybrid</span>
      </h1>
      <p className="subtitle">
        Combining Server and Client Components for optimal performance
      </p>

      <div className="info-box success">
        <h3>✅ The Golden Rule of Composition</h3>
        <p style={{ marginTop: '12px' }}>
          <strong>Server Components can render Client Components, but Client Components 
          CANNOT directly import Server Components.</strong>
        </p>
        <p style={{ marginTop: '12px' }}>
          However, you CAN pass Server Components as <code>children</code> or props 
          to Client Components!
        </p>
      </div>

      <div className="section">
        <h2>🎯 Pattern 1: Client Inside Server (Common)</h2>
        <p style={{ marginBottom: '16px', color: '#4a5568' }}>
          The most common pattern - Server Component fetches data and renders Client 
          Components for interactivity
        </p>

        {/* Server Component renders Client Component (SearchBar) */}
        <SearchBar />

        {/* Server Component renders other Server Components with Client Components inside */}
        <StaticHeader />
        <ProductList />

        <div className="code-block">
          <div className="comment">// ✅ GOOD: Server Component renders Client Component</div>
          <div></div>
          <div className="comment">// ProductCard.tsx (Server Component)</div>
          <div><span className="keyword">async function</span> ProductCard() {'{'}</div>
          <div>  <span className="keyword">const</span> data = <span className="keyword">await</span> fetchProduct()</div>
          <div>  </div>
          <div>  <span className="keyword">return</span> (</div>
          <div>    &lt;div&gt;</div>
          <div>      &lt;h2&gt;{'{data.name}'}&lt;/h2&gt;</div>
          <div>      <span className="comment">{'// Client Component for interactivity'}</span></div>
          <div>      &lt;LikeButton initialLikes={'{data.likes}'} /&gt;</div>
          <div>    &lt;/div&gt;</div>
          <div>  )</div>
          <div>{'}'}</div>
        </div>
      </div>

      <div className="section">
        <h2>🎯 Pattern 2: Server as Children of Client</h2>
        <p style={{ marginBottom: '16px', color: '#4a5568' }}>
          Pass Server Components as children to Client Components using composition
        </p>

        <div className="comparison">
          <div>
            <div className="code-block">
              <div className="comment">// ❌ BAD: Cannot import directly</div>
              <div></div>
              <div className="string">'use client'</div>
              <div></div>
              <div><span className="keyword">import</span> ServerComp <span className="keyword">from</span> <span className="string">'./server'</span></div>
              <div></div>
              <div><span className="keyword">function</span> ClientWrapper() {'{'}</div>
              <div>  <span className="keyword">return</span> &lt;ServerComp /&gt; <span className="comment">// ERROR!</span></div>
              <div>{'}'}</div>
            </div>
          </div>

          <div>
            <div className="code-block">
              <div className="comment">// ✅ GOOD: Pass as children</div>
              <div></div>
              <div className="string">'use client'</div>
              <div></div>
              <div><span className="keyword">function</span> ClientWrapper({'{ children }'}) {'{'}</div>
              <div>  <span className="keyword">return</span> &lt;div&gt;{'{children}'}&lt;/div&gt;</div>
              <div>{'}'}</div>
              <div></div>
              <div className="comment">// In Server Component:</div>
              <div>&lt;ClientWrapper&gt;</div>
              <div>  &lt;ServerComponent /&gt;</div>
              <div>&lt;/ClientWrapper&gt;</div>
            </div>
          </div>
        </div>
      </div>

      <div className="info-box info">
        <h3>💡 When to Use Hybrid Composition</h3>
        <ul>
          <li>
            <strong>Interactive widgets in static content:</strong> Like buttons, 
            share buttons, toggles in otherwise static pages
          </li>
          <li>
            <strong>Search/Filter UI with server data:</strong> Client component handles 
            input, server components show results
          </li>
          <li>
            <strong>Forms with server validation:</strong> Client handles UX, server 
            handles security
          </li>
          <li>
            <strong>Modals/Dialogs with dynamic content:</strong> Client handles open/close, 
            server fetches content
          </li>
        </ul>
      </div>

      <div className="info-box warning">
        <h3>⚡ Performance Benefits</h3>
        <ul>
          <li>
            <strong>Reduced Bundle Size:</strong> Only interactive parts sent to client
          </li>
          <li>
            <strong>Faster Initial Load:</strong> Static content rendered immediately
          </li>
          <li>
            <strong>Better SEO:</strong> Content available in initial HTML
          </li>
          <li>
            <strong>Optimal Hydration:</strong> Only necessary components need hydration
          </li>
        </ul>
      </div>

      <div className="code-block">
        <div className="comment">// 🎯 Real-world example: Dashboard with mixed components</div>
        <div></div>
        <div><span className="keyword">export default async function</span> Dashboard() {'{'}</div>
        <div>  <span className="comment">// Server: Fetch data in parallel</span></div>
        <div>  <span className="keyword">const</span> [user, stats, posts] = <span className="keyword">await</span> Promise.all([</div>
        <div>    fetchUser(),</div>
        <div>    fetchStats(),</div>
        <div>    fetchPosts(),</div>
        <div>  ])</div>
        <div></div>
        <div>  <span className="keyword">return</span> (</div>
        <div>    &lt;&gt;</div>
        <div>      <span className="comment">{'// Server: Static header'}</span></div>
        <div>      &lt;Header user={'{user}'} /&gt;</div>
        <div>      </div>
        <div>      <span className="comment">{'// Server: Stats (no interactivity needed)'}</span></div>
        <div>      &lt;StatsGrid data={'{stats}'} /&gt;</div>
        <div>      </div>
        <div>      <span className="comment">{'// Hybrid: Posts with interactive elements'}</span></div>
        <div>      {'{posts.map(post => ('}</div>
        <div>        &lt;PostCard key={'{post.id}'} data={'{post}'}&gt;</div>
        <div>          <span className="comment">{'// Client: Interactive buttons'}</span></div>
        <div>          &lt;LikeButton /&gt;</div>
        <div>          &lt;ShareButton /&gt;</div>
        <div>        &lt;/PostCard&gt;</div>
        <div>      {'))}'}</div>
        <div>      </div>
        <div>      <span className="comment">{'// Client: Infinite scroll'}</span></div>
        <div>      &lt;InfiniteScroll onLoadMore={'{loadMore}'} /&gt;</div>
        <div>    &lt;/&gt;</div>
        <div>  )</div>
        <div>{'}'}</div>
      </div>
    </div>
  )
}

