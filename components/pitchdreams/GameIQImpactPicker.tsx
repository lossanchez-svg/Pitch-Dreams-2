'use client'

export type GameIQImpact = 'LOW' | 'MEDIUM' | 'HIGH'

interface GameIQImpactPickerProps {
  value: GameIQImpact
  onChange: (value: GameIQImpact) => void
}

const impacts: { value: GameIQImpact; label: string; description: string; color: string }[] = [
  {
    value: 'LOW',
    label: 'Low',
    description: 'Mostly physical work',
    color: 'gray',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    description: 'Some decision-making involved',
    color: 'primary',
  },
  {
    value: 'HIGH',
    label: 'High',
    description: 'Game-like situations',
    color: 'accent',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  gray: {
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/40',
    text: 'text-gray-400',
  },
  primary: {
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/40',
    text: 'text-primary-400',
  },
  accent: {
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/40',
    text: 'text-accent-400',
  },
}

export function GameIQImpactPicker({ value, onChange }: GameIQImpactPickerProps) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
        Game IQ Impact
      </p>
      <p className="text-sm text-gray-500 mb-4">
        How much did this activity train your game intelligence?
      </p>
      <div className="flex gap-3">
        {impacts.map((impact) => {
          const colors = colorClasses[impact.color]
          const isSelected = value === impact.value

          return (
            <button
              key={impact.value}
              onClick={() => onChange(impact.value)}
              className={`flex-1 p-3 rounded-lg border transition-all text-center ${
                isSelected
                  ? `${colors.bg} ${colors.border} ${colors.text}`
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              <p className={`font-medium ${isSelected ? colors.text : 'text-gray-300'}`}>
                {impact.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{impact.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default GameIQImpactPicker
