'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { AVATAR_COLORS } from '@/lib/utils'

const POSITIONS = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Just playing for fun']
const GOALS = [
  'Improve dribbling',
  'Get faster',
  'Learn the game',
  'Make the team',
  'Better passing',
  'Have fun',
]

export default function AddChildPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Child profile fields
  const [nickname, setNickname] = useState('')
  const [age, setAge] = useState<number>(10)
  const [position, setPosition] = useState('')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0])
  const [freeTextEnabled, setFreeTextEnabled] = useState(false)
  const [trainingWindowEnabled, setTrainingWindowEnabled] = useState(false)
  const [trainingWindowStart, setTrainingWindowStart] = useState('15:00')
  const [trainingWindowEnd, setTrainingWindowEnd] = useState('19:00')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!nickname.trim()) {
      setError('Nickname is required')
      return
    }

    if (nickname.length > 20) {
      setError('Nickname must be 20 characters or less')
      return
    }

    setLoading(true)

    try {
      // Create child profile (parentId will be determined from session)
      const childRes = await fetch('/api/parent/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          age,
          position,
          goals: selectedGoals,
          avatarColor,
          freeTextEnabled: age >= 14 && freeTextEnabled,
          trainingWindowStart: trainingWindowEnabled ? trainingWindowStart : null,
          trainingWindowEnd: trainingWindowEnabled ? trainingWindowEnd : null,
        }),
      })

      if (!childRes.ok) {
        throw new Error('Failed to create child profile')
      }

      // Success - redirect to dashboard
      router.push('/parent/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="mb-4">
              <button
                onClick={() => router.push('/parent/dashboard')}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>
            </div>
            <CardTitle>Add a Child Profile</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              We only need a nickname and age. No real names or personal info required.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nickname"
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g., Alex, MJ, Striker"
                maxLength={20}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  required
                >
                  {Array.from({ length: 11 }, (_, i) => i + 8).map((ageOption) => (
                    <option key={ageOption} value={ageOption}>
                      {ageOption}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Position (optional)
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a position</option>
                  {POSITIONS.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goals (optional, select any)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`px-3 py-2 rounded-lg border text-sm transition ${
                        selectedGoals.includes(goal)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar Color
                </label>
                <div className="flex gap-3">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setAvatarColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition ${
                        avatarColor === color
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Allow free-text input
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {age >= 14
                        ? `Let ${nickname || 'them'} type short notes in Quick Log. We filter for safety.`
                        : 'Available for ages 14+ only'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={freeTextEnabled}
                    onChange={(e) => setFreeTextEnabled(e.target.checked)}
                    disabled={age < 14}
                    className="mt-1 w-5 h-5 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Training time window (optional)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Set a gentle reminder window. We won't lock them out—just a soft nudge.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={trainingWindowEnabled}
                    onChange={(e) => setTrainingWindowEnabled(e.target.checked)}
                    className="mt-1 w-5 h-5"
                  />
                </div>

                {trainingWindowEnabled && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                        Start time
                      </label>
                      <input
                        type="time"
                        value={trainingWindowStart}
                        onChange={(e) => setTrainingWindowStart(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                        End time
                      </label>
                      <input
                        type="time"
                        value={trainingWindowEnd}
                        onChange={(e) => setTrainingWindowEnd(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Creating...' : (
                  <>
                    Add Child <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
