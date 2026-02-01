'use client'

import { useRouter } from 'next/navigation'
import { Flame, Trophy, Target, Eye, Brain } from 'lucide-react'
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

      {/* Skill Tracks Section */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-primary-400 mb-4">
          Skill Tracks
        </h2>
        <p className="text-gray-400 mb-4">
          Train your brain. The best players anticipate, not just react.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scanning Track */}
          <Card
            variant="hud-panel"
            className="p-5 cursor-pointer hover:border-cyan-500/50 transition-colors group"
            onClick={() => router.push(`/child/${childId}/skills?track=scanning`)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <Eye className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-cyan-400">Scanning</h3>
                <p className="text-sm text-gray-400">See the field early</p>
              </div>
              <div className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </Card>

          {/* Decision Chain Track */}
          <Card
            variant="hud-panel"
            className="p-5 cursor-pointer hover:border-purple-500/50 transition-colors group"
            onClick={() => router.push(`/child/${childId}/skills?track=decision_chain`)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-purple-400">Decision Chain</h3>
                <p className="text-sm text-gray-400">Think 1-3 moves ahead</p>
              </div>
              <div className="text-purple-500/50 group-hover:text-purple-400 transition-colors">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </Card>
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
