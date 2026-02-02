-- CreateTable: password_reset_tokens
-- This migration adds the password_reset_tokens table for password reset functionality

CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "password_reset_tokens_userId_idx" ON "password_reset_tokens"("userId");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'password_reset_tokens_userId_fkey'
    ) THEN
        ALTER TABLE "password_reset_tokens"
        ADD CONSTRAINT "password_reset_tokens_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "parent_users"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
