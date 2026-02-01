import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Find the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      // Delete the expired token
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      })
      return NextResponse.json(
        { error: 'Reset link has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if token was already used
    if (resetToken.used) {
      return NextResponse.json(
        { error: 'This reset link has already been used. Please request a new one.' },
        { status: 400 }
      )
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(password, 12)

    // Update user's password and mark token as used
    await prisma.$transaction([
      prisma.parentUser.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ])

    console.log(`Password reset successful for user: ${resetToken.user.email}`)

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now sign in.',
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}

// GET endpoint to validate token before showing the form
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'Token is required' },
        { status: 400 }
      )
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid reset link',
      })
    }

    if (resetToken.expires < new Date()) {
      return NextResponse.json({
        valid: false,
        error: 'Reset link has expired',
      })
    }

    if (resetToken.used) {
      return NextResponse.json({
        valid: false,
        error: 'Reset link has already been used',
      })
    }

    return NextResponse.json({
      valid: true,
    })
  } catch (error) {
    console.error('Validate token error:', error)
    return NextResponse.json(
      { valid: false, error: 'Failed to validate token' },
      { status: 500 }
    )
  }
}
