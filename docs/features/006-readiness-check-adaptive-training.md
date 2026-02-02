# Adaptive Session Mode (Readiness Check)

**Status:** Planned (Phase 2)

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
- **Mood** (emoji icons)
- **Time available** (10 / 20 / 30 min)
- **Optional:** Pain yes/no → show safe message to stop/ask parent/coach

### Output
- Show "Today's Mode" with explanation of why the plan changed

## Adaptive Modes

| Mode | Trigger | Training Adjustment |
|------|---------|---------------------|
| **Peak Day** | High energy, low soreness | Higher intensity drills |
| **Normal Day** | Balanced readings | Standard mix |
| **Low Battery** | Low energy or focus | Shorter session, Game IQ emphasis |
| **Recovery** | Medium/high soreness or pain | Low-impact + Game IQ only |

## Motivation (Trend-based)

Trigger interventions after 2+ weeks of low activity/quality and no progress signals:
- Reset targets (reduce friction)
- New arc / themed focus (Vision + Decision Chain)
- 3-day mini quest
- Positive reinforcement (effort-based, not shame-based)

## Data Model

```prisma
model CheckIn {
  id         String   @id @default(cuid())
  childId    String
  energy     Int      // 1-5
  soreness   String   // NONE | LIGHT | MEDIUM | HIGH
  focus      Int      // 1-5
  mood       String   // Emoji key
  timeAvail  Int      // 10, 20, 30
  painFlag   Boolean  @default(false)
  mode       String   // PEAK | NORMAL | LOW_BATTERY | RECOVERY

  child      ChildProfile @relation(...)
  activity   Activity?    @relation(...)

  createdAt  DateTime @default(now())
}
```

### Session Outcome Tracking
- `qualityRating` - Post-session self-rating
- `completedFlag` - Did they finish?
- Aggregate trends weekly for motivation triggers

## Acceptance Criteria
- [ ] Check-in modifies session template visibly
- [ ] Recovery mode avoids high intensity drills
- [ ] Trend detection triggers a non-shame motivation card
- [ ] No paid APIs required

## Safety
- Pain flag shows immediate "stop and tell parent/coach" message
- Recovery mode is always presented positively
- No judgment language
- Parent visibility into check-in patterns
