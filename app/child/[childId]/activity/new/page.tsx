import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { NewActivityContent } from './NewActivityContent'

interface NewActivityPageProps {
  params: {
    childId: string
  }
}

export default async function NewActivityPage({ params }: NewActivityPageProps) {
  // Verify ownership
  const { child } = await verifyChildOwnership(params.childId)

  // Fetch reference data
  const [facilities, focusTags, highlightChips, nextFocusChips] = await Promise.all([
    prisma.facility.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.focusTag.findMany({
      orderBy: [{ category: 'asc' }, { label: 'asc' }],
    }),
    prisma.highlightChip.findMany({
      orderBy: { label: 'asc' },
    }),
    prisma.nextFocusChip.findMany({
      orderBy: { label: 'asc' },
    }),
  ])

  return (
    <NewActivityContent
      childId={params.childId}
      childName={child.nickname}
      facilities={facilities}
      focusTags={focusTags}
      highlightChips={highlightChips}
      nextFocusChips={nextFocusChips}
    />
  )
}
