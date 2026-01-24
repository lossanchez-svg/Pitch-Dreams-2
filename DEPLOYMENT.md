# E) GitHub + Vercel Deployment Guide

Complete step-by-step instructions for deploying Pitch Dreams to production.

## Prerequisites

- GitHub account
- Vercel account (free Hobby plan)
- Node.js 18+ installed locally
- Git installed

---

## Part 1: GitHub Repository Setup

### Step 1: Initialize Git (if not already done)

```bash
cd "/Users/lossa/Documents/Side Projects/Pitch Dreams"

# Check if git is already initialized
git status

# If not initialized:
git init
git add .
git commit -m "feat: complete design system implementation

- Enhanced Tailwind config with full design token system
- Added shadcn/ui dependencies (Radix UI, Framer Motion, Recharts)
- Created comprehensive design system documentation
- Implemented styleguide page at /styleguide
- Updated package.json with all required dependencies"
```

### Step 2: Create GitHub Repository

**Option A: Using GitHub Website (Recommended)**

1. Go to: https://github.com/new
2. Repository details:
   - **Name:** `pitch-dreams` or `Pitch-Dreams-2` (if first one exists)
   - **Description:** "Safe soccer training app for youth athletes (ages 8-18) with parent controls and privacy-by-design"
   - **Visibility:** Public (or Private if preferred)
   - **DO NOT** initialize with README, .gitignore, or license (we have these)
3. Click **"Create repository"**

**Option B: Using GitHub CLI**

```bash
# Authenticate (if not already)
gh auth login

# Create and push repository
gh repo create pitch-dreams --public --source=. --remote=origin --push
```

### Step 3: Push to GitHub

```bash
# Add remote (if using Option A)
git remote add origin https://github.com/YOUR_USERNAME/pitch-dreams.git

# Push code
git branch -M main
git push -u origin main
```

### Step 4: Verify Repository

Visit your repository: `https://github.com/YOUR_USERNAME/pitch-dreams`

You should see all files including:
- ✅ `README.md`
- ✅ `DESIGN_SYSTEM.md`
- ✅ `tailwind.config.ts` (enhanced)
- ✅ `package.json` (with new dependencies)
- ✅ `app/styleguide/page.tsx`
- ✅ Complete file structure

---

## Part 2: Vercel Deployment

### Step 1: Connect Repository to Vercel

1. Go to: https://vercel.com
2. Click **"Add New"** → **"Project"**
3. **Import Git Repository:**
   - Click **"Import"** next to your `pitch-dreams` repository
   - If you don't see it, click **"Adjust GitHub App Permissions"** and grant access

### Step 2: Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Build & Development Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (default, leave as-is)
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

**Node.js Version:**
- Select: **18.x** (or 20.x if available)

### Step 3: Set Environment Variables

Click **"Environment Variables"** and add the following:

#### Required Variables

```bash
# Database (see Step 4 for setup)
DATABASE_URL=postgresql://user:password@host:5432/database_name

# NextAuth
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=<generate-secret>

# Optional: Google OAuth (for parent sign-up)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Generate NEXTAUTH_SECRET:**
```bash
# Run locally:
openssl rand -base64 32
```

Copy the output and paste as `NEXTAUTH_SECRET` value.

### Step 4: Database Setup (Postgres)

You have three options for hosted Postgres:

#### Option A: Vercel Postgres (Recommended for Hobby)

1. In Vercel project dashboard, click **"Storage"** tab
2. Click **"Create Database"** → Select **"Postgres"**
3. Name: `pitch-dreams-db`
4. Region: Choose closest to your users (e.g., `us-east-1`)
5. Click **"Create"**
6. Vercel auto-adds `POSTGRES_*` env vars
7. **Important:** Copy the `POSTGRES_PRISMA_URL` value to `DATABASE_URL`

#### Option B: Supabase (Free tier, generous limits)

1. Go to: https://supabase.com
2. Create new project:
   - Name: `pitch-dreams`
   - Database password: (save securely!)
   - Region: Choose closest
3. Go to **Settings** → **Database**
4. Copy **Connection string** (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password
6. Paste into Vercel as `DATABASE_URL`

#### Option C: Neon (Generous free tier, serverless)

1. Go to: https://neon.tech
2. Create new project:
   - Name: `pitch-dreams`
   - Region: Choose closest
3. Copy **Connection string** from dashboard
4. Paste into Vercel as `DATABASE_URL`

#### Option D: SQLite Local Only (Not for production)

For local development only, use:

```bash
DATABASE_URL="file:./dev.db"
```

**Note:** SQLite won't work on Vercel (no persistent filesystem). Use Postgres for production.

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll see:
   - ✅ Build successful
   - ✅ Deployment URL: `https://pitch-dreams-xxxxx.vercel.app`

