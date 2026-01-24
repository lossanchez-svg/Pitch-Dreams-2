'use client'

import { Smile, Meh, Frown, TrendingUp, Battery } from 'lucide-react'

interface MoodPickerProps {
  value: 'great' | 'good' | 'okay' | 'tired' | 'off' | null
  onChange: (value: 'great' | 'good' | 'okay' | 'tired' | 'off') => void
  disabled?: boolean
}

const moods = [
  { value: 'great' as const, label: 'Great', icon: Smile, color: 'text-accent-600 dark:text-accent-400', bgColor: 'bg-accent-100 dark:bg-accent-900/30', borderColor: 'border-accent-500' },
  { value: 'good' as const, label: 'Good', icon: TrendingUp, color: 'text-primary-600 dark:text-primary-400', bgColor: 'bg-primary-100 dark:bg-primary-900/30', borderColor: 'border-primary-500' },
  { value: 'okay' as const, label: 'Okay', icon: Meh, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800', borderColor: 'border-gray-500' },
  { value: 'tired' as const, label: 'Tired', icon: Battery, color: 'text-warning-600 dark:text-warning-400', bgColor: 'bg-warning-100 dark:bg-warning-900/30', borderColor: 'border-warning-500' },
  { value: 'off' as const, label: 'Off Day', icon: Frown, color: 'text-gray-500 dark:text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800', borderColor: 'border-gray-400' },
]

export function MoodPicker({ value, onChange, disabled = false }: MoodPickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        How did you feel?
      </label>

      <div className="grid grid-cols-5 gap-2">
        {moods.map((mood) => {
          const Icon = mood.icon
          const isSelected = value === mood.value

          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onChange(mood.value)}
              disabled={disabled}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-xl
                border-2 transition-all duration-base
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                ${isSelected
                  ? `${mood.bgColor} ${mood.borderColor} shadow-md`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
              aria-label={mood.label}
              aria-pressed={isSelected}
            >
              <Icon className={`w-6 h-6 mb-1.5 ${isSelected ? mood.color : 'text-gray-400 dark:text-gray-500'}`} />
              <span className={`text-xs font-medium ${isSelected ? mood.color : 'text-gray-600 dark:text-gray-400'}`}>
                {mood.label}
              </span>

              {isSelected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-600 border-2 border-white dark:border-gray-900" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
