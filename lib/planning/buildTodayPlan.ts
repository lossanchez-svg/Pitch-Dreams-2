/**
 * Adaptive Plan Builder
 *
 * Single source of truth for building today's training plan.
 * Combines check-in data, active arc, and history to generate
 * a personalized, adaptive training session.
 *
 * Principles:
 * - Deterministic (no randomness, no ML)
 * - Safety first (recovery mode adapts content, doesn't skip it)
 * - Arc content is adapted, not skipped, during recovery
 * - No shame, no dark patterns
 */

import {
  type CheckInData,
  type SessionMode,
  type SessionModeResult,
  calculateSessionMode,
} from '@/lib/session-mode'
import {
  type ArcId,
  type TrainingArc,
  trainingArcs,
  getDefaultArcOrder,
} from '@/lib/arcs/definitions'
import {
  type SkillDrillConfig,
  skillDrillRegistry,
} from '@/lib/skills/registry'
import {
  type GameIQModule,
  gameIQRegistry,
} from '@/lib/gameiq/registry'

// ===========================================
// TYPES
// ===========================================

export interface ArcState {
  id: string
  arcId: ArcId
  status: 'inactive' | 'active' | 'paused' | 'completed'
  dayIndex: number
  sessionsCompleted: number
}

export interface RecentHistory {
  sessionsLast7Days: number
  sessionsLast14Days: number
  avgQualityRating: number | null
  lastSessionDate: Date | null
  completedArcIds: ArcId[]
}

export interface PlannedDrill {
  id: string
  title: string
  track: string
  durationMinutes: number
  adjustedDuration: number  // After mode adjustments
  coachTips: string[]
  isFromArc: boolean
}

export interface PlannedGameIQ {
  id: string
  title: string
  focusTrack: string
  estimatedMinutes: number
  explanation: string
  isFromArc: boolean
}

export interface TodayPlan {
  // Mode from check-in
  mode: SessionMode
  modeExplanation: string

  // Arc info (if active)
  activeArc: TrainingArc | null
  arcDayLabel: string | null  // "Day 2 of 5"

  // Content
  drills: PlannedDrill[]
  gameIqModule: PlannedGameIQ | null

  // Metadata
  totalDuration: number
  explanationCopy: string  // "Why this plan today"
}

// ===========================================
// PLAN BUILDER
// ===========================================

/**
 * Build today's training plan based on inputs.
 * This is the single source of truth for plan generation.
 */
export function buildTodayPlan(
  checkIn: CheckInData,
  activeArc: ArcState | null,
  history: RecentHistory
): TodayPlan {
  // Step 1: Calculate session mode from check-in
  const modeResult = calculateSessionMode(checkIn)

  // Step 2: Get arc if active
  const arc = activeArc?.status === 'active' && activeArc.arcId
    ? trainingArcs[activeArc.arcId]
    : null

  // Step 3: Select drills
  const drills = selectDrills(modeResult, arc, checkIn.timeAvail)

  // Step 4: Select Game IQ module (if mode emphasizes it or arc includes it)
  const gameIqModule = selectGameIQModule(modeResult, arc)

  // Step 5: Calculate total duration
  const totalDuration = calculateTotalDuration(drills, gameIqModule)

  // Step 6: Generate explanation copy
  const explanationCopy = generateExplanationCopy(modeResult, arc, drills)

  return {
    mode: modeResult.mode,
    modeExplanation: modeResult.explanation,
    activeArc: arc,
    arcDayLabel: arc && activeArc
      ? `Day ${activeArc.dayIndex + 1} of ${arc.recommendedDurationDays}`
      : null,
    drills,
    gameIqModule,
    totalDuration,
    explanationCopy,
  }
}

// ===========================================
// DRILL SELECTION
// ===========================================

