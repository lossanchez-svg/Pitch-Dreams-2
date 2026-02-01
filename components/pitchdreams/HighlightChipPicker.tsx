'use client'

import { Star, Sparkles, Zap, Target, Eye, Shield, Move, Trophy, ArrowRight, Focus } from 'lucide-react'

export interface ChipOption {
  id: string
  key: string
  label: string
}

interface HighlightChipPickerProps {
  title: string
  subtitle?: string
  options: ChipOption[]
  selectedIds: string[]
  onChange: (selectedIds: string[]) => void
  maxSelections?: number
  variant?: 'highlight' | 'focus'
}

const chipIcons: Record<string, React.ReactNode> = {
  created_space: <Move className="w-4 h-4" />,
  won_ball_back: <Shield className="w-4 h-4" />,
  scanned_early: <Eye className="w-4 h-4" />,
  quick_decision: <Zap className="w-4 h-4" />,
  good_first_touch: <Target className="w-4 h-4" />,
  successful_dribble: <Sparkles className="w-4 h-4" />,
  key_pass: <Star className="w-4 h-4" />,
  goal_scored: <Trophy className="w-4 h-4" />,
  clean_sheet: <Shield className="w-4 h-4" />,
  high_work_rate: <Zap className="w-4 h-4" />,
  // Next focus chips
  more_scanning: <Eye className="w-4 h-4" />,
  faster_decisions: <Zap className="w-4 h-4" />,
  better_positioning: <Target className="w-4 h-4" />,
  improve_first_touch: <Focus className="w-4 h-4" />,
  stay_composed: <Star className="w-4 h-4" />,
  communicate_more: <Sparkles className="w-4 h-4" />,
  track_runners: <ArrowRight className="w-4 h-4" />,
  win_more_duels: <Shield className="w-4 h-4" />,
  take_more_risks: <Move className="w-4 h-4" />,
  play_simpler: <Target className="w-4 h-4" />,
}

export function HighlightChipPicker({
  title,
  subtitle,
  options,
  selectedIds,
  onChange,
  maxSelections = 3,
  variant = 'highlight',
}: HighlightChipPickerProps) {
  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id))
    } else if (selectedIds.length < maxSelections) {
      onChange([...selectedIds, id])
    }
  }

  const variantStyles = {
    highlight: {
      selected: 'bg-accent-500/20 border-accent-500/50 text-accent-400',
      unselected: 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600',
    },
    focus: {
      selected: 'bg-primary-500/20 border-primary-500/50 text-primary-400',
      unselected: 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-gray-400">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <p className="text-xs text-gray-500">
          {selectedIds.length}/{maxSelections}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id)
          const icon = chipIcons[option.key]

          return (
            <button
              key={option.id}
              onClick={() => handleToggle(option.id)}
              disabled={!isSelected && selectedIds.length >= maxSelections}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                isSelected ? styles.selected : styles.unselected
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {icon}
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HighlightChipPicker
