# PitchDreams Build Roadmap

## Principles
- Web-first MVP
- No video in MVP
- No social, chat, public profiles
- Tap-first logging (minors)
- "Delight without addiction"
- Original anime/HUD vibe without copyrighted assets
- Parent trust and control

## Now (MVP Milestones)

| # | Feature | Issue | Status |
|---|---------|-------|--------|
| 1 | Theme consistency + Breadcrumbs | #7-#10 | Done |
| 2 | Landing page: anime soccer clarity | #11-#14 | Done |
| 3 | Drill avatar animation system (Scanning, Decision Chain) | #15-#19 | Done |
| 4 | Unified Activity Log (1:1, team, facility, games, futsal, indoor) | #19-#20 | Done |
| 5 | Facilities/Coaches/Programs saved selections + Maps linking | #20-#21 | Done |
| 6 | Adaptive Session Mode (Check-In + Coach Nudges) | #22 | In Progress |

## Next (Phase 2: Enhanced Training)

- [x] Adaptive Session Mode (Peak/Normal/Low Battery/Recovery)
- [ ] Drill library expansion
- [ ] Skill progression tracking
- [ ] Parent dashboard improvements

## Later (Post-MVP)

- [ ] Google Places Autocomplete (paid API) to verify facilities
- [ ] Short skill animations as Lottie/WebM library expansion
- [ ] Coach views (read-only) and optional exports
- [ ] Training plan recommendations
- [ ] Performance analytics

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

## MVP Constraints
- No social features, no tracking
- Minors safety: no collecting coach contact info
- No paid APIs (Google Places deferred)
- Web-first, mobile-first, accessible
