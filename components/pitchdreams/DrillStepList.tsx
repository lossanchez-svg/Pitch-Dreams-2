'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SkillAnimationSlot } from './SkillAnimationSlot'

interface DrillStep {
  id: string
  title: string
  description?: string
  completed?: boolean
  /** Optional skill ID for displaying skill animation */
  skillId?: string
}

interface DrillStepListProps {
  steps: DrillStep[]
  currentStepIndex?: number
  onStepComplete?: (stepId: string) => void
  className?: string
}

export function DrillStepList({
  steps,
  currentStepIndex = 0,
  onStepComplete,
  className,
}: DrillStepListProps) {
  return (
    <div className={cn('hud-panel rounded-lg p-6', className)}>
      <div className="hud-label mb-4">Drill Steps</div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCurrent = index === currentStepIndex
          const isCompleted = step.completed || index < currentStepIndex
          const isPending = index > currentStepIndex

          return (
            <div
              key={step.id}
              className={cn(
                'flex gap-4 p-4 rounded-lg transition-all',
                isCurrent && 'bg-primary-500/10 border-2 border-primary-500 animate-system-online',
                isCompleted && 'bg-accent-500/10 border-2 border-accent-500/30',
                isPending && 'bg-gray-800/50 border-2 border-gray-700 opacity-60'
              )}
            >
              {/* Step Number / Status Icon */}
              <div
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold',
                  isCurrent && 'bg-primary-500 text-white hud-glow-cyan',
                  isCompleted && 'bg-accent-500 text-white',
                  isPending && 'bg-gray-700 text-gray-400'
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Skill Animation (if available) */}
              {step.skillId && isCurrent && (
                <SkillAnimationSlot
                  skillId={step.skillId}
                  variant={isCurrent ? 'anim' : 'static'}
                  size="sm"
                  className="flex-shrink-0"
                />
              )}

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    'font-medium mb-1',
                    isCurrent && 'text-primary-400',
                    isCompleted && 'text-accent-400',
                    isPending && 'text-gray-400'
                  )}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p
                    className={cn(
                      'text-sm',
                      isCurrent && 'text-gray-300',
                      isCompleted && 'text-gray-400',
                      isPending && 'text-gray-500'
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {/* Complete Button (only for current step) */}
              {isCurrent && onStepComplete && (
                <button
                  onClick={() => onStepComplete(step.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                    'bg-accent-500 text-white hover:bg-accent-600',
                    'active:animate-lock-in',
                    'min-h-touch'
                  )}
                >
                  Complete
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 flex items-center justify-between">
        <div className="hud-chip">
          Step {currentStepIndex + 1} of {steps.length}
        </div>
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-8 h-1 rounded-full transition-all',
                index < currentStepIndex && 'bg-accent-500',
                index === currentStepIndex && 'bg-primary-500',
                index > currentStepIndex && 'bg-gray-700'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
