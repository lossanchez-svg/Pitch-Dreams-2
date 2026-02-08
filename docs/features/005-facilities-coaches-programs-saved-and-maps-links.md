# Saved Facilities, Coaches, Programs + Google Maps Links (No-cost MVP)

**Issues:** #20, #21

## Problem
Users want to log training locations and make them clickable when possible, without paying for APIs. They also need saved recurring selections for fast logging.

## MVP Goals
- Facility search without cost:
  - Type facility name
  - "Search Google Maps" opens official maps site
  - Save name locally for reuse
  - Optionally store a URL for direct "Open in Maps"
- Saved recurring selections:
  - Facilities
  - Coaches (display name only)
  - Programs / Practices / Leagues (team training, futsal, indoor, classes)

## UX Requirements

### Facility Picker
- Tabs: **Saved** | **Type Manually**
- Manual entry:
  - Name (required)
  - City (optional)
  - URL (optional) - "Google Maps link (optional)"
  - Button: "Search Google Maps" (opens new tab)
  - "Save for reuse" checkbox (default: ON)
- Saved tab:
  - Recent list (last 5)
  - Saved list
  - Row actions:
    - If URL exists → "Open in Maps"
    - If no URL → "Search Maps"

### Coach Picker
- Type + save
- Saved + Recent
- **No contact fields in MVP** (minors safety)

### Program Picker
- Type + save
- Saved + Recent
- Program type enum: `TEAM` | `FUTSAL` | `INDOOR` | `CLASS` | `OTHER`

## Data Model (MVP)

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
  type     ProgramType  // TEAM | FUTSAL | INDOOR | CLASS | OTHER
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
  facilityMapsUrlFreeform String?  // One-off URL
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
// If facility.mapsUrl exists → "Open in Maps" (direct link)
// Else → "Search Maps" (search URL using name + city)
```

## Files
- `components/pitchdreams/FacilityPicker.tsx`
- `components/pitchdreams/CoachPicker.tsx`
- `components/pitchdreams/ProgramPicker.tsx`
- `lib/maps.ts`
- `app/child/[childId]/activity/actions.ts`

## Acceptance Criteria
- [x] Logging flow supports one-off + saved selections
- [x] Search Maps opens correct query URL
- [x] Saved facilities show "Open in Maps" when URL exists
- [x] No paid APIs used

## Later Upgrade (Post-MVP)
- Add Google Places Autocomplete
- Store `googlePlaceId` and `isVerified` flag
- Optionally "upgrade" manual facilities to verified

See: [Decision: Maps No-Cost MVP](../decisions/maps-no-cost-mvp.md)
