import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'

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
