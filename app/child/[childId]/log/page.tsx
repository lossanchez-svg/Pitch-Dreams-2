'use client'

import { useState, useCallback } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import confetti from 'canvas-confetti'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { RpeSlider, MoodPicker, ChoiceChips, winPresets, focusPresets, CompletionToast } from '@/components/pitchdreams'
import { saveSession } from './actions'

export default function ChildLogPage() {
  const router = useRouter()
  const params = useParams()
  const childId = params.childId as string

  const [rpe, setRpe] = useState(5)
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'tired' | 'off' | null>(null)
  const [wins, setWins] = useState<string[]>([])
  const [focus, setFocus] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const triggerConfetti = useCallback(() => {
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, [])

  const handleSubmit = async () => {
    if (!mood) return

    setIsSubmitting(true)

    try {
      await saveSession(childId, {
        effortLevel: rpe,
        mood,
        duration: 25, // Default duration, could be tracked from timer
        win: wins.join(', '),
        focus: focus.join(', '),
      })

      // Show confetti and toast
      triggerConfetti()
      setShowToast(true)
    } catch (error) {
      console.error('Failed to save session:', error)
      alert('Failed to save session. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleToastClose = useCallback(() => {
    setShowToast(false)
    // Navigate back to home after toast closes
    router.push(`/child/${childId}/home`)
    router.refresh()
  }, [router, childId])

  const isComplete = rpe > 0 && mood && wins.length > 0 && focus.length > 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="../home"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="hud-label mb-2">Session Logger</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Log Your Session
        </h1>
        <p className="text-gray-300">
          Capture what you did. Track your progress.
        </p>
      </div>

      {/* Logging Form */}
      <div className="space-y-8">
        {/* RPE Slider */}
        <Card variant="hud-panel" className="p-6">
          <div className="hud-label mb-4">How Hard Was It?</div>
          <RpeSlider
            value={rpe}
            onChange={setRpe}
          />
        </Card>

        {/* Mood Picker */}
        <Card variant="hud-panel" className="p-6">
          <div className="hud-label mb-4">How Did You Feel?</div>
          <MoodPicker
            value={mood}
            onChange={setMood}
          />
        </Card>

        {/* Wins */}
        <Card variant="hud-panel" className="p-6">
          <div className="hud-label mb-4">What Went Well?</div>
          <p className="text-sm text-gray-400 mb-4">
            Select up to 3 wins from this session.
          </p>
          <ChoiceChips
            label="Wins"
            options={winPresets}
            value={wins}
            onChange={setWins}
          />
        </Card>

        {/* Focus Areas */}
        <Card variant="hud-panel" className="p-6">
          <div className="hud-label mb-4">What to Focus On Next?</div>
          <p className="text-sm text-gray-400 mb-4">
            Select up to 2 areas to work on.
          </p>
          <ChoiceChips
            label="Focus Areas"
            options={focusPresets}
            value={focus}
            onChange={setFocus}
          />
        </Card>

        {/* Submit Button */}
        <Card variant="hud" className="hud-scanline p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="hud-label mb-1">Ready to Submit?</div>
              <p className="text-gray-300">
                {isComplete
                  ? 'All fields complete. Lock it in.'
                  : 'Please complete all fields above.'}
              </p>
            </div>
            <Button
              variant="hud"
              size="lg"
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Lock it in
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer Quote */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic">
          "Nice work. That's one brick in your foundation."
        </p>
      </div>

      {/* Completion Toast */}
      <CompletionToast
        show={showToast}
        onClose={handleToastClose}
        duration={3000}
      />
    </div>
  )
}
