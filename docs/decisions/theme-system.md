# Decision: Dark HUD Theme System

## Context
Pitch Dreams targets youth soccer players (8-14) and their parents. We needed a visual identity that feels modern, sporty, and engaging for kids while remaining professional for parents.

## Decision
Adopt a **dark HUD aesthetic** inspired by sports tech interfaces (FIFA video games, sports broadcasts, fitness apps).

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Cyan | #06B6D4 | Actions, links, active states |
| Accent | Purple | #8B5CF6 | Highlights, achievements, special |
| Success | Green | #22C55E | Completions, positive feedback |
| Warning | Amber | #F59E0B | Cautions, reminders |
| Error | Red | #EF4444 | Errors, deletions |
| Background | Dark | #0a0a0a | Base background |
| Surface | Gray | #1a1a1a | Cards, panels |
| Border | Gray | #374151 | Subtle borders |

## Typography

| Font | Usage |
|------|-------|
| Rajdhani | Display headings, hero text |
| Inter | Body text, UI elements |
| JetBrains Mono | Labels, stats, monospace |

## HUD Components

### Labels
```css
.hud-label {
  @apply text-xs font-mono uppercase tracking-wider text-gray-400;
}
```

### Panels
```css
.hud-panel {
  @apply bg-gray-900/80 border border-gray-700 rounded-lg;
  /* Optional: subtle glow on hover */
}
```

### Buttons
- Gradient backgrounds (cyan to purple)
- Glow effect on hover
- Clear disabled states

## Rationale
1. **Appeal to youth** - Gaming/sports aesthetic resonates with target age
2. **Professional feel** - Parents see a polished, trustworthy app
3. **Readability** - High contrast dark theme reduces eye strain
4. **Consistency** - Single theme simplifies development

## Alternatives Considered
- Light theme: Rejected (less engaging for kids)
- Theme switcher: Deferred (adds complexity)
- Bright colors: Rejected (less professional)

## Consequences
- Dark theme only for MVP
- All components must follow palette
- Images/illustrations need dark-friendly versions
