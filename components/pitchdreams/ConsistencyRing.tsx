'use client'

import { cn } from '@/lib/utils'

interface ConsistencyRingProps {
  streak: number
  maxStreak?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ConsistencyRing({
  streak,
  maxStreak = 30,
  size = 'md',
  className,
}: ConsistencyRingProps) {
  const percentage = Math.min((streak / maxStreak) * 100, 100)
  const circumference = 2 * Math.PI * 45 // radius = 45

  const sizes = {
    sm: { container: 'w-24 h-24', text: 'text-2xl', label: 'text-xs' },
    md: { container: 'w-32 h-32', text: 'text-4xl', label: 'text-sm' },
    lg: { container: 'w-48 h-48', text: 'text-6xl', label: 'text-base' },
  }

  return (
    <div className={cn('relative', sizes[size].container, className)}>
      <svg
        className="transform -rotate-90"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-800"
        />

        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * percentage) / 100}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-1000 ease-out',
            streak >= maxStreak ? 'text-accent-400' : 'text-primary-400',
            streak > 0 && 'drop-shadow-[0_0_8px_currentColor]'
          )}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={cn(
            'font-mono font-bold',
            sizes[size].text,
            streak >= maxStreak ? 'text-accent-400' : 'text-primary-400'
          )}
        >
          {streak}
        </div>
        <div className={cn('text-gray-400 font-medium', sizes[size].label)}>
          {streak === 1 ? 'day' : 'days'}
        </div>
      </div>
    </div>
  )
}

interface ConsistencyRingCardProps {
  streak: number
  maxStreak?: number
  className?: string
}

export function ConsistencyRingCard({
  streak,
  maxStreak = 30,
  className,
}: ConsistencyRingCardProps) {
  return (
    <div className={cn('hud-panel rounded-lg p-6', className)}>
      <div className="hud-label mb-4">Consistency Tracker</div>

      <div className="flex flex-col items-center">
        <ConsistencyRing streak={streak} maxStreak={maxStreak} size="lg" />

        <div className="mt-6 text-center">
          {streak === 0 && (
            <p className="text-gray-400">Start your streak today!</p>
          )}
          {streak > 0 && streak < 7 && (
            <p className="text-gray-400">
              Keep going! {7 - streak} more {streak === 6 ? 'day' : 'days'} to a week.
            </p>
          )}
          {streak >= 7 && streak < maxStreak && (
            <p className="text-accent-400">
              Great consistency! {maxStreak - streak} more to your goal.
            </p>
          )}
          {streak >= maxStreak && (
            <p className="text-accent-400 font-medium">
              🔥 Outstanding! You've reached your goal!
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-6">
          <div className="hud-chip">
            <span className="text-gray-400">Target:</span> {maxStreak}
          </div>
          <div className="hud-chip">
            <span className="text-gray-400">Progress:</span>{' '}
            {Math.round((streak / maxStreak) * 100)}%
          </div>
        </div>
      </div>
    </div>
  )
}
