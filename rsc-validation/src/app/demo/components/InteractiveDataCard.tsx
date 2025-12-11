'use client'

// This is a CLIENT COMPONENT - handles interactivity
// Receives data as props from Server Component

import { useState } from 'react'

type User = {
  id: number
  name: string
  email: string
  role: string
}

type Stats = {
  projects: number
  commits: number
  pullRequests: number
  reviews: number
}

type Activity = {
  id: number
  action: string
  time: string
}

// Client Component that receives server-fetched data as props
export function InteractiveUserCard({ user }: { user: User }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: `2px solid ${isFavorite ? '#ffd700' : '#e0e0e0'}`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#333' }}>User Profile</h3>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          style={{
            background: isFavorite ? '#ffd700' : '#f5f5f5',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <div style={{ padding: '0.5rem 0' }}>
        <p style={{ margin: '0.5rem 0' }}><strong>Name:</strong> {user.name}</p>
        <p style={{ margin: '0.5rem 0' }}><strong>Email:</strong> {user.email}</p>
        <p style={{ margin: '0.5rem 0' }}><strong>Role:</strong> {user.role}</p>

        {isExpanded && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f0f7ff',
            borderRadius: '4px',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>User ID:</strong> {user.id}</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Status:</strong> Active</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}><strong>Last Login:</strong> 2 hours ago</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#0051cc'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#0070f3'}
      >
        {isExpanded ? '▲ Show Less' : '▼ Show More'}
      </button>

      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.8rem',
        color: '#999'
      }}>
        <span className="badge client">Client Component</span>
      </div>
    </div>
  )
}

export function InteractiveStatsCard({ stats }: { stats: Stats }) {
  const [selectedStat, setSelectedStat] = useState<string | null>(null)

  const statItems = [
    { key: 'projects', label: 'Projects', value: stats.projects, color: '#4caf50' },
    { key: 'commits', label: 'Commits', value: stats.commits, color: '#2196f3' },
    { key: 'pullRequests', label: 'PRs', value: stats.pullRequests, color: '#ff9800' },
    { key: 'reviews', label: 'Reviews', value: stats.reviews, color: '#9c27b0' }
  ]

  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: 0, marginBottom: '1rem', color: '#333' }}>Statistics</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '0.5rem 0'
      }}>
        {statItems.map(item => (
          <button
            key={item.key}
            onClick={() => setSelectedStat(selectedStat === item.key ? null : item.key)}
            style={{
              padding: '1rem',
              background: selectedStat === item.key ? item.color : '#f5f5f5',
              color: selectedStat === item.key ? 'white' : '#333',
              border: `2px solid ${selectedStat === item.key ? item.color : '#e0e0e0'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              transform: selectedStat === item.key ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.25rem'
            }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.9rem' }}>{item.label}</div>
          </button>
        ))}
      </div>

      {selectedStat && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f0f7ff',
          borderRadius: '4px',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          <strong>💡 Tip:</strong> Click on different stats to highlight them!
        </div>
      )}

      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.8rem',
        color: '#999'
      }}>
        <span className="badge client">Client Component</span>
      </div>
    </div>
  )
}

export function InteractiveActivityCard({ activity }: { activity: Activity[] }) {
  const [filter, setFilter] = useState<string>('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredActivity = activity.filter(item => {
    if (filter === 'all') return true
    if (filter === 'push') return item.action.includes('Pushed')
    if (filter === 'pr') return item.action.includes('PR') || item.action.includes('Merged')
    if (filter === 'issue') return item.action.includes('issue')
    return true
  })

  const sortedActivity = [...filteredActivity].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id
  })

  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: 0, marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>

      {/* Filter Controls */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {['all', 'push', 'pr', 'issue'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            style={{
              padding: '0.5rem 1rem',
              background: filter === filterType ? '#0070f3' : '#f5f5f5',
              color: filter === filterType ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: filter === filterType ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{
            padding: '0.5rem 1rem',
            background: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}
        >
          {sortOrder === 'asc' ? '↑ Oldest' : '↓ Latest'}
        </button>
      </div>

      {/* Activity List */}
      <div style={{ padding: '0.5rem 0' }}>
        {sortedActivity.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '2rem 0' }}>
            No activities match the filter
          </p>
        ) : (
          sortedActivity.map(item => (
            <div
              key={item.id}
              style={{
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: '#f9f9f9',
                borderRadius: '4px',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e3f2fd'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f9f9f9'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <div style={{ fontWeight: 500 }}>{item.action}</div>
              <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {item.time}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.8rem',
        color: '#999'
      }}>
        <span className="badge client">Client Component</span>
      </div>
    </div>
  )
}
