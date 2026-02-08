'use client'

import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { type TrainingArc, type ArcId } from '@/lib/arcs/definitions'
import { getArcProgressPercent, getArcProgressMessage, type ArcStatus } from '@/lib/arcs/progression'
import { Play, Pause, Check, ChevronRight } from 'lucide-react'

interface ArcCardProps {
  arc: TrainingArc
  status?: ArcStatus
  dayIndex?: number
  sessionsCompleted?: number
  onStart?: () => void
  onResume?: () => void
  onPause?: () => void
  onView?: () => void
  isLoading?: boolean
  compact?: boolean
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

export function ArcCard({
  arc,
  status = 'inactive',
  dayIndex = 0,
  sessionsCompleted = 0,
  onStart,
  onResume,
  onPause,
  onView,
  isLoading = false,
  compact = false,
}: ArcCardProps) {
  const colors = arcColors[arc.id]
  const progress = status !== 'inactive' ? getArcProgressPercent(dayIndex, arc.id) : 0
  const progressMessage = status === 'active' ? getArcProgressMessage(dayIndex, arc.id) : ''

  if (compact) {
    return (
      <Card
        variant="hud-panel"
        className={`p-4 ${colors.bg} ${colors.border} border cursor-pointer hover:border-opacity-60 transition-all`}
        onClick={onView}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{arc.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className={`font-display text-lg ${colors.text}`}>{arc.title}</h3>
            <p className="text-xs text-gray-400 truncate">{arc.subtitle}</p>
          </div>
          {status === 'completed' && (
            <Check className="w-5 h-5 text-green-400" />
          )}
          {status === 'active' && (
            <span className="text-xs font-mono text-gray-400">Day {dayIndex + 1}</span>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card variant="hud" className={`p-6 ${colors.bg} ${colors.border} border`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{arc.icon}</span>
          <div>
            <h2 className={`font-display text-2xl ${colors.text}`}>{arc.title}</h2>
            <p className="text-sm text-gray-400">{arc.subtitle}</p>
          </div>
        </div>
        {status === 'completed' && (
          <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
            <Check className="w-4 h-4" />
            Complete
          </div>
        )}
        {status === 'active' && (
          <div className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-medium`}>
            In Progress
          </div>
        )}
        {status === 'paused' && (
          <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
            Paused
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6">{arc.playerDescription}</p>

      {/* Progress (if active or completed) */}
      {(status === 'active' || status === 'completed') && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="font-mono text-gray-300">
              Day {dayIndex + 1} / {arc.recommendedDurationDays}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.text.replace('text-', 'bg-')} transition-all duration-500`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          {status === 'active' && progressMessage && (
            <p className="text-xs text-gray-500 mt-2">{progressMessage}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {sessionsCompleted} session{sessionsCompleted !== 1 ? 's' : ''} completed
          </p>
        </div>
      )}

      {/* Duration info (if not started) */}
      {status === 'inactive' && (
        <div className="mb-6 flex items-center gap-4 text-sm text-gray-400">
          <span>{arc.recommendedDurationDays} days</span>
          <span>•</span>
          <span>{arc.drillIds.length} drills</span>
          <span>•</span>
          <span>{arc.gameIqIds.length} Game IQ modules</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {status === 'inactive' && onStart && (
          <Button
            variant="hud"
            onClick={onStart}
            disabled={isLoading}
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Arc
          </Button>
        )}
        {status === 'active' && (
          <>
            {onPause && (
              <Button
                variant="ghost"
                onClick={onPause}
                disabled={isLoading}
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            {onView && (
              <Button
                variant="hud"
                onClick={onView}
                className="flex-1"
              >
                Continue Training
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </>
        )}
        {status === 'paused' && onResume && (
          <Button
            variant="hud"
            onClick={onResume}
            disabled={isLoading}
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            Resume Arc
          </Button>
        )}
        {status === 'completed' && onView && (
          <Button
            variant="ghost"
            onClick={onView}
            className="flex-1"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  )
}

export default ArcCard
