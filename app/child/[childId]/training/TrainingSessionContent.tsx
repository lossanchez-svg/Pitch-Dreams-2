'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  SessionOptionPicker,
  SessionTimer,
  RepCounter,
  DrillStepList,
  SessionType,
  QuickCheckIn,
  type CheckInResult,
  SessionModeLabel,
  ArcBanner,
  ArcSuggestionCard,
} from '@/components/pitchdreams'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, CheckCircle, Play } from 'lucide-react'
import Link from 'next/link'
import { saveTrainingSession } from './actions'
import { createCheckIn, updateCheckInQuality } from './check-in/actions'
import { startArc, updateArcProgress } from './arc-actions'
import { type TrainingArc, type ArcId } from '@/lib/arcs/definitions'

interface Drill {
  id: string
  name: string
  category: string
  description: string
  duration: number | null
  reps: number | null
  coachTip: string
  difficulty: string
}

interface ActiveArc {
  id: string
  arcId: ArcId
  dayIndex: number
  sessionsCompleted: number
  definition: TrainingArc
}

interface ArcSuggestion {
  arcId: ArcId
  reason: string
  definition: TrainingArc
}

interface TrainingSessionContentProps {
  childId: string
  drills: Drill[]
  allDrills: Drill[]
  activeArc?: ActiveArc | null
  arcSuggestion?: ArcSuggestion | null
}

type FlowStep = 'check-in' | 'type-select' | 'setup' | 'active' | 'complete'

