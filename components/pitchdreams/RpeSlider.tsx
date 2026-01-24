'use client'

import { useState } from 'react'

interface RpeSliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

const rpeLabels: Record<number, string> = {
  1: 'Very Easy',
  2: 'Easy',
  3: 'Light',
  4: 'Moderate',
  5: 'Moderate+',
  6: 'Challenging',
  7: 'Hard',
  8: 'Very Hard',
  9: 'Near Max',
  10: 'Max Effort',
}

export function RpeSlider({ value, onChange, disabled = false }: RpeSliderProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  const displayValue = hoveredValue ?? value

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          How hard was it?
        </label>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {displayValue}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {rpeLabels[displayValue]}
          </div>
        </div>
      </div>

      <div className="relative pt-1">
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseMove={(e) => {
            if (disabled) return
            const rect = e.currentTarget.getBoundingClientRect()
            const percent = (e.clientX - rect.left) / rect.width
            const newValue = Math.round(percent * 9 + 1)
            setHoveredValue(Math.max(1, Math.min(10, newValue)))
          }}
          onMouseLeave={() => setHoveredValue(null)}
          disabled={disabled}
          className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary-600
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:disabled:bg-gray-400
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-600
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:hover:scale-110
            [&::-moz-range-thumb]:transition-transform
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary-500
            focus-visible:ring-offset-2"
          style={{
            background: `linear-gradient(to right,
              rgb(var(--pd-progress-win)) 0%,
              rgb(var(--pd-training-energy)) 50%,
              rgb(239 68 68) 100%)`
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-0.5">
        <span>1 - Very Easy</span>
        <span>10 - Max Effort</span>
      </div>
    </div>
  )
}
