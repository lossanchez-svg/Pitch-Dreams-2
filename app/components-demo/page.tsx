'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  SessionTimer,
  RepCounter,
  SessionOptionPicker,
  DrillStepList,
  ConsistencyRing,
  ConsistencyRingCard,
  SessionType,
} from '@/components/pitchdreams'

export default function ComponentsDemoPage() {
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null)
  const [repCount, setRepCount] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      id: '1',
      title: 'Warm up with light jogging',
      description: 'Jog around the training area for 2 minutes',
    },
    {
      id: '2',
      title: 'Dynamic stretching',
      description: 'Leg swings, arm circles, and hip rotations',
    },
    {
      id: '3',
      title: 'Ball touches practice',
      description: 'Complete 20 touches with each foot',
    },
    {
      id: '4',
      title: 'Cool down and reflect',
      description: 'Light walking and breathing exercises',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 dark hud-grid">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/hud-demo"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to HUD Demo
          </Link>
          <div className="hud-label mb-2">Component Showcase</div>
          <h1 className="font-display text-5xl text-primary-400 mb-2">
            Training Components
          </h1>
          <p className="text-gray-400">
            Interactive demo of all new session components
          </p>
        </div>

        {/* Session Option Picker */}
        <section className="mb-12">
          <h2 className="font-display text-3xl text-gray-100 mb-6">Session Option Picker</h2>
          <SessionOptionPicker
            onSelect={(type) => {
              setSelectedSession(type)
              console.log('Selected:', type)
            }}
          />
          {selectedSession && (
            <div className="mt-4 hud-chip animate-system-online">
              Selected: {selectedSession}
            </div>
          )}
        </section>

        {/* Session Timer */}
        <section className="mb-12">
          <h2 className="font-display text-3xl text-gray-100 mb-6">Session Timer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SessionTimer
              duration={300} // 5 minutes
              onComplete={() => alert('Timer complete!')}
            />
            <SessionTimer
              duration={900} // 15 minutes
              onComplete={() => alert('Timer complete!')}
            />
          </div>
        </section>

        {/* Rep Counter */}
        <section className="mb-12">
          <h2 className="font-display text-3xl text-gray-100 mb-6">Rep Counter</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-4">With target (15 reps):</p>
              <RepCounter
                target={15}
                initialValue={repCount}
                onChange={setRepCount}
                onComplete={() => alert('Target reached!')}
              />
            </div>
            <div>
              <p className="text-gray-400 mb-4">Without target (free count):</p>
              <RepCounter initialValue={0} />
            </div>
          </div>
        </section>

        {/* Drill Step List */}
        <section className="mb-12">
          <h2 className="font-display text-3xl text-gray-100 mb-6">Drill Step List</h2>
          <DrillStepList
            steps={demoSteps}
            currentStepIndex={currentStep}
            onStepComplete={(stepId) => {
              console.log('Completed step:', stepId)
              setCurrentStep((prev) => Math.min(prev + 1, demoSteps.length - 1))
            }}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30"
            >
              Previous Step
            </button>
            <button
              onClick={() => setCurrentStep(0)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Consistency Ring */}
        <section className="mb-12">
          <h2 className="font-display text-3xl text-gray-100 mb-6">Consistency Ring</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Small (3 day streak)</p>
              <div className="flex justify-center">
                <ConsistencyRing streak={3} maxStreak={7} size="sm" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-4">Medium (12 day streak)</p>
              <div className="flex justify-center">
                <ConsistencyRing streak={12} maxStreak={30} size="md" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-4">Large (25 day streak)</p>
              <div className="flex justify-center">
                <ConsistencyRing streak={25} maxStreak={30} size="lg" />
              </div>
            </div>
          </div>

          <h3 className="font-display text-2xl text-gray-100 mb-4">With Card Layout</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConsistencyRingCard streak={5} maxStreak={30} />
            <ConsistencyRingCard streak={30} maxStreak={30} />
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm italic mb-4">
            "Nice work. That's one brick in your foundation."
          </p>
          <Link
            href="/hud-demo"
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            ← Back to HUD Demo
          </Link>
        </div>
      </div>
    </div>
  )
}