function selectDrills(
  modeResult: SessionModeResult,
  arc: TrainingArc | null,
  timeAvail: number
): PlannedDrill[] {
  const { adjustments } = modeResult
  const drills: PlannedDrill[] = []
  let remainingTime = adjustments.suggestedDuration

  // If we have an active arc, prioritize arc drills
  if (arc) {
    for (const drillId of arc.drillIds) {
      const config = skillDrillRegistry[drillId]
      if (!config) continue

      // Skip intense drills in recovery/low battery modes
      if (!adjustments.intenseDrillsAllowed && isIntenseDrill(config)) {
        continue
      }

      const adjustedDuration = Math.round(
        config.durationMinutes * adjustments.repMultiplier
      )

      if (remainingTime >= adjustedDuration) {
        drills.push({
          id: drillId,
          title: config.title,
          track: config.track,
          durationMinutes: config.durationMinutes,
          adjustedDuration,
          coachTips: config.coachTips,
          isFromArc: true,
        })
        remainingTime -= adjustedDuration
      }
    }
  }

  // If no arc or time remaining, add general drills
  if (drills.length === 0 || remainingTime > 5) {
    const generalDrills = selectGeneralDrills(
      modeResult,
      remainingTime,
      drills.map(d => d.id)
    )
    drills.push(...generalDrills)
  }

  return drills
}

function selectGeneralDrills(
  modeResult: SessionModeResult,
  remainingTime: number,
  excludeIds: string[]
): PlannedDrill[] {
  const { adjustments } = modeResult
  const drills: PlannedDrill[] = []
  let timeLeft = remainingTime

  // Priority order based on mode
  const trackPriority = adjustments.includeDecisionChain
    ? ['scanning', 'decision_chain', 'tempo']
    : ['scanning', 'tempo']

  for (const track of trackPriority) {
    if (timeLeft <= 0) break

    const trackDrills = Object.values(skillDrillRegistry)
      .filter(d => d.track === track && !excludeIds.includes(d.key))

    for (const config of trackDrills) {
      if (!adjustments.intenseDrillsAllowed && isIntenseDrill(config)) {
        continue
      }

      const adjustedDuration = Math.round(
        config.durationMinutes * adjustments.repMultiplier
      )

      if (timeLeft >= adjustedDuration) {
        drills.push({
          id: config.key,
          title: config.title,
          track: config.track,
          durationMinutes: config.durationMinutes,
          adjustedDuration,
          coachTips: config.coachTips,
          isFromArc: false,
        })
        timeLeft -= adjustedDuration
        break  // One drill per track for general selection
      }
    }
  }

  return drills
}

function isIntenseDrill(config: SkillDrillConfig): boolean {
  // Decision chain drills are considered more mentally intense
  // but safe for recovery. Physical drills would be marked differently.
  // For now, we consider decision_chain drills as moderate intensity.
  return false  // All current drills are safe for all modes
}

// ===========================================
// GAME IQ SELECTION
// ===========================================

function selectGameIQModule(
  modeResult: SessionModeResult,
  arc: TrainingArc | null
): PlannedGameIQ | null {
  const { adjustments } = modeResult

  // Only include Game IQ if mode emphasizes it or arc includes it
  if (!adjustments.gameIQEmphasis && !arc) {
    return null
  }

  // If arc has Game IQ modules, pick one based on progression
  if (arc && arc.gameIqIds.length > 0) {
    // Rotate through arc modules (simple modulo-based selection)
    const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
    const moduleIndex = dayOfYear % arc.gameIqIds.length
    const moduleId = arc.gameIqIds[moduleIndex]
    const module = gameIQRegistry[moduleId]

    if (module) {
      return {
        id: module.id,
        title: module.title,
        focusTrack: module.focusTrack,
        estimatedMinutes: module.estimatedMinutes,
        explanation: module.explanation,
        isFromArc: true,
      }
    }
  }

  // For game IQ emphasis without arc, pick based on mode
  if (adjustments.gameIQEmphasis) {
    // Recovery/Low Battery modes benefit from tempo or decision modules
    const preferredTracks = modeResult.mode === 'RECOVERY'
      ? ['tempo', 'vision']
      : ['decision_making', 'vision']

    for (const track of preferredTracks) {
      const modules = Object.values(gameIQRegistry).filter(
        m => m.focusTrack === track
      )
      if (modules.length > 0) {
        // Pick a module (rotate based on day)
        const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
        const module = modules[dayOfYear % modules.length]
        return {
          id: module.id,
          title: module.title,
          focusTrack: module.focusTrack,
          estimatedMinutes: module.estimatedMinutes,
          explanation: module.explanation,
          isFromArc: false,
        }
      }
    }
  }

  return null
}

