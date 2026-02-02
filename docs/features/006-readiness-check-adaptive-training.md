# Feature 006: Readiness Check & Adaptive Training

## Overview
A pre-training readiness assessment that adapts the day's training plan based on how the child feels—ensuring safe, effective sessions.

## Problem Statement
Children's energy, mood, and physical readiness vary daily. A one-size-fits-all training plan doesn't account for:
- Recovery needs after games/intense sessions
- Low energy days (school stress, poor sleep)
- High energy days ready for challenge

## Solution: Readiness Check Flow

### Pre-Training Check-In
Quick 3-question assessment before starting any training:

1. **Energy Level** (1-5 scale)
   - Visual: Battery icon filling up
   - "How much energy do you have right now?"

2. **Body Feel** (1-5 scale)
   - Visual: Body outline with comfort indicators
   - "How does your body feel?" (Fresh / Normal / Tired / Sore)

3. **Mood** (emoji selection)
   - "How are you feeling today?"
   - Options: Excited / Focused / Okay / Tired / Stressed

### Adaptive Training Modes

Based on readiness score, recommend one of three modes:

| Mode | Readiness | Focus | Duration |
|------|-----------|-------|----------|
| **Recover** | Low (1-2) | Light touches, stretching, visualization | 15-20 min |
| **Build** | Medium (3) | Technical drills, moderate intensity | 30-45 min |
| **Push** | High (4-5) | Challenging drills, game scenarios | 45-60 min |

### Mode Details

#### Recover Mode
- Light ball mastery (juggling, soft touches)
- Stretching and mobility
- Visualization exercises (scanning scenarios)
- Mental game review
- **No high intensity**

#### Build Mode
- Standard drill progression
- Technical skill work
- Moderate cardio
- Scanning and decision drills at normal pace

#### Push Mode
- Challenging skill combinations
- Time-pressure drills
- Game-intensity scenarios
- Extended sessions with proper rest

## User Flow

```
[Start Training]
    → [Readiness Check: 3 questions]
    → [Calculate Score]
    → [Show Recommended Mode]
    → [User confirms or overrides]
    → [Load appropriate drill set]
    → [Post-session: Log activity with readiness data]
```

## Data Model

```prisma
model ReadinessCheck {
  id          String   @id @default(cuid())
  childId     String
  energyLevel Int      // 1-5
  bodyFeel    String   // FRESH | NORMAL | TIRED | SORE
  mood        String   // EXCITED | FOCUSED | OKAY | TIRED | STRESSED
  score       Int      // Calculated 1-5
  mode        String   // RECOVER | BUILD | PUSH
  overridden  Boolean  @default(false) // Did user pick different mode?

  child       ChildProfile @relation(...)
  activity    Activity?    @relation(...)

  createdAt   DateTime @default(now())
}
```

## UI Components

### ReadinessCheck Component
- `EnergySlider` - Visual battery slider (1-5)
- `BodyFeelPicker` - Body outline with tap zones
- `MoodPicker` - Emoji grid selection
- `ModeRecommendation` - Shows calculated mode with explanation
- `ModeOverride` - Allow user to pick different mode

### Visual Design
- Dark HUD aesthetic consistent with app
- Large touch targets for children
- Immediate visual feedback
- Encouraging, non-judgmental language

## Implementation Notes

### Score Calculation
```typescript
function calculateReadinessScore(
  energy: number,      // 1-5
  bodyFeel: string,    // Maps to 1-5
  mood: string         // Maps to 1-5
): number {
  const bodyScore = { FRESH: 5, NORMAL: 3, TIRED: 2, SORE: 1 }[bodyFeel]
  const moodScore = { EXCITED: 5, FOCUSED: 4, OKAY: 3, TIRED: 2, STRESSED: 1 }[mood]

  return Math.round((energy + bodyScore + moodScore) / 3)
}

function getRecommendedMode(score: number): 'RECOVER' | 'BUILD' | 'PUSH' {
  if (score <= 2) return 'RECOVER'
  if (score <= 3) return 'BUILD'
  return 'PUSH'
}
```

### Integration Points
- **Training Page**: Show readiness check before drill selection
- **Activity Log**: Store readiness data with logged activities
- **Progress Page**: Track readiness trends over time
- **Parent Dashboard**: View child's readiness patterns

## Safety Considerations

1. **Never push tired children** - Recover mode is always valid
2. **Parent visibility** - Parents can see readiness history
3. **No judgment** - All modes are presented positively
4. **Override allowed** - Children can choose different mode (logged)

## Future Enhancements

- Readiness trends analysis
- Smart recommendations based on recent activity history
- Recovery time suggestions after games
- Sleep/nutrition correlation (with parent consent)

## Related Issues
- Part of Phase 2: Enhanced Training
- Depends on: Activity logging (#20)
- Enhances: Training page flow

## Status
**Planned** - Not yet implemented
