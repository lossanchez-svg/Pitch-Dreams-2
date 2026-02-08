/**
 * Game IQ Registry
 *
 * Central registry for Game IQ lessons and scenario packs.
 * Used for mental training, tactical understanding, and match preparation.
 *
 * Each module has a stable ID that never changes.
 */

export type GameIQFocusTrack = 'vision' | 'tempo' | 'decision_making' | 'positioning'

export interface GameIQModule {
  id: string
  title: string
  focusTrack: GameIQFocusTrack
  estimatedMinutes: number
  explanation: string
  ageMin: number
  ageMax: number
  scenarios?: string[]
  keyTakeaways: string[]
}

/**
 * Game IQ Module Registry
 * Maps module IDs to their full configuration
 */
export const gameIQRegistry: Record<string, GameIQModule> = {
  // ===========================================
  // VISION MODULES
  // ===========================================
  'vision.scanning_basics': {
    id: 'vision.scanning_basics',
    title: 'Scanning Basics',
    focusTrack: 'vision',
    estimatedMinutes: 5,
    explanation: 'Learn why elite players look around BEFORE the ball arrives, and how to build this habit.',
    ageMin: 8,
    ageMax: 18,
    scenarios: [
      'You receive a pass with back to goal - what did you check first?',
      'Ball is coming to you in midfield - where are your eyes?',
    ],
    keyTakeaways: [
      'Scan before the ball arrives, not after',
      'Look for space, teammates, and pressure',
      'Make scanning a habit, not a thought',
    ],
  },

  'vision.reading_pressure': {
    id: 'vision.reading_pressure',
    title: 'Reading Pressure',
    focusTrack: 'vision',
    estimatedMinutes: 6,
    explanation: 'Understand how to quickly assess if you have time on the ball or need to play faster.',
    ageMin: 10,
    ageMax: 18,
    scenarios: [
      'Defender is 5 yards away closing fast - what do you do?',
      'Defender is 10 yards away, standing still - what do you do?',
      'Two defenders approaching - how do you decide?',
    ],
    keyTakeaways: [
      'Check defender distance and speed',
      'More time = more options',
      'No time = simple is best',
    ],
  },

  'vision.finding_the_free_player': {
    id: 'vision.finding_the_free_player',
    title: 'Finding the Free Player',
    focusTrack: 'vision',
    estimatedMinutes: 5,
    explanation: 'Train your eyes to spot the unmarked teammate who can move the ball forward.',
    ageMin: 9,
    ageMax: 18,
    scenarios: [
      'Your teammate calls for the ball but is marked - what do you look for?',
      'You have 3 options - how do you pick the best one?',
    ],
    keyTakeaways: [
      'Free player often isn\'t the closest one',
      'Check body position - can they turn?',
      'Forward passes create chances',
    ],
  },

  // ===========================================
  // TEMPO MODULES
  // ===========================================
  'tempo.calm_vs_rush': {
    id: 'tempo.calm_vs_rush',
    title: 'Calm vs Rush',
    focusTrack: 'tempo',
    estimatedMinutes: 5,
    explanation: 'Understand when to speed up and when staying calm is the smarter choice.',
    ageMin: 9,
    ageMax: 18,
    scenarios: [
      'Your team just won the ball back in your own half - what tempo?',
      'Counter attack with 3v2 - what tempo?',
      'Up 1-0 with 5 minutes left - what tempo?',
    ],
    keyTakeaways: [
      'Fast isn\'t always better',
      'Control the game by controlling tempo',
      'Rushing = turnovers',
    ],
  },

  'tempo.managing_game_state': {
    id: 'tempo.managing_game_state',
    title: 'Managing Game State',
    focusTrack: 'tempo',
    estimatedMinutes: 6,
    explanation: 'Learn how the score, time, and situation should change your approach.',
    ageMin: 11,
    ageMax: 18,
    scenarios: [
      'Tied 0-0 in the 80th minute - should you take risks?',
      'Down 2-0 with 15 minutes left - what changes?',
      'Up 3-0 at halftime - what\'s the smart approach?',
    ],
    keyTakeaways: [
      'Score affects risk tolerance',
      'Time remaining changes urgency',
      'Smart teams adapt to the situation',
    ],
  },

  'tempo.breathing_under_pressure': {
    id: 'tempo.breathing_under_pressure',
    title: 'Breathing Under Pressure',
    focusTrack: 'tempo',
    estimatedMinutes: 4,
    explanation: 'Use breathing techniques to stay calm in high-pressure moments.',
    ageMin: 8,
    ageMax: 18,
    scenarios: [
      'Penalty kick - how do you prepare?',
      'Crowd is loud and you feel nervous - what helps?',
      'You just made a mistake - how do you reset?',
    ],
    keyTakeaways: [
      'Slow breathing slows your heart',
      'Reset between plays',
      'Calm body = clear mind',
    ],
  },

  // ===========================================
  // DECISION MAKING MODULES
  // ===========================================
  'decision.first_touch_direction': {
    id: 'decision.first_touch_direction',
    title: 'First Touch Direction',
    focusTrack: 'decision_making',
    estimatedMinutes: 5,
    explanation: 'Your first touch sets up your next move. Learn to use it with intention.',
    ageMin: 9,
    ageMax: 18,
    scenarios: [
      'Defender on your left - which way should your first touch go?',
      'You want to turn and face forward - where do you touch it?',
      'Teammate is making a run - can your first touch set up the pass?',
    ],
    keyTakeaways: [
      'First touch = first decision',
      'Touch away from pressure',
      'Touch toward your next action',
    ],
  },

  'decision.when_to_dribble': {
    id: 'decision.when_to_dribble',
    title: 'When to Dribble',
    focusTrack: 'decision_making',
    estimatedMinutes: 5,
    explanation: 'Dribbling is a tool, not a default. Learn when it helps and when it hurts.',
    ageMin: 9,
    ageMax: 18,
    scenarios: [
      'You have space in front - dribble or pass?',
      '1v1 in the final third - take them on?',
      'Midfielder with 3 defenders nearby - should you dribble?',
    ],
    keyTakeaways: [
      'Dribble into space, not into pressure',
      'Final third = more risk OK',
      'Simple is often smart',
    ],
  },

  'decision.next_move_anticipation': {
    id: 'decision.next_move_anticipation',
    title: 'Next Move Anticipation',
    focusTrack: 'decision_making',
    estimatedMinutes: 6,
    explanation: 'Think beyond the current play. What happens after your action?',
    ageMin: 10,
    ageMax: 18,
    scenarios: [
      'If you pass to Player A, where should you run?',
      'You\'re about to receive - what are your 3 options BEFORE the ball comes?',
      'Defender is ball-watching - what opportunity does that create?',
    ],
    keyTakeaways: [
      'Always have a plan B',
      'Think 1-2 moves ahead',
      'Good players anticipate, great players orchestrate',
    ],
  },

  // ===========================================
  // POSITIONING MODULES
  // ===========================================
  'positioning.creating_angles': {
    id: 'positioning.creating_angles',
    title: 'Creating Passing Angles',
    focusTrack: 'positioning',
    estimatedMinutes: 5,
    explanation: 'Learn how small movements open up passing lanes.',
    ageMin: 9,
    ageMax: 18,
    scenarios: [
      'Teammate has the ball but can\'t see you - what do you do?',
      'You\'re behind a defender - how do you show for the ball?',
    ],
    keyTakeaways: [
      'Move to show yourself',
      'Don\'t hide behind defenders',
      'Angles create options',
    ],
  },

  'positioning.spacing_awareness': {
    id: 'positioning.spacing_awareness',
    title: 'Spacing Awareness',
    focusTrack: 'positioning',
    estimatedMinutes: 5,
    explanation: 'Good teams maintain shape. Understand your role in team spacing.',
    ageMin: 10,
    ageMax: 18,
    scenarios: [
      'Your teammate drifts into your zone - what do you do?',
      'The team is too compact - how do you create width?',
    ],
    keyTakeaways: [
      'Too close = easy to defend',
      'Balance width and depth',
      'Fill gaps when teammates move',
    ],
  },
}

