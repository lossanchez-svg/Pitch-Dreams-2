// @ts-ignore - bad-words doesn't have type definitions
import Filter from 'bad-words'

const filter = new Filter()

// Regex patterns for detecting sensitive content
const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const urlRegex = /(https?:\/\/|www\.)[^\s]+/gi

const MAX_TEXT_LENGTH = 200

/**
 * Filter user-submitted text to remove profanity, contact info, and URLs
 * Used for free-text inputs in session logs (win/focus fields)
 */
export function filterText(text: string | null | undefined): string | null {
  if (!text || text.trim().length === 0) return null

  let cleaned = text.trim()

  // Remove phone numbers
  cleaned = cleaned.replace(phoneRegex, '[removed]')

  // Remove email addresses
  cleaned = cleaned.replace(emailRegex, '[removed]')

  // Remove URLs
  cleaned = cleaned.replace(urlRegex, '[removed]')

  // Filter profanity
  cleaned = filter.clean(cleaned)

  // Truncate to max length
  if (cleaned.length > MAX_TEXT_LENGTH) {
    cleaned = cleaned.substring(0, MAX_TEXT_LENGTH)
  }

  return cleaned
}

/**
 * Validate that text doesn't contain blocked patterns
 * Returns true if text is safe, false if it contains issues
 */
export function isTextSafe(text: string): boolean {
  if (!text) return true

  const hasPhone = phoneRegex.test(text)
  const hasEmail = emailRegex.test(text)
  const hasUrl = urlRegex.test(text)

  return !hasPhone && !hasEmail && !hasUrl
}
