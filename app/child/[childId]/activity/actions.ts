'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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
export type ProgramType = 'TEAM' | 'FUTSAL' | 'INDOOR' | 'CLASS' | 'OTHER'
// MVP: All facilities are MANUAL. Future: add FacilitySource when Places API is enabled.

interface CreateActivityInput {
  activityType: ActivityType
  durationMinutes: number
  locationName?: string
  opponentName?: string
  intensityRPE?: number
  gameIQImpact: GameIQImpact
  notes?: string
  // Stable references (when using saved items)
  facilityId?: string
  coachId?: string
  programId?: string
  // Freeform fallbacks (when typing manually without saving)
  facilityNameFreeform?: string
  facilityMapsUrlFreeform?: string  // User-provided Maps URL for one-off entries
  coachNameFreeform?: string
  programNameFreeform?: string
  // Tags
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
        // Stable references
        facilityId: input.facilityId,
        coachId: input.coachId,
        programId: input.programId,
        // Freeform fallbacks
        facilityNameFreeform: input.facilityNameFreeform,
        facilityMapsUrlFreeform: input.facilityMapsUrlFreeform,
        coachNameFreeform: input.coachNameFreeform,
        programNameFreeform: input.programNameFreeform,
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

    // Update lastUsed timestamps for selected items
    if (input.facilityId) {
      await prisma.facility.update({
        where: { id: input.facilityId },
        data: { lastUsed: new Date() },
      })
    }
    if (input.coachId) {
      await prisma.coach.update({
        where: { id: input.coachId },
        data: { lastUsed: new Date() },
      })
    }
    if (input.programId) {
      await prisma.program.update({
        where: { id: input.programId },
        data: { lastUsed: new Date() },
      })
    }

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

// ============================================
// FACILITY ACTIONS
// ============================================

// MVP: Simplified facility - all manual, no Google verification
interface CreateFacilityInput {
  name: string
  city?: string | null
  mapsUrl?: string | null  // User-provided, not verified
  isSaved?: boolean
}

export async function createFacility(input: CreateFacilityInput) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { success: false, error: 'Not authenticated' }
    }

    const facility = await prisma.facility.create({
      data: {
        parentId: session.user.id,
        name: input.name,
        city: input.city,
        mapsUrl: input.mapsUrl,
        isSaved: input.isSaved ?? true,  // Default to saved
        lastUsed: new Date(),
      },
    })

    return { success: true, facility }
  } catch (error) {
    console.error('Failed to create facility:', error)
    return { success: false, error: 'Failed to create facility' }
  }
}

export async function getSavedFacilities() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return []

    const facilities = await prisma.facility.findMany({
      where: {
        parentId: session.user.id,
        isSaved: true,
      },
      orderBy: { name: 'asc' },
    })

    return facilities
  } catch (error) {
    console.error('Failed to fetch saved facilities:', error)
    return []
  }
}

export async function getRecentFacilities(limit = 5) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return []

    const facilities = await prisma.facility.findMany({
      where: {
        parentId: session.user.id,
        lastUsed: { not: null },
      },
      orderBy: { lastUsed: 'desc' },
      take: limit,
    })

    return facilities
  } catch (error) {
    console.error('Failed to fetch recent facilities:', error)
    return []
  }
}

// ============================================
// COACH ACTIONS
// ============================================

interface CreateCoachInput {
  displayName: string
  isSaved?: boolean
}

export async function createCoach(input: CreateCoachInput) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { success: false, error: 'Not authenticated' }
    }

    const coach = await prisma.coach.create({
      data: {
        parentId: session.user.id,
        displayName: input.displayName,
        isSaved: input.isSaved || false,
        lastUsed: new Date(),
      },
    })

    return { success: true, coach }
  } catch (error) {
    console.error('Failed to create coach:', error)
    return { success: false, error: 'Failed to create coach' }
  }
}

export async function getSavedCoaches() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return []

    const coaches = await prisma.coach.findMany({
      where: {
        parentId: session.user.id,
        isSaved: true,
      },
      orderBy: { displayName: 'asc' },
    })

    return coaches
  } catch (error) {
    console.error('Failed to fetch saved coaches:', error)
    return []
  }
}

export async function getRecentCoaches(limit = 5) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return []

    const coaches = await prisma.coach.findMany({
      where: {
        parentId: session.user.id,
        lastUsed: { not: null },
      },
      orderBy: { lastUsed: 'desc' },
      take: limit,
    })

    return coaches
  } catch (error) {
    console.error('Failed to fetch recent coaches:', error)
    return []
  }
}

// ============================================
// PROGRAM ACTIONS
// ============================================

interface CreateProgramInput {
  name: string
  type: ProgramType
  isSaved?: boolean
}

export async function createProgram(input: CreateProgramInput) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return { success: false, error: 'Not authenticated' }
    }

    const program = await prisma.program.create({
      data: {
        parentId: session.user.id,
        name: input.name,
        type: input.type,
        isSaved: input.isSaved || false,
        lastUsed: new Date(),
      },
    })

    return { success: true, program }
  } catch (error) {
    console.error('Failed to create program:', error)
    return { success: false, error: 'Failed to create program' }
  }
}

export async function getSavedPrograms() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return []

    const programs = await prisma.program.findMany({
      where: {
        parentId: session.user.id,
        isSaved: true,
      },
      orderBy: { name: 'asc' },
    })

    return programs
  } catch (error) {
    console.error('Failed to fetch saved programs:', error)
    return []
  }
}

export async function getRecentPrograms(limit = 5) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return []

    const programs = await prisma.program.findMany({
      where: {
        parentId: session.user.id,
        lastUsed: { not: null },
      },
      orderBy: { lastUsed: 'desc' },
      take: limit,
    })

    return programs
  } catch (error) {
    console.error('Failed to fetch recent programs:', error)
    return []
  }
}

// ============================================
// EXISTING ACTIONS (unchanged)
// ============================================

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
        program: true,
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
