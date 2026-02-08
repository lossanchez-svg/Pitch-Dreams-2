'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Shield, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { AVATAR_COLORS } from '@/lib/utils'

type Step = 1 | 2 | 3

const POSITIONS = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Just playing for fun']
const GOALS = [
  'Improve dribbling',
  'Get faster',
  'Learn the game',
  'Make the team',
  'Better passing',
  'Have fun',
]

export default function ParentOnboarding() {
  const router = useRouter()
  const sessionData = useSession()
  const session = sessionData?.data
  const status = sessionData?.status
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showExistingAccountWarning, setShowExistingAccountWarning] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setShowExistingAccountWarning(true)
    }
  }, [status, session])

  // Step 1: Parent account
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  // Step 2: Child profile
  const [nickname, setNickname] = useState('')
  const [age, setAge] = useState<number>(10)
  const [position, setPosition] = useState('')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0])

  // Step 3: Permissions
  const [freeTextEnabled, setFreeTextEnabled] = useState(false)
  const [trainingWindowEnabled, setTrainingWindowEnabled] = useState(false)
  const [trainingWindowStart, setTrainingWindowStart] = useState('15:00')
  const [trainingWindowEnd, setTrainingWindowEnd] = useState('19:00')

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!agreedToPrivacy) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
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

    setStep(3)
  }

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Create parent account
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!signupRes.ok) {
        const data = await signupRes.json()
        throw new Error(data.error || 'Failed to create account')
      }

      const { parentId } = await signupRes.json()

      // Create child profile
      const childRes = await fetch('/api/parent/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId,
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

      // Sign in using NextAuth
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        throw new Error('Account created but sign-in failed. Please log in manually.')
      }

      // Successful login - redirect to dashboard
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

  // Handle signing out to start fresh
  const handleSignOutAndContinue = async () => {
    await signOut({ redirect: false })
    setShowExistingAccountWarning(false)
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Existing Account Warning */}
        {showExistingAccountWarning && (
          <Card className="mb-6 border-amber-300 dark:border-amber-600">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    You're Already Signed In
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    You're currently signed in as <span className="font-medium">{session?.user?.email}</span>.
                    Would you like to go to your dashboard, or sign out to create a new account?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => router.push('/parent/dashboard')}
                      className="flex-1 sm:flex-none"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleSignOutAndContinue}
                      className="flex-1 sm:flex-none"
                    >
                      Sign Out & Create New Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {step} of 3
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {step === 1 && 'Create Account'}
              {step === 2 && 'Add Child Profile'}
              {step === 3 && 'Set Permissions'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Safety Pledge + Sign Up */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-accent" />
                <CardTitle>Welcome to Pitch Dreams</CardTitle>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Our Promise to You:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>No ads or data selling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Minimal data collection (nickname + age for kids)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>You control everything (features, export, delete)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>No hidden social features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Privacy-by-design for young athletes</span>
                  </li>
                </ul>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                />

                <Input
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                />

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms-agree"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms-agree" className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="/terms" target="_blank" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" target="_blank" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Next: Add Child Profile <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Add Child Profile */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Let's create a profile for your child</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                We only need a nickname and age. No real names or personal info required.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleStep2Submit} className="space-y-6">
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

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Next: Set Permissions <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Set Permissions */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose what {nickname} can do</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleStep3Submit} className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Allow free-text input
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {age >= 14
                          ? `Let ${nickname} type short notes in Quick Log. We filter for safety.`
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

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(2)}
                    disabled={loading}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1" size="lg">
                    {loading ? 'Creating...' : 'Finish Setup'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
