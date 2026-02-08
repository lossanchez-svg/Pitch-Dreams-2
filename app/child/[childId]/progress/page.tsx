import { prisma } from '@/lib/db'
import { verifyChildOwnership, calculateStreak } from '@/lib/child-helpers'
import { TrendingUp, Calendar, Trophy, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ConsistencyRingCard } from '@/components/pitchdreams'
import { startOfMonth, startOfWeek } from 'date-fns'

interface ChildProgressPageProps {
  params: {
    childId: string
  }
}

export default async function ChildProgressPage({ params }: ChildProgressPageProps) {
  // Verify ownership
  await verifyChildOwnership(params.childId)

  // Fetch all sessions with related data
  const sessions = await prisma.sessionLog.findMany({
    where: { childId: params.childId },
    orderBy: { createdAt: 'desc' },
  })

  // Define session type from Prisma result
  type SessionRecord = typeof sessions[number]

  // Calculate stats
  const currentStreak = calculateStreak(sessions)
  const totalSessions = sessions.length
  const thisMonthSessions = sessions.filter(
    (s: SessionRecord) => new Date(s.createdAt) >= startOfMonth(new Date())
  ).length
  const thisWeekSessions = sessions.filter(
    (s: SessionRecord) => new Date(s.createdAt) >= startOfWeek(new Date())
  ).length

  // Calculate average effort level
  const avgRpe = sessions.length > 0
    ? (sessions.reduce((sum: number, s: SessionRecord) => sum + (s.effortLevel || 0), 0) / sessions.length).toFixed(1)
    : '0.0'

  // Calculate total training minutes
  const totalMinutes = sessions.reduce((sum: number, s: SessionRecord) => sum + (s.duration || 0), 0)

  // Find max streak (simplified - just use current streak for now)
  const maxStreak = currentStreak

  // Get recent sessions for display
  const recentSessions = sessions.slice(0, 5).map((s: SessionRecord) => ({
    date: new Date(s.createdAt).toLocaleDateString(),
    drill: s.activityType || 'Training Session',
    rpe: s.effortLevel || 0,
    mood: s.mood || 'N/A',
    duration: s.duration || 0,
  }))

  // Type for recent session display
  type RecentSession = typeof recentSessions[number]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="hud-label mb-2">Progress Dashboard</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Your Journey
        </h1>
        <p className="text-gray-300">
          Track your growth. Celebrate your consistency.
        </p>
      </div>

      {/* Consistency Ring */}
      <div className="mb-8">
        <ConsistencyRingCard
          streak={currentStreak}
          maxStreak={30}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card variant="hud" className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary-400" />
            <p className="text-xs text-gray-400 uppercase">Current Streak</p>
          </div>
          <p className="font-mono text-3xl text-primary-400">{currentStreak}</p>
          <p className="text-xs text-gray-500">days</p>
        </Card>

        <Card variant="hud" className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-4 w-4 text-accent-400" />
            <p className="text-xs text-gray-400 uppercase">Max Streak</p>
          </div>
          <p className="font-mono text-3xl text-accent-400">{maxStreak}</p>
          <p className="text-xs text-gray-500">days</p>
        </Card>

        <Card variant="hud" className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-4 w-4 text-lime-400" />
            <p className="text-xs text-gray-400 uppercase">This Month</p>
          </div>
          <p className="font-mono text-3xl text-lime-400">{thisMonthSessions}</p>
          <p className="text-xs text-gray-500">sessions</p>
        </Card>

        <Card variant="hud" className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-4 w-4 text-cyan-400" />
            <p className="text-xs text-gray-400 uppercase">Total Sessions</p>
          </div>
          <p className="font-mono text-3xl text-cyan-400">{totalSessions}</p>
          <p className="text-xs text-gray-500">all time</p>
        </Card>
      </div>

      {/* Personal Bests */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-primary-400 mb-4">Personal Bests</h2>
        <Card variant="hud-panel" className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <span className="text-gray-300">Longest Streak</span>
              <span className="font-mono text-xl text-primary-400">{maxStreak} days</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <span className="text-gray-300">Total Training Time</span>
              <span className="font-mono text-xl text-primary-400">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-300">Average Intensity</span>
              <span className="font-mono text-xl text-primary-400">{avgRpe} / 10</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display text-2xl text-primary-400 mb-4">Recent Sessions</h2>
          <Card variant="hud-panel" className="p-6">
            <div className="space-y-3">
              {recentSessions.map((session: RecentSession, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-gray-100 font-medium">{session.drill}</p>
                    <p className="text-sm text-gray-400">{session.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-400 font-mono">RPE: {session.rpe}</p>
                    <p className="text-xs text-gray-500">{session.duration} min</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Footer Message */}
      <div className="text-center py-6 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          No rankings. Just you vs you — and you're winning.
        </p>
      </div>
    </div>
  )
}
