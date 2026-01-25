'use client'

import { Clock, Target, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface DrillCardProps {
  title: string
  category: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  proTip?: string
  onSelect: () => void
  isSelected?: boolean
}

const difficultyColors = {
  beginner: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
  intermediate: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  advanced: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
}

const difficultyLabels = {
  beginner: 'Foundation',
  intermediate: 'Developing',
  advanced: 'Advanced',
}

export function DrillCard({
  title,
  category,
  duration,
  difficulty,
  proTip,
  onSelect,
  isSelected = false
}: DrillCardProps) {
  return (
    <Card
      className={`group cursor-pointer transition-all duration-base hover:shadow-lg ${
        isSelected
          ? 'ring-2 ring-primary-500 shadow-md'
          : 'hover:scale-[1.02]'
      }`}
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
                {difficultyLabels[difficulty]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-lg leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {title}
            </h3>
          </div>
          {isSelected && (
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
        </div>

        {proTip && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 border border-primary-100 dark:border-primary-800">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-primary-900 dark:text-primary-100 mb-0.5">
                  Pro Tip
                </p>
                <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
                  {proTip}
                </p>
              </div>
            </div>
          </div>
        )}

        {!isSelected && (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-base"
            variant="secondary"
          >
            Select Drill
          </Button>
        )}
      </div>
    </Card>
  )
}
