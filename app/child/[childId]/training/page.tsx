'use client'

import { useState } from 'react'
import {
  SessionOptionPicker,
  SessionTimer,
  RepCounter,
  DrillStepList,
  SessionType,
} from '@/components/pitchdreams'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Mock drill steps
const mockDrillSteps = [
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
    title: 'First touch control drill',
    description: 'Pass against wall, control return with different surfaces',
  },
  {
    id: '5',
    title: 'Cool down and reflect',
    description: 'Light walking and breathing exercises',
  },
]

export default function ChildTrainingPage() {
  const [sessionType, setSessionType] = useState<SessionType | null>(null)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [repCount, setRepCount] = useState(0)

  const handleSelectSession = (type: SessionType) => {
    setSessionType(type)
  }

  const handleStartSession = () => {
    setSessionStarted(true)
  }

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => [...prev, stepId])
    setCurrentStepIndex((prev) => Math.min(prev + 1, mockDrillSteps.length - 1))
  }

  const handleTimerComplete = () => {
    console.log('Timer completed!')
  }

  const allStepsComplete = completedSteps.length === mockDrillSteps.length

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="../home"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="hud-label mb-2">Training Mode</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Start Your Session
        </h1>
      </div>

      {/* Session Type Selection */}
      {!sessionType && (
        <div>
          <p className="text-gray-300 mb-6">
            Choose your training mode to begin.
          </p>
          <SessionOptionPicker onSelect={handleSelectSession} />
        </div>
      )}

      {/* Session Setup (Type selected, not started) */}
      {sessionType && !sessionStarted && (
        <div className="space-y-6">
          <Card variant="hud-panel" className="p-6">
            <div className="hud-label mb-4">Session Type</div>
            <p className="text-gray-300 mb-6">
              You selected: <span className="text-primary-400 font-display text-xl">{sessionType}</span>
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => setSessionType(null)}
              >
                Change Type
              </Button>
              <Button
                variant="hud"
                onClick={handleStartSession}
                className="flex-1"
              >
                Start Training
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Active Session */}
      {sessionType && sessionStarted && (
        <div className="space-y-6">
          {/* Timer and Rep Counter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SessionTimer
              duration={sessionType === 'quick' ? 600 : 1200}
              onComplete={handleTimerComplete}
            />
            <RepCounter
              target={20}
              initialValue={repCount}
              onChange={setRepCount}
              onComplete={() => console.log('Reps completed!')}
            />
          </div>

          {/* Drill Steps */}
          <Card variant="hud" className="hud-scanline p-6">
            <div className="hud-label mb-4">Session Plan</div>
            <DrillStepList
              steps={mockDrillSteps.map((step) => ({
                ...step,
                completed: completedSteps.includes(step.id),
              }))}
              currentStepIndex={currentStepIndex}
              onStepComplete={handleStepComplete}
            />
          </Card>

          {/* Complete Session Button */}
          {allStepsComplete && (
            <Card variant="hud-panel" className="p-6 animate-system-online">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="h-8 w-8 text-accent-400" />
                <div>
                  <div className="hud-label mb-1">Session Complete</div>
                  <p className="text-gray-300">
                    Nice work. That's one brick in your foundation.
                  </p>
                </div>
              </div>
              <Link href="../log">
                <Button variant="hud" size="lg" className="w-full">
                  Log Your Session
                </Button>
              </Link>
            </Card>
          )}
        </div>
      )}

      {/* Footer */}
      {!sessionStarted && (
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm italic">
            "Smart players win before the ball moves."
          </p>
        </div>
      )}
    </div>
  )
}
