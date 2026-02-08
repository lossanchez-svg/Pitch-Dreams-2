'use client'

import { Card } from '@/components/ui/Card'
import {
  User,
  Users,
  Building2,
  Trophy,
  Dribbble,
  Home,
  Target,
  TrendingUp,
  Clock,
  Brain,
} from 'lucide-react'

export interface ActivitySummary {
  activityType: string
  count: number
  totalMinutes: number
  avgGameIQ: number
}

interface ActivitySummaryCardProps {
  childName: string
  summaries: ActivitySummary[]
  totalActivities: number
  totalMinutes: number
  avgGameIQScore: number
  period?: string
}

const activityIcons: Record<string, React.ReactNode> = {
  SELF_TRAINING: <User className="w-4 h-4" />,
  COACH_1ON1: <Target className="w-4 h-4" />,
  TEAM_TRAINING: <Users className="w-4 h-4" />,
  FACILITY_CLASS: <Building2 className="w-4 h-4" />,
  OFFICIAL_GAME: <Trophy className="w-4 h-4" />,
  FUTSAL_GAME: <Dribbble className="w-4 h-4" />,
  INDOOR_LEAGUE_GAME: <Home className="w-4 h-4" />,
}

const activityLabels: Record<string, string> = {
  SELF_TRAINING: 'Self Training',
  COACH_1ON1: '1:1 Coaching',
  TEAM_TRAINING: 'Team Training',
  FACILITY_CLASS: 'Facility Class',
  OFFICIAL_GAME: 'Official Game',
  FUTSAL_GAME: 'Futsal',
  INDOOR_LEAGUE_GAME: 'Indoor League',
}

const activityColors: Record<string, string> = {
  SELF_TRAINING: 'bg-cyan-500',
  COACH_1ON1: 'bg-purple-500',
  TEAM_TRAINING: 'bg-green-500',
  FACILITY_CLASS: 'bg-orange-500',
  OFFICIAL_GAME: 'bg-yellow-500',
  FUTSAL_GAME: 'bg-pink-500',
  INDOOR_LEAGUE_GAME: 'bg-blue-500',
}

export function ActivitySummaryCard({
  childName,
  summaries,
  totalActivities,
  totalMinutes,
  avgGameIQScore,
  period = 'This Month',
}: ActivitySummaryCardProps) {
  // Calculate hours and minutes
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  // Calculate max count for bar scaling
  const maxCount = Math.max(...summaries.map(s => s.count), 1)

  // Convert Game IQ score to label
  const gameIQLabel = avgGameIQScore >= 2.5 ? 'High' : avgGameIQScore >= 1.5 ? 'Medium' : 'Low'
  const gameIQColor = avgGameIQScore >= 2.5 ? 'text-accent-400' : avgGameIQScore >= 1.5 ? 'text-primary-400' : 'text-gray-400'

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {childName}'s Activity Mix
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{period}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="p-3 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalActivities}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Activities</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {hours}h {minutes}m
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Time</p>
        </div>
        <div className="p-3 text-center">
          <p className={`text-2xl font-bold ${gameIQColor}`}>{gameIQLabel}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Avg Game IQ</p>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="p-4">
        {summaries.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No activities logged yet this period.
          </p>
        ) : (
          <div className="space-y-3">
            {summaries.map((summary) => {
              const barWidth = (summary.count / maxCount) * 100
              const icon = activityIcons[summary.activityType]
              const label = activityLabels[summary.activityType] || summary.activityType
              const color = activityColors[summary.activityType] || 'bg-gray-500'

              return (
                <div key={summary.activityType} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {icon}
                      <span>{label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span>{summary.count}x</span>
                      <span className="text-xs">({Math.round(summary.totalMinutes / 60)}h)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-500`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Game IQ Insight */}
      {totalActivities > 0 && (
        <div className="px-4 pb-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-primary-500 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Game IQ Focus
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {avgGameIQScore >= 2.5
                    ? 'Great mix of game-like activities! Decision-making is being trained.'
                    : avgGameIQScore >= 1.5
                    ? 'Good balance. Consider adding more small-sided games.'
                    : 'Mostly physical training. Add games or tactical exercises.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default ActivitySummaryCard
