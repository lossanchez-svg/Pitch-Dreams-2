# Feature: Drill Animations (Scanning & Decision Chain)

**Issues:** #15, #16, #17, #18, #19

## Overview
Interactive skill track drills with animated avatars teaching game IQ concepts like scanning and decision-making.

## Skill Tracks

### Scanning Drills
Train players to check their surroundings before receiving the ball.

| Drill | Description | Duration |
|-------|-------------|----------|
| 3-Point Scan | Look left, right, behind | 2 min |
| Shoulder Check | Quick glance over shoulder | 2 min |
| Full 360 | Complete awareness scan | 3 min |

### Decision Chain Drills
Train quick decision-making sequences.

| Drill | Description | Duration |
|-------|-------------|----------|
| Pass or Dribble | Read defender, choose action | 3 min |
| Space Recognition | Find open lanes | 3 min |
| Pressure Response | React to closing defender | 4 min |

## Components

### Animation System
- `components/pitchdreams/DrillAnimation.tsx` - Base animator
- `components/pitchdreams/ScanningAnimation.tsx` - Scanning visuals
- `components/pitchdreams/DecisionChainAnimation.tsx` - Decision visuals

### Avatar
- Simplified player figure
- Directional indicators (arrows, highlights)
- Pulsing attention markers
- Color-coded zones (safe=green, danger=red)

### Drill Flow
1. Introduction screen with "Why It Matters"
2. Animation demonstration
3. Interactive practice (tap to indicate scan)
4. Completion + confidence rating

## Data Model
```prisma
model SkillTrackDrill {
  id                   String
  key                  String @unique  // "scanning.3point_scan"
  title                String
  track                String          // "scanning" | "decision_chain"
  durationMinutes      Int
  animationKey         String
  whyItMatters         String
  coachTips            Json
  metricConfig         Json
}

model SkillTrackDrillLog {
  childId    String
  drillId    String
  repsCount  Int?
  confidence Int?      // 1-5
  metricData Json?
}
```

## Files Changed
- `prisma/schema.prisma` - Drill models
- `app/child/[childId]/training/skill-tracks/`
- `components/pitchdreams/` - Animation components
