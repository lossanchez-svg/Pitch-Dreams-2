'use client'

import { Flame, Trophy, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ConsistencyRingCard, DrillCard } from '@/components/pitchdreams'

// Mock data - will be replaced with actual Prisma queries
const mockStreak = 5
const mockSuggestedDrills = [
  {
    id: '1',
    title: 'First Touch Control',
    category: 'Ball Control',
    difficulty: 'intermediate' as const,
    duration: 15,
  },
  {
    id: '2',
    title: 'Passing Accuracy',
    category: 'Passing',
    difficulty: 'beginner' as const,
    duration: 10,
  },
]

interface ChildHomePageProps {
  params: {
    childId: string
  }
}

export default function ChildHomePage({ params }: ChildHomePageProps) {
  // TODO: Replace with actual data fetching
  // const child = await prisma.child.findUnique({
  //   where: { id: params.childId },
  //   include: {
  //     sessions: {
  //       orderBy: { createdAt: 'desc' },
  //       take: 1
  //     }
  //   }
  // })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with Pitch Lines */}
      <div className="pitch-lines mb-8 p-8 rounded-lg">
        <div className="hud-label mb-2 animate-system-online">System Initialized</div>
        <h1 className="font-display text-5xl text-primary-400 mb-4 animate-system-online">
          Welcome back, player.
        </h1>
        <p className="text-gray-300 text-lg">
          Your training simulator is online. Ready to level up?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Consistency Tracker */}
        <ConsistencyRingCard streak={mockStreak} maxStreak={30} />

        {/* Quick Stat: Sessions This Week */}
        <Card variant="hud" className="hud-scanline">
          <div className="hud-label mb-4">This Week</div>
          <div className="flex items-center gap-4">
            <Trophy className="h-12 w-12 text-primary-400 hud-glow-cyan" />
            <div>
              <div className="font-mono text-4xl text-primary-400">3</div>
              <div className="text-sm text-gray-400">Sessions</div>
            </div>
          </div>
          <div className="mt-4 hud-chip">
            <Target className="h-4 w-4" />
            Goal: 4 sessions
          </div>
        </Card>

        {/* Quick Stat: Total Sessions */}
        <Card variant="hud" className="hud-scanline">
          <div className="hud-label mb-4">All Time</div>
          <div className="flex items-center gap-4">
            <Flame className="h-12 w-12 text-accent-400" />
            <div>
              <div className="font-display text-4xl text-accent-400">47</div>
              <div className="text-sm text-gray-400">Sessions</div>
            </div>
          </div>
          <div className="mt-4 hud-chip">
            <Trophy className="h-4 w-4" />
            Keep building
          </div>
        </Card>
      </div>

      {/* Primary CTA */}
      <div className="hud-frame hud-panel hud-scanline p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="hud-label mb-2">Training Mode</div>
            <h2 className="font-display text-3xl text-primary-400 mb-2">
              Today's Session
            </h2>
            <p className="text-gray-300">
              Start your training. Build your foundation.
            </p>
          </div>
          <Button
            variant="hud"
            size="lg"
            className="min-w-[200px]"
            onClick={() => {
              // TODO: Navigate to training page
              console.log('Start training')
            }}
          >
            Lock it in
          </Button>
        </div>
      </div>

      {/* Suggested Drills */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-primary-400 mb-4">
          Suggested Drills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSuggestedDrills.map((drill) => (
            <DrillCard
              key={drill.id}
              title={drill.title}
              category={drill.category}
              difficulty={drill.difficulty}
              duration={drill.duration}
              onSelect={() => {
                // TODO: Navigate to drill details or training
                console.log(`Selected drill: ${drill.id}`)
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic">
          "Smart players win before the ball moves."
        </p>
      </div>
    </div>
  )
}
