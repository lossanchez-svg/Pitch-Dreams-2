# Feature: Dark HUD Theme & Breadcrumbs

**Issues:** #7, #8, #9, #10

## Overview
Established the visual foundation for Pitch Dreams with a dark HUD aesthetic inspired by sports tech interfaces.

## Components

### Theme System
- **Primary:** Cyan (#06B6D4) - Actions, links, active states
- **Accent:** Purple (#8B5CF6) - Highlights, achievements
- **Background:** Dark grays (#0a0a0a to #1a1a1a)
- **Text:** White/gray hierarchy

### CSS Classes
```css
.hud-label     /* Uppercase tracking-wider labels */
.hud-panel     /* Bordered panels with glow */
.hud-button    /* Gradient buttons with hover effects */
```

### Breadcrumb Navigation
- Location: `components/ui/Breadcrumb.tsx`
- Auto-generates from route path
- Shows: Home > Section > Page
- Mobile: Collapses to back arrow

### Route Guards & RBAC
- Parent routes: `/parent/*`
- Child routes: `/child/[childId]/*`
- Ownership verification via `verifyChildOwnership()`

## Files Changed
- `tailwind.config.ts` - Color palette
- `app/globals.css` - HUD utility classes
- `components/ui/Breadcrumb.tsx` - Navigation
- `lib/child-helpers.ts` - Ownership checks
- `app/child/[childId]/layout.tsx` - Child layout

## Design Decisions
- Dark theme only (no light mode for MVP)
- Monospace fonts for labels (JetBrains Mono)
- Display font for headings (Rajdhani)
