import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './auth'
import { prisma } from './db'

/**
 * Verify that the current user owns the specified child
 * Redirects to dashboard if not authorized
 */
export async function verifyChildOwnership(childId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  const child = await prisma.child.findFirst({
    where: {
      id: childId,
      parentId: session.user.id,
    },
  })

  if (!child) {
    redirect('/parent/dashboard')
  }

  return { child, parentId: session.user.id }
}

/**
 * Calculate consecutive days streak from sessions
 */
export function calculateStreak(sessions: { createdAt: Date }[]): number {
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
