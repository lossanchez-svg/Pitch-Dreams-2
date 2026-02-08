/**
 * Google Maps URL Helpers (MVP)
 *
 * Simple utilities for creating Google Maps search links.
 * MVP: All facilities are user-provided; no Places API verification.
 *
 * Future upgrade path:
 * - When enabling Places Autocomplete, add googlePlaceId to facilities
 * - Add buildGoogleMapsPlaceUrl() for verified place links
 * - Add extractPlaceIdFromMapsUrl() for parsing pasted URLs
 */

/**
 * Build a Google Maps search URL
 * Opens Google Maps with a search for the given query.
 *
 * @param query - The search query (e.g., "Touch N Go Tustin CA")
 * @returns A Google Maps URL that searches for the query
 */
export function buildGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/**
 * Build a facility search query from facility data
 *
 * @param name - Facility name
 * @param city - Optional city
 * @returns A formatted search query string
 */
export function buildFacilitySearchQuery(
  name: string,
  city?: string | null
): string {
  const parts = [name]
  if (city) parts.push(city)
  return parts.join(' ')
}
