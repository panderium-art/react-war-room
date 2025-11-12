'use client'

import { useState } from 'react'

export function LikeButton({ 
  productId, 
  initialLikes 
}: { 
  productId: number
  initialLikes: number 
}) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
    }
    
    // In real app, you'd call an API here
    // await fetch(`/api/products/${productId}/like`, { method: 'POST' })
  }

  return (
    <button
      onClick={handleLike}
      style={{
        background: liked ? '#f56565' : '#e2e8f0',
        color: liked ? 'white' : '#4a5568',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s'
      }}
    >
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  )
}

