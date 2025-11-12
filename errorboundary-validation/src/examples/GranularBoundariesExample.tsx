import { useState } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

/**
 * Example 3: Granular ErrorBoundaries
 * 
 * Demonstrates:
 * - Strategic placement of error boundaries
 * - Isolating errors to specific parts of the UI
 * - Keeping the rest of the app functional
 */

// Simulate different widgets that might fail
function WeatherWidget({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Failed to fetch weather data')
  }
  
  return (
    <div className="demo-box success">
      <h4>🌤️ Weather Widget</h4>
      <div>Temperature: 72°F</div>
      <div>Condition: Sunny</div>
      <div>Humidity: 45%</div>
    </div>
  )
}

function StockWidget({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Failed to fetch stock data')
  }
  
  return (
    <div className="demo-box success">
      <h4>📈 Stock Widget</h4>
      <div>AAPL: $175.23 ▲</div>
      <div>GOOGL: $140.15 ▲</div>
      <div>MSFT: $380.45 ▼</div>
    </div>
  )
}

function NewsWidget({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Failed to fetch news data')
  }
  
  return (
    <div className="demo-box success">
      <h4>📰 News Widget</h4>
      <div>• Breaking: Tech stocks rise</div>
      <div>• Market update at noon</div>
      <div>• New features announced</div>
    </div>
  )
}

function UserProfile() {
  return (
    <div className="demo-box success">
      <h4>👤 User Profile</h4>
      <div>Name: John Doe</div>
      <div>Email: john@example.com</div>
      <div>Status: Active</div>
    </div>
  )
}

// Custom fallback for widgets
function WidgetError({ name, onRetry }: { name: string; onRetry: () => void }) {
  return (
    <div className="demo-box error">
      <h4>⚠️ {name} Error</h4>
      <div style={{ fontSize: '0.9rem', margin: '10px 0' }}>
        Unable to load {name.toLowerCase()}
      </div>
      <button onClick={onRetry} style={{ fontSize: '0.9rem' }}>
        Retry
      </button>
    </div>
  )
}

export default function GranularBoundariesExample() {
  const [weatherCrash, setWeatherCrash] = useState(false)
  const [stockCrash, setStockCrash] = useState(false)
  const [newsCrash, setNewsCrash] = useState(false)

  return (
    <div className="example-section">
      <h2>
        3. Granular ErrorBoundaries
        <span className="badge good">✓ Best Practice</span>
      </h2>
      <p className="description">
        Place ErrorBoundaries strategically to isolate failures. When one component crashes, 
        the rest of the app remains functional!
      </p>

      <div className="controls">
        <button onClick={() => setWeatherCrash(!weatherCrash)}>
          {weatherCrash ? 'Fix' : 'Crash'} Weather
        </button>
        <button onClick={() => setStockCrash(!stockCrash)}>
          {stockCrash ? 'Fix' : 'Crash'} Stocks
        </button>
        <button onClick={() => setNewsCrash(!newsCrash)}>
          {newsCrash ? 'Fix' : 'Crash'} News
        </button>
        <button 
          className="danger"
          onClick={() => {
            setWeatherCrash(true)
            setStockCrash(true)
            setNewsCrash(true)
          }}
        >
          Crash All Widgets
        </button>
        <button 
          className="success"
          onClick={() => {
            setWeatherCrash(false)
            setStockCrash(false)
            setNewsCrash(false)
          }}
        >
          Fix All
        </button>
      </div>

      <div className="demo-container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}>
          {/* User Profile - No boundary needed for critical components */}
          <UserProfile />

          {/* Each widget wrapped in its own ErrorBoundary */}
          <ErrorBoundary
            key={`weather-${weatherCrash}`}
            fallback={
              <WidgetError 
                name="Weather Widget" 
                onRetry={() => setWeatherCrash(false)} 
              />
            }
          >
            <WeatherWidget shouldCrash={weatherCrash} />
          </ErrorBoundary>

          <ErrorBoundary
            key={`stock-${stockCrash}`}
            fallback={
              <WidgetError 
                name="Stock Widget" 
                onRetry={() => setStockCrash(false)} 
              />
            }
          >
            <StockWidget shouldCrash={stockCrash} />
          </ErrorBoundary>

          <ErrorBoundary
            key={`news-${newsCrash}`}
            fallback={
              <WidgetError 
                name="News Widget" 
                onRetry={() => setNewsCrash(false)} 
              />
            }
          >
            <NewsWidget shouldCrash={newsCrash} />
          </ErrorBoundary>
        </div>
      </div>

      <div className="info-box success">
        <strong>✓ Notice:</strong> When one widget crashes, the others keep working! 
        The User Profile always remains functional.
      </div>

      <div className="component-tree">
        <div style={{ fontWeight: 'bold' }}>Component Tree:</div>
        <div className="tree-node">App</div>
        <div className="tree-node">  ├─ UserProfile (no boundary - critical)</div>
        <div className="tree-node boundary">  ├─ ErrorBoundary</div>
        <div className="tree-node">  │   └─ WeatherWidget</div>
        <div className="tree-node boundary">  ├─ ErrorBoundary</div>
        <div className="tree-node">  │   └─ StockWidget</div>
        <div className="tree-node boundary">  └─ ErrorBoundary</div>
        <div className="tree-node">      └─ NewsWidget</div>
      </div>

      <div className="info-box">
        <strong>💡 Granular Boundary Strategy:</strong>
        <ul>
          <li><strong>Critical components</strong> - No boundary (let it bubble to top)</li>
          <li><strong>Optional widgets</strong> - Individual boundaries</li>
          <li><strong>Feature sections</strong> - Boundary per section</li>
          <li><strong>Third-party components</strong> - Always wrap with boundaries</li>
          <li><strong>Data-driven lists</strong> - Boundary per item for resilience</li>
        </ul>
      </div>

      <div className="comparison">
        <div className="info-box error">
          <strong>❌ Single Boundary (All or Nothing)</strong>
          <p>One widget crashes → Entire dashboard gone</p>
        </div>
        <div className="info-box success">
          <strong>✓ Granular Boundaries (Resilient)</strong>
          <p>One widget crashes → Others keep working</p>
        </div>
      </div>

      <div className="code-block">
        <div className="comment">// ✓ GOOD - Granular boundaries</div>
        <div>{'<Dashboard>'}</div>
        <div>  {'<UserProfile />'} <span className="comment">// Critical, no boundary</span></div>
        <div>  </div>
        <div>  <span className="keyword">{'<ErrorBoundary>'}</span></div>
        <div>    {'<WeatherWidget />'}</div>
        <div>  <span className="keyword">{'</ErrorBoundary>'}</span></div>
        <div>  </div>
        <div>  <span className="keyword">{'<ErrorBoundary>'}</span></div>
        <div>    {'<StockWidget />'}</div>
        <div>  <span className="keyword">{'</ErrorBoundary>'}</span></div>
        <div>{'</Dashboard>'}</div>
      </div>
    </div>
  )
}

