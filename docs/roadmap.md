# Pitch Dreams Roadmap

## Vision
A youth soccer training app that helps kids (8-14) develop their skills through guided drills, game IQ training, and activity logging—all with a dark HUD aesthetic inspired by sports tech.

## Current Status: MVP Phase

### Completed Features

| Feature | Issue | Status |
|---------|-------|--------|
| Dark HUD Theme + Breadcrumbs | #7-#10 | Done |
| Landing Page Anime Visuals | #11-#14 | Done |
| Drill Animations (Scanning, Decision Chain) | #15-#19 | Done |
| Activity Log (Sessions & Matches) | #19-#20 | Done |
| Facilities/Coaches/Programs (Saved + Maps) | #20-#21 | Done |

### MVP Constraints
- No social features, no tracking
- Minors safety: no collecting coach contact info
- No paid APIs (Google Places deferred)
- Web-first, mobile-first, accessible

## Future Phases

### Phase 2: Enhanced Training
- [ ] Drill library expansion
- [ ] Video tutorials integration
- [ ] Skill progression tracking
- [ ] Parent dashboard improvements

### Phase 3: Advanced Features
- [ ] Google Places API integration (verified facilities)
- [ ] Training plan recommendations
- [ ] Performance analytics
- [ ] Team/club features (with proper consent flows)

## Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Prisma + PostgreSQL
- Tailwind CSS
- NextAuth.js

## Design Principles
1. **Dark HUD Aesthetic** - Sports tech feel, cyan/purple accents
2. **Child-Safe** - No social features, parent-gated controls
3. **Mobile-First** - Touch-friendly, responsive
4. **Accessible** - WCAG guidelines, clear contrast
