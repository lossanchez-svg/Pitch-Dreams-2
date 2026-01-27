'use client'

import { useRouter } from 'next/navigation'
import { Flame, Trophy, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ConsistencyRingCard, DrillCard } from '@/components/pitchdreams'

interface Drill {
  id: string
  title: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
}

interface ChildHomeContentProps {
  childId: string
  currentStreak: number
  suggestedDrills: Drill[]
}

export function ChildHomeContent({
  childId,
  currentStreak,
  suggestedDrills,
}: ChildHomeContentProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Welcome Header */}
      <div className="mb-8">
        <p className="hud-label mb-2">Training Dashboard</p>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Welcome back, player.
        </h1>
        <p className="text-gray-300">
          Lock in. Build your foundation. Every session counts.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Streak */}
        <Card variant="hud" className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="h-6 w-6 text-primary-400" />
            <h3 className="font-display text-lg text-gray-100">Current Streak</h3>
          </div>
          <p className="font-mono text-4xl text-primary-400 mb-1">{currentStreak}</p>
          <p className="text-sm text-gray-400">consecutive days</p>
        </Card>

        {/* Consistency Ring */}
        <div className="md:col-span-2">
          <ConsistencyRingCard
            streak={currentStreak}
            maxStreak={30}
          />
        </div>
      </div>

      {/* Primary CTA */}
      <div className="hud-frame hud-panel p-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
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
            onClick={() => router.push(`/child/${childId}/training`)}
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
          {suggestedDrills.map((drill) => (
            <DrillCard
              key={drill.id}
              title={drill.title}
              category={drill.category}
              difficulty={drill.difficulty}
              duration={drill.duration}
              onSelect={() => router.push(`/child/${childId}/training?drillId=${drill.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center py-6 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          Smart players win before the ball moves.
        </p>
      </div>
    </div>
  )
}
