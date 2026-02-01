/**
 * Skill Track Drill Registry
 *
 * Central registry for skill track drills (Scanning, Decision Chain).
 * Used for animation lookups and drill metadata.
 *
 * NOTE: First Touch is NOT included - it already exists in the main drills system.
 */

export type SkillTrack = 'scanning' | 'decision_chain'

export interface SkillDrillMetric {
  type: 'tap_count' | 'timer' | 'confidence'
  label: string
  description?: string
  min?: number
  max?: number
}

export interface SkillDrillConfig {
  key: string
  title: string
  track: SkillTrack
  durationMinutes: number
  recommendedFrequency: string
  animationKey: string
  staticSvgPath: string
  whyItMatters: string
  coachTips: string[]
  metrics: SkillDrillMetric[]
}

/**
 * Skill Track Drill Registry
 * Maps drill keys to their full configuration
 */
export const skillDrillRegistry: Record<string, SkillDrillConfig> = {
  // ===========================================
  // SCANNING DRILLS
  // ===========================================
  'scanning.3point_scan': {
    key: 'scanning.3point_scan',
    title: '3-Point Scan',
    track: 'scanning',
    durationMinutes: 5,
    recommendedFrequency: '2x/week',
    animationKey: 'scanning_3point',
    staticSvgPath: '/skills/static/scanning-3point.svg',
    whyItMatters: 'Elite players scan 3+ times before receiving. This builds the habit of checking shoulders before the ball arrives.',
    coachTips: [
      'Head should move like a swivel - quick, purposeful snaps',
      'Focus on WHAT you see, not just that you looked',
      'Challenge: Can you name a defender and space after each scan?',
    ],
    metrics: [
      { type: 'tap_count', label: 'Scans', description: 'Tap each time you complete a scan' },
      { type: 'confidence', label: 'Awareness', description: 'How aware were you of nearby players?', min: 1, max: 5 },
    ],
  },

  'scanning.color_cue': {
    key: 'scanning.color_cue',
    title: 'Color Cue Recognition',
    track: 'scanning',
    durationMinutes: 4,
    recommendedFrequency: '2x/week',
    animationKey: 'scanning_color_cue',
    staticSvgPath: '/skills/static/scanning-color-cue.svg',
    whyItMatters: 'Training your brain to rapidly identify teammates vs opponents by jersey color builds instant recognition in matches.',
    coachTips: [
      'Start slow, speed up as recognition improves',
      'Call out colors out loud to reinforce the connection',
      'This is about SPEED of recognition, not physical speed',
    ],
    metrics: [
      { type: 'tap_count', label: 'Correct IDs', description: 'Tap for each correct color identification' },
      { type: 'timer', label: 'Response Time', description: 'How quickly you identified colors' },
    ],
  },

  // ===========================================
  // DECISION CHAIN DRILLS
  // ===========================================
  'decision_chain.receive_decide_execute': {
    key: 'decision_chain.receive_decide_execute',
    title: 'Receive-Decide-Execute',
    track: 'decision_chain',
    durationMinutes: 6,
    recommendedFrequency: '2x/week',
    animationKey: 'decision_rde',
    staticSvgPath: '/skills/static/decision-rde.svg',
    whyItMatters: 'The best players decide BEFORE the ball arrives. This drill trains your brain to have a plan ready.',
    coachTips: [
      'Say your decision OUT LOUD before the ball comes',
      'Options: turn, play back, switch, drive, shoot',
      'Wrong decisions made quickly > right decisions made slowly',
    ],
    metrics: [
      { type: 'tap_count', label: 'Pre-Decisions', description: 'Tap when you decided BEFORE receiving' },
      { type: 'confidence', label: 'Decision Speed', description: 'How quickly did you know your next move?', min: 1, max: 5 },
    ],
  },

  'decision_chain.two_step_advantage': {
    key: 'decision_chain.two_step_advantage',
    title: '2-Step Advantage',
    track: 'decision_chain',
    durationMinutes: 5,
    recommendedFrequency: '1x/week',
    animationKey: 'decision_2step',
    staticSvgPath: '/skills/static/decision-2step.svg',
    whyItMatters: 'Elite midfielders think 2 moves ahead. If I pass here, where do I run? This builds that mental chain.',
    coachTips: [
      'Visualize: Pass → Movement → Next Action',
      'Ask yourself: "If I go there, what opens up?"',
      'Start with just 2 steps, then try 3 as you improve',
    ],
    metrics: [
      { type: 'tap_count', label: 'Chain Completions', description: 'Tap when you executed a 2-step chain' },
      { type: 'confidence', label: 'Chain Clarity', description: 'How clear was your 2-step plan?', min: 1, max: 5 },
    ],
  },

  'decision_chain.third_man_awareness': {
    key: 'decision_chain.third_man_awareness',
    title: 'Third Man Awareness',
    track: 'decision_chain',
    durationMinutes: 5,
    recommendedFrequency: '1x/week',
    animationKey: 'decision_3rd_man',
    staticSvgPath: '/skills/static/decision-3rd-man.svg',
    whyItMatters: 'The "third man" is the player who receives after the initial combination. Seeing this unlocks advanced playmaking.',
    coachTips: [
      'Look for the player making the run BEHIND the first pass',
      'Think: "If I pass to A, who can A find?"',
      'This is what separates good from great playmakers',
    ],
    metrics: [
      { type: 'tap_count', label: 'Third Man Spots', description: 'Tap when you identified the third man option' },
      { type: 'confidence', label: 'Vision', description: 'How easily did you spot the third man?', min: 1, max: 5 },
    ],
  },
}

/**
 * Get all drills for a specific skill track
 */
export function getDrillsByTrack(track: SkillTrack): SkillDrillConfig[] {
  return Object.values(skillDrillRegistry).filter(drill => drill.track === track)
}

/**
 * Get a specific drill by key
 */
export function getDrillByKey(key: string): SkillDrillConfig | undefined {
  return skillDrillRegistry[key]
}

/**
 * Get all available skill tracks
 */
export function getSkillTracks(): { key: SkillTrack; label: string; description: string }[] {
  return [
    {
      key: 'scanning',
      label: 'Scanning',
      description: 'See the field early - build awareness before the ball arrives',
    },
    {
      key: 'decision_chain',
      label: 'Decision Chain',
      description: 'Think 1-3 moves ahead - make faster, smarter decisions',
    },
  ]
}

/**
 * Animation key to static SVG path mapping
 * Used when animations fail to load or user prefers reduced motion
 */
export const animationFallbacks: Record<string, string> = {
  scanning_3point: '/skills/static/scanning-3point.svg',
  scanning_color_cue: '/skills/static/scanning-color-cue.svg',
  decision_rde: '/skills/static/decision-rde.svg',
  decision_2step: '/skills/static/decision-2step.svg',
  decision_3rd_man: '/skills/static/decision-3rd-man.svg',
}
