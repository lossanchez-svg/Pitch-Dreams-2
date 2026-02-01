import { verifyChildOwnership } from '@/lib/child-helpers'
import { NewActivityContent } from './NewActivityContent'
import {
  getSavedFacilities,
  getRecentFacilities,
  getSavedCoaches,
  getRecentCoaches,
  getSavedPrograms,
  getRecentPrograms,
  getFocusTags,
  getHighlightChips,
  getNextFocusChips,
} from '../actions'

interface NewActivityPageProps {
  params: {
    childId: string
  }
}

export default async function NewActivityPage({ params }: NewActivityPageProps) {
  // Verify ownership
  const { child } = await verifyChildOwnership(params.childId)

  // Fetch all reference data in parallel
  const [
    savedFacilities,
    recentFacilities,
    savedCoaches,
    recentCoaches,
    savedPrograms,
    recentPrograms,
    focusTags,
    highlightChips,
    nextFocusChips,
  ] = await Promise.all([
    getSavedFacilities(),
    getRecentFacilities(),
    getSavedCoaches(),
    getRecentCoaches(),
    getSavedPrograms(),
    getRecentPrograms(),
    getFocusTags(),
    getHighlightChips(),
    getNextFocusChips(),
  ])

  return (
    <NewActivityContent
      childId={params.childId}
      childName={child.nickname}
      savedFacilities={savedFacilities}
      recentFacilities={recentFacilities}
      savedCoaches={savedCoaches}
      recentCoaches={recentCoaches}
      savedPrograms={savedPrograms}
      recentPrograms={recentPrograms}
      focusTags={focusTags}
      highlightChips={highlightChips}
      nextFocusChips={nextFocusChips}
    />
  )
}
