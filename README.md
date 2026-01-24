# Pitch Dreams ⚽

A safe, web-first platform for youth soccer players (ages 8–18) to train, learn, and track progress—with parent controls and privacy-by-design.

## 🎯 Mission

Build discipline around training, learning the game off-field, and simple progress tracking—while being safe for minors, enjoyable for kids/teens, and confidence-inspiring for parents.

## ✨ Features

### For Young Athletes
- **Daily Training Plans:** 10–20 minute guided drills personalized by age, position, and goals
- **Quick Log:** Log sessions in under 60 seconds (4 taps, not typing)
- **Progress Tracking:** Streaks, personal bests, consistency charts
- **Learn the Game:** Micro-lessons (2–4 min read) + quick quizzes
- **Skill Challenges:** Juggling, wall passes, cone weave speed

### For Parents
- **Full Control:** Create/manage child profiles, set permissions, export/delete data
- **Safety First:** No ads, minimal data collection, no social features
- **Weekly Summaries:** Optional email updates on child's progress
- **Transparency:** Plain-English privacy policy, clear safety commitments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pitch-dreams
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `DATABASE_URL`: Use default for SQLite dev, or add Postgres URL for production

4. **Initialize database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database:**
   ```bash
   npm run db:seed
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
pitch-dreams/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── auth/             # Authentication endpoints
│   ├── parent/               # Parent-facing pages
│   │   ├── onboarding/       # Parent signup + child creation
│   │   ├── dashboard/        # Parent dashboard
│   │   └── controls/         # Child permissions, export, delete
│   ├── child/                # Child-facing pages
│   │   ├── [childId]/
│   │   │   ├── home/         # Start training CTA
│   │   │   ├── training/     # Drill sessions
│   │   │   ├── log/          # Quick session log
│   │   │   ├── progress/     # Streaks, PBs, consistency
│   │   │   ├── learn/        # Lessons + quizzes
│   │   │   └── challenges/   # Skill challenges
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Marketing homepage
├── components/               # Reusable UI components
│   └── ui/                   # Button, Card, Input, etc.
├── lib/                      # Utilities and helpers
│   ├── db.ts                 # Prisma client
│   ├── auth.ts               # NextAuth config
│   ├── rbac.ts               # Role-based access control
│   ├── filterText.ts         # Text filtering (safety)
│   ├── streak.ts             # Streak calculation
│   └── utils.ts              # Misc utilities
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data (12 drills, 6 lessons, 3 challenges)
├── types/                    # TypeScript type definitions
└── package.json
```

## 🗄️ Database Schema

### Core Models
- **ParentUser:** Parent accounts (email, password hash)
- **ChildProfile:** Child profiles (nickname, age, position, goals, permissions)
- **Drill:** Training drills (12 seeded: Ball Mastery, Passing, Finishing, Speed/Agility)
- **Lesson:** Learning content (6 seeded with quizzes)
- **SkillChallenge:** Measurable challenges (Juggling, Wall Passes, Cone Weave)
- **TrainingPlan:** Daily drill plans (auto-generated per child)
- **SessionLog:** Training session records (activity, effort, mood, win/focus)
- **SkillChallengeAttempt:** Challenge results (personal bests)
- **LessonProgress:** Lesson completion + quiz scores

## 🔒 Safety & Privacy

### COPPA-Aware Design
- **Minimal data collection:** Nickname + age for children (no real names, photos, location)
- **Parent controls:** All child data accessible/exportable/deletable by parent
- **No social features:** No public profiles, DMs, comments, or community feed
- **Age-gated free text:** Ages 8–13 use preset-only inputs; ages 14+ can enable limited free text (parent approval required)
- **Text filtering:** All free text filtered for profanity, contact info, URLs

### RBAC (Role-Based Access Control)
- Parents can only access their own children's data (server-side enforcement)
- Children can only access their own data
- All mutations verify ownership before executing

