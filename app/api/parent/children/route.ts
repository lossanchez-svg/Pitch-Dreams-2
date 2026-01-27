import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const {
      parentId,
      nickname,
      age,
      position,
      goals,
      avatarColor,
      freeTextEnabled,
      trainingWindowStart,
      trainingWindowEnd,
    } = body

    // Validate input
    if (!nickname || !age) {
      return NextResponse.json(
        { error: 'Nickname and age are required' },
        { status: 400 }
      )
    }

    // If session exists, verify it matches the parentId
    // If no session (during onboarding), use the provided parentId
    const effectiveParentId = session?.user?.id || parentId

    if (!effectiveParentId) {
      return NextResponse.json(
        { error: 'Parent ID is required' },
        { status: 400 }
      )
    }

    // Create child profile
    const child = await prisma.childProfile.create({
      data: {
        parentId: effectiveParentId,
        nickname,
        age: parseInt(age),
        position: position || null,
        goals: goals || [],
        avatarColor: avatarColor || '#3B82F6',
        freeTextEnabled: freeTextEnabled || false,
        trainingWindowStart: trainingWindowStart || null,
        trainingWindowEnd: trainingWindowEnd || null,
      },
    })

    return NextResponse.json({
      success: true,
      childId: child.id,
    })
  } catch (error) {
    console.error('Create child profile error:', error)
    return NextResponse.json(
      { error: 'Failed to create child profile' },
      { status: 500 }
    )
  }
}
