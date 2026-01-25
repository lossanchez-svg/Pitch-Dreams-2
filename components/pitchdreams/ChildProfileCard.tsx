'use client'

import { User, TrendingUp, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ChildProfileCardProps {
  childId: string
  nickname: string
  age: number
  position?: string
  avatarColor?: string
  sessionCount?: number
  currentStreak?: number
  onViewProgress?: () => void
  className?: string
}

export function ChildProfileCard({
  childId,
  nickname,
  age,
  position,
  avatarColor = 'bg-indigo-500',
  sessionCount = 0,
  currentStreak = 0,
  onViewProgress,
  className,
}: ChildProfileCardProps) {
  return (
    <Card variant="parent-light" className={cn('p-6', className)}>
      {/* Header with Avatar */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar Circle */}
        <div
          className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center text-white font-display text-2xl',
            avatarColor
          )}
        >
          <User className="h-8 w-8" />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{nickname}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
            <span>Age {age}</span>
            {position && (
              <>
                <span className="text-gray-400">•</span>
                <span>{position}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Sessions This Month */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>This Month</span>
          </div>
          <div className="font-semibold text-2xl text-gray-900">
            {sessionCount}
          </div>
          <div className="text-xs text-gray-500">
            {sessionCount === 1 ? 'session' : 'sessions'}
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Streak</span>
          </div>
          <div className="font-semibold text-2xl text-gray-900">
            {currentStreak}
          </div>
          <div className="text-xs text-gray-500">
            {currentStreak === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>

      {/* View Progress Button */}
      <Button
        variant="primary"
        className="w-full"
        onClick={onViewProgress}
      >
        View Progress
      </Button>
    </Card>
  )
}
