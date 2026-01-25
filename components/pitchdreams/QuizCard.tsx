'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizCardProps {
  id: string
  question: string
  options: QuizOption[]
  explanation?: string
  onComplete?: (correct: boolean) => void
  className?: string
}

export function QuizCard({
  id,
  question,
  options,
  explanation,
  onComplete,
  className,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption || hasSubmitted) return

    const selected = options.find((opt) => opt.id === selectedOption)
    setHasSubmitted(true)

    if (selected && onComplete) {
      onComplete(selected.isCorrect)
    }
  }

  const selectedAnswer = options.find((opt) => opt.id === selectedOption)
  const isCorrect = selectedAnswer?.isCorrect ?? false

  return (
    <Card variant="hud" className={cn('hud-panel p-6', className)}>
      {/* Question */}
      <div className="mb-6">
        <div className="hud-label mb-3">Knowledge Check</div>
        <h3 className="font-display text-2xl text-primary-400 mb-2">
          {question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selectedOption === option.id
          const showResult = hasSubmitted && isSelected

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={hasSubmitted}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-950',
                !hasSubmitted && 'hover:border-primary-400/50 cursor-pointer',
                hasSubmitted && 'cursor-not-allowed',
                isSelected && !hasSubmitted && 'border-primary-400 bg-primary-400/10',
                !isSelected && !hasSubmitted && 'border-gray-700 bg-gray-800/50',
                showResult && option.isCorrect && 'border-accent-500 bg-accent-500/10',
                showResult && !option.isCorrect && 'border-red-500 bg-red-500/10'
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-base',
                    isSelected && !hasSubmitted && 'text-primary-300',
                    !isSelected && !hasSubmitted && 'text-gray-300',
                    showResult && option.isCorrect && 'text-accent-300',
                    showResult && !option.isCorrect && 'text-red-300'
                  )}
                >
                  {option.text}
                </span>

                {/* Result Icons */}
                {showResult && option.isCorrect && (
                  <div className="flex items-center gap-2 text-accent-400">
                    <Check className="h-5 w-5" />
                    <span className="text-sm font-medium">Correct</span>
                  </div>
                )}
                {showResult && !option.isCorrect && (
                  <div className="flex items-center gap-2 text-red-400">
                    <X className="h-5 w-5" />
                    <span className="text-sm font-medium">Incorrect</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation (shown after submission) */}
      {hasSubmitted && explanation && (
        <div
          className={cn(
            'p-4 rounded-lg border mb-6 animate-system-online',
            isCorrect
              ? 'bg-accent-500/10 border-accent-500/30'
              : 'bg-gray-800/50 border-gray-700'
          )}
        >
          <p className="text-sm text-gray-300">{explanation}</p>
        </div>
      )}

      {/* Submit Button */}
      {!hasSubmitted && (
        <Button
          variant="hud"
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit Answer
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}

      {/* Next Button (after submission) */}
      {hasSubmitted && (
        <div
          className={cn(
            'text-center p-4 rounded-lg',
            isCorrect ? 'bg-accent-500/10' : 'bg-gray-800/50'
          )}
        >
          {isCorrect ? (
            <p className="text-accent-400 font-medium">
              Nice work. That's one brick in your foundation.
            </p>
          ) : (
            <p className="text-gray-400">
              Keep learning. Understanding grows with practice.
            </p>
          )}
        </div>
      )}
    </Card>
  )
}
