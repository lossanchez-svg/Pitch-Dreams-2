# CI/CD Setup Guide for Pitch Dreams

This document explains the complete CI/CD setup for the Pitch Dreams application using GitHub Actions and Vercel.

## Overview

The CI/CD pipeline consists of:

1. **Continuous Integration (CI)** - Automated testing, linting, and building on every push/PR
2. **Continuous Deployment (CD)** - Automatic deployment to Vercel on main branch updates
3. **Preview Deployments** - Automatic preview environments for pull requests

## Architecture: Ralph Wiggum Model

The "Ralph Wiggum" CI/CD model prioritizes simplicity and reliability:
- ✅ Simple, easy to understand workflows
- ✅ Fast feedback loops (< 5 minutes)
- ✅ Automatic deployments (no manual steps)
- ✅ Preview environments for every PR
- ✅ Clear pass/fail criteria

Named after Ralph Wiggum because it's simple enough that even Ralph could understand it!

## GitHub Actions Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main` or `develop` branches.

**Jobs:**
1. **Lint & Type Check**
   - Runs ESLint
   - Runs TypeScript type checking
   - Fast fail for code quality issues

2. **Build Application**
   - Runs Next.js build
   - Ensures application can be built successfully
   - Uses dummy env vars for build-time checks

3. **Run Tests**
   - Executes Jest test suite
   - Currently passes with no tests (ready for future tests)
   - Runs in parallel with build job

**Status:** ✅ Ready to use

### 2. Deploy Preview Workflow (`.github/workflows/deploy-preview.yml`)

Runs on every pull request to create preview deployments.

**Features:**
- Automatic Vercel preview deployment
- PR comment with preview URL
- Environment isolation for testing

**Status:** ⚠️ Requires setup (see below)

## Setup Instructions

### Step 1: GitHub Actions (Already Complete)

The workflow files are already in place. GitHub Actions will automatically detect them.

### Step 2: Vercel Integration

#### Option A: Automatic (Recommended)

Vercel is already connected to your GitHub repository. It will automatically:
- Deploy main branch to production: `https://pitch-dreams-2-u139.vercel.app`
- Create preview deployments for pull requests
- Run builds with your configured environment variables

**No additional setup needed!** ✅

#### Option B: Manual GitHub Actions Integration (Optional)

If you want GitHub Actions to control Vercel deployments:

1. Get your Vercel token:
   ```bash
   vercel login
   vercel whoami  # Get your user info
   ```

2. Go to Vercel Dashboard → Settings → Tokens
   - Create a new token
   - Copy the token

3. Add to GitHub Secrets:
   - Go to: https://github.com/lossanchez-svg/Pitch-Dreams-2/settings/secrets/actions
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: [your token]
   - Click "Add secret"

4. Get Vercel project info:
   ```bash
   vercel link
   # Follow prompts to link to your project
   ```

5. Add more secrets:
   - `VERCEL_ORG_ID` - From `.vercel/project.json`
   - `VERCEL_PROJECT_ID` - From `.vercel/project.json`

### Step 3: Environment Variables in Vercel

Ensure these are set in Vercel Dashboard → Settings → Environment Variables:

1. **DATABASE_URL** - Supabase connection string
2. **DIRECT_URL** - Direct database connection (optional)
3. **NEXTAUTH_URL** - `https://pitch-dreams-2-u139.vercel.app`
4. **NEXTAUTH_SECRET** - Random secret (generate with `openssl rand -base64 32`)

## Workflow Triggers

### Automatic Deployments

**Production (Main Branch):**
```
git push origin main
→ CI runs (lint, typecheck, build, test)
→ Vercel auto-deploys to production
→ Available at: https://pitch-dreams-2-u139.vercel.app
```

**Preview (Pull Requests):**
```
Create PR → main
→ CI runs on PR commits
→ Vercel creates preview deployment
→ Preview URL added as comment on PR
```

**Development:**
```
git push origin develop
→ CI runs (lint, typecheck, build, test)
→ Feedback in GitHub Actions tab
```

## CI/CD Pipeline Flow

```
┌─────────────────┐
│  Git Push/PR    │
└────────┬────────┘
         │
         v
┌─────────────────┐
│   CI Workflow   │
├─────────────────┤
│ 1. Lint         │
│ 2. Type Check   │
│ 3. Build        │
│ 4. Test         │
└────────┬────────┘
         │
         ├─ PASS ─────┐
         │            │
         v            v
┌─────────────────┐  ┌──────────────────┐
│ Vercel Deploy   │  │  PR Status ✅    │
│ (Automatic)     │  │  "Checks Passed" │
└─────────────────┘  └──────────────────┘
         │
         v
┌─────────────────┐
│   Live Site!    │
└─────────────────┘
```

## Multi-Child Profile Support

### Database Schema

The schema supports multiple children per parent:

```prisma
model ParentUser {
  id            String    @id @default(cuid())
  email         String    @unique
  childProfiles ChildProfile[]  // One-to-many relation
}

model ChildProfile {
  id       String @id @default(cuid())
  parentId String
  nickname String
  age      Int
  parent   ParentUser @relation(fields: [parentId], references: [id])
}
```

### UI Flow

1. **First Child** - Added during onboarding (`/parent/onboarding`)
2. **Additional Children** - Added via dashboard (`/parent/add-child`)
3. **Dashboard View** - Shows all children in a grid with "Add Child" button

### API Endpoint

`POST /api/parent/children` - Creates a child profile
- During onboarding: Uses `parentId` from request body
- After login: Uses `parentId` from authenticated session
- Supports multiple children per parent automatically

## Testing the CI/CD Setup

### Test 1: Push to Main
```bash
git add .
git commit -m "test: verify CI/CD pipeline"
git push origin main
```

Check:
- ✅ GitHub Actions run successfully
- ✅ Vercel deploys automatically
- ✅ Site is live at production URL

### Test 2: Create Pull Request
```bash
git checkout -b test-feature
# Make some changes
git add .
git commit -m "feat: test feature"
git push origin test-feature
# Create PR on GitHub
```

Check:
- ✅ CI runs on PR
- ✅ Vercel creates preview deployment
- ✅ PR comment shows preview URL

### Test 3: Add Second Child
```bash
# After deployment
# 1. Login to production site
# 2. Go to Dashboard
# 3. Click "Add Child" button
# 4. Complete the form
# 5. Verify child appears in dashboard
```

## Monitoring and Logs

### GitHub Actions
- View workflow runs: https://github.com/lossanchez-svg/Pitch-Dreams-2/actions
- Check build logs, test results, and deployment status

### Vercel
- View deployments: https://vercel.com/solracs-projects-30dbcfb7/pitch-dreams-2-u139
- Check function logs for errors
- Monitor performance and analytics

## Troubleshooting

### CI Fails
1. Check GitHub Actions logs for specific error
2. Run locally: `npm run lint && npm run type-check && npm run build`
3. Fix issues and push again

### Deployment Fails
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Check database connection

### Tests Fail
1. Run locally: `npm test`
2. Check test output for failures
3. Fix tests and push

## Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] Add visual regression testing
- [ ] Set up staging environment
- [ ] Add automated database migrations
- [ ] Implement rollback strategy
- [ ] Add performance budgets
- [ ] Set up error tracking (Sentry)
- [ ] Add deployment notifications (Slack/Discord)

## Questions?

For more help:
- GitHub Actions docs: https://docs.github.com/en/actions
- Vercel docs: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment
