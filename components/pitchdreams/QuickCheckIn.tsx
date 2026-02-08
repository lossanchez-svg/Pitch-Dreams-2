'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
  Battery,
  Activity,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'
import {
  type Soreness,
  type MoodEmoji,
  type SessionMode,
  getMoodDisplay,
  getSorenessDisplay,
  getSessionModeDisplay,
  type SessionModeResult,
} from '@/lib/session-mode'

interface QuickCheckInProps {
  onComplete: (data: CheckInResult) => void
  onSkip?: () => void
}

export interface CheckInResult {
  energy: number
  soreness: Soreness
  focus: number
  mood: MoodEmoji
  timeAvail: number
  painFlag: boolean
  modeResult: SessionModeResult
}

type Step = 'energy' | 'body' | 'mind' | 'time' | 'result'

const moods: MoodEmoji[] = ['EXCITED', 'FOCUSED', 'OKAY', 'TIRED', 'STRESSED']
const sorenessLevels: Soreness[] = ['NONE', 'LIGHT', 'MEDIUM', 'HIGH']
const timeOptions = [10, 20, 30]

export function QuickCheckIn({ onComplete, onSkip }: QuickCheckInProps) {
  const [step, setStep] = useState<Step>('energy')

  // Form state
  const [energy, setEnergy] = useState(3)
  const [soreness, setSoreness] = useState<Soreness>('NONE')
  const [painFlag, setPainFlag] = useState(false)
  const [focus, setFocus] = useState(3)
  const [mood, setMood] = useState<MoodEmoji>('OKAY')
  const [timeAvail, setTimeAvail] = useState(20)

  // Result state
  const [modeResult, setModeResult] = useState<SessionModeResult | null>(null)

  const handleNext = () => {
    if (step === 'energy') setStep('body')
    else if (step === 'body') setStep('mind')
    else if (step === 'mind') setStep('time')
    else if (step === 'time') {
      // Calculate mode and show result
      const { calculateSessionMode } = require('@/lib/session-mode')
      const result = calculateSessionMode({
        energy,
        soreness,
        focus,
        mood,
        timeAvail,
        painFlag,
      })
      setModeResult(result)
      setStep('result')
    }
  }

  const handleBack = () => {
    if (step === 'body') setStep('energy')
    else if (step === 'mind') setStep('body')
    else if (step === 'time') setStep('mind')
    else if (step === 'result') setStep('time')
  }

  const handleComplete = () => {
    if (modeResult) {
      onComplete({
        energy,
        soreness,
        focus,
        mood,
        timeAvail,
        painFlag,
        modeResult,
      })
    }
  }

  const renderEnergyStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Battery className="w-12 h-12 mx-auto mb-4 text-primary-400" />
        <h2 className="text-xl font-display text-gray-100 mb-2">
          How's your energy?
        </h2>
        <p className="text-sm text-gray-400">
          Tap to select your energy level right now
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setEnergy(level)}
            className={`w-14 h-14 rounded-xl text-xl font-bold transition-all ${
              energy === level
                ? 'bg-primary-500 text-white scale-110'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500 px-2">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  )

  const renderBodyStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Activity className="w-12 h-12 mx-auto mb-4 text-accent-400" />
        <h2 className="text-xl font-display text-gray-100 mb-2">
          How does your body feel?
        </h2>
        <p className="text-sm text-gray-400">
          Any soreness from recent training?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sorenessLevels.map((level) => {
          const display = getSorenessDisplay(level)
          return (
            <button
              key={level}
              onClick={() => setSoreness(level)}
              className={`p-4 rounded-xl text-center transition-all ${
                soreness === level
                  ? 'bg-primary-500/20 border-2 border-primary-500'
                  : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className={`font-medium ${soreness === level ? display.color : 'text-gray-300'}`}>
                {display.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Pain flag */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={painFlag}
            onChange={(e) => setPainFlag(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-red-500 focus:ring-red-500"
          />
          <span className="text-gray-300">I have pain (not just soreness)</span>
        </label>
        {painFlag && (
          <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200">
              If you have sharp or unusual pain, please check with a parent or coach before training.
            </p>
          </div>
        )}
      </div>
    </div>
  )

  const renderMindStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="w-12 h-12 mx-auto mb-4 text-green-400" />
        <h2 className="text-xl font-display text-gray-100 mb-2">
          How's your focus?
        </h2>
        <p className="text-sm text-gray-400">
          How ready is your mind for training?
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setFocus(level)}
            className={`w-14 h-14 rounded-xl text-xl font-bold transition-all ${
              focus === level
                ? 'bg-green-500 text-white scale-110'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500 px-2">
        <span>Distracted</span>
        <span>Locked In</span>
      </div>

      {/* Mood */}
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-3 text-center">How are you feeling?</p>
        <div className="flex justify-center gap-2">
          {moods.map((m) => {
            const display = getMoodDisplay(m)
            return (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`w-12 h-12 rounded-xl text-2xl transition-all ${
                  mood === m
                    ? 'bg-primary-500/20 border-2 border-primary-500 scale-110'
                    : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
                }`}
                title={display.label}
              >
                {display.emoji}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderTimeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Clock className="w-12 h-12 mx-auto mb-4 text-blue-400" />
        <h2 className="text-xl font-display text-gray-100 mb-2">
          How much time do you have?
        </h2>
        <p className="text-sm text-gray-400">
          We'll adjust the session to fit your schedule
        </p>
      </div>

      <div className="flex justify-center gap-4">
        {timeOptions.map((time) => (
          <button
            key={time}
            onClick={() => setTimeAvail(time)}
            className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center transition-all ${
              timeAvail === time
                ? 'bg-blue-500 text-white scale-110'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="text-2xl font-bold">{time}</span>
            <span className="text-xs">min</span>
          </button>
        ))}
      </div>
    </div>
  )

  const renderResultStep = () => {
    if (!modeResult) return null

    const modeDisplay = getSessionModeDisplay(modeResult.mode)

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-4">{modeDisplay.icon}</div>
          <h2 className={`text-2xl font-display ${modeDisplay.color} mb-2`}>
            {modeDisplay.label}
          </h2>
          <p className="text-sm text-gray-400">
            {modeDisplay.description}
          </p>
        </div>

        <Card variant="hud-panel" className="p-4">
          <p className="text-gray-300 text-center">
            {modeResult.explanation}
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <span className="text-gray-500">Duration</span>
            <p className="text-gray-200 font-medium">
              {modeResult.adjustments.suggestedDuration} min
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <span className="text-gray-500">Intensity</span>
            <p className="text-gray-200 font-medium">
              {modeResult.adjustments.intenseDrillsAllowed ? 'Full' : 'Light'}
            </p>
          </div>
          {modeResult.adjustments.gameIQEmphasis && (
            <div className="bg-gray-800/50 rounded-lg p-3 col-span-2">
              <span className="text-gray-500">Focus</span>
              <p className="text-gray-200 font-medium">
                Game IQ + Decision Making
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const stepContent = {
    energy: renderEnergyStep(),
    body: renderBodyStep(),
    mind: renderMindStep(),
    time: renderTimeStep(),
    result: renderResultStep(),
  }

  const stepTitles = {
    energy: 'Energy',
    body: 'Body',
    mind: 'Mind',
    time: 'Time',
    result: 'Your Mode',
  }

  const steps: Step[] = ['energy', 'body', 'mind', 'time', 'result']
  const currentIndex = steps.indexOf(step)

  return (
    <div className="max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.slice(0, -1).map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                i < currentIndex
                  ? 'bg-accent-500/30 text-accent-400'
                  : i === currentIndex
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              {i < currentIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            {i < steps.length - 2 && (
              <div
                className={`w-12 h-0.5 ${
                  i < currentIndex ? 'bg-accent-500/50' : 'bg-gray-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <Card variant="hud" className="p-6 mb-6">
        {stepContent[step]}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        {step !== 'energy' ? (
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
        ) : onSkip ? (
          <Button variant="ghost" onClick={onSkip}>
            Skip Check-In
          </Button>
        ) : (
          <div />
        )}

        {step === 'result' ? (
          <Button variant="hud" onClick={handleComplete}>
            Start Training
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button variant="hud" onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default QuickCheckIn
