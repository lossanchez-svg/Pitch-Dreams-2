# Feature: Facilities, Coaches, Programs (Saved + Maps Links)

**Issues:** #20, #21

## Overview
Allow parents to save frequently-used facilities, coaches, and programs for quick reuse when logging activities. Facilities can link to Google Maps.

## MVP Approach (No-Cost)
We do NOT use Google Places API in MVP. Instead:
- Users manually enter facility info
- "Search Google Maps" button opens Maps in new tab
- Users can optionally paste a Maps URL

See: [Decision: Maps No-Cost MVP](../decisions/maps-no-cost-mvp.md)

## Components

### FacilityPicker
Two tabs:
1. **Saved** - Recent (last 5) + Saved facilities
2. **Type Manually** - Name, city, Maps URL, save checkbox

Each saved facility shows:
- Name + city
- "Open in Maps" (if mapsUrl exists)
- "Search Maps" (if no mapsUrl)

### CoachPicker
- Saved/recent coaches
- Display name only (no contact info for safety)
- "Save for reuse" option

### ProgramPicker
- Saved/recent programs
- Type selection: TEAM, FUTSAL, INDOOR, CLASS, OTHER
- Color-coded type badges

## Data Storage

### Saved Items (User-Scoped)
```prisma
model Facility {
  parentId String   // Owner scope
  name     String
  city     String?
  mapsUrl  String?  // User-provided, not verified
  isSaved  Boolean
  lastUsed DateTime?
}

model Coach {
  parentId    String
  displayName String
  isSaved     Boolean
  lastUsed    DateTime?
}

model Program {
  parentId String
  name     String
  type     ProgramType
  isSaved  Boolean
  lastUsed DateTime?
}
```

### Activity References
```prisma
model Activity {
  // Stable references (when selecting saved)
  facilityId String?
  coachId    String?
  programId  String?

  // Freeform fallbacks (when typing without saving)
  facilityNameFreeform    String?
  facilityMapsUrlFreeform String?
  coachNameFreeform       String?
  programNameFreeform     String?
}
```

## Maps Link Helpers
```typescript
// lib/maps.ts
buildGoogleMapsSearchUrl(query)
// => https://www.google.com/maps/search/?api=1&query=...

// Usage:
// If facility.mapsUrl exists: "Open in Maps" (direct link)
// Else: "Search Maps" (search URL using name + city)
```

## Files
- `components/pitchdreams/FacilityPicker.tsx`
- `components/pitchdreams/CoachPicker.tsx`
- `components/pitchdreams/ProgramPicker.tsx`
- `lib/maps.ts`
- `app/child/[childId]/activity/actions.ts`

## Future Upgrade
When enabling Google Places API:
1. Add `googlePlaceId` to Facility model
2. Add `isVerified` boolean
3. Implement Places Autocomplete in FacilityPicker
4. Show "Verified" badge for Places-linked facilities
