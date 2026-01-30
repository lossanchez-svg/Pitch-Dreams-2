'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'

interface TrainingSessionData {
  sessionType: string
  duration: number // in minutes
  drillIds: string[]
  totalReps: number
}

export async function saveTrainingSession(
  childId: string,
  data: TrainingSessionData
) {
  // Verify ownership
  await verifyChildOwnership(childId)

  // Create session log with training details
  const session = await prisma.sessionLog.create({
    data: {
      childId,
      activityType: `Training - ${data.sessionType}`,
      duration: data.duration,
      // Store drill IDs and rep count in win/focus fields for now
      // In a more complete implementation, you'd have a separate table
      win: `Completed ${data.drillIds.length} drills`,
      focus: `Total reps: ${data.totalReps}`,
      // Default values - will be updated when user logs mood/effort
      effortLevel: 5,
      mood: 'focused',
    },
  })

  // Revalidate relevant paths
  revalidatePath(`/child/${childId}/home`)
  revalidatePath(`/child/${childId}/progress`)

  return { success: true, sessionId: session.id }
}
