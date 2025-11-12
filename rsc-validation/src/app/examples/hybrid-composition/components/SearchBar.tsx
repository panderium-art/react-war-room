'use client'

import { useState } from 'react'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    
    // Simulate search
    setTimeout(() => {
      setIsSearching(false)
      alert(`Searching for: ${query}`)
    }, 1000)
  }

  return (
    <div className="component-box client-rendered" style={{ marginBottom: '20px' }}>
      <h4>🔍 Search Products (Client Component)</h4>
      
      <form onSubmit={handleSearch} style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #cbd5e0',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
          <button type="submit" disabled={!query || isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#718096' }}>
        Client Component handles user input, Server Components display results
      </p>
    </div>
  )
}

