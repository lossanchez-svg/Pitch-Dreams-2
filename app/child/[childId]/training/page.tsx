import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { TrainingSessionContent } from './TrainingSessionContent'
import { trainingArcs, type ArcId } from '@/lib/arcs/definitions'

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

  // Fetch active arc state
  const activeArcState = await prisma.trainingArcState.findFirst({
    where: {
      childId: params.childId,
      status: 'ACTIVE',
    },
  })

  // Get arc definition if active
  const activeArc = activeArcState && trainingArcs[activeArcState.arcId as ArcId]
    ? {
        id: activeArcState.id,
        arcId: activeArcState.arcId as ArcId,
        dayIndex: activeArcState.dayIndex,
        sessionsCompleted: activeArcState.sessionsCompleted,
        definition: trainingArcs[activeArcState.arcId as ArcId],
      }
    : null

  // Get arc suggestion if no active arc
  let arcSuggestion = null
  if (!activeArc) {
    // Get completed arc IDs
    const completedArcs = await prisma.trainingArcState.findMany({
      where: {
        childId: params.childId,
        status: 'COMPLETED',
      },
      select: { arcId: true },
    })
    const completedArcIds = completedArcs.map((a: { arcId: string }) => a.arcId as ArcId)

    // Simple suggestion: next uncompleted arc
    const defaultOrder: ArcId[] = ['vision', 'tempo', 'decision_chain']
    const nextArcId = defaultOrder.find(id => !completedArcIds.includes(id)) || defaultOrder[0]

    arcSuggestion = {
      arcId: nextArcId,
      reason: completedArcIds.length === 0
        ? 'Start your first training arc!'
        : 'Ready for your next challenge?',
      definition: trainingArcs[nextArcId],
    }
  }

  // Group drills by category for session planning
  type DrillType = typeof drills[number]
  const drillsByCategory = drills.reduce((acc: Record<string, DrillType[]>, drill: DrillType) => {
    if (!acc[drill.category]) {
      acc[drill.category] = []
    }
    acc[drill.category].push(drill)
    return acc
  }, {} as Record<string, DrillType[]>)

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
      activeArc={activeArc}
      arcSuggestion={arcSuggestion}
    />
  )
}
