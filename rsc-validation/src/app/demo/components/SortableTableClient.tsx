'use client'

// Client Component for sortable table

import { useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  sales: number
  revenue: number
  status: string
}

type SortKey = keyof Product
type SortDirection = 'asc' | 'desc'

export default function SortableTableClient({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('sales')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle direction if same key
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // New key, default to descending
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    // Handle different types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const SortButton = ({ column, label }: { column: SortKey; label: string }) => {
    const isActive = sortKey === column
    return (
      <button
        onClick={() => handleSort(column)}
        style={{
          padding: '0.75rem',
          background: isActive ? '#0070f3' : '#f5f5f5',
          color: isActive ? 'white' : '#333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: isActive ? 'bold' : 'normal',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = '#e0e0e0'
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = '#f5f5f5'
          }
        }}
      >
        {label}
        {isActive && (
          <span style={{ fontSize: '1rem' }}>
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </button>
    )
  }

  return (
    <div>
      {/* Sort Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.5rem',
        marginBottom: '1rem',
        padding: '1rem',
        background: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <SortButton column="name" label="Name" />
        <SortButton column="category" label="Category" />
        <SortButton column="sales" label="Sales" />
        <SortButton column="revenue" label="Revenue" />
        <SortButton column="status" label="Status" />
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'white',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Category</th>
              <th style={headerStyle}>Sales</th>
              <th style={headerStyle}>Revenue</th>
              <th style={headerStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr
                key={product.id}
                style={{
                  background: index % 2 === 0 ? 'white' : '#fafafa',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0f7ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fafafa'
                }}
              >
                <td style={cellStyle}>
                  <strong>{product.name}</strong>
                </td>
                <td style={cellStyle}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '12px',
                    fontSize: '0.85rem'
                  }}>
                    {product.category}
                  </span>
                </td>
                <td style={cellStyle}>
                  <span style={{ color: '#0070f3', fontWeight: 'bold' }}>
                    {product.sales.toLocaleString()}
                  </span>
                </td>
                <td style={cellStyle}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
                    ${(product.revenue / 1000).toFixed(1)}K
                  </span>
                </td>
                <td style={cellStyle}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: product.status === 'active' ? '#e8f5e9' : '#fff3e0',
                    color: product.status === 'active' ? '#4caf50' : '#ff9800',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sort Info */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#f0f4ff',
        borderRadius: '4px',
        fontSize: '0.85rem',
        color: '#5e35b1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>
          ⬍ Sorted by <strong>{sortKey}</strong> ({sortDirection === 'asc' ? 'ascending' : 'descending'})
        </span>
        <button
          onClick={() => {
            setSortKey('sales')
            setSortDirection('desc')
          }}
          style={{
            padding: '0.5rem 1rem',
            background: 'white',
            border: '1px solid #5e35b1',
            borderRadius: '4px',
            color: '#5e35b1',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}
        >
          Reset Sort
        </button>
      </div>

      {/* Interactive note */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '0.85rem',
        color: '#1976d2'
      }}>
        📊 Click column buttons to sort • Sorting happens instantly on the client
      </div>
    </div>
  )
}

const headerStyle: React.CSSProperties = {
  padding: '1rem',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#333',
  fontSize: '0.9rem',
  borderBottom: '2px solid #e0e0e0'
}

const cellStyle: React.CSSProperties = {
  padding: '1rem',
  borderBottom: '1px solid #e0e0e0'
}
