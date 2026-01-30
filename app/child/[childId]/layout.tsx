import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { verifyParentOwnsChild, UnauthorizedError } from '@/lib/rbac'

interface ChildIdLayoutProps {
  children: React.ReactNode
  params: { childId: string }
}

/**
 * Layout for child-specific routes.
 * Performs RBAC check to verify the logged-in parent owns this child.
 */
export default async function ChildIdLayout({
  children,
  params,
}: ChildIdLayoutProps) {
  const session = await getServerSession(authOptions)

  // If no session, redirect to login (middleware should catch this, but double-check)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const { childId } = params
  const parentId = session.user.id

  try {
    // Verify the parent owns this child
    await verifyParentOwnsChild(parentId, childId)
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      // Parent doesn't own this child - redirect to dashboard
      redirect('/parent/dashboard')
    }
    // Re-throw other errors
    throw error
  }

  // Parent is authorized - render children
  return <>{children}</>
}
