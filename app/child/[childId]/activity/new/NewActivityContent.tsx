'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { RpeSlider } from '@/components/pitchdreams/RpeSlider'
import { ActivityTypePicker, type ActivityType } from '@/components/pitchdreams/ActivityTypePicker'
import { GameIQImpactPicker, type GameIQImpact } from '@/components/pitchdreams/GameIQImpactPicker'
import { FocusTagPicker, type FocusTag } from '@/components/pitchdreams/FocusTagPicker'
import { HighlightChipPicker, type ChipOption } from '@/components/pitchdreams/HighlightChipPicker'
import { createActivity } from '../actions'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Building2,
} from 'lucide-react'

interface Facility {
  id: string
  name: string
  city: string
  state: string
}

interface NewActivityContentProps {
  childId: string
  childName: string
  facilities: Facility[]
  focusTags: FocusTag[]
  highlightChips: ChipOption[]
  nextFocusChips: ChipOption[]
}

type Step = 'type' | 'details' | 'reflection' | 'confirm'

export function NewActivityContent({
  childId,
  childName,
  facilities,
  focusTags,
  highlightChips,
  nextFocusChips,
}: NewActivityContentProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('type')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [activityType, setActivityType] = useState<ActivityType | null>(null)
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [locationName, setLocationName] = useState('')
  const [opponentName, setOpponentName] = useState('')
  const [intensityRPE, setIntensityRPE] = useState(5)
  const [gameIQImpact, setGameIQImpact] = useState<GameIQImpact>('MEDIUM')
  const [notes, setNotes] = useState('')
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('')
  const [selectedFocusTags, setSelectedFocusTags] = useState<string[]>([])
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([])
  const [selectedNextFocus, setSelectedNextFocus] = useState<string[]>([])

  const isGameType = activityType?.includes('GAME') || false
  const needsFacility = activityType === 'FACILITY_CLASS'

  const canProceedFromType = activityType !== null
  const canProceedFromDetails = durationMinutes > 0 && (!needsFacility || selectedFacilityId)
  const canSubmit = canProceedFromType && canProceedFromDetails

  const handleNext = () => {
    if (step === 'type' && canProceedFromType) setStep('details')
    else if (step === 'details' && canProceedFromDetails) setStep('reflection')
    else if (step === 'reflection') setStep('confirm')
  }

  const handleBack = () => {
    if (step === 'details') setStep('type')
    else if (step === 'reflection') setStep('details')
    else if (step === 'confirm') setStep('reflection')
  }

  const handleSubmit = async () => {
    if (!activityType || isSubmitting) return

    setIsSubmitting(true)

    try {
      const result = await createActivity(childId, {
        activityType,
        durationMinutes,
        locationName: locationName || undefined,
        opponentName: isGameType ? opponentName || undefined : undefined,
        intensityRPE,
        gameIQImpact,
        notes: notes || undefined,
        facilityId: needsFacility ? selectedFacilityId || undefined : undefined,
        focusTagIds: selectedFocusTags,
        highlightIds: selectedHighlights,
        nextFocusIds: selectedNextFocus,
      })

      if (result.success) {
        router.push(`/child/${childId}/home`)
      }
    } catch (error) {
      console.error('Failed to log activity:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const activityLabels: Record<ActivityType, string> = {
    SELF_TRAINING: 'Self Training',
    COACH_1ON1: '1:1 Coaching',
    TEAM_TRAINING: 'Team Training',
    FACILITY_CLASS: 'Facility Class',
    OFFICIAL_GAME: 'Official Game',
    FUTSAL_GAME: 'Futsal Game',
    INDOOR_LEAGUE_GAME: 'Indoor League Game',
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/child/${childId}/home`}
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="hud-label mb-2">Log Activity</div>
        <h1 className="font-display text-4xl text-primary-400 mb-2">
          What Did You Do?
        </h1>
        <p className="text-gray-400">
          Track your training sessions, classes, and games.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {(['type', 'details', 'reflection', 'confirm'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono ${
                step === s
                  ? 'bg-primary-500 text-white'
                  : ['type', 'details', 'reflection', 'confirm'].indexOf(step) > i
                  ? 'bg-accent-500/30 text-accent-400'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && (
              <div
                className={`w-8 h-0.5 ${
                  ['type', 'details', 'reflection', 'confirm'].indexOf(step) > i
                    ? 'bg-accent-500/50'
                    : 'bg-gray-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card variant="hud" className="p-6 mb-6">
        {/* Step 1: Activity Type */}
        {step === 'type' && (
          <div>
            <h2 className="font-display text-xl text-gray-100 mb-6">
              Select Activity Type
            </h2>
            <ActivityTypePicker
              selectedType={activityType}
              onSelect={setActivityType}
            />
          </div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <div className="space-y-6">
            <h2 className="font-display text-xl text-gray-100 mb-6">
              Activity Details
            </h2>

            {/* Duration */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Duration (minutes)
              </label>
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  min="5"
                  max="240"
                  step="5"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                  className="w-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="flex gap-2">
                  {[30, 60, 90, 120].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDurationMinutes(d)}
                      className={`px-3 py-1 rounded text-sm ${
                        durationMinutes === d
                          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                          : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Location (optional)
              </label>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g., City Park, School Field"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Facility Selection (for Facility Class) */}
            {needsFacility && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Facility *
                </label>
                <div className="flex items-center gap-4">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedFacilityId}
                    onChange={(e) => setSelectedFacilityId(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select a facility...</option>
                    {facilities.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} - {f.city}, {f.state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Opponent (for Games) */}
            {isGameType && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Opponent (optional)
                </label>
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={opponentName}
                    onChange={(e) => setOpponentName(e.target.value)}
                    placeholder="e.g., FC United, Blue Team"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            {/* Intensity */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">
                Intensity Level
              </label>
              <RpeSlider value={intensityRPE} onChange={setIntensityRPE} />
            </div>

            {/* Game IQ Impact */}
            <GameIQImpactPicker value={gameIQImpact} onChange={setGameIQImpact} />
          </div>
        )}

        {/* Step 3: Reflection */}
        {step === 'reflection' && (
          <div className="space-y-6">
            <h2 className="font-display text-xl text-gray-100 mb-6">
              Reflect on Your Session
            </h2>

            {/* Focus Tags */}
            <FocusTagPicker
              tags={focusTags}
              selectedTags={selectedFocusTags}
              onChange={setSelectedFocusTags}
              maxSelections={3}
            />

            {/* Highlights */}
            <HighlightChipPicker
              title="What Went Well?"
              subtitle="Celebrate your wins"
              options={highlightChips}
              selectedIds={selectedHighlights}
              onChange={setSelectedHighlights}
              maxSelections={3}
              variant="highlight"
            />

            {/* Next Focus */}
            <HighlightChipPicker
              title="What to Focus on Next?"
              subtitle="Set your intentions"
              options={nextFocusChips}
              selectedIds={selectedNextFocus}
              onChange={setSelectedNextFocus}
              maxSelections={2}
              variant="focus"
            />

            {/* Notes (if parent enabled) */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional thoughts about this session..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 'confirm' && activityType && (
          <div className="space-y-6">
            <h2 className="font-display text-xl text-gray-100 mb-6">
              Confirm Activity
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Activity Type</span>
                <span className="text-gray-200">{activityLabels[activityType]}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Duration</span>
                <span className="text-gray-200">{durationMinutes} minutes</span>
              </div>
              {locationName && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Location</span>
                  <span className="text-gray-200">{locationName}</span>
                </div>
              )}
              {isGameType && opponentName && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Opponent</span>
                  <span className="text-gray-200">{opponentName}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Intensity</span>
                <span className="text-gray-200">{intensityRPE}/10</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Game IQ Impact</span>
                <span className="text-gray-200">{gameIQImpact}</span>
              </div>
              {selectedFocusTags.length > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Focus Areas</span>
                  <span className="text-gray-200">{selectedFocusTags.length} selected</span>
                </div>
              )}
              {selectedHighlights.length > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Highlights</span>
                  <span className="text-gray-200">{selectedHighlights.length} selected</span>
                </div>
              )}
              {selectedNextFocus.length > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Next Focus</span>
                  <span className="text-gray-200">{selectedNextFocus.length} selected</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step !== 'type' ? (
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step === 'confirm' ? (
          <Button
            variant="hud"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[150px]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Log Activity
              </span>
            )}
          </Button>
        ) : (
          <Button
            variant="hud"
            onClick={handleNext}
            disabled={
              (step === 'type' && !canProceedFromType) ||
              (step === 'details' && !canProceedFromDetails)
            }
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
