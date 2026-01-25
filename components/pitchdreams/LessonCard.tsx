'use client'

import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface LessonCardProps {
  id: string
  title: string
  category: string
  readingTime: number // minutes
  description?: string
  completed?: boolean
  onClick?: () => void
  className?: string
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  positioning: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-700',
    border: 'border-cyan-300',
  },
  technique: {
    bg: 'bg-lime-100',
    text: 'text-lime-700',
    border: 'border-lime-300',
  },
  tactics: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
  },
  recovery: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
  },
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-300',
  },
}

export function LessonCard({
  id,
  title,
  category,
  readingTime,
  description,
  completed = false,
  onClick,
  className,
}: LessonCardProps) {
  const categoryStyle = categoryColors[category.toLowerCase()] || categoryColors.default

  return (
    <Card
      variant="hud"
      className={cn(
        'hud-scanline p-6 cursor-pointer hover:border-primary-400/40 transition-all',
        completed && 'border-accent-500/30',
        className
      )}
      onClick={onClick}
    >
      {/* Category Badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            'text-xs font-medium px-2.5 py-1 rounded border uppercase tracking-wide',
            categoryStyle.bg,
            categoryStyle.text,
            categoryStyle.border
          )}
        >
          {category}
        </span>
        {completed && (
          <span className="text-xs text-accent-400 font-medium uppercase tracking-wide">
            Completed
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl text-primary-400 mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Reading Time Chip */}
        <div className="hud-chip">
          <Clock className="h-3.5 w-3.5" />
          {readingTime} min read
        </div>

        {/* Read Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-400 hover:text-primary-300 -mr-2"
          onClick={(e) => {
            e.stopPropagation()
            onClick?.()
          }}
        >
          Read
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Book Icon Overlay */}
      <div className="absolute top-4 right-4 opacity-10">
        <BookOpen className="h-16 w-16 text-primary-400" />
      </div>
    </Card>
  )
}
