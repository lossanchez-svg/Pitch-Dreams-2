'use client'

import { TrendingUp, Pause } from 'lucide-react'

interface ConsistencyChainBadgeProps {
  days: number
  isPaused?: boolean
  className?: string
}

export function ConsistencyChainBadge({ days, isPaused = false, className = '' }: ConsistencyChainBadgeProps) {
  if (days === 0 && !isPaused) {
    return null
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${
      isPaused
        ? 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600'
        : 'bg-gradient-to-r from-accent-500 to-accent-600 shadow-md'
    } ${className}`}>
      {isPaused ? (
        <Pause className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      ) : (
        <TrendingUp className="w-4 h-4 text-white" />
      )}
      <div className="flex items-baseline gap-1.5">
        <span className={`text-lg font-bold ${isPaused ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
          {days}
        </span>
        <span className={`text-xs font-medium ${isPaused ? 'text-gray-600 dark:text-gray-400' : 'text-white/90'}`}>
          day{days !== 1 ? 's' : ''}
        </span>
      </div>
      <span className={`text-xs font-medium ${isPaused ? 'text-gray-600 dark:text-gray-400' : 'text-white/90'}`}>
        {isPaused ? '(paused)' : 'chain'}
      </span>
    </div>
  )
}

export function ConsistencyChainCard({ days, isPaused = false }: { days: number; isPaused?: boolean }) {
  return (
    <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-xl p-6 border border-accent-200 dark:border-accent-800">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-accent-700 dark:text-accent-300 mb-1">
            Consistency Chain
          </h3>
          <p className="text-xs text-accent-600 dark:text-accent-400">
            {isPaused
              ? 'Life happens. Pick it back up anytime.'
              : 'Keep building. One day at a time.'
            }
          </p>
        </div>
        {!isPaused && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-4xl font-bold ${isPaused ? 'text-gray-700 dark:text-gray-300' : 'text-accent-700 dark:text-accent-300'}`}>
          {days}
        </span>
        <span className={`text-lg font-medium ${isPaused ? 'text-gray-600 dark:text-gray-400' : 'text-accent-600 dark:text-accent-400'}`}>
          day{days !== 1 ? 's' : ''}
          {isPaused && ' (paused)'}
        </span>
      </div>

      {isPaused && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Your last session was counted. Start a new one to resume your chain.
        </p>
      )}
    </div>
  )
}
