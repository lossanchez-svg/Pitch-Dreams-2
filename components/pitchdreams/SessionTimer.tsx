'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface SessionTimerProps {
  duration: number // in seconds
  onComplete?: () => void
  className?: string
}

export function SessionTimer({ duration, onComplete, className }: SessionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false)
            setIsPaused(false)
            if (onComplete) onComplete()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, onComplete])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeRemaining(duration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((duration - timeRemaining) / duration) * 100

  return (
    <div className={cn('hud-frame hud-panel p-8', className)}>
      <div className="hud-label mb-4">Session Timer</div>

      {/* Large Time Display */}
      <div className="relative">
        <div
          className={cn(
            'font-mono text-7xl text-center mb-6 transition-colors',
            isActive && !isPaused ? 'text-primary-400 hud-glow-cyan' : 'text-gray-400'
          )}
        >
          {formatTime(timeRemaining)}
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-primary-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!isActive ? (
          <Button
            variant="hud"
            size="lg"
            onClick={handleStart}
            className="min-w-[140px]"
          >
            <Play className="h-5 w-5 mr-2" />
            Start
          </Button>
        ) : (
          <Button
            variant="hud"
            size="lg"
            onClick={handlePause}
            className="min-w-[140px]"
          >
            <Pause className="h-5 w-5 mr-2" />
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        )}

        <Button
          variant="secondary"
          size="lg"
          onClick={handleReset}
          disabled={!isActive && timeRemaining === duration}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 text-center">
        {isActive && !isPaused && (
          <div className="hud-chip animate-glow-pulse">
            <div className="w-2 h-2 bg-accent-400 rounded-full" />
            Active
          </div>
        )}
        {isPaused && (
          <div className="hud-chip">
            <div className="w-2 h-2 bg-warning-500 rounded-full" />
            Paused
          </div>
        )}
        {!isActive && timeRemaining === 0 && (
          <div className="hud-chip">
            <div className="w-2 h-2 bg-accent-400 rounded-full" />
            Complete
          </div>
        )}
      </div>
    </div>
  )
}
