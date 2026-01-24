import { prisma } from './db'

/**
 * RBAC (Role-Based Access Control) utilities for server-side authorization
 */

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

/**
 * Verify that a parent can access a specific child's data
 * Throws UnauthorizedError if parent doesn't own the child
 */
export async function verifyParentOwnsChild(
  parentId: string,
  childId: string
): Promise<void> {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: { parentId: true },
  })

  if (!child || child.parentId !== parentId) {
    throw new UnauthorizedError('You do not have permission to access this child profile')
  }
}

/**
 * Verify that a child can access their own data
 * Throws UnauthorizedError if childId doesn't match the session childId
 */
export function verifyChildIsOwner(sessionChildId: string, resourceChildId: string): void {
  if (sessionChildId !== resourceChildId) {
    throw new UnauthorizedError('You can only access your own data')
  }
}

/**
 * Check if free-text input is allowed for a child
 * Returns true if age >= 14 AND freeTextEnabled = true
 */
export async function canChildUseFreeText(childId: string): Promise<boolean> {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: { age: true, freeTextEnabled: true },
  })

  if (!child) return false

  return child.age >= 14 && child.freeTextEnabled
}

/**
 * Verify that a child can use free text (for win/focus fields)
 * Throws error if age < 14 or freeTextEnabled is false
 */
export async function verifyCanUseFreeText(childId: string): Promise<void> {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: { age: true, freeTextEnabled: true },
  })

  if (!child) {
    throw new UnauthorizedError('Child profile not found')
  }

  if (child.age < 14) {
    throw new UnauthorizedError('Free text input is only available for ages 14+')
  }

  if (!child.freeTextEnabled) {
    throw new UnauthorizedError('Free text input is disabled. Ask your parent to enable it.')
  }
}
