# Skill Tracks & Activity Logging (Issue #19)

This document describes the implementation of the Skill Track training system and Session/Match Activity logging features.

## Overview

Two new capabilities have been added to Pitch Dreams:

1. **Skill Track Training** - Cognitive drills for Scanning and Decision Chain skills
2. **Activity Logging** - Track all types of soccer activities (training, games, classes)

## Database Changes

### New Models

Run the following to apply migrations:

```bash
npx prisma migrate dev --name add_skill_tracks_and_activities
npx prisma db seed
```

#### Activity Models
- `Activity` - Main activity log (training sessions, games, etc.)
- `Facility` - Soccer facilities (e.g., Touch N Go - Tustin, CA)
- `Coach` - Coaches for 1:1 sessions
- `FocusTag` - Training focus areas (scanning, decision_chain, etc.)
- `HighlightChip` - Session wins/highlights
- `NextFocusChip` - Next session focus areas
- `ActivityFocusTag` - Many-to-many: Activity ↔ FocusTag
- `ActivityHighlightLog` - Many-to-many: Activity ↔ HighlightChip
- `ActivityNextFocusLog` - Many-to-many: Activity ↔ NextFocusChip

#### Skill Track Models
- `SkillTrackDrill` - Cognitive training drills (Scanning, Decision Chain)
- `SkillTrackDrillLog` - Child's drill attempts with metrics

### Activity Types

```typescript
enum ActivityType {
  SELF_TRAINING      // Solo practice
  COACH_1ON1         // Private coaching session
  TEAM_TRAINING      // Team practice
  FACILITY_CLASS     // Class at a facility
  OFFICIAL_GAME      // League/tournament game
  FUTSAL_GAME        // Indoor 5v5 futsal
  INDOOR_LEAGUE_GAME // Indoor soccer league
}
```

### Game IQ Impact

Each activity tracks its impact on "Game IQ" (decision-making skills):

```typescript
enum GameIQImpact {
  LOW    // Mostly physical work
  MEDIUM // Some decision-making involved
  HIGH   // Game-like situations
}
```

## Skill Tracks

### Available Tracks

1. **Scanning** - See the field early
   - 3-Point Scan
   - Color Cue Recognition

2. **Decision Chain** - Think 1-3 moves ahead
   - Receive-Decide-Execute
   - 2-Step Advantage
   - Third Man Awareness

**Note:** First Touch is NOT included as it already exists in the main drills system.

### Animation System

The skill track system includes an animation framework:

- **Registry**: `/lib/skills/registry.ts` - Central configuration for all skill drills
- **Component**: `/components/pitchdreams/SkillAvatarAnimation.tsx`
  - Supports `prefers-reduced-motion` accessibility
  - Uses IntersectionObserver for lazy loading
  - Falls back to static SVGs when animations unavailable
- **Static SVGs**: `/public/skills/static/` - Fallback images for each drill

### Accessing Skill Tracks

From the child home page:
1. Click "Scanning" or "Decision Chain" cards in the Skill Tracks section
2. Or navigate directly to `/child/[childId]/skills`

## Activity Logging

### Logging a New Activity

1. From child home page, click "Log Activity"
2. Select activity type (training, game, etc.)
3. Enter details:
   - Duration
   - Location (optional)
   - Facility (for facility classes)
   - Opponent (for games)
   - Intensity (1-10 RPE)
   - Game IQ Impact
4. Reflect on the session:
   - Focus areas worked on
   - What went well (highlights)
   - What to focus on next
5. Confirm and save

### Parent Dashboard

The parent dashboard now shows:
- **Activity Mix** for each child this month
- **Total activities** and **total time**
- **Average Game IQ score** with recommendations
- Visual breakdown by activity type

## File Structure

```
lib/
  skills/
    registry.ts           # Skill drill registry

components/pitchdreams/
  SkillAvatarAnimation.tsx   # Animation component
  SkillTrackDrillCard.tsx    # Drill display card
  ActivityTypePicker.tsx     # Activity type selector
  GameIQImpactPicker.tsx     # Game IQ impact picker
  FocusTagPicker.tsx         # Focus area selector
  HighlightChipPicker.tsx    # Highlight/next focus chips
  ActivitySummaryCard.tsx    # Dashboard activity summary

app/child/[childId]/
  skills/
    page.tsx                 # Skill tracks page
    SkillTrackContent.tsx    # Skill tracks client component
  activity/
    actions.ts               # Server actions for activities
    new/
      page.tsx               # New activity page
      NewActivityContent.tsx # New activity form

public/skills/static/
  scanning-3point.svg
  scanning-color-cue.svg
  decision-rde.svg
  decision-2step.svg
  decision-3rd-man.svg
```

## Seed Data

The seed file includes:
- 1 facility (Touch N Go - Tustin, CA)
- 10 focus tags (scanning, decision_chain, first_touch, etc.)
- 10 highlight chips (created_space, won_ball_back, etc.)
- 10 next focus chips (more_scanning, faster_decisions, etc.)
- 5 skill track drills (2 Scanning, 3 Decision Chain)

## Future Enhancements

- [ ] Animated SVGs/Lottie animations for skill drills
- [ ] Full drill execution flow with metric tracking
- [ ] Weekly activity summary emails
- [ ] Coach notes integration
- [ ] Team activity aggregation
