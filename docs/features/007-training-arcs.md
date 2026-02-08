# 007: Training Arcs (Adaptive Training)

**Status:** Implemented
**Issue:** [#23](https://github.com/lossanchez-svg/Pitch-Dreams-2/issues/23)
**Related:** [006-readiness-check-adaptive-training.md](./006-readiness-check-adaptive-training.md)

## Overview

Training Arcs are anime-style themed training periods (3-7 days) that provide structure and narrative to a child's soccer development. Combined with the adaptive session mode from Issue #22, arcs help maintain motivation while ensuring training adapts to the player's daily readiness.

## Scope

### In Scope
- Three training arcs: Vision, Tempo, Decision Chain
- Arc state persistence (active/paused/completed)
- Integration with existing check-in system
- Adaptive plan builder combining check-in + arc content
- Arc UI components (cards, banners, completion screens)
- Training workflow integration
- Parent-facing explainer and controls

### Out of Scope
- First Touch drills (already covered elsewhere)
- ML-based recommendations
- Social/competitive features

## The Three Arcs

### 1. Vision Arc 👁️
**Focus:** Scanning, awareness, seeing options early

- **Drills:** 3-Point Scan, Color Cue Recognition
- **Game IQ:** Scanning Basics, Reading Pressure, Finding the Free Player
- **Duration:** 5 days
- **Intensity Bias:** Normal

**Player Description:** "This week, you're training to see the game like a pro. Elite players scan the field BEFORE the ball arrives."

### 2. Tempo Arc 🎵
**Focus:** Decision timing, calm vs rush, rhythm

- **Drills:** Breathing Rhythm, Patience in Possession, Urgency Recognition
- **Game IQ:** Calm vs Rush, Managing Game State, Breathing Under Pressure
- **Duration:** 5 days
- **Intensity Bias:** Light

**Player Description:** "This week, you're mastering the tempo of the game. The best players know when to speed up and when to stay calm."

### 3. Decision Chain Arc 🔗
**Focus:** Next 1-3 moves, anticipation, preparation

- **Drills:** Receive-Decide-Execute, 2-Step Advantage, Third Man Awareness
- **Game IQ:** First Touch Direction, When to Dribble, Next Move Anticipation
- **Duration:** 7 days
- **Intensity Bias:** Normal

**Player Description:** "This week, you're training your brain to think ahead. Great players don't just react - they anticipate."

## Data Model

### TrainingArcState (Prisma)
```prisma
enum ArcStatus {
  INACTIVE
  ACTIVE
  PAUSED
  COMPLETED
}

model TrainingArcState {
  id       String    @id @default(cuid())
  childId  String
  arcId    String    // vision | tempo | decision_chain
  status   ArcStatus @default(INACTIVE)
  startDate DateTime?
  dayIndex Int       @default(0)

  pauseReason String?
  pausedAt    DateTime?
  completedAt DateTime?
  sessionsCompleted Int @default(0)

  child ChildProfile @relation(...)
}
```

### Registries (TypeScript)

**Skills Registry:** `lib/skills/registry.ts`
- Extended with tempo track drills
- Stable IDs: `scanning.*`, `decision_chain.*`, `tempo.*`

**Game IQ Registry:** `lib/gameiq/registry.ts`
- Modules with stable IDs
- Focus tracks: vision, tempo, decision_making, positioning
- Age ranges and estimated durations

**Arc Definitions:** `lib/arcs/definitions.ts`
- Maps arc IDs to drills and Game IQ modules
- Player descriptions (hype) and parent explanations (plain)
- Recommended duration and intensity bias

## UX Flow

### Training Session Flow
```
Start Training
    ↓
Quick Check-In (10-20 sec)
    - Energy (1-5)
    - Soreness (None/Light/Medium/High)
    - Focus (1-5)
    - Mood (emoji)
    - Time (10/20/30 min)
    - Pain flag
    ↓
Mode Calculation → PEAK | NORMAL | LOW_BATTERY | RECOVERY
    ↓
Arc Banner (if active) or Suggestion (if none)
    ↓
Session Type Selection
    ↓
Session Plan Preview
    ↓
Active Training
    ↓
Session Complete → Arc Progress Update
    ↓
Log Session
```

### Arc Lifecycle
```
No Arc → Suggestion shown → Start Arc
    ↓
Active Arc → Daily sessions → Progress tracked
    ↓
Complete Arc → Celebration → Suggest next arc

(Pause available at any time, no penalty)
```

## Key Files

### Logic
- `lib/arcs/definitions.ts` - Arc definitions and metadata
- `lib/arcs/progression.ts` - Arc lifecycle and selection logic
- `lib/planning/buildTodayPlan.ts` - Adaptive plan builder
- `lib/session-mode.ts` - Mode calculation (from #22)
- `lib/skills/registry.ts` - Drill registry
- `lib/gameiq/registry.ts` - Game IQ module registry

### Server Actions
- `app/child/[childId]/training/arc-actions.ts` - Arc CRUD operations
- `app/child/[childId]/training/check-in/actions.ts` - Check-in operations

### UI Components
- `components/pitchdreams/ArcCard.tsx` - Full arc display
- `components/pitchdreams/ArcBanner.tsx` - Session header
- `components/pitchdreams/ArcCompletionScreen.tsx` - Celebration
- `components/pitchdreams/ArcSuggestionCard.tsx` - Suggestions
- `components/pitchdreams/QuickCheckIn.tsx` - Check-in flow
- `components/pitchdreams/SessionModeLabel.tsx` - Mode display

### Pages
- `app/child/[childId]/training/page.tsx` - Training page
- `app/child/[childId]/training/TrainingSessionContent.tsx` - Flow component
- `app/parent/education/training-arcs/page.tsx` - Parent explainer

## Guardrails

### Safety
- Pain flag triggers safety message: "Check with a parent or coach"
- HIGH soreness always triggers RECOVERY mode
- No intense drills in RECOVERY or LOW_BATTERY modes

### Anti-Dark Patterns
- No shame for skipping sessions
- No urgency pressure
- No fake notifications
- "You vs you" framing only
- Recovery days count toward arc continuity

### Parent Controls
- View active arc from dashboard
- Pause/disable arcs
- See check-in history
- Weekly email summaries (optional)

## Acceptance Criteria

### Data & Models
- [x] Extend drill registry with tempo drills
- [x] Create Game IQ registry with stable IDs
- [x] Add TrainingArcState Prisma model
- [x] Arc can be active, paused, or completed
- [x] Only one active arc per child at a time

### Logic
- [x] buildTodayPlan() deterministic plan builder
- [x] Arc selection logic (trigger conditions)
- [x] Arc progression logic (day tracking)
- [x] Recovery mode adapts content, doesn't skip it

### UI
- [x] Quick Check-In integrated into training flow
- [x] ArcCard component for home/progress views
- [x] ArcBanner component for session start
- [x] ArcCompletionScreen for arc completion
- [x] ArcSuggestionCard for recommendations
- [x] Mode explanation shown after check-in

### Integration
- [x] Training workflow: Check-In → Plan → Session → Arc Update
- [x] Arc progress updates per completed session
- [x] Recovery days count toward arc continuity

### Parent Features
- [x] Parent explainer page (/parent/education/training-arcs)
- [x] Parent-friendly arc descriptions

### Safety
- [x] No shame or dark patterns
- [x] "You vs you" framing only
- [x] Pain flag triggers safe messaging
- [x] No urgency pressure
