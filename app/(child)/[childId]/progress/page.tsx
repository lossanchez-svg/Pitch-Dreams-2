'use client'

import { TrendingUp, Calendar, Trophy, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ConsistencyRingCard } from '@/components/pitchdreams'

// Mock data - will be replaced with actual Prisma queries
const mockStats = {
  currentStreak: 5,
  maxStreak: 30,
  totalSessions: 47,
  thisMonthSessions: 12,
  avgRpe: 7.2,
  totalMinutes: 1140,
}

const mockPersonalBests = [
  { metric: 'Longest Streak', value: '8 days', date: '2 weeks ago' },
  { metric: 'Most Sessions in a Week', value: '5 sessions', date: '3 weeks ago' },
  { metric: 'Total Training Time', value: '19 hours', date: 'All time' },
]

const mockRecentSessions = [
  { date: '2024-01-20', rpe: 8, mood: 'Energized', duration: 25 },
  { date: '2024-01-18', rpe: 6, mood: 'Focused', duration: 20 },
  { date: '2024-01-16', rpe: 7, mood: 'Confident', duration: 30 },
]

export default function ChildProgressPage() {
  // TODO: Replace with actual Prisma queries
  // const sessions = await prisma.session.findMany({
  //   where: { childId: params.childId },
  //   orderBy: { createdAt: 'desc' }
  // })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="hud-label mb-2">Progress Dashboard</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Your Journey
        </h1>
        <p className="text-gray-300">
          Track your consistency and celebrate your growth.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Consistency Ring */}
        <ConsistencyRingCard
          streak={mockStats.currentStreak}
          maxStreak={mockStats.maxStreak}
        />

        {/* Total Sessions */}
        <Card variant="hud" className="hud-scanline">
          <div className="hud-label mb-4">Total Sessions</div>
          <div className="flex items-center gap-4">
            <Trophy className="h-12 w-12 text-accent-400" />
            <div>
              <div className="font-display text-4xl text-accent-400">
                {mockStats.totalSessions}
              </div>
              <div className="text-sm text-gray-400">All Time</div>
            </div>
          </div>
          <div className="mt-4 hud-chip">
            <Calendar className="h-4 w-4" />
            {mockStats.thisMonthSessions} this month
          </div>
        </Card>

        {/* Average RPE */}
        <Card variant="hud" className="hud-scanline">
          <div className="hud-label mb-4">Avg Intensity</div>
          <div className="flex items-center gap-4">
            <TrendingUp className="h-12 w-12 text-primary-400 hud-glow-cyan" />
            <div>
              <div className="font-mono text-4xl text-primary-400">
                {mockStats.avgRpe.toFixed(1)}
              </div>
              <div className="text-sm text-gray-400">RPE</div>
            </div>
          </div>
          <div className="mt-4 hud-chip">
            <Target className="h-4 w-4" />
            Consistent effort
          </div>
        </Card>
      </div>

      {/* Personal Bests */}
      <Card variant="hud-panel" className="p-6 mb-8">
        <div className="hud-label mb-4">Personal Bests</div>
        <div className="space-y-4">
          {mockPersonalBests.map((pb, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-primary-500/20 hover:border-primary-500/40 transition-colors"
            >
              <div>
                <div className="font-medium text-gray-200">{pb.metric}</div>
                <div className="text-sm text-gray-400">{pb.date}</div>
              </div>
              <div className="font-mono text-xl text-primary-400">
                {pb.value}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Sessions */}
      <Card variant="hud-panel" className="p-6 mb-8">
        <div className="hud-label mb-4">Recent Sessions</div>
        <div className="space-y-3">
          {mockRecentSessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="font-mono text-gray-400">{session.date}</div>
                <div className="hud-chip">
                  RPE: {session.rpe}
                </div>
                <div className="text-sm text-gray-300">{session.mood}</div>
              </div>
              <div className="text-sm text-gray-400">
                {session.duration} min
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Time Stats */}
      <Card variant="hud" className="hud-scanline p-6">
        <div className="hud-label mb-4">Training Volume</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-3xl text-primary-400 mb-1">
              {Math.floor(mockStats.totalMinutes / 60)}h {mockStats.totalMinutes % 60}m
            </div>
            <div className="text-sm text-gray-400">Total Training Time</div>
          </div>
          <Trophy className="h-16 w-16 text-primary-400/20" />
        </div>
      </Card>

      {/* Footer Quote */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic">
          "No rankings. Just you vs you — and you're winning."
        </p>
      </div>
    </div>
  )
}
