'use client'

// Client Component for filtering products

import { useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  sales: number
  revenue: number
  status: string
}

export default function FilterClient({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [minSales, setMinSales] = useState<number>(0)

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Filter products
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const salesMatch = product.sales >= minSales
    return categoryMatch && salesMatch
  })

  return (
    <div>
      {/* Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#f9f9f9',
        borderRadius: '8px'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: 'white'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sales Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
            Min Sales: {minSales}
          </label>
          <input
            type="range"
            min="0"
            max="2500"
            step="100"
            value={minSales}
            onChange={(e) => setMinSales(Number(e.target.value))}
            style={{
              width: '100%',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Results Count */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem',
          background: 'white',
          borderRadius: '6px',
          border: '2px solid #4caf50'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#4caf50' }}>
              {filteredProducts.length}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>
              of {products.length} products
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          color: '#999',
          background: '#f9f9f9',
          borderRadius: '8px'
        }}>
          No products match the current filters
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                padding: '1.5rem',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '1rem'
              }}>
                <h4 style={{ margin: 0, color: '#333' }}>{product.name}</h4>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  background: product.status === 'active' ? '#e8f5e9' : '#fff3e0',
                  color: product.status === 'active' ? '#4caf50' : '#ff9800',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {product.status}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                {product.category}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>Sales</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0070f3' }}>
                    {product.sales}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>Revenue</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4caf50' }}>
                    ${(product.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive note */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '0.85rem',
        color: '#1976d2'
      }}>
        🔍 Filtering happens instantly on the client - no server requests needed!
      </div>
    </div>
  )
}
