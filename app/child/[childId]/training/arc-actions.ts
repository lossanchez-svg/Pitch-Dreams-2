'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'
import { type ArcId, trainingArcs } from '@/lib/arcs/definitions'
import { calculateArcProgression, type ArcStatus } from '@/lib/arcs/progression'
import { type SessionMode } from '@/lib/session-mode'

// Local type for arc state records
interface ArcStateRecord {
  id: string
  childId: string
  arcId: string
  status: string
  startDate: Date | null
  dayIndex: number
  pauseReason: string | null
  pausedAt: Date | null
  completedAt: Date | null
  sessionsCompleted: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Get the active training arc for a child
 */
export async function getActiveArc(childId: string) {
  await verifyChildOwnership(childId)

  const arcState = await prisma.trainingArcState.findFirst({
    where: {
      childId,
      status: 'ACTIVE',
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!arcState) {
    return { success: true, arc: null }
  }

  const arcDef = trainingArcs[arcState.arcId as ArcId]
  if (!arcDef) {
    return { success: true, arc: null }
  }

  return {
    success: true,
    arc: {
      id: arcState.id,
      arcId: arcState.arcId as ArcId,
      status: arcState.status.toLowerCase() as ArcStatus,
      dayIndex: arcState.dayIndex,
      sessionsCompleted: arcState.sessionsCompleted,
      startDate: arcState.startDate,
      definition: arcDef,
    },
  }
}

/**
 * Get all arcs for a child (including completed ones)
 */
export async function getChildArcs(childId: string) {
  await verifyChildOwnership(childId)

  const arcStates = await prisma.trainingArcState.findMany({
    where: { childId },
    orderBy: { createdAt: 'desc' },
  })

  return {
    success: true,
    arcs: arcStates.map((state: ArcStateRecord) => ({
      id: state.id,
      arcId: state.arcId as ArcId,
      status: state.status.toLowerCase() as ArcStatus,
      dayIndex: state.dayIndex,
      sessionsCompleted: state.sessionsCompleted,
      startDate: state.startDate,
      completedAt: state.completedAt,
      definition: trainingArcs[state.arcId as ArcId],
    })),
  }
}

/**
 * Start a new training arc
 */
export async function startArc(childId: string, arcId: ArcId) {
  await verifyChildOwnership(childId)

  // Check if there's already an active arc
  const existingActive = await prisma.trainingArcState.findFirst({
    where: {
      childId,
      status: 'ACTIVE',
    },
  })

  if (existingActive) {
    return {
      success: false,
      error: 'You already have an active arc. Complete or pause it first.',
    }
  }

  // Validate arc ID
  if (!trainingArcs[arcId]) {
    return {
      success: false,
      error: 'Invalid arc ID.',
    }
  }

  // Create the arc state
  const arcState = await prisma.trainingArcState.create({
    data: {
      childId,
      arcId,
      status: 'ACTIVE',
      startDate: new Date(),
      dayIndex: 0,
      sessionsCompleted: 0,
    },
  })

  revalidatePath(`/child/${childId}`)

  return {
    success: true,
    arc: {
      id: arcState.id,
      arcId: arcState.arcId as ArcId,
      status: 'active' as ArcStatus,
      dayIndex: 0,
      sessionsCompleted: 0,
      definition: trainingArcs[arcId],
    },
  }
}

/**
 * Pause an active arc
 */
export async function pauseArc(childId: string, arcStateId: string, reason?: string) {
  await verifyChildOwnership(childId)

  const arcState = await prisma.trainingArcState.findFirst({
    where: {
      id: arcStateId,
      childId,
      status: 'ACTIVE',
    },
  })

  if (!arcState) {
    return {
      success: false,
      error: 'No active arc found to pause.',
    }
  }

  await prisma.trainingArcState.update({
    where: { id: arcStateId },
    data: {
      status: 'PAUSED',
      pauseReason: reason || null,
      pausedAt: new Date(),
    },
  })

  revalidatePath(`/child/${childId}`)

  return { success: true }
}

/**
 * Resume a paused arc
 */
export async function resumeArc(childId: string, arcStateId: string) {
  await verifyChildOwnership(childId)

  // Check if there's already an active arc
  const existingActive = await prisma.trainingArcState.findFirst({
    where: {
      childId,
      status: 'ACTIVE',
    },
  })

  if (existingActive) {
    return {
      success: false,
      error: 'You already have an active arc.',
    }
  }

  const arcState = await prisma.trainingArcState.findFirst({
    where: {
      id: arcStateId,
      childId,
      status: 'PAUSED',
    },
  })

  if (!arcState) {
    return {
      success: false,
      error: 'No paused arc found to resume.',
    }
  }

  await prisma.trainingArcState.update({
    where: { id: arcStateId },
    data: {
      status: 'ACTIVE',
      pauseReason: null,
      pausedAt: null,
    },
  })

  revalidatePath(`/child/${childId}`)

  return { success: true }
}

/**
 * Update arc progress after a session
 */
export async function updateArcProgress(
  childId: string,
  sessionMode: SessionMode,
  sessionCompleted: boolean
) {
  await verifyChildOwnership(childId)

  const arcState = await prisma.trainingArcState.findFirst({
    where: {
      childId,
      status: 'ACTIVE',
    },
  })

  if (!arcState) {
    return { success: true, arcCompleted: false }
  }

  // Calculate progression
  const progression = calculateArcProgression(
    {
      id: arcState.id,
      childId: arcState.childId,
      arcId: arcState.arcId as ArcId,
      status: 'active',
      startDate: arcState.startDate,
      dayIndex: arcState.dayIndex,
      pauseReason: arcState.pauseReason,
      pausedAt: arcState.pausedAt,
      completedAt: arcState.completedAt,
      sessionsCompleted: arcState.sessionsCompleted,
    },
    sessionMode,
    sessionCompleted
  )

  // Update the arc state
  if (progression.isComplete) {
    await prisma.trainingArcState.update({
      where: { id: arcState.id },
      data: {
        status: 'COMPLETED',
        dayIndex: progression.newDayIndex,
        sessionsCompleted: arcState.sessionsCompleted + (sessionCompleted ? 1 : 0),
        completedAt: new Date(),
      },
    })

    revalidatePath(`/child/${childId}`)

    return {
      success: true,
      arcCompleted: true,
      completionMessage: progression.completionMessage,
      arcId: arcState.arcId as ArcId,
    }
  }

  // Just update progress
  await prisma.trainingArcState.update({
    where: { id: arcState.id },
    data: {
      dayIndex: progression.newDayIndex,
      sessionsCompleted: arcState.sessionsCompleted + (sessionCompleted ? 1 : 0),
    },
  })

  revalidatePath(`/child/${childId}`)

  return { success: true, arcCompleted: false }
}

/**
 * Get completed arc IDs for a child
 */
export async function getCompletedArcIds(childId: string): Promise<ArcId[]> {
  await verifyChildOwnership(childId)

  const completed = await prisma.trainingArcState.findMany({
    where: {
      childId,
      status: 'COMPLETED',
    },
    select: { arcId: true },
  })

  return completed.map((c: { arcId: string }) => c.arcId as ArcId)
}

/**
 * Get arc suggestion for a child without an active arc
 */
export async function getArcSuggestion(childId: string) {
  await verifyChildOwnership(childId)

  // Check if already has an active arc
  const hasActive = await prisma.trainingArcState.findFirst({
    where: {
      childId,
      status: 'ACTIVE',
    },
  })

  if (hasActive) {
    return { success: true, suggestion: null }
  }

  // Get completed arcs
  const completedArcIds = await getCompletedArcIds(childId)

  // Get recent check-ins for trend analysis
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  const recentCheckIns = await prisma.checkIn.findMany({
    where: {
      childId,
      createdAt: { gte: twoWeeksAgo },
      completed: true,
    },
  })

  const sessionsLast14Days = recentCheckIns.length

  // Get average quality
  const withRatings = recentCheckIns.filter((c: { qualityRating: number | null }) => c.qualityRating !== null)
  const avgQuality = withRatings.length > 0
    ? withRatings.reduce((sum: number, c: { qualityRating: number | null }) => sum + (c.qualityRating || 0), 0) / withRatings.length
    : null

  // Determine suggestion
  const defaultOrder: ArcId[] = ['vision', 'tempo', 'decision_chain']

  // Find next uncompleted arc
  let suggestedArcId: ArcId | null = null
  for (const arcId of defaultOrder) {
    if (!completedArcIds.includes(arcId)) {
      suggestedArcId = arcId
      break
    }
  }

  // If all completed, suggest cycling back
  if (!suggestedArcId) {
    suggestedArcId = defaultOrder[0]
  }

  // Determine reason
  let reason = ''
  if (sessionsLast14Days < 3) {
    reason = "Let's build momentum with a focused training arc!"
  } else if (avgQuality !== null && avgQuality < 3) {
    reason = 'A focused arc can help bring structure back to your training.'
    suggestedArcId = 'tempo'  // Tempo arc helps with quality
  } else if (completedArcIds.length > 0) {
    reason = 'Ready for your next challenge?'
  } else {
    reason = 'Start your first training arc!'
  }

  return {
    success: true,
    suggestion: {
      arcId: suggestedArcId,
      reason,
      definition: trainingArcs[suggestedArcId],
    },
  }
}
