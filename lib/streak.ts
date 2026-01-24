import { startOfDay, differenceInDays } from 'date-fns'

/**
 * Calculate current streak from an array of session dates
 * Streak = consecutive days with at least 1 session
 *
 * @param sessionDates - Array of Date objects (session createdAt timestamps)
 * @returns Current streak count (0 if no sessions or streak is broken)
 */
export function calculateStreak(sessionDates: Date[]): number {
  if (sessionDates.length === 0) return 0

  // Sort dates descending (most recent first)
  const sorted = sessionDates
    .map(d => startOfDay(d))
    .sort((a, b) => b.getTime() - a.getTime())

  // Remove duplicates (multiple sessions on same day)
  const uniqueDays = Array.from(
    new Set(sorted.map(d => d.getTime()))
  ).map(t => new Date(t))

  const today = startOfDay(new Date())
  const mostRecent = uniqueDays[0]

  // If most recent session is more than 1 day ago, streak is broken
  const daysSinceLast = differenceInDays(today, mostRecent)
  if (daysSinceLast > 1) return 0

  // Count consecutive days working backward from most recent
  let streak = 1
  for (let i = 1; i < uniqueDays.length; i++) {
    const daysBetween = differenceInDays(uniqueDays[i - 1], uniqueDays[i])
    if (daysBetween === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

/**
 * Get weekly session counts for the last N weeks
 *
 * @param sessionDates - Array of Date objects
 * @param weeks - Number of weeks to calculate (default 4)
 * @returns Array of session counts [week1, week2, week3, week4] (most recent first)
 */
export function getWeeklyCounts(sessionDates: Date[], weeks: number = 4): number[] {
  const today = startOfDay(new Date())
  const counts: number[] = new Array(weeks).fill(0)

  for (const date of sessionDates) {
    const daysDiff = differenceInDays(today, startOfDay(date))
    if (daysDiff < 0) continue // Future dates (shouldn't happen)

    const weekIndex = Math.floor(daysDiff / 7)
    if (weekIndex < weeks) {
      counts[weekIndex]++
    }
  }

  return counts
}

/**
 * Get count of sessions in current week (last 7 days)
 */
export function getThisWeekCount(sessionDates: Date[]): number {
  const today = startOfDay(new Date())
  return sessionDates.filter(date => {
    const daysDiff = differenceInDays(today, startOfDay(date))
    return daysDiff >= 0 && daysDiff < 7
  }).length
}
