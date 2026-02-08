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
| 6 | Adaptive Session Mode (Check-In + Coach Nudges) | #22 | Done |
| 7 | Training Arcs (Vision, Tempo, Decision Chain) | #23 | Done |

## Next (Phase 2: Enhanced Training)

- [x] Adaptive Session Mode (Peak/Normal/Low Battery/Recovery)
- [x] Training Arcs with anime-style progression
- [ ] Drill library expansion
- [ ] Skill progression tracking
- [ ] Parent dashboard improvements

## Post-Issue-Closure: RC Testing & Launch

The following steps happen after all MVP issues are closed:

### 1. Release Candidate Checkpoint
- Tag `v0.1.0-rc` on main branch
- Lock main for bugfix-only (no new features)
- Generate CHANGELOG.md entry
- See: [008-release-candidate-and-testing.md](features/008-release-candidate-and-testing.md)

### 2. End-to-End Happy Path Testing
- **Child Flow**: Landing → Start → Check-In → Plan Preview → Session → Summary → Arc Progress
- **Parent Flow**: Dashboard → Safety/Trust → "What is an Arc?" → Controls
- Document any bugs found, fix before pilot

### 3. Pilot Test (3-5 Users)
- Recruit 3-5 real users (parents + children)
- Observe without explaining
- Ask only 3 questions post-session
- Ignore feature requests (note for v0.2)

### 4. Pattern Analysis & v0.2 Focus Selection
- Identify ONE theme from pilot observations
- Select v0.2 focus area (e.g., drill library, parent dashboard, etc.)
- Document decision

### 5. Hosting Migration
- Migrate from Netlify to chosen host (Vercel recommended)
- Update DNS at Porkbun for pitchdreams.soccer and pitchdreams.com
- See: [009-hosting-migration-from-netlify.md](features/009-hosting-migration-from-netlify.md)

### 6. Parent Safety/Trust & Onboarding Docs
- Finalize parent-facing documentation
- Ensure onboarding flow is clear and safe

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
