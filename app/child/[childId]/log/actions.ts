'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'

export async function saveSession(
  childId: string,
  data: {
    activityType?: string
    effortLevel: number
    mood: string
    duration: number
    win?: string
    focus?: string
  }
) {
  // Verify ownership
  await verifyChildOwnership(childId)

  // Create session log
  const session = await prisma.sessionLog.create({
    data: {
      childId,
      activityType: data.activityType || 'Training',
      effortLevel: data.effortLevel,
      mood: data.mood,
      duration: data.duration,
      win: data.win || null,
      focus: data.focus || null,
    },
  })

  revalidatePath(`/child/${childId}/home`)
  revalidatePath(`/child/${childId}/progress`)

  return { success: true, sessionId: session.id }
}
