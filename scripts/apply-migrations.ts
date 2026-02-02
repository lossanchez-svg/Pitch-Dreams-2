/**
 * Script to apply pending database migrations
 * Run with: npx tsx scripts/apply-migrations.ts
 *
 * This script reads SQL migration files and applies them to the database.
 * Use this when prisma db push or prisma migrate deploy isn't working.
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function applyMigrations() {
  console.log('Starting migration application...')

  const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations')

  if (!fs.existsSync(migrationsDir)) {
    console.log('No migrations directory found.')
    return
  }

  const migrationFolders = fs.readdirSync(migrationsDir)
    .filter(f => fs.statSync(path.join(migrationsDir, f)).isDirectory())
    .sort()

  for (const folder of migrationFolders) {
    const sqlFile = path.join(migrationsDir, folder, 'migration.sql')

    if (fs.existsSync(sqlFile)) {
      console.log(`\nApplying migration: ${folder}`)

      const sql = fs.readFileSync(sqlFile, 'utf-8')

      try {
        await prisma.$executeRawUnsafe(sql)
        console.log(`✓ Migration ${folder} applied successfully`)
      } catch (error: unknown) {
        const err = error as Error & { code?: string }
        // Ignore "already exists" errors
        if (err.code === '42P07' || err.message?.includes('already exists')) {
          console.log(`✓ Migration ${folder} - table already exists (skipped)`)
        } else {
          console.error(`✗ Migration ${folder} failed:`, err.message)
        }
      }
    }
  }

  console.log('\nMigration application complete.')
}

applyMigrations()
  .catch((e) => {
    console.error('Migration script error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
