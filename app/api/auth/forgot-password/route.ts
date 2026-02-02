import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'

// Helper to check if error is a Prisma table-not-found error
function isTableNotFoundError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const err = error as { code?: string; message?: string }
    // P2021: table does not exist, P2010: raw query failed
    if (err.code === 'P2021' || err.code === 'P2010') return true
    if (err.message?.includes('does not exist')) return true
    if (err.message?.includes('relation') && err.message?.includes('does not exist')) return true
  }
  return false
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.parentUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      // Log for debugging but don't reveal to user
      console.log(`Password reset requested for non-existent email: ${email}`)
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a reset link will be sent.',
      })
    }

    // Generate a secure reset token
    const resetToken = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    try {
      // Delete any existing reset tokens for this user
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      })

      // Create new reset token
      await prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          userId: user.id,
          expires,
        },
      })
    } catch (dbError) {
      // Check if this is a "table doesn't exist" error
      if (isTableNotFoundError(dbError)) {
        console.error('Database table missing: password_reset_tokens')
        console.error('Run the migration: prisma/migrations/20260202_add_password_reset_tokens/migration.sql')
        return NextResponse.json(
          { error: 'Password reset is temporarily unavailable. Please contact support.' },
          { status: 503 }
        )
      }
      throw dbError
    }

    // Build reset URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    // Log the reset URL for development (in production, this would send an email)
    console.log('='.repeat(60))
    console.log('PASSWORD RESET REQUESTED')
    console.log(`Email: ${email}`)
    console.log(`Reset URL: ${resetUrl}`)
    console.log(`Expires: ${expires.toISOString()}`)
    console.log('='.repeat(60))

    // TODO: In production, send email using a service like SendGrid, Resend, etc.
    // Example:
    // await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, a reset link will be sent.',
      // Only include debug info in development
      ...(process.env.NODE_ENV === 'development' && {
        debug: { resetUrl, expires: expires.toISOString() }
      }),
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    )
  }
}
