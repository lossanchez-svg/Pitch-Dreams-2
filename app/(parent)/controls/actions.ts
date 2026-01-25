'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateChildPermissions(
  childId: string,
  permissions: {
    freeTextEnabled: boolean
    challengesEnabled: boolean
  }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // Verify parent owns this child
  const child = await prisma.child.findFirst({
    where: {
      id: childId,
      parentId: session.user.id,
    },
  })

  if (!child) {
    throw new Error('Child not found or access denied')
  }

  // Update permissions
  await prisma.child.update({
    where: { id: childId },
    data: {
      freeTextEnabled: permissions.freeTextEnabled,
      challengesEnabled: permissions.challengesEnabled,
    },
  })

  revalidatePath(`/parent/controls`)
  return { success: true }
}

export async function exportChildData(childId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // Verify parent owns this child
  const child = await prisma.child.findFirst({
    where: {
      id: childId,
      parentId: session.user.id,
    },
    include: {
      sessions: {
        include: {
          drill: true,
          sessionWins: true,
          sessionFocusAreas: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!child) {
    throw new Error('Child not found or access denied')
  }

  // Return data as JSON
  return {
    child: {
      nickname: child.nickname,
      age: child.age,
      position: child.position,
      createdAt: child.createdAt,
    },
    sessions: child.sessions.map(s => ({
      date: s.createdAt,
      drillTitle: s.drill?.title,
      rpe: s.rpe,
      mood: s.mood,
      duration: s.duration,
      reps: s.reps,
      wins: s.sessionWins.map(w => w.win),
      focusAreas: s.sessionFocusAreas.map(f => f.focusArea),
    })),
    exportedAt: new Date().toISOString(),
  }
}

export async function deleteChildAccount(childId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // Verify parent owns this child
  const child = await prisma.child.findFirst({
    where: {
      id: childId,
      parentId: session.user.id,
    },
  })

  if (!child) {
    throw new Error('Child not found or access denied')
  }

  // Delete child (cascade will handle related records)
  await prisma.child.delete({
    where: { id: childId },
  })

  revalidatePath('/parent/dashboard')
  return { success: true }
}
