'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { ChildProfileCard, ParentTrustCard, ParentTrustSafetyModal } from '@/components/pitchdreams'
import { ActivitySummaryCard, type ActivitySummary } from './ActivitySummaryCard'

interface Child {
  id: string
  nickname: string
  age: number
  position: string | null
  avatarColor: string
  sessionCount: number
  currentStreak: number
  activitySummaries?: ActivitySummary[]
  totalActivities?: number
  totalMinutes?: number
  avgGameIQScore?: number
}

interface ParentDashboardContentProps {
  children: Child[]
}

export function ParentDashboardContent({ children }: ParentDashboardContentProps) {
  const router = useRouter()
  const [showTrustModal, setShowTrustModal] = useState(false)

  // Check if any child has activity data
  const hasActivityData = children.some(child => (child.totalActivities || 0) > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track progress and manage settings for your children.
        </p>
      </div>

      {/* Trust Card */}
      <div className="mb-8">
        <ParentTrustCard
          onLearnMore={() => setShowTrustModal(true)}
        />
      </div>

      {/* Trust & Safety Modal */}
      {showTrustModal && (
        <ParentTrustSafetyModal
          mode="continue"
          ctaText="Got it"
          onComplete={() => setShowTrustModal(false)}
        />
      )}

      {/* Children Grid */}
      {children.length > 0 ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
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

          {/* Activity Summaries */}
          {(hasActivityData || children.length > 0) && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Activity Mix
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children.map((child) => (
                  <ActivitySummaryCard
                    key={child.id}
                    childName={child.nickname}
                    summaries={child.activitySummaries || []}
                    totalActivities={child.totalActivities || 0}
                    totalMinutes={child.totalMinutes || 0}
                    avgGameIQScore={child.avgGameIQScore || 0}
                    period="This Month"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven't added any children yet.
          </p>
          <button
            onClick={() => router.push('/parent/onboarding')}
            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
          >
            Add your first child →
          </button>
        </div>
      )}
    </div>
  )
}
