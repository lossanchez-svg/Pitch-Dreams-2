#!/bin/bash

echo "🔧 Pitch Dreams - Supabase Database Setup"
echo "=========================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    echo ""
    echo "Please set your Supabase DATABASE_URL first:"
    echo "  export DATABASE_URL='your-supabase-connection-string'"
    echo ""
    echo "You can find this in Supabase:"
    echo "  1. Go to your Supabase project dashboard"
    echo "  2. Click 'Project Settings' (gear icon)"
    echo "  3. Click 'Database' in the left sidebar"
    echo "  4. Under 'Connection string', select 'URI' and copy the connection string"
    echo "  5. Replace [YOUR-PASSWORD] with your database password"
    exit 1
fi

echo "✓ DATABASE_URL is set"
echo ""

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi
echo "✓ Prisma Client generated"
echo ""

# Push schema to database
echo "🗄️  Pushing schema to Supabase..."
npx prisma db push --accept-data-loss
if [ $? -ne 0 ]; then
    echo "❌ Failed to push schema to database"
    exit 1
fi
echo "✓ Schema pushed successfully"
echo ""

# Seed the database
echo "🌱 Seeding database with drills, lessons, and challenges..."
npm run db:seed
if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi
echo "✓ Database seeded successfully"
echo ""

echo "🎉 Setup complete! Your Supabase database is ready."
echo ""
echo "Next steps:"
echo "  1. Your Vercel deployment should work now"
echo "  2. Try creating an account at your deployed URL"
