'use client'

import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { type TrainingArc, type ArcId } from '@/lib/arcs/definitions'
import { Sparkles, ChevronRight, X } from 'lucide-react'

interface ArcSuggestionCardProps {
  arc: TrainingArc
  reason: string
  onStart: () => void
  onDismiss?: () => void
  isLoading?: boolean
}

const arcColors: Record<ArcId, { bg: string; border: string; text: string }> = {
  vision: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
  },
  tempo: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  decision_chain: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
  },
}

export function ArcSuggestionCard({
  arc,
  reason,
  onStart,
  onDismiss,
  isLoading = false,
}: ArcSuggestionCardProps) {
  const colors = arcColors[arc.id]

  return (
    <Card
      variant="hud"
      className={`p-5 ${colors.bg} ${colors.border} border relative overflow-hidden`}
    >
      {/* Decorative sparkle */}
      <div className="absolute top-2 right-2 opacity-20">
        <Sparkles className={`w-20 h-20 ${colors.text}`} />
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-300 transition-colors z-10"
          aria-label="Dismiss suggestion"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className={`w-4 h-4 ${colors.text}`} />
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Suggested Arc
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{arc.icon}</span>
          <div>
            <h3 className={`font-display text-xl ${colors.text}`}>{arc.title}</h3>
            <p className="text-sm text-gray-400">{arc.subtitle}</p>
          </div>
        </div>

        <p className="text-gray-300 mb-4">{reason}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <span>{arc.recommendedDurationDays} days</span>
          <span>•</span>
          <span>{arc.drillIds.length} drills</span>
          <span>•</span>
          <span>{arc.gameIqIds.length} Game IQ modules</span>
        </div>

        <Button
          variant="hud"
          onClick={onStart}
          disabled={isLoading}
          className="w-full"
        >
          Start {arc.title}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  )
}

export default ArcSuggestionCard
