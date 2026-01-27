# Vercel Environment Variables Setup

## Required Environment Variables

The server error you're seeing is most likely due to missing environment variables in Vercel. You need to set these in your Vercel project settings:

### 1. DATABASE_URL
Your Supabase PostgreSQL connection string (transaction pooler):
```
postgresql://postgres.[project-ref]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 2. DIRECT_URL (optional but recommended)
Your direct Supabase PostgreSQL connection string:
```
postgresql://postgres.[project-ref]:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### 3. NEXTAUTH_URL
Your deployed Vercel URL:
```
https://pitch-dreams-2-u139.vercel.app
```

### 4. NEXTAUTH_SECRET
A random secret string (generate with: `openssl rand -base64 32`):
```
[your-generated-secret]
```

## How to Set Environment Variables in Vercel

1. Go to https://vercel.com/solracs-projects-30dbcfb7/pitch-dreams-2-u139/settings/environment-variables

2. Add each variable:
   - Key: `DATABASE_URL`
   - Value: Your Supabase connection string
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

3. Repeat for all 4 variables

4. After adding all variables, go to the Deployments tab and click "Redeploy" on the latest deployment

## Check Current Environment Variables

You can verify which environment variables are set in:
- Vercel Dashboard → Your Project → Settings → Environment Variables

## Common Issues

1. **Server Error 500**: Usually means DATABASE_URL or NEXTAUTH_SECRET is missing
2. **Database Connection Error**: Check that DATABASE_URL format is correct
3. **Auth Error**: Make sure NEXTAUTH_URL matches your deployed domain exactly

## Testing After Setup

1. Visit https://pitch-dreams-2-u139.vercel.app/
2. Try to navigate to /parent/onboarding
3. Complete the signup flow
4. If you still see errors, check the Vercel Function Logs:
   - Vercel Dashboard → Your Project → Deployments → [Latest] → Functions
