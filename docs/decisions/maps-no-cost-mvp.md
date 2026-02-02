# Decision: No-Cost Google Maps Integration (MVP)

## Context
We want facilities to be linkable to Google Maps for easy navigation. However, Google Places API has costs that are not justified for MVP.

## Decision
**MVP: No Google Places API.** Users manually enter facility info and can search Google Maps in a new tab.

## MVP Implementation

### FacilityPicker Tabs
1. **Saved** - Recent + Saved facilities
2. **Type Manually** - Manual entry form

### Manual Entry Form
- Facility name (required)
- City (optional)
- Google Maps link (optional) - user pastes URL
- "Search Google Maps" button - opens new tab
- "Save for reuse" checkbox (default: ON)

### Maps Link Logic
```typescript
// lib/maps.ts
export function buildGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

// Usage in component:
// If facility.mapsUrl exists → "Open in Maps" (direct link)
// Else → "Search Maps" (search URL using name + city)
```

### Data Model (MVP)
```prisma
model Facility {
  name     String
  city     String?
  mapsUrl  String?  // User-provided, not verified
  isSaved  Boolean
}

model Activity {
  facilityId              String?  // When selecting saved
  facilityNameFreeform    String?  // When typing without saving
  facilityMapsUrlFreeform String?  // One-off URL
}
```

## Future Upgrade Path

When enabling Google Places API:

### 1. Schema Changes
```prisma
model Facility {
  // Existing fields...
  googlePlaceId String?   // NEW: Google Place ID
  isVerified    Boolean   // NEW: Has verified place data
}
```

### 2. FacilityPicker Changes
- Add "Search Places" tab with autocomplete
- Show "Verified" badge for Places-linked facilities
- Auto-fill city from Places data

### 3. Maps Link Logic
```typescript
// If facility.googlePlaceId exists:
buildGoogleMapsPlaceUrl(placeId)
// => https://www.google.com/maps/search/?api=1&query_place_id=...

// Else if facility.mapsUrl exists:
facility.mapsUrl

// Else:
buildGoogleMapsSearchUrl(name + city)
```

## Rationale
1. **Cost savings** - No API costs during MVP validation
2. **Simplicity** - Manual entry is sufficient for MVP users
3. **User control** - Users can paste any Maps URL they want
4. **Clear upgrade path** - Schema supports future Places integration

## Consequences
- No address autocomplete in MVP
- No verified/trusted facility badges
- Users must manually find and paste Maps URLs
- Future migration requires backfilling googlePlaceId

## References
- [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started)
- [Places API Pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing)
