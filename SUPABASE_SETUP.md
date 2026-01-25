# Supabase Database Setup Guide

This guide will help you set up your Supabase PostgreSQL database for Pitch Dreams.

## Step 1: Get Your Supabase Connection String

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** (gear icon in the sidebar)
4. Click **Database** in the left menu
5. Scroll to **Connection string**
6. Select **URI** tab
7. Copy the connection string (it looks like this):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
8. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 2: Set Up the Database Tables

### Option A: Using the Setup Script (Recommended)

```bash
# Export your Supabase connection string
export DATABASE_URL="postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres"

# Run the setup script
./setup-supabase.sh
```

The script will:
- Generate the Prisma Client
- Create all database tables in Supabase
- Seed the database with drills, lessons, and challenges

### Option B: Manual Setup

```bash
# Export your Supabase connection string
export DATABASE_URL="postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres"

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npm run db:seed
```

## Step 3: Verify in Vercel

Make sure your Vercel environment variables are set:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:
   - `DATABASE_URL` - Your Supabase connection string
   - `NEXTAUTH_SECRET` - A random secret (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` - (Optional) Your production URL

## Step 4: Redeploy

After setting up the database, trigger a new deployment:

```bash
# Make a small change and push
git commit --allow-empty -m "trigger deployment after database setup"
git push
```

Or click **Redeploy** in your Vercel dashboard.

## Step 5: Test Account Creation

1. Visit your deployed app
2. Try creating a new parent account
3. The "Failed to create account" error should be resolved!

## Troubleshooting

### Error: "Failed to create account"
- Verify `DATABASE_URL` is set in Vercel
- Make sure you ran the setup script to create tables
- Check Vercel deployment logs for specific database errors

### Error: "Prisma Client not found"
- The `postinstall` script in `package.json` should handle this
- Vercel automatically runs `npm install` which triggers `prisma generate`

### Tables not created
- Run `npx prisma db push` again with your DATABASE_URL
- Check Supabase dashboard to verify tables exist

## Viewing Your Data

Use Prisma Studio to view your database:

```bash
export DATABASE_URL="your-supabase-connection-string"
npx prisma studio
```

This opens a browser interface to view and edit your data.
