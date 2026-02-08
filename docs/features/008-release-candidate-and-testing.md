# 008: Release Candidate and Testing Plan

## Overview

This document outlines the process for creating a release candidate (RC), conducting end-to-end testing, running a pilot with real users, and selecting the v0.2 focus area.

## 1. Release Candidate Checkpoint

### Tagging the RC

```bash
git tag -a v0.1.0-rc -m "Release candidate for v0.1.0"
git push origin v0.1.0-rc
```

### Branch Protection

Once RC is tagged:
- Lock `main` branch for bugfix-only changes
- No new features until v0.1.0 ships
- All fixes must be reviewed before merge

### CHANGELOG Entry

Create/update `CHANGELOG.md` with:

```markdown
## [0.1.0-rc] - YYYY-MM-DD

### Added
- Training Arcs (Vision, Tempo, Decision Chain)
- Adaptive Session Mode with Check-In
- Saved Facilities/Coaches/Programs with Maps links
- Unified Activity Logging
- Anime-style landing page and HUD aesthetic
- Parent controls and safety features

### Fixed
- TypeScript strict mode compliance
- Theme consistency across all pages

### Security
- Parent-gated controls for child accounts
- No social features or public profiles
```

## 2. End-to-End Happy Path Testing

### Child Flow Test Script

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit landing page | See anime soccer hero, clear CTA |
| 2 | Click "Start Training" | Navigate to child home |
| 3 | Complete Check-In | See energy level reflected in plan |
| 4 | View Plan Preview | See appropriate drills for energy |
| 5 | Start Session | Timer starts, drill steps visible |
| 6 | Complete Session | Summary screen with RPE/mood logging |
| 7 | Check Arc Progress | Arc banner shows updated progress |

### Parent Flow Test Script

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as parent | See dashboard with child cards |
| 2 | View child progress | See session history, streaks |
| 3 | Click "What is an Arc?" | See explainer modal |
| 4 | Open Controls | See permission toggles, data export |
| 5 | Toggle a permission | Change persists on refresh |

### Bug Documentation

For each bug found:
1. Screenshot or screen recording
2. Steps to reproduce
3. Expected vs actual behavior
4. Severity (blocking, major, minor)

Fix all blocking/major bugs before pilot.

## 3. Pilot Test Plan (3-5 Users)

### Recruitment

- Target: 3-5 parent-child pairs
- Mix of soccer experience levels
- Mix of age groups (8-14)

### Observation Protocol

**DO:**
- Watch silently
- Note confusion points
- Time task completion
- Record quotes

**DON'T:**
- Explain features
- Help unless stuck
- Defend design choices
- Promise changes

### Post-Session Questions (3 Only)

1. "What was this app for?"
2. "What would you do next if I wasn't here?"
3. "Was anything confusing or frustrating?"

### What to Ignore

- Feature requests (note for v0.2, don't promise)
- "It would be cool if..." suggestions
- Comparison to other apps
- Design preferences

## 4. Pattern Analysis & v0.2 Focus

### Observation Categories

| Category | Examples |
|----------|----------|
| Navigation | Got lost, couldn't find X |
| Understanding | Didn't know what Y meant |
| Motivation | Lost interest at Z point |
| Technical | Loading, errors, crashes |

### Focus Selection Criteria

Pick ONE theme based on:
1. Most frequent observation category
2. Biggest impact on core loop
3. Feasible in 2-week sprint

### Document Decision

Create `/docs/decisions/v02-focus.md` with:
- Pilot observation summary
- Selected focus area
- Scope boundaries
- Success metrics

## 5. Definition of Done

### v0.1.0-rc Ready When:
- [ ] All MVP issues closed
- [ ] TypeScript builds without errors
- [ ] Happy path tests pass
- [ ] No blocking bugs
- [ ] RC tagged and pushed

### v0.2 Focus Selected When:
- [ ] 3-5 pilot sessions completed
- [ ] Observations documented
- [ ] ONE focus theme chosen
- [ ] Decision doc created
- [ ] Scope defined and bounded

## Timeline

| Phase | Duration | Milestone |
|-------|----------|-----------|
| RC Prep | 1 day | Tag v0.1.0-rc |
| Happy Path | 1-2 days | All paths tested |
| Pilot | 1 week | 3-5 users tested |
| Analysis | 1 day | v0.2 focus selected |
