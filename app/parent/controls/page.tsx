import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ParentControlsContent } from '@/components/pitchdreams/ParentControlsContent'

interface ParentControlsPageProps {
  searchParams: {
    childId?: string
  }
}

export default async function ParentControlsPage({ searchParams }: ParentControlsPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  // Get childId from query params or use the first child
  let childId = searchParams.childId

  if (!childId) {
    const firstChild = await prisma.childProfile.findFirst({
      where: { parentId: session.user.id },
      select: { id: true },
    })

    if (!firstChild) {
      redirect('/parent/dashboard')
    }

    childId = firstChild.id
  }

  // Fetch child data with ownership verification
  const child = await prisma.childProfile.findFirst({
    where: {
      id: childId,
      parentId: session.user.id, // Ownership verification
    },
    select: {
      id: true,
      nickname: true,
      age: true,
      freeTextEnabled: true,
    },
  })

  if (!child) {
    redirect('/parent/dashboard')
  }

  return <ParentControlsContent child={child} />
}
