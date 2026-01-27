'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { ChildProfileCard, ParentTrustCard } from '@/components/pitchdreams'

interface Child {
  id: string
  nickname: string
  age: number
  position: string | null
  avatarColor: string
  sessionCount: number
  currentStreak: number
}

interface ParentDashboardContentProps {
  children: Child[]
}

export function ParentDashboardContent({ children }: ParentDashboardContentProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Track progress and manage settings for your children.
        </p>
      </div>

      {/* Trust Card */}
      <div className="mb-8">
        <ParentTrustCard
          onLearnMore={() => {
            // TODO: Open ParentTrustSafetyModal
            console.log('Open trust modal')
          }}
        />
      </div>

      {/* Children Grid */}
      {children.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Children
            </h2>
            <Button
              variant="secondary"
              size="md"
              onClick={() => router.push('/parent/add-child')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Child
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => (
              <ChildProfileCard
                key={child.id}
                childId={child.id}
                nickname={child.nickname}
                age={child.age}
                position={child.position || undefined}
                avatarColor={child.avatarColor}
                sessionCount={child.sessionCount}
                currentStreak={child.currentStreak}
                onViewProgress={() => {
                  router.push(`/child/${child.id}/progress`)
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            You haven't added any children yet.
          </p>
          <button
            onClick={() => router.push('/parent/onboarding')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Add your first child →
          </button>
        </div>
      )}
    </div>
  )
}
