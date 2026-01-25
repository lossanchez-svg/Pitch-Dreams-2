import { prisma } from '@/lib/db'
import { verifyChildOwnership, calculateStreak } from '@/lib/child-helpers'
import { ChildHomeContent } from '@/components/pitchdreams/ChildHomeContent'

interface ChildHomePageProps {
  params: {
    childId: string
  }
}

export default async function ChildHomePage({ params }: ChildHomePageProps) {
  // Verify ownership and get child data
  await verifyChildOwnership(params.childId)

  // Fetch sessions for streak calculation
  const sessions = await prisma.session.findMany({
    where: { childId: params.childId },
    orderBy: { createdAt: 'desc' },
    select: {
      createdAt: true,
    },
  })

  const currentStreak = calculateStreak(sessions)

  // Fetch suggested drills based on child's level
  // For now, get random drills - could be enhanced with recommendation logic
  const suggestedDrills = await prisma.drill.findMany({
    take: 4,
    where: {
      difficulty: {
        in: ['beginner', 'intermediate'],
      },
    },
    select: {
      id: true,
      title: true,
      category: true,
      difficulty: true,
      timeMinutes: true,
    },
  })

  const drillsData = suggestedDrills.map(drill => ({
    id: drill.id,
    title: drill.title,
    category: drill.category,
    difficulty: drill.difficulty as 'beginner' | 'intermediate' | 'advanced',
    duration: drill.timeMinutes,
  }))

  return (
    <ChildHomeContent
      childId={params.childId}
      currentStreak={currentStreak}
      suggestedDrills={drillsData}
    />
  )
}
