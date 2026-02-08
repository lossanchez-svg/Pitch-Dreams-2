'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { type TrainingArc, type ArcId, trainingArcs, getDefaultArcOrder } from '@/lib/arcs/definitions'
import { Trophy, Star, ChevronRight, Sparkles } from 'lucide-react'

interface ArcCompletionScreenProps {
  completedArc: TrainingArc
  sessionsCompleted: number
  completedArcIds: ArcId[]
  onStartNextArc?: (arcId: ArcId) => void
  onContinueWithout?: () => void
  isLoading?: boolean
}

const arcColors: Record<ArcId, { bg: string; border: string; text: string }> = {
  vision: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
  },
  tempo: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
  },
  decision_chain: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
  },
}

export function ArcCompletionScreen({
  completedArc,
  sessionsCompleted,
  completedArcIds,
  onStartNextArc,
  onContinueWithout,
  isLoading = false,
}: ArcCompletionScreenProps) {
  const colors = arcColors[completedArc.id]

  // Find next available arc
  const defaultOrder = getDefaultArcOrder()
  const nextArcId = defaultOrder.find(id => !completedArcIds.includes(id))
  const nextArc = nextArcId ? trainingArcs[nextArcId] : null
  const allArcsComplete = completedArcIds.length >= 3

  return (
    <div className="max-w-lg mx-auto text-center">
      {/* Celebration animation */}
      <div className="relative mb-8">
        <div className={`w-24 h-24 mx-auto rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center animate-pulse`}>
          <Trophy className={`w-12 h-12 ${colors.text}`} />
        </div>
        <Sparkles className="absolute top-0 right-1/4 w-6 h-6 text-yellow-400 animate-bounce" />
        <Star className="absolute top-4 left-1/4 w-5 h-5 text-yellow-400 animate-bounce delay-150" />
        <Sparkles className="absolute bottom-2 right-1/3 w-4 h-4 text-yellow-400 animate-bounce delay-300" />
      </div>

      {/* Title */}
      <h1 className={`font-display text-4xl ${colors.text} mb-2`}>
        Arc Complete!
      </h1>
      <p className="text-xl text-gray-300 mb-6">
        {completedArc.title}
      </p>

      {/* Completion message */}
      <Card variant="hud" className={`p-6 ${colors.bg} ${colors.border} border mb-6`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-4xl">{completedArc.icon}</span>
        </div>
        <p className="text-gray-300 text-lg mb-4">
          {completedArc.completionMessage}
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <div>
            <span className="block text-2xl font-display text-white">{sessionsCompleted}</span>
            Sessions
          </div>
          <div>
            <span className="block text-2xl font-display text-white">{completedArc.recommendedDurationDays}</span>
            Days
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-3">Your Arc Collection</p>
        <div className="flex justify-center gap-3">
          {defaultOrder.map((arcId) => {
            const arc = trainingArcs[arcId]
            const isComplete = completedArcIds.includes(arcId)
            return (
              <div
                key={arcId}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  isComplete
                    ? `${arcColors[arcId].bg} ${arcColors[arcId].border} border`
                    : 'bg-gray-800 border border-gray-700 opacity-50'
                }`}
                title={arc.title}
              >
                {arc.icon}
              </div>
            )
          })}
        </div>
        {allArcsComplete && (
          <p className="text-sm text-yellow-400 mt-3">
            You've completed all arcs! You're on your way to elite level.
          </p>
        )}
      </div>

      {/* Next arc suggestion */}
      {nextArc && onStartNextArc && (
        <Card variant="hud-panel" className="p-4 mb-4">
          <p className="text-sm text-gray-400 mb-3">Ready for your next challenge?</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{nextArc.icon}</span>
            <div className="text-left">
              <h3 className={`font-display text-lg ${arcColors[nextArc.id].text}`}>
                {nextArc.title}
              </h3>
              <p className="text-xs text-gray-400">{nextArc.subtitle}</p>
            </div>
          </div>
          <Button
            variant="hud"
            className="w-full"
            onClick={() => onStartNextArc(nextArc.id)}
            disabled={isLoading}
          >
            Start {nextArc.title}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      )}

      {/* Continue without arc */}
      {onContinueWithout && (
        <Button
          variant="ghost"
          onClick={onContinueWithout}
          disabled={isLoading}
          className="w-full"
        >
          Continue Training
        </Button>
      )}
    </div>
  )
}

export default ArcCompletionScreen
