/**
 * Session Mode Logic
 *
 * Deterministic rules that map check-in data to adaptive session modes.
 * No paid APIs. Safe for minors. No shame, no dark patterns.
 */

export type Soreness = 'NONE' | 'LIGHT' | 'MEDIUM' | 'HIGH'
export type SessionMode = 'PEAK' | 'NORMAL' | 'LOW_BATTERY' | 'RECOVERY'
export type MoodEmoji = 'EXCITED' | 'FOCUSED' | 'OKAY' | 'TIRED' | 'STRESSED'

export interface CheckInData {
  energy: number      // 1-5
  soreness: Soreness
  focus: number       // 1-5
  mood: MoodEmoji
  timeAvail: number   // 10, 20, 30
  painFlag: boolean
}

export interface SessionModeResult {
  mode: SessionMode
  explanation: string
  adjustments: SessionAdjustments
}

export interface SessionAdjustments {
  repMultiplier: number        // 1.0 = normal, 1.2 = more, 0.7 = less
  includeDecisionChain: boolean
  gameIQEmphasis: boolean
  intenseDrillsAllowed: boolean
  suggestedDuration: number
}

// Mood scoring for calculations
const moodScores: Record<MoodEmoji, number> = {
  EXCITED: 5,
  FOCUSED: 4,
  OKAY: 3,
  TIRED: 2,
  STRESSED: 1,
}

// Soreness scoring (inverted - higher soreness = lower score)
const sorenessScores: Record<Soreness, number> = {
  NONE: 5,
  LIGHT: 4,
  MEDIUM: 2,
  HIGH: 1,
}

/**
 * Calculate the adaptive session mode based on check-in data.
 * Uses deterministic rules - no randomness, no ML.
 */
export function calculateSessionMode(checkIn: CheckInData): SessionModeResult {
  const { energy, soreness, focus, mood, timeAvail, painFlag } = checkIn

  // Safety first: pain or high soreness always triggers Recovery
  if (painFlag || soreness === 'HIGH') {
    return {
      mode: 'RECOVERY',
      explanation: painFlag
        ? "Let's take it easy today. If pain continues, check with a parent or coach."
        : "Your body needs some rest. We'll focus on Game IQ and light touches.",
      adjustments: {
        repMultiplier: 0.5,
        includeDecisionChain: true,  // Mental work is fine
        gameIQEmphasis: true,
        intenseDrillsAllowed: false,
        suggestedDuration: Math.min(timeAvail, 15),
      },
    }
  }

  // Calculate composite readiness score
  const moodScore = moodScores[mood]
  const sorenessScore = sorenessScores[soreness]
  const compositeScore = (energy + focus + moodScore + sorenessScore) / 4

  // Time-adjusted scoring (short sessions can't be Peak)
  const timeAdjustedScore = timeAvail >= 20 ? compositeScore : Math.min(compositeScore, 3.5)

  // Determine mode based on composite score
  if (timeAdjustedScore >= 4.0 && energy >= 4 && focus >= 4) {
    return {
      mode: 'PEAK',
      explanation: "You're feeling great! Let's push a bit harder and add some decision drills.",
      adjustments: {
        repMultiplier: 1.2,
        includeDecisionChain: true,
        gameIQEmphasis: false,
        intenseDrillsAllowed: true,
        suggestedDuration: timeAvail,
      },
    }
  }

  if (timeAdjustedScore >= 2.5) {
    return {
      mode: 'NORMAL',
      explanation: "Solid session ahead. Let's work on the fundamentals.",
      adjustments: {
        repMultiplier: 1.0,
        includeDecisionChain: false,
        gameIQEmphasis: false,
        intenseDrillsAllowed: true,
        suggestedDuration: timeAvail,
      },
    }
  }

  // Low energy or focus
  return {
    mode: 'LOW_BATTERY',
    explanation: "Lower energy today? No problem. We'll keep it short and focus on Game IQ.",
    adjustments: {
      repMultiplier: 0.7,
      includeDecisionChain: true,
      gameIQEmphasis: true,
      intenseDrillsAllowed: false,
      suggestedDuration: Math.min(timeAvail, 20),
    },
  }
}

/**
 * Get display info for a session mode
 */
export function getSessionModeDisplay(mode: SessionMode): {
  label: string
  color: string
  icon: string
  description: string
} {
  switch (mode) {
    case 'PEAK':
      return {
        label: 'Peak Day',
        color: 'text-green-400',
        icon: '🚀',
        description: 'High intensity, extra drills',
      }
    case 'NORMAL':
      return {
        label: 'Normal Day',
        color: 'text-blue-400',
        icon: '⚽',
        description: 'Balanced training session',
      }
    case 'LOW_BATTERY':
      return {
        label: 'Low Battery',
        color: 'text-yellow-400',
        icon: '🔋',
        description: 'Shorter, Game IQ focus',
      }
    case 'RECOVERY':
      return {
        label: 'Recovery',
        color: 'text-purple-400',
        icon: '🧘',
        description: 'Light touches, mental work',
      }
  }
}

/**
 * Get mood emoji display
 */
export function getMoodDisplay(mood: MoodEmoji): { emoji: string; label: string } {
  switch (mood) {
    case 'EXCITED':
      return { emoji: '😄', label: 'Excited' }
    case 'FOCUSED':
      return { emoji: '🎯', label: 'Focused' }
    case 'OKAY':
      return { emoji: '😊', label: 'Okay' }
    case 'TIRED':
      return { emoji: '😴', label: 'Tired' }
    case 'STRESSED':
      return { emoji: '😰', label: 'Stressed' }
  }
}

/**
 * Get soreness display
 */
export function getSorenessDisplay(soreness: Soreness): { label: string; color: string } {
  switch (soreness) {
    case 'NONE':
      return { label: 'None', color: 'text-green-400' }
    case 'LIGHT':
      return { label: 'Light', color: 'text-blue-400' }
    case 'MEDIUM':
      return { label: 'Medium', color: 'text-yellow-400' }
    case 'HIGH':
      return { label: 'High', color: 'text-red-400' }
  }
}
