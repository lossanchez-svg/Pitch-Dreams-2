import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ParentDashboardContent } from '@/components/pitchdreams/ParentDashboardContent'
import { startOfMonth } from 'date-fns'

// Helper function to calculate consecutive days streak
function calculateStreak(sessions: { createdAt: Date }[]): number {
  if (sessions.length === 0) return 0

  const sortedDates = sessions
    .map((s: { createdAt: Date }) => new Date(s.createdAt).toDateString())
    .filter((date: string, index: number, self: string[]) => self.indexOf(date) === index)
    .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())

  let streak = 1
  const today = new Date()

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i])
    const next = new Date(sortedDates[i + 1])
    const diffTime = Math.abs(current.getTime() - next.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  // Check if streak is current (last session was today or yesterday)
  const lastSessionDate = new Date(sortedDates[0])
  const daysSinceLastSession = Math.floor(
    (today.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysSinceLastSession <= 1 ? streak : 0
}

// Convert Game IQ impact to numeric value for averaging
function gameIQToNumber(impact: string): number {
  switch (impact) {
    case 'HIGH': return 3
    case 'MEDIUM': return 2
    case 'LOW': return 1
    default: return 2
  }
}

export default async function ParentDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const monthStart = startOfMonth(new Date())

  // Fetch children with their sessions and activities
  const children = await prisma.childProfile.findMany({
    where: { parentId: session.user.id },
    include: {
      sessionLogs: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
        },
      },
      activities: {
        where: {
          startAt: { gte: monthStart },
        },
        select: {
          activityType: true,
          durationMinutes: true,
          gameIQImpact: true,
        },
      },
    },
  })

  // Transform data for the component
  type ChildRecord = typeof children[number]
  const childrenData = children.map((child: ChildRecord) => {
    // Calculate activity summaries
    const activityMap = new Map<string, { count: number; totalMinutes: number; totalGameIQ: number }>()

    child.activities.forEach((activity: { activityType: string; durationMinutes: number; gameIQImpact: string }) => {
      const existing = activityMap.get(activity.activityType) || { count: 0, totalMinutes: 0, totalGameIQ: 0 }
      activityMap.set(activity.activityType, {
        count: existing.count + 1,
        totalMinutes: existing.totalMinutes + activity.durationMinutes,
        totalGameIQ: existing.totalGameIQ + gameIQToNumber(activity.gameIQImpact),
      })
    })

    const activitySummaries = Array.from(activityMap.entries()).map(([type, data]) => ({
      activityType: type,
      count: data.count,
      totalMinutes: data.totalMinutes,
      avgGameIQ: data.totalGameIQ / data.count,
    })).sort((a, b) => b.count - a.count)

    const totalActivities = child.activities.length
    const totalMinutes = child.activities.reduce((sum: number, a: { durationMinutes: number }) => sum + a.durationMinutes, 0)
    const avgGameIQScore = totalActivities > 0
      ? child.activities.reduce((sum: number, a: { gameIQImpact: string }) => sum + gameIQToNumber(a.gameIQImpact), 0) / totalActivities
      : 0

    return {
      id: child.id,
      nickname: child.nickname,
      age: child.age,
      position: child.position,
      avatarColor: child.avatarColor,
      sessionCount: child.sessionLogs.filter(
        (s: { createdAt: Date }) => new Date(s.createdAt) >= monthStart
      ).length,
      currentStreak: calculateStreak(child.sessionLogs),
      activitySummaries,
      totalActivities,
      totalMinutes,
      avgGameIQScore,
    }
  })

  return <ParentDashboardContent children={childrenData} />
}
