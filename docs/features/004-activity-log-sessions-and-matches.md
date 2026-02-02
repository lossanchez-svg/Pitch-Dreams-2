# Feature: Activity Log (Sessions & Matches)

**Issues:** #19, #20

## Overview
Comprehensive activity logging for training sessions, classes, and games with reflection prompts.

## Activity Types

| Type | Description | Shows |
|------|-------------|-------|
| SELF_TRAINING | Solo practice | Duration, intensity |
| COACH_1ON1 | Private coaching | Coach picker |
| TEAM_TRAINING | Team practice | Program picker |
| FACILITY_CLASS | Class at facility | Facility picker |
| OFFICIAL_GAME | League match | Opponent, program |
| FUTSAL_GAME | Futsal match | Opponent, program |
| INDOOR_LEAGUE_GAME | Indoor match | Opponent, program |

## Log Flow

### Step 1: Activity Type
Select from activity type cards with icons.

### Step 2: Details
- Duration (quick presets: 30, 60, 90, 120 min)
- Facility/Coach/Program pickers (contextual)
- Location (optional)
- Opponent (for games)
- Intensity (RPE 1-10 slider)
- Game IQ Impact (Low/Medium/High)

### Step 3: Reflection
- Focus tags (what did you work on?)
- Highlights (what went well?)
- Next focus (what to improve?)
- Notes (optional, parent-gated)

### Step 4: Confirm
Review summary and submit.

## Components
- `ActivityTypePicker` - Type selection cards
- `GameIQImpactPicker` - Impact level selector
- `FocusTagPicker` - Multi-select tags
- `HighlightChipPicker` - Achievement chips
- `RpeSlider` - Intensity slider

## Data Model
```prisma
model Activity {
  childId         String
  activityType    ActivityType
  durationMinutes Int
  intensityRPE    Int?
  gameIQImpact    GameIQImpact
  facilityId      String?
  coachId         String?
  programId       String?
  focusTags       ActivityFocusTag[]
  highlights      ActivityHighlightLog[]
  nextFocus       ActivityNextFocusLog[]
}
```

## Files
- `app/child/[childId]/activity/new/` - Log flow
- `app/child/[childId]/activity/actions.ts` - Server actions
- `components/pitchdreams/` - Picker components
