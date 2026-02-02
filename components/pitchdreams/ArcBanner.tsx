'use client'

import { Card } from '@/components/ui/Card'
import { type TrainingArc, type ArcId } from '@/lib/arcs/definitions'
import { getArcProgressPercent } from '@/lib/arcs/progression'

interface ArcBannerProps {
  arc: TrainingArc
  dayIndex: number
  sessionsCompleted?: number
  variant?: 'default' | 'compact' | 'mini'
}

const arcColors: Record<ArcId, { bg: string; border: string; text: string; glow: string }> = {
  vision: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  tempo: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/20',
  },
  decision_chain: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
}

export function ArcBanner({
  arc,
  dayIndex,
  sessionsCompleted = 0,
  variant = 'default',
}: ArcBannerProps) {
  const colors = arcColors[arc.id]
  const progress = getArcProgressPercent(dayIndex, arc.id)
  const dayLabel = `Day ${dayIndex + 1} of ${arc.recommendedDurationDays}`

  if (variant === 'mini') {
    return (
      <div className={`inline-flex items-center gap-2 ${colors.bg} ${colors.border} border rounded-full px-3 py-1`}>
        <span className="text-lg">{arc.icon}</span>
        <span className={`text-sm font-medium ${colors.text}`}>{arc.title}</span>
        <span className="text-xs text-gray-400">{dayLabel}</span>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Card variant="hud-panel" className={`p-3 ${colors.bg} ${colors.border} border`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{arc.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`font-display ${colors.text}`}>{arc.title}</span>
              <span className="text-xs text-gray-500">{dayLabel}</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full ${colors.text.replace('text-', 'bg-')}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card
      variant="hud"
      className={`p-5 ${colors.bg} ${colors.border} border shadow-lg ${colors.glow}`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-4xl p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
          {arc.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className={`font-display text-xl ${colors.text}`}>{arc.title}</h3>
            <span className="text-sm text-gray-400 font-mono">{dayLabel}</span>
          </div>
          <p className="text-sm text-gray-400 mb-2">{arc.subtitle}</p>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.text.replace('text-', 'bg-')} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-gray-500">{progress}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ArcBanner
