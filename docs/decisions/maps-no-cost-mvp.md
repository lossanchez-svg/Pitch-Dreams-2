# Decision: No-cost Facility Search in MVP

## Decision
Do not use Google Places API in MVP. Use manual facility entry + optional Google Maps URL + "Search Google Maps" link-out.

## Rationale
- Zero cost and zero billing setup
- Fastest to ship
- Still provides clickable behavior when URL exists
- Clean upgrade path later (Places autocomplete + place_id)

## Implementation Notes
- Store facilities as MANUAL
- `mapsUrl` is optional and user-provided
- Offer "Search Maps" button using:
  ```
  https://www.google.com/maps/search/?api=1&query=<encoded name + city>
  ```

## Data Model (MVP)
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
1. Add `googlePlaceId` to Facility model
2. Add `isVerified` boolean
3. Implement Places Autocomplete in FacilityPicker
4. Show "Verified" badge for Places-linked facilities

## Consequences
- No address autocomplete in MVP
- No verified/trusted facility badges
- Users must manually find and paste Maps URLs
