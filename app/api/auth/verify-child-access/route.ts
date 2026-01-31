import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

/**
 * API endpoint to verify if the current user has access to a specific child.
 * Used for client-side authorization checks.
 *
 * GET /api/auth/verify-child-access?childId=xxx
 *
 * Returns:
 * - 200 { authorized: true } if the parent owns the child
 * - 200 { authorized: false } if the parent doesn't own the child
 * - 401 if not authenticated
 * - 400 if childId is missing
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const childId = searchParams.get('childId')

    if (!childId) {
      return NextResponse.json(
        { error: 'childId is required' },
        { status: 400 }
      )
    }

    const parentId = session.user.id

    // Check if the parent owns this child
    const child = await prisma.childProfile.findUnique({
      where: { id: childId },
      select: { parentId: true },
    })

    const authorized = child?.parentId === parentId

    return NextResponse.json({
      authorized,
      childId,
      parentId,
    })
  } catch (error) {
    console.error('Verify child access error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
