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
    .map(s => new Date(s.createdAt).toDateString())
    .filter((date, index, self) => self.indexOf(date) === index)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

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

// Avatar color mapping based on child ID for consistency
const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-teal-500',
]

export default async function ParentDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  // Fetch children with their sessions
  const children = await prisma.child.findMany({
    where: { parentId: session.user.id },
    include: {
      sessions: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
        },
      },
    },
  })

  // Transform data for the component
  const childrenData = children.map((child, index) => ({
    id: child.id,
    nickname: child.nickname,
    age: child.age,
    position: child.position,
    avatarColor: avatarColors[index % avatarColors.length],
    sessionCount: child.sessions.filter(
      s => new Date(s.createdAt) >= startOfMonth(new Date())
    ).length,
    currentStreak: calculateStreak(child.sessions),
  }))

  return <ParentDashboardContent children={childrenData} />
}
