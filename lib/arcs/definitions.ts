/**
 * Training Arc Definitions
 *
 * Anime-style training arcs that provide thematic structure to training sessions.
 * Each arc focuses on a specific skill domain and maps to drills + Game IQ content.
 *
 * Design principles:
 * - Competitive, hype, calm tone
 * - No shame, no urgency pressure
 * - "You vs you" framing only
 * - Safe for minors
 */

export type ArcId = 'vision' | 'tempo' | 'decision_chain'
export type ArcStatus = 'inactive' | 'active' | 'paused' | 'completed'
export type IntensityBias = 'peak' | 'normal' | 'light'

export interface TrainingArc {
  id: ArcId
  title: string
  subtitle: string
  playerDescription: string  // Hype, motivational - shown to player
  parentExplanation: string  // Plain, reassuring - shown to parent
  drillIds: string[]         // References to skills registry
  gameIqIds: string[]        // References to gameiq registry
  recommendedDurationDays: number  // 3-7 days typically
  intensityBias: IntensityBias
  completionMessage: string
  icon: string               // Emoji or icon key
  color: string              // Theme color for UI
}

/**
 * Training Arc Registry
 * Maps arc IDs to their full definitions
 */
export const trainingArcs: Record<ArcId, TrainingArc> = {
  // ===========================================
  // VISION ARC
  // ===========================================
  vision: {
    id: 'vision',
    title: 'Vision Arc',
    subtitle: 'See It Before It Happens',
    playerDescription: 'This week, you\'re training to see the game like a pro. Elite players scan the field BEFORE the ball arrives. By the end of this arc, you\'ll spot options others miss.',
    parentExplanation: 'The Vision Arc focuses on developing field awareness and scanning habits. These mental skills help players make better decisions by seeing more of the field. No physical intensity required - this is brain training.',
    drillIds: [
      'scanning.3point_scan',
      'scanning.color_cue',
    ],
    gameIqIds: [
      'vision.scanning_basics',
      'vision.reading_pressure',
      'vision.finding_the_free_player',
    ],
    recommendedDurationDays: 5,
    intensityBias: 'normal',
    completionMessage: 'Vision Arc Complete! You\'ve trained your eyes to see more of the field. Keep scanning - it\'s a habit now.',
    icon: '👁️',
    color: 'cyan',
  },

  // ===========================================
  // TEMPO ARC
  // ===========================================
  tempo: {
    id: 'tempo',
    title: 'Tempo Arc',
    subtitle: 'Control the Rhythm',
    playerDescription: 'This week, you\'re mastering the tempo of the game. The best players know when to speed up and when to stay calm. By the end of this arc, you\'ll control the rhythm.',
    parentExplanation: 'The Tempo Arc teaches game rhythm and emotional regulation. Players learn when to accelerate play and when patience is smarter. Includes breathing techniques for staying calm under pressure.',
    drillIds: [
      'tempo.breathing_rhythm',
      'tempo.patience_in_possession',
      'tempo.urgency_recognition',
    ],
    gameIqIds: [
      'tempo.calm_vs_rush',
      'tempo.managing_game_state',
      'tempo.breathing_under_pressure',
    ],
    recommendedDurationDays: 5,
    intensityBias: 'light',
    completionMessage: 'Tempo Arc Complete! You now understand when to speed up and when to stay cool. That\'s elite-level control.',
    icon: '🎵',
    color: 'purple',
  },

  // ===========================================
  // DECISION CHAIN ARC
  // ===========================================
  decision_chain: {
    id: 'decision_chain',
    title: 'Decision Chain Arc',
    subtitle: 'Think 2 Moves Ahead',
    playerDescription: 'This week, you\'re training your brain to think ahead. Great players don\'t just react - they anticipate. By the end of this arc, you\'ll be planning your next 2-3 moves.',
    parentExplanation: 'The Decision Chain Arc develops anticipation and planning skills. Players learn to think beyond the current play, considering what happens next. This is tactical intelligence training.',
    drillIds: [
      'decision_chain.receive_decide_execute',
      'decision_chain.two_step_advantage',
      'decision_chain.third_man_awareness',
    ],
    gameIqIds: [
      'decision.first_touch_direction',
      'decision.when_to_dribble',
      'decision.next_move_anticipation',
    ],
    recommendedDurationDays: 7,
    intensityBias: 'normal',
    completionMessage: 'Decision Chain Arc Complete! Your brain is now wired to think ahead. That\'s how playmakers are built.',
    icon: '🔗',
    color: 'orange',
  },
}

/**
 * Get arc by ID
 */
export function getArcById(id: ArcId): TrainingArc {
  return trainingArcs[id]
}

/**
 * Get all arcs
 */
export function getAllArcs(): TrainingArc[] {
  return Object.values(trainingArcs)
}

/**
 * Get default arc order for progression
 */
export function getDefaultArcOrder(): ArcId[] {
  return ['vision', 'tempo', 'decision_chain']
}

/**
 * Get arc display info for UI
 */
export function getArcDisplayInfo(id: ArcId): {
  title: string
  subtitle: string
  icon: string
  color: string
  description: string
} {
  const arc = trainingArcs[id]
  return {
    title: arc.title,
    subtitle: arc.subtitle,
    icon: arc.icon,
    color: arc.color,
    description: arc.playerDescription,
  }
}

/**
 * Validate that all drill IDs exist in the skills registry
 * Called during app initialization for safety
 */
export function validateArcDrillIds(
  skillRegistry: Record<string, unknown>
): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  for (const arc of Object.values(trainingArcs)) {
    for (const drillId of arc.drillIds) {
      if (!skillRegistry[drillId]) {
        missing.push(`${arc.id}: ${drillId}`)
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Validate that all Game IQ IDs exist in the registry
 */
export function validateArcGameIqIds(
  gameIqRegistry: Record<string, unknown>
): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  for (const arc of Object.values(trainingArcs)) {
    for (const gameIqId of arc.gameIqIds) {
      if (!gameIqRegistry[gameIqId]) {
        missing.push(`${arc.id}: ${gameIqId}`)
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}