## 🧪 Testing

### Run tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm test:watch
```

### Key test coverage:
- RBAC helpers (`lib/rbac.ts`)
- Text filtering (`lib/filterText.ts`)
- Streak calculation (`lib/streak.ts`)
- Component rendering (Button, Card, Input)

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repo to [Vercel](https://vercel.com)
   - Add environment variables:
     - `DATABASE_URL`: Vercel Postgres connection string
     - `NEXTAUTH_URL`: Your production URL (e.g., `https://pitch-dreams.vercel.app`)
     - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - Deploy!

3. **Set up Postgres:**
   - Use Vercel Postgres, Supabase, or Neon
   - Run migrations:
     ```bash
     npx prisma migrate deploy
     ```
   - Seed production DB:
     ```bash
     npm run db:seed
     ```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler (no emit) |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema changes to DB |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:seed` | Seed database with drills/lessons/challenges |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm test` | Run tests |

## 🎨 Design System

Visit `/styleguide` to see all components in action with interactive demos.

### Brand Voice
- **Tagline:** "Train with purpose. Track your climb. Play with joy."
- **Copy Tone:** Encouraging, honest, non-manipulative
- **Child Vocabulary:**
  - "Today's Session" (not "workout")
  - "Next Targets" (not "goals")
  - "My Climb" (not "progress")
  - "Game IQ" (not "learn")
  - "Consistency Chain" (not "streak" - and it "pauses," not "breaks")

### Colors
- **Primary (Training Energy):** Blue (`#3B82F6`) – CTAs, links, action states
- **Accent (Progress/Win):** Green (`#22C55E`) – Success, consistency, achievements
- **Semantic:** Success, Warning, Error, Info with proper light/dark mode support
- **Reduced Motion:** All animations respect `prefers-reduced-motion`

### PitchDreams Component Library

Located in `/components/pitchdreams/`:

#### Parent Trust & Safety
- `ParentTrustSafetyModal` - 6-card trust pledge modal
- `ParentTrustBanner` - Dashboard reassurance banner

#### Child Core Loop
- `PrimaryCTASection` - Hero CTA for child home with randomized encouragement
- `DrillCard` - Training drill selection cards with pro tips
- `CompletionToast` - Non-spammy success feedback

#### Tap-First Logging
- `RpeSlider` - 1–10 effort rating with visual feedback
- `MoodPicker` - 5-option mood selection (great/good/okay/tired/off)
- `ChoiceChips` - Multi-select preset chips for wins & focus areas

#### Progress & Consistency
- `ConsistencyChainBadge` - Non-punitive streak display
- `ConsistencyChainCard` - Full consistency card with paused state

#### Locked States
- `LockedState` - Generic locked feature display
- `PermissionLockedState` - Parent-controlled feature gate
- `AgeGatedState` - Age-appropriate feature restriction

All components follow:
- Privacy-first design (no social comparisons, no shame language)
- Accessibility best practices (WCAG 2.1 AA, keyboard nav, screen readers)
- Touch-friendly targets (48×48px minimum)
- Light/dark mode support
- Reduced motion support

### Typography
- **Font:** Inter (body), DM Sans (headings)
- **Scales:** Display, Heading, Body, Caption with proper hierarchy

### Accessibility
- WCAG 2.1 AA compliant (color contrast, keyboard nav, screen reader support)
- Touch targets: min 48×48px for child mode, 44×44px for parent mode
- Focus indicators on all interactive elements
- Semantic HTML with proper ARIA labels

## 🤝 Contributing

This is a personal project for educational purposes. If you'd like to contribute:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See `LICENSE` file for details

## 🙏 Acknowledgments

- Drill content inspired by soccer coaching best practices
- Lesson content reviewed for age-appropriateness
- Built with Next.js, Prisma, Tailwind CSS, and NextAuth

---

**Built with safety, privacy, and youth development in mind.** 🥅⚽
