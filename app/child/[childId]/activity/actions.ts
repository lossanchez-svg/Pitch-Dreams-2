'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'

export type ActivityType =
  | 'SELF_TRAINING'
  | 'COACH_1ON1'
  | 'TEAM_TRAINING'
  | 'FACILITY_CLASS'
  | 'OFFICIAL_GAME'
  | 'FUTSAL_GAME'
  | 'INDOOR_LEAGUE_GAME'

export type GameIQImpact = 'LOW' | 'MEDIUM' | 'HIGH'

interface CreateActivityInput {
  activityType: ActivityType
  durationMinutes: number
  locationName?: string
  opponentName?: string
  intensityRPE?: number
  gameIQImpact: GameIQImpact
  notes?: string
  facilityId?: string
  coachId?: string
  focusTagIds: string[]
  highlightIds: string[]
  nextFocusIds: string[]
}

export async function createActivity(childId: string, input: CreateActivityInput) {
  try {
    // Verify ownership
    await verifyChildOwnership(childId)

    // Create the activity
    const activity = await prisma.activity.create({
      data: {
        childId,
        activityType: input.activityType,
        durationMinutes: input.durationMinutes,
        locationName: input.locationName,
        opponentName: input.opponentName,
        intensityRPE: input.intensityRPE,
        gameIQImpact: input.gameIQImpact,
        notes: input.notes,
        facilityId: input.facilityId,
        coachId: input.coachId,
        // Create focus tag relations
        focusTags: {
          create: input.focusTagIds.map(focusTagId => ({
            focusTagId,
          })),
        },
        // Create highlight relations
        highlights: {
          create: input.highlightIds.map(highlightId => ({
            highlightId,
          })),
        },
        // Create next focus relations
        nextFocus: {
          create: input.nextFocusIds.map(nextFocusId => ({
            nextFocusId,
          })),
        },
      },
    })

    // Revalidate relevant paths
    revalidatePath(`/child/${childId}/home`)
    revalidatePath(`/child/${childId}/progress`)
    revalidatePath(`/parent/dashboard`)

    return { success: true, activityId: activity.id }
  } catch (error) {
    console.error('Failed to create activity:', error)
    return { success: false, error: 'Failed to log activity' }
  }
}

export async function getFacilities() {
  try {
    const facilities = await prisma.facility.findMany({
      orderBy: { name: 'asc' },
    })
    return facilities
  } catch (error) {
    console.error('Failed to fetch facilities:', error)
    return []
  }
}

export async function getFocusTags() {
  try {
    const tags = await prisma.focusTag.findMany({
      orderBy: [{ category: 'asc' }, { label: 'asc' }],
    })
    return tags
  } catch (error) {
    console.error('Failed to fetch focus tags:', error)
    return []
  }
}

export async function getHighlightChips() {
  try {
    const chips = await prisma.highlightChip.findMany({
      orderBy: { label: 'asc' },
    })
    return chips
  } catch (error) {
    console.error('Failed to fetch highlight chips:', error)
    return []
  }
}

export async function getNextFocusChips() {
  try {
    const chips = await prisma.nextFocusChip.findMany({
      orderBy: { label: 'asc' },
    })
    return chips
  } catch (error) {
    console.error('Failed to fetch next focus chips:', error)
    return []
  }
}

export async function getRecentActivities(childId: string, limit = 10) {
  try {
    await verifyChildOwnership(childId)

    const activities = await prisma.activity.findMany({
      where: { childId },
      orderBy: { startAt: 'desc' },
      take: limit,
      include: {
        facility: true,
        coach: true,
        focusTags: {
          include: { focusTag: true },
        },
        highlights: {
          include: { highlight: true },
        },
        nextFocus: {
          include: { nextFocus: true },
        },
      },
    })

    return activities
  } catch (error) {
    console.error('Failed to fetch recent activities:', error)
    return []
  }
}
