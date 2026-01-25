'use client'

import { ChildProfileCard, ParentTrustCard } from '@/components/pitchdreams'

// This will be replaced with actual data fetching from Prisma
// For now, using mock data to demonstrate the layout
const mockChildren = [
  {
    id: '1',
    nickname: 'Alex',
    age: 12,
    position: 'Midfielder',
    avatarColor: 'bg-blue-500',
    sessionCount: 8,
    currentStreak: 3,
  },
  {
    id: '2',
    nickname: 'Jordan',
    age: 15,
    position: 'Forward',
    avatarColor: 'bg-purple-500',
    sessionCount: 12,
    currentStreak: 5,
  },
]

export default function ParentDashboardPage() {
  // TODO: Replace with actual Prisma query
  // const session = await getServerSession(authOptions)
  // const children = await prisma.child.findMany({
  //   where: { parentId: session.user.id },
  //   include: {
  //     sessions: {
  //       where: {
  //         createdAt: { gte: startOfMonth(new Date()) }
  //       }
  //     }
  //   }
  // })

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
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Your Children
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockChildren.map((child) => (
            <ChildProfileCard
              key={child.id}
              childId={child.id}
              nickname={child.nickname}
              age={child.age}
              position={child.position}
              avatarColor={child.avatarColor}
              sessionCount={child.sessionCount}
              currentStreak={child.currentStreak}
              onViewProgress={() => {
                // TODO: Navigate to child progress page
                console.log(`View progress for ${child.id}`)
              }}
            />
          ))}
        </div>
      </div>

      {/* Empty State (if no children) */}
      {mockChildren.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            You haven't added any children yet.
          </p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            Add your first child →
          </button>
        </div>
      )}
    </div>
  )
}
