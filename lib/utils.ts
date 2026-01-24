import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for merging Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format duration in minutes to human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

/**
 * Get time ago string (e.g., "2 hours ago", "3 days ago")
 */
export function timeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

/**
 * Avatar colors (preset options for child profiles)
 */
export const AVATAR_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
]

/**
 * Mood emoji mapping
 */
export const MOOD_EMOJIS: Record<string, string> = {
  Awesome: '😁',
  Good: '🙂',
  Okay: '😐',
  Tired: '😓',
  Frustrated: '😤',
}

/**
 * Preset options for "win" field (ages 8-13)
 */
export const WIN_PRESETS = [
  'Kept the ball close',
  'Used both feet',
  'Worked really hard',
  'Improved my speed',
  'Had fun',
  'Stayed focused',
  'Tried my best',
  'Helped a teammate',
]

/**
 * Preset options for "focus" field (ages 8-13)
 */
export const FOCUS_PRESETS = [
  'Use weak foot more',
  'Keep my head up',
  'Improve first touch',
  'Work on finishing',
  'Get faster',
  'Better passing',
  'Defend better',
  'Listen to coach',
]