### Step 6: Run Database Migrations

After first deployment:

```bash
# Install Vercel CLI locally
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Run migrations in production
vercel env pull .env.production.local
npx prisma migrate deploy

# Seed production database (one-time)
npx prisma db seed
```

**Alternative (if above fails):**

Use Vercel CLI in production environment:

```bash
vercel env pull
npx prisma generate
npx prisma db push
npx prisma db seed
```

---

## Part 3: Post-Deployment

### Step 1: Verify Deployment

Visit your production URL: `https://your-app-name.vercel.app`

Test key pages:
- ✅ **Homepage:** Loads without errors
- ✅ **Styleguide:** `/styleguide` shows design system
- ✅ **Parent Onboarding:** `/parent/onboarding` form works
- ✅ **Database:** Sign up creates user (check Prisma Studio or database)

### Step 2: Set Up Custom Domain (Optional)

1. In Vercel project, go to **"Settings"** → **"Domains"**
2. Add your domain (e.g., `pitchdreams.com`)
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` env var to your custom domain

### Step 3: Enable Preview Deployments

Vercel automatically creates preview deployments for every pull request.

**Branch naming convention:**
- `main` → Production
- `develop` → Staging (optional)
- `feature/*` → Preview deployments

**Test workflow:**
1. Create branch: `git checkout -b feature/new-component`
2. Push: `git push origin feature/new-component`
3. Create PR on GitHub
4. Vercel deploys preview → comment with URL
5. Test on preview URL
6. Merge PR → auto-deploys to production

### Step 4: Monitor Deployment

**Vercel Dashboard:**
- Deployments: See all builds (success/fail)
- Analytics: Page views, performance (Pro plan)
- Logs: Server-side logs, errors

**Health Check:**
```bash
curl https://your-app-name.vercel.app/api/health
```

Expected response: `200 OK`

---

## Part 4: Database Management

### View Data (Prisma Studio)

**Local (development):**
```bash
npm run db:studio
```

Opens: `http://localhost:5555`

**Production:**

Use your database provider's UI:
- **Vercel Postgres:** Vercel dashboard → Storage → Browse data
- **Supabase:** Supabase dashboard → Table Editor
- **Neon:** Neon dashboard → SQL Editor

### Backup Database

**Export data:**

```bash
# Using pg_dump (if Postgres)
pg_dump $DATABASE_URL > backup.sql

# Or use database provider's backup feature
```

**Restore data:**

```bash
psql $DATABASE_URL < backup.sql
```

### Run Migrations

**When schema changes:**

```bash
# Local: Create migration
npx prisma migrate dev --name add_new_field

# Push to GitHub
git add prisma/migrations
git commit -m "feat: add new field to ChildProfile"
git push

# Vercel auto-deploys, then:
vercel env pull
npx prisma migrate deploy
```

---

## Part 5: Environment Variables Reference

### Required for Production

```bash
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=<generated-secret>
```

### Optional (Feature Flags)

```bash
# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email (if adding weekly summaries)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Analytics (if adding)
VERCEL_ANALYTICS_ID=
```

### Local Development Only

```bash
# .env.local (not committed)
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-change-in-production"
```

---

## Part 6: Troubleshooting

### Build Fails

**Error:** `Module not found: Can't resolve '@/components/...'`

**Fix:** Ensure `tsconfig.json` has correct paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Error:** `Prisma Client not generated`

**Fix:** Add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Database Connection Fails

**Error:** `Can't reach database server`

**Fix:** Check `DATABASE_URL` format:

```bash
# Correct (Postgres):
postgresql://user:password@host:5432/database

# Incorrect (missing protocol):
user:password@host:5432/database
```

**Error:** `SSL connection required`

**Fix:** Append to `DATABASE_URL`:

```bash
?sslmode=require
# Or for Prisma:
?sslmode=require&sslaccept=accept_invalid_certs
```

### NextAuth Errors

**Error:** `[next-auth][error][JWT_SESSION_ERROR]`

**Fix:** Ensure `NEXTAUTH_SECRET` is set and unique (not the example value).

**Error:** `Callback URL mismatch`

**Fix:** Update `NEXTAUTH_URL` to match your deployment URL (no trailing slash).

### Deployment Checklist

Before deploying to production:

- [ ] All environment variables set in Vercel
- [ ] `DATABASE_URL` points to hosted Postgres (not SQLite)
- [ ] `NEXTAUTH_SECRET` is generated (not example value)
- [ ] `NEXTAUTH_URL` matches production domain
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] Database seeded (`npm run db:seed`)
- [ ] Test sign-up flow end-to-end
- [ ] Test parent + child user flows
- [ ] Verify RBAC enforcement (child can't access other child's data)
- [ ] Check accessibility (Lighthouse audit ≥90)
- [ ] Test on mobile devices (iOS + Android)

---

## Part 7: Continuous Deployment Workflow

### Development Flow

```bash
# 1. Create feature branch
git checkout -b feature/add-mood-picker

# 2. Make changes, test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "feat: implement mood picker component"
git push origin feature/add-mood-picker

# 4. Create pull request on GitHub
# Vercel auto-deploys preview → test on preview URL

# 5. Merge PR
# Vercel auto-deploys to production
```

### Rollback (if needed)

1. Go to Vercel dashboard → Deployments
2. Find last known good deployment
3. Click **"..."** → **"Promote to Production"**
4. Production reverts instantly (no rebuild)

---

## Part 8: Monitoring & Maintenance

### Performance Monitoring

**Vercel Analytics (Pro plan):**
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load times

**Free alternatives:**
- Google Lighthouse (run manually)
- WebPageTest: https://webpagetest.org

### Error Tracking

**Sentry (recommended):**

```bash
npm install @sentry/nextjs

# Add to next.config.js:
const { withSentryConfig } = require('@sentry/nextjs')

# Set env vars:
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

### Uptime Monitoring

**Free options:**
- UptimeRobot: https://uptimerobot.com
- Pingdom (free tier): https://www.pingdom.com

---

## Part 9: Security Best Practices

### Environment Secrets

- ✅ Never commit `.env` files to Git
- ✅ Use `.env.example` for documentation only
- ✅ Rotate secrets regularly (every 90 days)
- ✅ Use different secrets for dev/staging/prod

### Database Security

- ✅ Use strong passwords (16+ chars, random)
- ✅ Enable SSL/TLS for database connections
- ✅ Restrict database access by IP (if possible)
- ✅ Regularly backup data (automated)

### API Security

- ✅ Validate all inputs (use Zod schemas)
- ✅ Enforce RBAC on all endpoints
- ✅ Rate limit sensitive endpoints (login, signup)
- ✅ Use HTTPS only (Vercel enforces this)

---

## Part 10: Cost Estimates

### Vercel Hobby Plan (Free)
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless functions
- ✅ Preview deployments
- ❌ No analytics (upgrade to Pro: $20/mo)

### Database Hosting

**Vercel Postgres (Hobby):**
- Free tier: 256 MB storage, 60 hours compute/month
- Scales to Pro: $20/mo (512 MB, always-on)

**Supabase (Free):**
- 500 MB database
- 1 GB file storage
- 50,000 monthly active users
- Unlimited API requests

**Neon (Free):**
- 10 GB storage
- 100 hours compute/month
- Autoscaling (serverless)

### Estimated Monthly Cost (MVP)

- **Hosting (Vercel Hobby):** $0
- **Database (Supabase Free):** $0
- **Domain (optional):** $12/year (~$1/month)
- **Total:** ~$1/month (or $0 without custom domain)

---

## Summary

You now have:
- ✅ GitHub repository with all code
- ✅ Vercel deployment pipeline (auto-deploy on push)
- ✅ Hosted Postgres database
- ✅ Production URL with HTTPS
- ✅ Preview deployments for PRs
- ✅ Monitoring and rollback capabilities

**Next steps:**
1. Install dependencies: `npm install`
2. Complete component implementation (see `DESIGN_SYSTEM.md`)
3. Test locally: `npm run dev`
4. Push to GitHub
5. Vercel auto-deploys → production!

---

**Deployment Version:** 1.0.0
**Last Updated:** 2026-01-24
**Questions?** Check Vercel docs: https://vercel.com/docs
