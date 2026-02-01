'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { SkillAvatarAnimation } from './SkillAvatarAnimation'
import type { SkillDrillConfig } from '@/lib/skills/registry'
import { Clock, Lightbulb, ChevronDown, ChevronUp, Target } from 'lucide-react'

interface SkillTrackDrillCardProps {
  drill: SkillDrillConfig
  onStart: (drillKey: string) => void
  isActive?: boolean
  isCompleted?: boolean
}

/**
 * SkillTrackDrillCard Component
 *
 * Displays a skill track drill with:
 * - Avatar animation slot
 * - Expandable coach tips
 * - "Why it matters" explanation
 * - Start drill action
 */
export function SkillTrackDrillCard({
  drill,
  onStart,
  isActive = false,
  isCompleted = false,
}: SkillTrackDrillCardProps) {
  const [showTips, setShowTips] = useState(false)

  const trackColors = {
    scanning: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      badge: 'bg-cyan-500/20 text-cyan-300',
    },
    decision_chain: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-300',
    },
  }

  const colors = trackColors[drill.track]

  return (
    <Card
      variant="hud-panel"
      className={`relative overflow-hidden transition-all duration-300 ${
        isActive ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/20' : ''
      } ${isCompleted ? 'opacity-75' : ''}`}
    >
      {/* Track indicator */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.bg}`} />

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Animation slot */}
          <div className="flex-shrink-0 flex justify-center">
            <SkillAvatarAnimation
              animationKey={drill.animationKey}
              fallbackSvg={drill.staticSvgPath}
              alt={`${drill.title} demonstration`}
              size="lg"
              autoPlay={isActive}
            />
          </div>

          {/* Content */}
          <div className="flex-grow space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wider ${colors.badge}`}>
                  {drill.track === 'scanning' ? 'Scanning' : 'Decision Chain'}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {drill.durationMinutes} min
                </span>
                <span className="text-xs text-gray-500">
                  {drill.recommendedFrequency}
                </span>
              </div>
              <h3 className={`font-display text-2xl ${colors.text}`}>
                {drill.title}
              </h3>
            </div>

            {/* Why it matters */}
            <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                Why It Matters
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {drill.whyItMatters}
              </p>
            </div>

            {/* Coach Tips (expandable) */}
            <div>
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Coach Tips ({drill.coachTips.length})</span>
                {showTips ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showTips && (
                <ul className="mt-3 space-y-2 pl-6">
                  {drill.coachTips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action button */}
            <div className="pt-2">
              {isCompleted ? (
                <div className="flex items-center gap-2 text-accent-400">
                  <Target className="w-5 h-5" />
                  <span className="font-mono text-sm">Completed</span>
                </div>
              ) : (
                <Button
                  variant="hud"
                  onClick={() => onStart(drill.key)}
                  disabled={isActive}
                  className={isActive ? 'animate-pulse' : ''}
                >
                  {isActive ? 'In Progress...' : 'Start Drill'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SkillTrackDrillCard
