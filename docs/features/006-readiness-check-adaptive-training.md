# Adaptive Session Mode (Readiness Check)

**Issue:** #22
**Status:** In Progress

## Problem
Players do not feel the same every day. A static plan can cause burnout or inconsistency. We need a lightweight check-in that adapts training based on mood, energy, and soreness, while staying safe for minors.

## Goals
- 10–20 second tap-first check-in before sessions
- Adapt drill mix and volume based on current state
- Encourage consistency without manipulation
- Detect low-effort trends and respond with motivating interventions

## Non-goals
- No mental health diagnosis or clinical language
- No shame, no streak-loss panic
- No forced training when soreness/pain is high

## UX

### Check-in Fields
- **Energy** (1–5 scale)
- **Soreness** (None / Light / Med / High)
- **Focus** (1–5 scale)
- **Mood** (emoji icons: 😄 🎯 😊 😴 😰)
- **Time available** (10 / 20 / 30 min)
- **Optional:** Pain yes/no → show safe message to stop/ask parent/coach

### Output
- Show "Today's Mode" label with icon and explanation
- One-line reason why session was adjusted

## Adaptive Modes

| Mode | Icon | Trigger | Training Adjustment |
|------|------|---------|---------------------|
| **Peak Day** | 🚀 | High energy + focus, low soreness | +20% reps, add Decision Chain |
| **Normal Day** | ⚽ | Balanced readings | Standard plan |
| **Low Battery** | 🔋 | Low energy or focus | Shorter, Game IQ emphasis |
| **Recovery** | 🧘 | Med/high soreness or pain | No intense drills, mental work |

## Mode Calculation Logic

```typescript
// lib/session-mode.ts
calculateSessionMode(checkIn) → { mode, explanation, adjustments }

// Composite score = (energy + focus + moodScore + sorenessScore) / 4
// Safety first: painFlag or HIGH soreness → always RECOVERY
// Score >= 4.0 + high energy/focus → PEAK
// Score >= 2.5 → NORMAL
// Score < 2.5 → LOW_BATTERY
```

## Motivation (Trend-based)

Trigger interventions after 2+ weeks of low activity/quality and no PB movement:

| Nudge Type | Title | Action |
|------------|-------|--------|
| RESET_TARGET | "Let's Start Small" | 10-min mini session |
| NEW_ARC | "New Focus: Game Vision" | Vision + Decision Chain |
| MINI_QUEST | "3-Day Challenge" | 3 sessions in 3 days |
| EFFORT_PRAISE | "Every Rep Counts" | Encouragement |

**Framing:** "You vs You" - never shame, never threaten streak loss.

## Data Model

```prisma
enum Soreness { NONE, LIGHT, MEDIUM, HIGH }
enum SessionMode { PEAK, NORMAL, LOW_BATTERY, RECOVERY }
enum MoodEmoji { EXCITED, FOCUSED, OKAY, TIRED, STRESSED }

model CheckIn {
  id              String      @id @default(cuid())
  childId         String
  energy          Int         // 1-5
  soreness        Soreness
  focus           Int         // 1-5
  mood            MoodEmoji
  timeAvail       Int         // 10, 20, 30
  painFlag        Boolean     @default(false)
  mode            SessionMode
  modeExplanation String?
  qualityRating   Int?        // Post-session 1-5
  completed       Boolean     @default(false)
  activityId      String?     @unique

  child    ChildProfile @relation(...)
  activity Activity?    @relation(...)
}
```

## Files

- `lib/session-mode.ts` - Mode calculation logic
- `app/child/[childId]/training/check-in/actions.ts` - Server actions
- `components/pitchdreams/QuickCheckIn.tsx` - Main check-in flow
- `components/pitchdreams/SessionModeLabel.tsx` - Mode display
- `components/pitchdreams/CoachNudgeCard.tsx` - Motivation cards
- `components/pitchdreams/SessionRating.tsx` - Post-session rating

## Acceptance Criteria
- [x] Check-in UI with tap-first inputs
- [x] Deterministic mode calculation
- [x] Mode label with explanation
- [x] Coach nudge system with trend detection
- [x] Post-session quality rating
- [ ] Integration with training page flow
- [ ] Pain flag safety messaging

## Safety
- Pain flag shows immediate "stop and tell parent/coach" message
- Recovery mode is always presented positively
- No judgment language
- Parent visibility into check-in patterns
