'use client'

import { useState } from 'react'
import { Plus, Minus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RepCounterProps {
  target?: number
  initialValue?: number
  onChange?: (value: number) => void
  onComplete?: () => void
  className?: string
}

export function RepCounter({
  target,
  initialValue = 0,
  onChange,
  onComplete,
  className,
}: RepCounterProps) {
  const [count, setCount] = useState(initialValue)

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    onChange?.(newCount)

    if (target && newCount >= target) {
      onComplete?.()
    }
  }

  const handleDecrement = () => {
    const newCount = Math.max(0, count - 1)
    setCount(newCount)
    onChange?.(newCount)
  }

  const isComplete = target ? count >= target : false
  const progress = target ? (count / target) * 100 : 0

  return (
    <div className={cn('hud-frame hud-panel p-6', className)}>
      <div className="hud-label mb-4">Rep Counter</div>

      {/* Large Count Display */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          className={cn(
            'w-16 h-16 rounded-lg flex items-center justify-center transition-all',
            'bg-gray-800 border-2 border-gray-700',
            'hover:border-primary-500 hover:hud-glow-cyan',
            'active:scale-95 active:animate-lock-in',
            'disabled:opacity-30 disabled:cursor-not-allowed',
            'min-w-touch-lg min-h-touch-lg'
          )}
          aria-label="Decrease count"
        >
          <Minus className="h-8 w-8 text-gray-300" />
        </button>

        <div className="text-center min-w-[120px]">
          <div
            className={cn(
              'font-mono text-6xl font-bold transition-colors',
              isComplete ? 'text-accent-400' : 'text-primary-400'
            )}
          >
            {count}
          </div>
          {target && (
            <div className="font-mono text-xl text-gray-400 mt-1">
              / {target}
            </div>
          )}
        </div>

        <button
          onClick={handleIncrement}
          className={cn(
            'w-16 h-16 rounded-lg flex items-center justify-center transition-all',
            'bg-primary-900/30 border-2 border-primary-500',
            'hover:bg-primary-900/50 hover:hud-glow-cyan',
            'active:scale-95 active:animate-lock-in',
            'min-w-touch-lg min-h-touch-lg'
          )}
          aria-label="Increase count"
        >
          <Plus className="h-8 w-8 text-primary-400" />
        </button>
      </div>

      {/* Progress Bar (if target is set) */}
      {target && (
        <div className="mb-4">
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-300',
                isComplete ? 'bg-accent-500' : 'bg-primary-500'
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Status */}
      {isComplete && (
        <div className="flex items-center justify-center gap-2 hud-chip mx-auto">
          <Check className="h-4 w-4 text-accent-400" />
          <span className="text-accent-400">Target Reached!</span>
        </div>
      )}

      {!isComplete && target && (
        <div className="text-center">
          <div className="hud-chip inline-flex">
            {target - count} reps remaining
          </div>
        </div>
      )}
    </div>
  )
}
