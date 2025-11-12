import { useRef, useState, useEffect } from 'react'

/**
 * Example 5: Timer/Interval Management
 * 
 * Validates:
 * - useRef can store timer IDs without causing re-renders
 * - Proper cleanup using refs in useEffect
 * - Accessing latest values in callbacks
 */
export default function TimerExample() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - seconds * 1000
      
      intervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setSeconds(elapsed)
      }, 100)
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, seconds])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="example-card">
      <h2>5. Timer Management</h2>
      <p>Using refs to manage intervals without causing extra renders.</p>

      <div className="timer">
        {formatTime(seconds)}
      </div>

      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handlePause} disabled={!isRunning}>
        Pause
      </button>
      <button onClick={handleReset}>
        Reset
      </button>

      <div className="result" style={{ marginTop: '12px' }}>
        <div>Running: {isRunning ? '✅' : '❌'}</div>
        <div>Interval ID: {intervalRef.current ?? 'null'}</div>
      </div>
    </div>
  )
}

