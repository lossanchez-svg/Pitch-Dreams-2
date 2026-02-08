/**
 * Arc Selection and Progression Logic
 *
 * Handles:
 * - Starting a new arc
 * - Progressing through an arc (day advancement)
 * - Pausing and resuming arcs
 * - Completing arcs
 *
 * Principles:
 * - Only one active arc per child at a time
 * - Recovery days count toward arc continuity
 * - No auto-switch mid-arc without explanation
 * - No shame for pausing
 */

import { type ArcId, trainingArcs, getDefaultArcOrder } from './definitions'
import { type SessionMode } from '@/lib/session-mode'

// ===========================================
// TYPES
// ===========================================

export type ArcStatus = 'inactive' | 'active' | 'paused' | 'completed'

export interface ArcStateData {
  id: string
  childId: string
  arcId: ArcId
  status: ArcStatus
  startDate: Date | null
  dayIndex: number
  pauseReason: string | null
  pausedAt: Date | null
  completedAt: Date | null
  sessionsCompleted: number
}

export interface ArcProgressionResult {
  newDayIndex: number
  isComplete: boolean
  completionMessage: string | null
}

export interface ArcStartResult {
  success: boolean
  message: string
  arcId: ArcId
}

// ===========================================
// ARC LIFECYCLE
// ===========================================

/**
 * Determine if an arc should be started.
 * Called when no arc is active and the child is about to train.
 */
export function shouldStartArc(
  hasActiveArc: boolean,
  sessionsLast14Days: number,
  completedArcIds: ArcId[],
  avgQualityRating: number | null
): { recommend: boolean; arcId: ArcId | null; reason: string } {
  // Don't recommend if already has active arc
  if (hasActiveArc) {
    return { recommend: false, arcId: null, reason: '' }
  }

  // Trigger 1: Low activity (need motivation boost)
  if (sessionsLast14Days < 3) {
    const nextArc = getNextUncompletedArc(completedArcIds)
    return {
      recommend: true,
      arcId: nextArc,
      reason: "Let's build momentum with a focused training arc!",
    }
  }

  // Trigger 2: Declining quality (need structure)
  if (avgQualityRating !== null && avgQualityRating < 3) {
    return {
      recommend: true,
      arcId: 'tempo',  // Tempo arc helps with control and quality
      reason: 'A focused arc can help bring structure back to your training.',
    }
  }

  // Trigger 3: Natural progression after completing an arc
  if (completedArcIds.length > 0) {
    const nextArc = getNextUncompletedArc(completedArcIds)
    if (nextArc && !completedArcIds.includes(nextArc)) {
      return {
        recommend: true,
        arcId: nextArc,
        reason: 'Ready for your next challenge?',
      }
    }
  }

  return { recommend: false, arcId: null, reason: '' }
}

/**
 * Get the next arc in the progression order that hasn't been completed.
 */
function getNextUncompletedArc(completedArcIds: ArcId[]): ArcId {
  const order = getDefaultArcOrder()
  for (const arcId of order) {
    if (!completedArcIds.includes(arcId)) {
      return arcId
    }
  }
  // All completed - cycle back to the first one
  return order[0]
}

/**
 * Calculate arc progression after a session.
 * Recovery days still count toward arc continuity.
 */
export function calculateArcProgression(
  currentState: ArcStateData,
  sessionMode: SessionMode,
  sessionCompleted: boolean
): ArcProgressionResult {
  const arc = trainingArcs[currentState.arcId]
  if (!arc) {
    return {
      newDayIndex: currentState.dayIndex,
      isComplete: false,
      completionMessage: null,
    }
  }

  // If session wasn't completed, don't progress
  if (!sessionCompleted) {
    return {
      newDayIndex: currentState.dayIndex,
      isComplete: false,
      completionMessage: null,
    }
  }

  // Progress to next day
  const newDayIndex = currentState.dayIndex + 1
  const totalDays = arc.recommendedDurationDays

  // Check if arc is complete
  if (newDayIndex >= totalDays) {
    return {
      newDayIndex,
      isComplete: true,
      completionMessage: arc.completionMessage,
    }
  }

  return {
    newDayIndex,
    isComplete: false,
    completionMessage: null,
  }
}