export function TrainingSessionContent({
  childId,
  drills,
  allDrills,
  activeArc = null,
  arcSuggestion = null,
}: TrainingSessionContentProps) {
  const router = useRouter()

  // Flow state
  const [flowStep, setFlowStep] = useState<FlowStep>('check-in')
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null)
  const [checkInId, setCheckInId] = useState<string | null>(null)
  const [showArcSuggestion, setShowArcSuggestion] = useState(!!arcSuggestion)
  const [currentArc, setCurrentArc] = useState<ActiveArc | null>(activeArc)

  // Session state
  const [sessionType, setSessionType] = useState<SessionType | null>(null)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [repCount, setRepCount] = useState(0)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [isStartingArc, setIsStartingArc] = useState(false)

  // Convert drills to step format
  const drillSteps = drills.map((drill) => ({
    id: drill.id,
    title: drill.name,
    description: drill.description,
  }))

  // Handlers
  const handleCheckInComplete = async (result: CheckInResult) => {
    setCheckInResult(result)

    // Save check-in to database
    try {
      const response = await createCheckIn(childId, {
        energy: result.energy,
        soreness: result.soreness,
        focus: result.focus,
        mood: result.mood,
        timeAvail: result.timeAvail,
        painFlag: result.painFlag,
      })

      if (response.success && response.checkIn) {
        setCheckInId(response.checkIn.id)
      }
    } catch (error) {
      console.error('Failed to save check-in:', error)
    }

    setFlowStep('type-select')
  }

  const handleSkipCheckIn = () => {
    setFlowStep('type-select')
  }

  const handleStartArc = async (arcId: ArcId) => {
    setIsStartingArc(true)
    try {
      const result = await startArc(childId, arcId)
      if (result.success && result.arc) {
        setCurrentArc({
          id: result.arc.id,
          arcId: result.arc.arcId,
          dayIndex: 0,
          sessionsCompleted: 0,
          definition: result.arc.definition!,
        })
        setShowArcSuggestion(false)
      }
    } catch (error) {
      console.error('Failed to start arc:', error)
    } finally {
      setIsStartingArc(false)
    }
  }

  const handleSelectSession = (type: SessionType) => {
    setSessionType(type)
    setFlowStep('setup')
  }

  const handleStartSession = () => {
    setSessionStarted(true)
    setFlowStep('active')
  }

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => [...prev, stepId])
    setCurrentStepIndex((prev) => Math.min(prev + 1, drillSteps.length - 1))
  }

  const handleTimerComplete = () => {
    // Timer finished - session duration is tracked
  }

  const handleTimerTick = (remaining: number, total: number) => {
    setSessionDuration(total - remaining)
  }

  const handleCompleteSession = async () => {
    setIsSaving(true)
    try {
      // Save the training session
      const result = await saveTrainingSession(childId, {
        sessionType: sessionType || 'quick',
        duration: Math.floor(sessionDuration / 60),
        drillIds: completedSteps,
        totalReps: repCount,
      })

      // Update arc progress if we have an active arc
      if (currentArc && checkInResult) {
        await updateArcProgress(childId, checkInResult.modeResult.mode, true)
      }

      if (result.success) {
        // Navigate to log page to record mood/effort
        router.push(`/child/${childId}/log`)
      }
    } catch (error) {
      console.error('Failed to save session:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const allStepsComplete = completedSteps.length === drillSteps.length
  const sessionDurationMinutes = sessionType === 'quick' ? 10 : 20

  // Render check-in step
  if (flowStep === 'check-in') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link
            href={`/child/${childId}/home`}
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="hud-label mb-2">Quick Check-In</div>
          <h1 className="font-display text-4xl text-primary-400 mb-2">
            How are you feeling?
          </h1>
          <p className="text-gray-400">
            Quick check-in helps us customize your session (10-20 seconds)
          </p>
        </div>

        {/* Arc banner if active */}
        {currentArc && (
          <div className="mb-6">
            <ArcBanner
              arc={currentArc.definition}
              dayIndex={currentArc.dayIndex}
              sessionsCompleted={currentArc.sessionsCompleted}
              variant="compact"
            />
          </div>
        )}

        <QuickCheckIn
          onComplete={handleCheckInComplete}
          onSkip={handleSkipCheckIn}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/child/${childId}/home`}
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="hud-label mb-2">Training Mode</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          {currentArc ? currentArc.definition.title : 'Start Your Session'}
        </h1>
      </div>

      {/* Mode label from check-in */}
      {checkInResult && flowStep === 'type-select' && (
        <div className="mb-6">
          <SessionModeLabel
            mode={checkInResult.modeResult.mode}
            explanation={checkInResult.modeResult.explanation}
          />
        </div>
      )}

      {/* Active Arc banner */}
      {currentArc && flowStep !== 'check-in' && (
        <div className="mb-6">
          <ArcBanner
            arc={currentArc.definition}
            dayIndex={currentArc.dayIndex}
            sessionsCompleted={currentArc.sessionsCompleted}
          />
        </div>
      )}

      {/* Arc Suggestion (if no active arc) */}
      {!currentArc && showArcSuggestion && arcSuggestion && flowStep === 'type-select' && (
        <div className="mb-6">
          <ArcSuggestionCard
            arc={arcSuggestion.definition}
            reason={arcSuggestion.reason}
            onStart={() => handleStartArc(arcSuggestion.arcId)}
            onDismiss={() => setShowArcSuggestion(false)}
            isLoading={isStartingArc}
          />
        </div>
      )}

      {/* Session Type Selection */}
      {flowStep === 'type-select' && (
        <div>
          <p className="text-gray-300 mb-6">
            Choose your training mode to begin.
          </p>
          <SessionOptionPicker onSelect={handleSelectSession} />

          {/* Show available drills */}
          <div className="mt-8">
            <h3 className="hud-label mb-4">Today&apos;s Drills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drills.map((drill) => (
                <Card key={drill.id} variant="hud-panel" className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-primary-400 font-display text-lg">{drill.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        {drill.category} • {drill.difficulty}
                      </p>
                    </div>
                    {drill.reps && (
                      <span className="text-xs font-mono text-accent-400 bg-accent-500/10 px-2 py-1 rounded">
                        {drill.reps} reps
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Session Setup (Type selected, not started) */}
      {flowStep === 'setup' && (
        <div className="space-y-6">
          {/* Mode reminder */}
          {checkInResult && (
            <SessionModeLabel
              mode={checkInResult.modeResult.mode}
              explanation={checkInResult.modeResult.explanation}
              compact
            />
          )}

          <Card variant="hud-panel" className="p-6">
            <div className="hud-label mb-4">Session Type</div>
            <p className="text-gray-300 mb-2">
              You selected: <span className="text-primary-400 font-display text-xl">{sessionType}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {sessionDurationMinutes} minutes • {drills.length} drills
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => setFlowStep('type-select')}
              >
                Change Type
              </Button>
              <Button
                variant="hud"
                onClick={handleStartSession}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Training
              </Button>
            </div>
          </Card>

          {/* Drill preview */}
          <Card variant="hud" className="p-6">
            <div className="hud-label mb-4">Session Plan</div>
            <div className="space-y-3">
              {drills.map((drill, index) => (
                <div key={drill.id} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center text-xs font-mono text-primary-400">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-gray-200">{drill.name}</p>
                    <p className="text-xs text-gray-500">{drill.coachTip}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Active Session */}
      {flowStep === 'active' && (
        <div className="space-y-6">
          {/* Timer and Rep Counter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SessionTimer
              duration={sessionDurationMinutes * 60}
              onComplete={handleTimerComplete}
            />
            <RepCounter
              target={drills.reduce((sum, d) => sum + (d.reps || 10), 0)}
              initialValue={repCount}
              onChange={setRepCount}
              onComplete={() => {}}
            />
          </div>

          {/* Drill Steps */}
          <Card variant="hud" className="hud-scanline p-6">
            <div className="hud-label mb-4">Session Plan</div>
            <DrillStepList
              steps={drillSteps.map((step) => ({
                ...step,
                completed: completedSteps.includes(step.id),
              }))}
              currentStepIndex={currentStepIndex}
              onStepComplete={handleStepComplete}
            />
          </Card>

          {/* Coach Tip for current drill */}
          {!allStepsComplete && drills[currentStepIndex] && (
            <Card variant="hud-panel" className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Coach Tip</p>
                  <p className="text-gray-300 text-sm">{drills[currentStepIndex].coachTip}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Complete Session Button */}
          {allStepsComplete && (
            <Card variant="hud-panel" className="p-6 animate-system-online">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="h-8 w-8 text-accent-400" />
                <div>
                  <div className="hud-label mb-1">Session Complete</div>
                  <p className="text-gray-300">
                    Nice work! You completed {completedSteps.length} drills and {repCount} total reps.
                  </p>
                </div>
              </div>
              <Button
                variant="hud"
                size="lg"
                className="w-full"
                onClick={handleCompleteSession}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Log Your Session'}
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Footer */}
      {flowStep === 'type-select' && (
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm italic">
            &quot;Smart players win before the ball moves.&quot;
          </p>
        </div>
      )}
    </div>
  )
}
