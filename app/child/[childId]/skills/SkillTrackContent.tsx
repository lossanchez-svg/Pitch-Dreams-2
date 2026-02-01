'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { SkillTrackDrillCard } from '@/components/pitchdreams/SkillTrackDrillCard'
import { SkillAvatarAnimation } from '@/components/pitchdreams/SkillAvatarAnimation'
import {
  ArrowLeft,
  Eye,
  Brain,
  Target,
  CheckCircle,
  X,
} from 'lucide-react'
import type { SkillDrillConfig, SkillTrack } from '@/lib/skills/registry'

// Local type to match Prisma schema (avoids dependency on generated client)
interface SkillTrackDrill {
  id: string
  key: string
  title: string
  track: string
  durationMinutes: number
  recommendedFrequency: string
  animationKey: string
  whyItMatters: string
  coachTips: unknown
  metricConfig: unknown
}
import { skillDrillRegistry, getSkillTracks } from '@/lib/skills/registry'

interface DrillStat {
  drillId: string
  totalAttempts: number
  avgConfidence: number
  lastAttempt: Date | null
}

interface SkillTrackContentProps {
  childId: string
  childName: string
  skillTrackDrills: SkillTrackDrill[]
  drillStats: DrillStat[]
}

export function SkillTrackContent({
  childId,
  childName,
  skillTrackDrills,
  drillStats,
}: SkillTrackContentProps) {
  const [selectedTrack, setSelectedTrack] = useState<SkillTrack | 'all'>('all')
  const [activeDrill, setActiveDrill] = useState<string | null>(null)
  const [showDrillModal, setShowDrillModal] = useState(false)
  const [currentDrillConfig, setCurrentDrillConfig] = useState<SkillDrillConfig | null>(null)

  const tracks = getSkillTracks()

  // Convert DB drills to registry format, falling back to registry data
  const drillsWithConfig = skillTrackDrills.map(dbDrill => {
    const registryDrill = skillDrillRegistry[dbDrill.key]
    if (registryDrill) {
      return registryDrill
    }
    // Fallback: convert DB drill to config format
    return {
      key: dbDrill.key,
      title: dbDrill.title,
      track: dbDrill.track as SkillTrack,
      durationMinutes: dbDrill.durationMinutes,
      recommendedFrequency: dbDrill.recommendedFrequency,
      animationKey: dbDrill.animationKey,
      staticSvgPath: `/skills/static/${dbDrill.animationKey.replace('_', '-')}.svg`,
      whyItMatters: dbDrill.whyItMatters,
      coachTips: dbDrill.coachTips as string[],
      metrics: (dbDrill.metricConfig as any)?.metrics || [],
    } as SkillDrillConfig
  })

  // Filter drills by selected track
  const filteredDrills = selectedTrack === 'all'
    ? drillsWithConfig
    : drillsWithConfig.filter(drill => drill.track === selectedTrack)

  const handleStartDrill = (drillKey: string) => {
    const config = skillDrillRegistry[drillKey]
    if (config) {
      setCurrentDrillConfig(config)
      setActiveDrill(drillKey)
      setShowDrillModal(true)
    }
  }

  const handleCloseDrillModal = () => {
    setShowDrillModal(false)
    setActiveDrill(null)
    setCurrentDrillConfig(null)
  }

  // Calculate overall stats
  const totalAttempts = drillStats.reduce((sum, s) => sum + s.totalAttempts, 0)
  const overallAvgConfidence = drillStats.length > 0
    ? drillStats.reduce((sum, s) => sum + s.avgConfidence, 0) / drillStats.filter(s => s.totalAttempts > 0).length || 0
    : 0

  const trackIcons = {
    scanning: <Eye className="w-5 h-5" />,
    decision_chain: <Brain className="w-5 h-5" />,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/child/${childId}/home`}
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="hud-label mb-2">Skill Tracks</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Train Your Brain
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Cognitive training drills to improve your field awareness and decision-making.
          These skills separate good players from great ones.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card variant="hud-panel" className="p-4 text-center">
          <div className="text-3xl font-display text-primary-400">{totalAttempts}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Total Drills</div>
        </Card>
        <Card variant="hud-panel" className="p-4 text-center">
          <div className="text-3xl font-display text-cyan-400">
            {drillsWithConfig.filter(d => d.track === 'scanning').length}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Scanning</div>
        </Card>
        <Card variant="hud-panel" className="p-4 text-center">
          <div className="text-3xl font-display text-purple-400">
            {drillsWithConfig.filter(d => d.track === 'decision_chain').length}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Decision Chain</div>
        </Card>
        <Card variant="hud-panel" className="p-4 text-center">
          <div className="text-3xl font-display text-accent-400">
            {overallAvgConfidence.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Confidence</div>
        </Card>
      </div>

      {/* Track Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedTrack('all')}
          className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
            selectedTrack === 'all'
              ? 'bg-primary-500/20 border border-primary-500/50 text-primary-400'
              : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          All Tracks
        </button>
        {tracks.map(track => (
          <button
            key={track.key}
            onClick={() => setSelectedTrack(track.key)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all flex items-center gap-2 ${
              selectedTrack === track.key
                ? track.key === 'scanning'
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'bg-purple-500/20 border border-purple-500/50 text-purple-400'
                : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            {trackIcons[track.key]}
            {track.label}
          </button>
        ))}
      </div>

      {/* Drills Grid */}
      <div className="space-y-6">
        {filteredDrills.length === 0 ? (
          <Card variant="hud-panel" className="p-8 text-center">
            <p className="text-gray-400">No drills found for this track.</p>
          </Card>
        ) : (
          filteredDrills.map(drill => {
            const stats = drillStats.find(s => {
              const dbDrill = skillTrackDrills.find(d => d.key === drill.key)
              return dbDrill && s.drillId === dbDrill.id
            })

            return (
              <SkillTrackDrillCard
                key={drill.key}
                drill={drill}
                onStart={handleStartDrill}
                isActive={activeDrill === drill.key}
                isCompleted={false}
              />
            )
          })
        )}
      </div>

      {/* Drill Execution Modal */}
      {showDrillModal && currentDrillConfig && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div>
                <div className="hud-label mb-1">Active Drill</div>
                <h2 className="font-display text-2xl text-primary-400">
                  {currentDrillConfig.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDrillModal}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Animation */}
              <div className="flex justify-center">
                <SkillAvatarAnimation
                  animationKey={currentDrillConfig.animationKey}
                  fallbackSvg={currentDrillConfig.staticSvgPath}
                  alt={`${currentDrillConfig.title} demonstration`}
                  size="xl"
                  autoPlay={true}
                />
              </div>

              {/* Why It Matters */}
              <Card variant="hud-panel" className="p-4">
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Why It Matters
                </p>
                <p className="text-gray-300">{currentDrillConfig.whyItMatters}</p>
              </Card>

              {/* Coach Tips */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                  Coach Tips
                </p>
                <ul className="space-y-2">
                  {currentDrillConfig.coachTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center text-xs text-primary-400 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duration & Frequency */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>Duration: {currentDrillConfig.durationMinutes} min</span>
                <span>Recommended: {currentDrillConfig.recommendedFrequency}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-800 flex gap-4">
              <Button
                variant="ghost"
                onClick={handleCloseDrillModal}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="hud"
                onClick={() => {
                  // TODO: Navigate to drill execution with metrics tracking
                  handleCloseDrillModal()
                }}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic">
          &quot;The best players don&apos;t just react - they anticipate.&quot;
        </p>
      </div>
    </div>
  )
}
