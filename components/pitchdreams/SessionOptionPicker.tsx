'use client'

import { Play, Zap, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SessionType = 'full' | 'quick' | 'challenge'

interface SessionOption {
  type: SessionType
  title: string
  description: string
  duration: string
  icon: React.ReactNode
  color: string
}

interface SessionOptionPickerProps {
  onSelect: (type: SessionType) => void
  className?: string
}

const sessionOptions: SessionOption[] = [
  {
    type: 'full',
    title: 'Full Session',
    description: 'Complete training with multiple drills',
    duration: '25-30 min',
    icon: <Play className="h-8 w-8" />,
    color: 'primary',
  },
  {
    type: 'quick',
    title: 'Quick Drill',
    description: 'Single drill, focused practice',
    duration: '8-10 min',
    icon: <Zap className="h-8 w-8" />,
    color: 'accent',
  },
  {
    type: 'challenge',
    title: 'Skill Challenge',
    description: 'Test yourself and track PBs',
    duration: '5 min',
    icon: <Trophy className="h-8 w-8" />,
    color: 'secondary',
  },
]

export function SessionOptionPicker({ onSelect, className }: SessionOptionPickerProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="hud-label mb-6">Select Training Mode</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessionOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelect(option.type)}
            className={cn(
              'hud-frame hud-panel p-6 text-left transition-all group',
              'hover:hud-glow-cyan hover:scale-105',
              'active:animate-calibrate',
              'min-h-touch-lg'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'mb-4',
                option.color === 'primary' && 'text-primary-400',
                option.color === 'accent' && 'text-accent-400',
                option.color === 'secondary' && 'text-secondary-400'
              )}
            >
              {option.icon}
            </div>

            {/* Title */}
            <h3 className="font-display text-xl text-gray-100 mb-2 group-hover:text-primary-400 transition-colors">
              {option.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-3">{option.description}</p>

            {/* Duration Chip */}
            <div className="hud-chip text-xs">
              <div className="w-1.5 h-1.5 bg-current rounded-full" />
              {option.duration}
            </div>
          </button>
        ))}
      </div>

      {/* Help Text */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Choose your training intensity. You can switch anytime.
      </p>
    </div>
  )
}