/**
 * Get pause reason options (predefined safe messages).
 */
export function getPauseReasonOptions(): { key: string; label: string }[] {
  return [
    { key: 'busy', label: 'Life got busy' },
    { key: 'break', label: 'Taking a break' },
    { key: 'injury', label: 'Injury/recovery' },
    { key: 'travel', label: 'Traveling' },
    { key: 'other', label: 'Other' },
  ]
}

/**
 * Validate if an arc can be started.
 */
export function validateArcStart(
  arcId: ArcId,
  hasActiveArc: boolean
): { valid: boolean; error: string | null } {
  if (hasActiveArc) {
    return {
      valid: false,
      error: 'You already have an active arc. Complete or pause it first.',
    }
  }

  if (!trainingArcs[arcId]) {
    return {
      valid: false,
      error: 'Invalid arc ID.',
    }
  }

  return { valid: true, error: null }
}

// ===========================================
// ARC STATUS DISPLAY
// ===========================================

/**
 * Get display info for arc status.
 */
export function getArcStatusDisplay(status: ArcStatus): {
  label: string
  color: string
  icon: string
} {
  switch (status) {
    case 'inactive':
      return { label: 'Not Started', color: 'text-gray-400', icon: '⚪' }
    case 'active':
      return { label: 'In Progress', color: 'text-green-400', icon: '🟢' }
    case 'paused':
      return { label: 'Paused', color: 'text-yellow-400', icon: '⏸️' }
    case 'completed':
      return { label: 'Completed', color: 'text-purple-400', icon: '✅' }
  }
}

/**
 * Get progress percentage for an arc.
 */
export function getArcProgressPercent(
  dayIndex: number,
  arcId: ArcId
): number {
  const arc = trainingArcs[arcId]
  if (!arc) return 0

  return Math.round((dayIndex / arc.recommendedDurationDays) * 100)
}

/**
 * Get motivational message based on arc progress.
 */
export function getArcProgressMessage(
  dayIndex: number,
  arcId: ArcId
): string {
  const arc = trainingArcs[arcId]
  if (!arc) return ''

  const totalDays = arc.recommendedDurationDays
  const percent = getArcProgressPercent(dayIndex, arcId)

  if (dayIndex === 0) {
    return "Let's go! Your arc begins today."
  }

  if (percent >= 75) {
    return "Almost there! The finish line is in sight."
  }

  if (percent >= 50) {
    return "Halfway done. You're building something real."
  }

  if (percent >= 25) {
    return "Great start. Keep the momentum going."
  }

  return `Day ${dayIndex + 1} of ${totalDays}. Every session counts.`
}

// ===========================================
// RECOVERY MODE HANDLING
// ===========================================

/**
 * Get arc-specific content for recovery mode.
 * Recovery days still engage with the arc theme, just lighter.
 */
export function getRecoveryModeArcContent(arcId: ArcId): {
  focusMessage: string
  suggestedActivity: string
} {
  const arc = trainingArcs[arcId]
  if (!arc) {
    return {
      focusMessage: 'Rest and recover.',
      suggestedActivity: 'Light mental work',
    }
  }

  switch (arcId) {
    case 'vision':
      return {
        focusMessage: 'Recovery day for Vision Arc',
        suggestedActivity: 'Watch a match clip and count how many times players scan before receiving.',
      }
    case 'tempo':
      return {
        focusMessage: 'Recovery day for Tempo Arc',
        suggestedActivity: 'Practice breathing exercises or visualize controlling the rhythm of play.',
      }
    case 'decision_chain':
      return {
        focusMessage: 'Recovery day for Decision Chain Arc',
        suggestedActivity: 'Watch highlights and pause before each play - what would you do next?',
      }
  }
}