// ===========================================
// HELPERS
// ===========================================

function calculateTotalDuration(
  drills: PlannedDrill[],
  gameIqModule: PlannedGameIQ | null
): number {
  const drillTime = drills.reduce((sum, d) => sum + d.adjustedDuration, 0)
  const gameIqTime = gameIqModule?.estimatedMinutes ?? 0
  return drillTime + gameIqTime
}

function generateExplanationCopy(
  modeResult: SessionModeResult,
  arc: TrainingArc | null,
  drills: PlannedDrill[]
): string {
  const { mode } = modeResult

  if (arc) {
    switch (mode) {
      case 'PEAK':
        return `${arc.title}: You're at your best today. Let's push the ${arc.subtitle.toLowerCase()}.`
      case 'NORMAL':
        return `${arc.title}: Solid day for building your ${arc.subtitle.toLowerCase()}.`
      case 'LOW_BATTERY':
        return `${arc.title}: Lower energy is fine. We'll focus on the mental side today.`
      case 'RECOVERY':
        return `${arc.title}: Recovery day. Light work keeps the arc going without strain.`
    }
  }

  // No arc active
  switch (mode) {
    case 'PEAK':
      return "You're feeling great! Let's make the most of this energy."
    case 'NORMAL':
      return "Solid session ahead. Fundamentals build champions."
    case 'LOW_BATTERY':
      return "Taking it easy is smart. Quality over quantity today."
    case 'RECOVERY':
      return "Rest is part of training. Light mental work keeps you sharp."
  }
}

// ===========================================
// ARC SELECTION HELPERS
// ===========================================

/**
 * Determine if a new arc should be suggested.
 * Called when no arc is active.
 */
export function shouldSuggestNewArc(history: RecentHistory): {
  suggest: boolean
  reason: string
  suggestedArcId: ArcId | null
} {
  const { sessionsLast14Days, completedArcIds, avgQualityRating } = history

  // Trigger 1: Low motivation trend (< 3 sessions in 2 weeks)
  if (sessionsLast14Days < 3) {
    const nextArc = getNextArc(completedArcIds)
    return {
      suggest: true,
      reason: "Let's reignite your training with a focused arc!",
      suggestedArcId: nextArc,
    }
  }

  // Trigger 2: Quality declining (avg < 3 over recent sessions)
  if (avgQualityRating !== null && avgQualityRating < 3) {
    return {
      suggest: true,
      reason: "An arc can help bring fresh focus to your training.",
      suggestedArcId: 'tempo',  // Tempo arc helps with quality/control
    }
  }

  // Trigger 3: After completing an arc, suggest the next one
  if (completedArcIds.length > 0 && completedArcIds.length < 3) {
    const nextArc = getNextArc(completedArcIds)
    if (nextArc) {
      return {
        suggest: true,
        reason: "Ready for your next challenge?",
        suggestedArcId: nextArc,
      }
    }
  }

  return {
    suggest: false,
    reason: '',
    suggestedArcId: null,
  }
}

/**
 * Get the next arc in the default progression order.
 */
function getNextArc(completedArcIds: ArcId[]): ArcId | null {
  const order = getDefaultArcOrder()
  for (const arcId of order) {
    if (!completedArcIds.includes(arcId)) {
      return arcId
    }
  }
  // All completed - cycle back to first
  return order[0]
}
