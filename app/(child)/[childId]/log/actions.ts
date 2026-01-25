'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'

export async function saveSession(
  childId: string,
  data: {
    drillId?: string
    rpe: number
    mood: 'great' | 'good' | 'okay' | 'tired' | 'off'
    duration: number
    reps?: number
    wins: string[]
    focusAreas: string[]
  }
) {
  // Verify ownership
  await verifyChildOwnership(childId)

  // Create session
  const session = await prisma.session.create({
    data: {
      childId,
      drillId: data.drillId || null,
      rpe: data.rpe,
      mood: data.mood,
      duration: data.duration,
      reps: data.reps || null,
      sessionWins: {
        create: data.wins.map(win => ({ win })),
      },
      sessionFocusAreas: {
        create: data.focusAreas.map(focusArea => ({ focusArea })),
      },
    },
  })

  revalidatePath(`/child/${childId}/home`)
  revalidatePath(`/child/${childId}/progress`)

  return { success: true, sessionId: session.id }
}
