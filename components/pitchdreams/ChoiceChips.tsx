'use client'

import { Check } from 'lucide-react'

interface ChoiceChipsProps {
  label: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  multiSelect?: boolean
  disabled?: boolean
}

export function ChoiceChips({
  label,
  options,
  value,
  onChange,
  multiSelect = true,
  disabled = false
}: ChoiceChipsProps) {
  const handleToggle = (option: string) => {
    if (disabled) return

    if (multiSelect) {
      if (value.includes(option)) {
        onChange(value.filter(v => v !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      onChange([option])
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option)

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              disabled={disabled}
              className={`
                relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                text-sm font-medium transition-all duration-base
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                ${isSelected
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <Check className="w-4 h-4" />
              )}
              <span>{option}</span>
            </button>
          )
        })}
      </div>

      {value.length === 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {multiSelect ? 'Select one or more' : 'Select one'}
        </p>
      )}
    </div>
  )
}

// Preset collections for common use cases
export const winPresets = [
  'Clean tackle',
  'Good pass',
  'Shot on target',
  'Assist',
  'Defensive read',
  'Strong positioning',
  'Communication',
  'Hustle play',
]

export const focusPresets = [
  'First touch',
  'Passing accuracy',
  'Decision speed',
  'Off-ball movement',
  'Defensive shape',
  'Composure',
  'Fitness',
  'Game IQ',
]
