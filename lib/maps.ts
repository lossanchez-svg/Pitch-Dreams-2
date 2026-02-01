/**
 * Google Maps URL Helpers
 *
 * Utilities for creating clickable Google Maps links for facilities.
 */

/**
 * Build a Google Maps URL using a Place ID (for verified locations)
 * This creates a direct link to the specific place on Google Maps.
 *
 * @param placeId - The Google Place ID
 * @returns A Google Maps URL that opens the place details
 */
export function buildGoogleMapsPlaceUrl(placeId: string): string {
  return `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`
}

/**
 * Build a Google Maps search URL (for manual entries)
 * This creates a search link that helps users find the location.
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
 * @param state - Optional state
 * @param country - Optional country
 * @returns A formatted search query string
 */
export function buildFacilitySearchQuery(
  name: string,
  city?: string | null,
  state?: string | null,
  country?: string | null
): string {
  const parts = [name]
  if (city) parts.push(city)
  if (state) parts.push(state)
  if (country && country !== 'US') parts.push(country)
  return parts.join(' ')
}

/**
 * Get the appropriate Maps URL for a facility
 *
 * If the facility has a googlePlaceId, returns a direct place URL.
 * If the facility has a mapsUrl, returns that.
 * Otherwise, returns a search URL based on the facility name/location.
 *
 * @param facility - Facility data
 * @returns Object with url and type ('place' | 'search')
 */
export function getFacilityMapsUrl(facility: {
  googlePlaceId?: string | null
  mapsUrl?: string | null
  name: string
  city?: string | null
  state?: string | null
  country?: string | null
}): { url: string; type: 'place' | 'search' } {
  // If we have a Google Place ID, use that for a verified link
  if (facility.googlePlaceId) {
    return {
      url: buildGoogleMapsPlaceUrl(facility.googlePlaceId),
      type: 'place',
    }
  }

  // If user pasted a maps URL, use that
  if (facility.mapsUrl) {
    return {
      url: facility.mapsUrl,
      type: 'place',
    }
  }

  // Otherwise, build a search URL
  const query = buildFacilitySearchQuery(
    facility.name,
    facility.city,
    facility.state,
    facility.country
  )

  return {
    url: buildGoogleMapsSearchUrl(query),
    type: 'search',
  }
}

/**
 * Parse a Google Maps URL to extract the place ID if present
 *
 * @param url - A Google Maps URL
 * @returns The place ID if found, null otherwise
 */
export function extractPlaceIdFromMapsUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)

    // Check for place_id parameter
    const placeId = urlObj.searchParams.get('place_id')
    if (placeId) return placeId

    // Check for query_place_id parameter
    const queryPlaceId = urlObj.searchParams.get('query_place_id')
    if (queryPlaceId) return queryPlaceId

    // Check for !1s pattern in path (e.g., /maps/place/...!1s{placeId}!...)
    const pathMatch = url.match(/!1s([^!]+)/)
    if (pathMatch) return pathMatch[1]

    return null
  } catch {
    return null
  }
}

/**
 * Check if a URL is a valid Google Maps URL
 *
 * @param url - A URL to check
 * @returns True if it's a Google Maps URL
 */
export function isGoogleMapsUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return (
      urlObj.hostname === 'maps.google.com' ||
      urlObj.hostname === 'www.google.com' ||
      urlObj.hostname === 'google.com' ||
      urlObj.hostname === 'goo.gl'
    )
  } catch {
    return false
  }
}
