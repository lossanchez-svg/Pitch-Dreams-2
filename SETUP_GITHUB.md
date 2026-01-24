# GitHub Repository Setup Instructions

## Option 1: Using GitHub CLI (if installed)

If you have GitHub CLI installed, run:

```bash
gh auth login
gh repo create pitch-dreams --public --source=. --remote=origin --push
```

## Option 2: Manual Setup (via GitHub.com)

1. **Go to GitHub:**
   Visit https://github.com/new

2. **Create new repository:**
   - Repository name: `pitch-dreams`
   - Description: "Safe soccer training app for youth athletes (ages 8-18) with parent controls"
   - Visibility: Public (or Private if preferred)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Push your local code:**
   Copy the commands GitHub shows under "…or push an existing repository from the command line":

   ```bash
   git remote add origin https://github.com/lossanchez-svg/pitch-dreams.git
   git branch -M main
   git push -u origin main
   ```

## Verification

After pushing, verify your repository at:
https://github.com/lossanchez-svg/pitch-dreams

## Next Steps

1. **Enable GitHub Actions (optional):**
   - Go to repository Settings → Actions → Allow all actions
   - Add CI/CD workflows later for testing + deployment

2. **Set up Vercel deployment:**
   - Connect repository to Vercel: https://vercel.com/new
   - Import project → select `pitch-dreams` repo
   - Configure environment variables:
     - `DATABASE_URL` (Vercel Postgres connection string)
     - `NEXTAUTH_URL` (your production URL)
     - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - Deploy!

3. **Local development:**
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npm run db:seed
   npm run dev
   ```

   Visit http://localhost:3000
