'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'
import {
  calculateSessionMode,
  type CheckInData,
  type SessionMode,
  type Soreness,
  type MoodEmoji,
} from '@/lib/session-mode'

export type { SessionMode, Soreness, MoodEmoji }

interface CreateCheckInInput {
  energy: number
  soreness: Soreness
  focus: number
  mood: MoodEmoji
  timeAvail: number
  painFlag: boolean
}

export async function createCheckIn(childId: string, input: CreateCheckInInput) {
  try {
    await verifyChildOwnership(childId)

    // Calculate the session mode
    const checkInData: CheckInData = {
      energy: input.energy,
      soreness: input.soreness,
      focus: input.focus,
      mood: input.mood,
      timeAvail: input.timeAvail,
      painFlag: input.painFlag,
    }

    const modeResult = calculateSessionMode(checkInData)

    // Create the check-in record
    const checkIn = await prisma.checkIn.create({
      data: {
        childId,
        energy: input.energy,
        soreness: input.soreness,
        focus: input.focus,
        mood: input.mood,
        timeAvail: input.timeAvail,
        painFlag: input.painFlag,
        mode: modeResult.mode,
        modeExplanation: modeResult.explanation,
      },
    })

    revalidatePath(`/child/${childId}/training`)

    return {
      success: true,
      checkIn,
      modeResult,
    }
  } catch (error) {
    console.error('Failed to create check-in:', error)
    return { success: false, error: 'Failed to create check-in' }
  }
}

export async function updateCheckInQuality(
  checkInId: string,
  qualityRating: number,
  completed: boolean = true
) {
  try {
    const checkIn = await prisma.checkIn.update({
      where: { id: checkInId },
      data: {
        qualityRating,
        completed,
      },
    })

    return { success: true, checkIn }
  } catch (error) {
    console.error('Failed to update check-in quality:', error)
    return { success: false, error: 'Failed to update quality rating' }
  }
}

export async function linkCheckInToActivity(checkInId: string, activityId: string) {
  try {
    const checkIn = await prisma.checkIn.update({
      where: { id: checkInId },
      data: { activityId },
    })

    return { success: true, checkIn }
  } catch (error) {
    console.error('Failed to link check-in to activity:', error)
    return { success: false, error: 'Failed to link check-in' }
  }
}

export async function getRecentCheckIns(childId: string, limit = 10) {
  try {
    await verifyChildOwnership(childId)

    const checkIns = await prisma.checkIn.findMany({
      where: { childId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        activity: {
          select: {
            id: true,
            activityType: true,
            durationMinutes: true,
          },
        },
      },
    })

    return checkIns
  } catch (error) {
    console.error('Failed to fetch recent check-ins:', error)
    return []
  }
}

export async function getTodayCheckIn(childId: string) {
  try {
    await verifyChildOwnership(childId)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        childId,
        createdAt: { gte: today },
      },
      orderBy: { createdAt: 'desc' },
    })

    return checkIn
  } catch (error) {
    console.error('Failed to fetch today check-in:', error)
    return null
  }
}

// ============================================
// WEEKLY TREND CALCULATION
// ============================================

export interface WeeklyTrend {
  sessionsCount: number
  avgQualityRating: number | null
  completionRate: number
  hasPBMovement: boolean
  isLowEngagement: boolean
  weeksLowEngagement: number
}

export async function getWeeklyTrends(childId: string, weeksBack = 4): Promise<WeeklyTrend[]> {
  try {
    await verifyChildOwnership(childId)

    const trends: WeeklyTrend[] = []

    for (let week = 0; week < weeksBack; week++) {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - (week + 1) * 7)
      weekStart.setHours(0, 0, 0, 0)

      const weekEnd = new Date()
      weekEnd.setDate(weekEnd.getDate() - week * 7)
      weekEnd.setHours(23, 59, 59, 999)

      const checkIns = await prisma.checkIn.findMany({
        where: {
          childId,
          createdAt: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
      })

      const completedCheckIns = checkIns.filter(c => c.completed)
      const ratingsSum = completedCheckIns
        .filter(c => c.qualityRating !== null)
        .reduce((sum, c) => sum + (c.qualityRating || 0), 0)
      const ratingsCount = completedCheckIns.filter(c => c.qualityRating !== null).length

      // Check for PB movement (skill challenge attempts)
      const pbAttempts = await prisma.skillChallengeAttempt.findMany({
        where: {
          childId,
          createdAt: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
      })

      const hasPBMovement = pbAttempts.length > 0

      // Determine if this is a low engagement week
      const isLowEngagement = checkIns.length < 2 ||
        (ratingsCount > 0 && ratingsSum / ratingsCount < 3)

      trends.push({
        sessionsCount: checkIns.length,
        avgQualityRating: ratingsCount > 0 ? ratingsSum / ratingsCount : null,
        completionRate: checkIns.length > 0
          ? completedCheckIns.length / checkIns.length
          : 0,
        hasPBMovement,
        isLowEngagement,
        weeksLowEngagement: 0, // Will be calculated below
      })
    }

    // Calculate consecutive low engagement weeks
    let consecutiveLow = 0
    for (let i = 0; i < trends.length; i++) {
      if (trends[i].isLowEngagement) {
        consecutiveLow++
        trends[i].weeksLowEngagement = consecutiveLow
      } else {
        consecutiveLow = 0
        trends[i].weeksLowEngagement = 0
      }
    }

    return trends
  } catch (error) {
    console.error('Failed to calculate weekly trends:', error)
    return []
  }
}

// ============================================
// COACH NUDGE SYSTEM
// ============================================

export type NudgeType =
  | 'RESET_TARGET'
  | 'NEW_ARC'
  | 'MINI_QUEST'
  | 'EFFORT_PRAISE'

export interface CoachNudge {
  type: NudgeType
  title: string
  message: string
  actionLabel: string
  actionValue?: string
}

const nudgeMessages: Record<NudgeType, CoachNudge> = {
  RESET_TARGET: {
    type: 'RESET_TARGET',
    title: "Let's Start Small",
    message: "How about just 10 minutes today? Small steps build big skills.",
    actionLabel: 'Start 10-min session',
    actionValue: '10',
  },
  NEW_ARC: {
    type: 'NEW_ARC',
    title: 'New Focus: Game Vision',
    message: "Let's try something fresh. Vision + Decision Chain can level up your game sense.",
    actionLabel: 'Explore Game Vision',
  },
  MINI_QUEST: {
    type: 'MINI_QUEST',
    title: '3-Day Challenge',
    message: "Challenge yourself: 3 sessions in 3 days. Any length counts. You vs You.",
    actionLabel: 'Accept Challenge',
  },
  EFFORT_PRAISE: {
    type: 'EFFORT_PRAISE',
    title: 'Every Rep Counts',
    message: "Progress isn't always visible. The effort you put in today builds tomorrow's skills.",
    actionLabel: 'Keep Going',
  },
}

export async function getCoachNudge(childId: string): Promise<CoachNudge | null> {
  try {
    const trends = await getWeeklyTrends(childId, 3)

    if (trends.length < 2) return null

    // Check if we have 2+ weeks of low engagement
    const recentLowWeeks = trends.filter(t => t.isLowEngagement).length

    if (recentLowWeeks < 2) return null

    // No PB movement and low engagement = show nudge
    const hasRecentPB = trends.some(t => t.hasPBMovement)
    if (hasRecentPB) return null

    // Rotate through nudge types based on date to provide variety
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const nudgeTypes: NudgeType[] = ['RESET_TARGET', 'NEW_ARC', 'MINI_QUEST', 'EFFORT_PRAISE']
    const selectedType = nudgeTypes[dayOfYear % nudgeTypes.length]

    return nudgeMessages[selectedType]
  } catch (error) {
    console.error('Failed to get coach nudge:', error)
    return null
  }
}
