'use client'

import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Sparkles, X } from 'lucide-react'

export interface CoachNudge {
  type: string
  title: string
  message: string
  actionLabel: string
  actionValue?: string
}

interface CoachNudgeCardProps {
  nudge: CoachNudge
  onAction: (nudge: CoachNudge) => void
  onDismiss: () => void
}

export function CoachNudgeCard({ nudge, onAction, onDismiss }: CoachNudgeCardProps) {
  return (
    <Card variant="hud" className="p-5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 pointer-events-none" />

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:text-gray-300 hover:bg-gray-700 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-400" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary-400">
            Coach Tip
          </span>
        </div>

        {/* Content */}
        <h3 className="font-display text-lg text-gray-100 mb-2">
          {nudge.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {nudge.message}
        </p>

        {/* Action */}
        <Button
          variant="hud"
          onClick={() => onAction(nudge)}
          className="w-full"
        >
          {nudge.actionLabel}
        </Button>

        {/* You vs You framing */}
        <p className="text-xs text-gray-500 text-center mt-3">
          Remember: it's you vs you. Every session counts.
        </p>
      </div>
    </Card>
  )
}

export default CoachNudgeCard
