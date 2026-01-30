import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { TrainingSessionContent } from './TrainingSessionContent'

interface TrainingPageProps {
  params: {
    childId: string
  }
}

export default async function ChildTrainingPage({ params }: TrainingPageProps) {
  // Verify ownership
  const { child } = await verifyChildOwnership(params.childId)

  // Fetch drills appropriate for child's age
  const drills = await prisma.drill.findMany({
    where: {
      ageMin: { lte: child.age },
      ageMax: { gte: child.age },
    },
    select: {
      id: true,
      name: true,
      category: true,
      description: true,
      duration: true,
      reps: true,
      coachTip: true,
      difficulty: true,
    },
    orderBy: [
      { difficulty: 'asc' },
      { category: 'asc' },
    ],
  })

  // Group drills by category for session planning
  const drillsByCategory = drills.reduce((acc, drill) => {
    if (!acc[drill.category]) {
      acc[drill.category] = []
    }
    acc[drill.category].push(drill)
    return acc
  }, {} as Record<string, typeof drills>)

  // Create a default session plan (one drill from each category)
  const categories = Object.keys(drillsByCategory)
  const defaultSessionDrills = categories.slice(0, 5).map(category => {
    const categoryDrills = drillsByCategory[category]
    // Pick a random drill from each category
    return categoryDrills[Math.floor(Math.random() * categoryDrills.length)]
  })

  return (
    <TrainingSessionContent
      childId={params.childId}
      drills={defaultSessionDrills}
      allDrills={drills}
    />
  )
}