/**
 * Get all modules for a specific focus track
 */
export function getModulesByTrack(track: GameIQFocusTrack): GameIQModule[] {
  return Object.values(gameIQRegistry).filter(module => module.focusTrack === track)
}

/**
 * Get a specific module by ID
 */
export function getModuleById(id: string): GameIQModule | undefined {
  return gameIQRegistry[id]
}

/**
 * Get modules appropriate for a given age
 */
export function getModulesForAge(age: number): GameIQModule[] {
  return Object.values(gameIQRegistry).filter(
    module => age >= module.ageMin && age <= module.ageMax
  )
}

/**
 * Get available focus tracks with metadata
 */
export function getGameIQTracks(): { key: GameIQFocusTrack; label: string; description: string }[] {
  return [
    {
      key: 'vision',
      label: 'Vision',
      description: 'See the game clearly - scanning, reading pressure, finding options',
    },
    {
      key: 'tempo',
      label: 'Tempo',
      description: 'Control the rhythm - know when to speed up and when to stay calm',
    },
    {
      key: 'decision_making',
      label: 'Decision Making',
      description: 'Make smarter choices - anticipation, timing, and execution',
    },
    {
      key: 'positioning',
      label: 'Positioning',
      description: 'Be in the right place - angles, spacing, and movement',
    },
  ]
}
