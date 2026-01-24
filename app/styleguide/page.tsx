'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Dumbbell, TrendingUp, BookOpen, Play, Check, Flame, Trophy, Settings, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
  ParentTrustBanner,
  PrimaryCTASection,
  DrillCard,
  RpeSlider,
  MoodPicker,
  ChoiceChips,
  winPresets,
  focusPresets,
  ConsistencyChainBadge,
  ConsistencyChainCard,
  CompletionToast,
  LockedState,
  PermissionLockedState,
} from '@/components/pitchdreams'

export default function StyleguidePage() {
  const [rpeValue, setRpeValue] = useState(5)
  const [moodValue, setMoodValue] = useState<'great' | 'good' | 'okay' | 'tired' | 'off' | null>(null)
  const [winsValue, setWinsValue] = useState<string[]>([])
  const [showToast, setShowToast] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Pitch Dreams Design System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Component library, patterns, and guidelines for the youth soccer training app
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/" className="text-primary-500 hover:underline">
              ← Back to Home
            </Link>
            <Link href="/DESIGN_SYSTEM.md" className="text-primary-500 hover:underline">
              View Full Documentation
            </Link>
          </div>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Color Palette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Primary (Training Energy)
              </h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div
                    key={shade}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-16 h-10 rounded border border-gray-300`}
                      style={{ backgroundColor: `var(--color-primary-${shade})` }}
                    />
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      primary-{shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Accent (Progress/Success)
              </h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div
                    key={shade}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-16 h-10 rounded border border-gray-300`}
                      style={{ backgroundColor: `var(--color-accent-${shade})` }}
                    />
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      accent-{shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Semantic Colors
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="w-full h-12 bg-success-500 rounded mb-2" />
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    success-500
                  </span>
                </div>
                <div>
                  <div className="w-full h-12 bg-warning-500 rounded mb-2" />
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    warning-500
                  </span>
                </div>
                <div>
                  <div className="w-full h-12 bg-error-500 rounded mb-2" />
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    error-500
                  </span>
                </div>
                <div>
                  <div className="w-full h-12 bg-info-500 rounded mb-2" />
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    info-500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Typography
          </h2>

          <div className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Heading 1 - Page Titles
              </h1>
              <code className="text-sm text-gray-500">text-4xl font-bold</code>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Heading 2 - Section Headers
              </h2>
              <code className="text-sm text-gray-500">text-3xl font-semibold</code>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Heading 3 - Card Titles
              </h3>
              <code className="text-sm text-gray-500">text-2xl font-semibold</code>
            </div>

            <div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Body Large - Emphasis text for child mode (18px, line-height 1.6)
              </p>
              <code className="text-sm text-gray-500">text-lg</code>
            </div>

            <div>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Body - Default body text (16px, line-height 1.6). Optimal for readability.
              </p>
              <code className="text-sm text-gray-500">text-base</code>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Body Small - Secondary text and captions (14px)
              </p>
              <code className="text-sm text-gray-500">text-sm</code>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Overline - Labels and metadata (12px)
              </p>
              <code className="text-sm text-gray-500">text-xs font-medium uppercase tracking-wide</code>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Buttons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Primary Button</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="primary" size="lg" className="w-full">
                  Large Primary
                </Button>
                <Button variant="primary" size="md" className="w-full">
                  Medium Primary
                </Button>
                <Button variant="primary" size="sm" className="w-full">
                  Small Primary
                </Button>
                <Button variant="primary" size="md" disabled className="w-full">
                  Disabled
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secondary Button</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="secondary" size="lg" className="w-full">
                  Large Secondary
                </Button>
                <Button variant="secondary" size="md" className="w-full">
                  Medium Secondary
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="md" disabled className="w-full">
                  Disabled
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ghost Button</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="ghost" size="lg" className="w-full">
                  Large Ghost
                </Button>
                <Button variant="ghost" size="md" className="w-full">
                  Medium Ghost
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Small Ghost
                </Button>
                <Button variant="ghost" size="md" disabled className="w-full">
                  Disabled
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danger Button</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="danger" size="md" className="w-full">
                  Delete Profile
                </Button>
                <Button variant="danger" size="md" disabled className="w-full">
                  Disabled
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Icons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="primary" size="lg" className="w-full">
                  <Play className="w-5 h-5 mr-2" />
                  Start Training
                </Button>
                <Button variant="secondary" size="md" className="w-full">
                  <Check className="w-5 h-5 mr-2" />
                  Mark Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Iconography
          </h2>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { Icon: Home, label: 'Home' },
                { Icon: Dumbbell, label: 'Training' },
                { Icon: TrendingUp, label: 'Progress' },
                { Icon: BookOpen, label: 'Learn' },
                { Icon: Play, label: 'Play' },
                { Icon: Check, label: 'Check' },
                { Icon: Flame, label: 'Streak' },
                { Icon: Trophy, label: 'Achievement' },
                { Icon: Settings, label: 'Settings' },
                { Icon: Shield, label: 'Safety' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Using Lucide React icons with 24×24 grid, 2px stroke
            </p>
          </div>
        </section>

        {/* Spacing & Layout */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Spacing Scale
          </h2>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              {[
                { size: '1', px: '4px', label: 'xs' },
                { size: '2', px: '8px', label: 'sm' },
                { size: '4', px: '16px', label: 'md' },
                { size: '6', px: '24px', label: 'lg' },
                { size: '8', px: '32px', label: 'xl' },
                { size: '12', px: '48px', label: '2xl' },
                { size: '16', px: '64px', label: '3xl' },
              ].map(({ size, px, label }) => (
                <div key={size} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-mono text-gray-600 dark:text-gray-400">
                    {label} ({px})
                  </div>
                  <div className={`h-8 bg-primary-500 rounded`} style={{ width: px }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Touch Targets */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Touch Targets
          </h2>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Minimum: 44×44px (iOS guideline)
                </p>
                <button className="min-h-touch min-w-touch bg-primary-500 text-white rounded-lg font-medium">
                  44px
                </button>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Preferred: 48×48px (Android guideline)
                </p>
                <button className="min-h-touch-lg min-w-touch-lg bg-primary-500 text-white rounded-lg font-medium">
                  48px
                </button>
              </div>

              <p className="text-sm text-gray-500 italic">
                All interactive elements in child mode should meet the 48px target for easy tapping.
              </p>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Shadows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['sm', 'md', 'lg', 'xl'].map((shadow) => (
              <div key={shadow} className="text-center">
                <div className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-${shadow} mb-2`}>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    shadow-{shadow}
                  </p>
                </div>
                <code className="text-sm text-gray-500">shadow-{shadow}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Animations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Animations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fade In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-fade-in bg-primary-500 text-white p-4 rounded-lg text-center">
                  Fades in (200ms)
                </div>
                <code className="text-xs text-gray-500 mt-2 block">
                  animate-fade-in
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Slide Up</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-slide-up bg-accent-500 text-white p-4 rounded-lg text-center">
                  Slides up (300ms)
                </div>
                <code className="text-xs text-gray-500 mt-2 block">
                  animate-slide-up
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scale In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-scale-in bg-warning-500 text-white p-4 rounded-lg text-center">
                  Scales in (200ms)
                </div>
                <code className="text-xs text-gray-500 mt-2 block">
                  animate-scale-in
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pulse Subtle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse-subtle bg-error-500 text-white p-4 rounded-lg text-center">
                  Gentle pulse (2s infinite)
                </div>
                <code className="text-xs text-gray-500 mt-2 block">
                  animate-pulse-subtle
                </code>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            All animations respect <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">prefers-reduced-motion</code> user preference.
          </p>
        </section>

        {/* PitchDreams Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            PitchDreams Components
          </h2>

          {/* Parent Trust Banner */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Parent Trust Banner
            </h3>
            <ParentTrustBanner />
          </div>

          {/* Primary CTA Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Primary CTA Section (Child Home)
            </h3>
            <PrimaryCTASection
              playerName="Alex"
              onStartSession={() => alert('Start session clicked!')}
              sessionsThisWeek={3}
              consistencyDays={5}
            />
          </div>

          {/* Drill Card */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Drill Card
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DrillCard
                title="Ball Mastery - Foundation"
                category="Technical"
                duration={15}
                difficulty="beginner"
                proTip="Focus on light touches. Speed comes later."
                onSelect={() => alert('Drill selected')}
              />
              <DrillCard
                title="1v1 Decision Making"
                category="Tactical"
                duration={20}
                difficulty="intermediate"
                proTip="Watch the defender's hips, not the ball."
                onSelect={() => alert('Drill selected')}
                isSelected
              />
            </div>
          </div>

          {/* Logging Components */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Tap-First Logging
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>RPE Slider</CardTitle>
                </CardHeader>
                <CardContent>
                  <RpeSlider value={rpeValue} onChange={setRpeValue} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mood Picker</CardTitle>
                </CardHeader>
                <CardContent>
                  <MoodPicker value={moodValue} onChange={setMoodValue} />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Choice Chips (Wins)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChoiceChips
                    label="What went well?"
                    options={winPresets}
                    value={winsValue}
                    onChange={setWinsValue}
                    multiSelect
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Consistency & Progress */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Consistency & Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Active Chain</p>
                <ConsistencyChainBadge days={7} />
                <div className="mt-4">
                  <ConsistencyChainCard days={7} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Paused Chain (Non-Punitive)</p>
                <ConsistencyChainBadge days={12} isPaused />
                <div className="mt-4">
                  <ConsistencyChainCard days={12} isPaused />
                </div>
              </div>
            </div>
          </div>

          {/* Completion Toast */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Completion Toast
            </h3>
            <Button onClick={() => setShowToast(true)}>
              Show Completion Toast
            </Button>
            <CompletionToast
              show={showToast}
              onClose={() => setShowToast(false)}
            />
          </div>

          {/* Locked States */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Locked States
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Locked</CardTitle>
                </CardHeader>
                <CardContent>
                  <PermissionLockedState feature="Free Text Notes" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generic Locked</CardTitle>
                </CardHeader>
                <CardContent>
                  <LockedState
                    reason="Feature coming soon"
                    subtext="This feature is in development and will be available in a future update."
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Documentation Link */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Full Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                For complete design system specifications, component inventory, and UI patterns, see:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Design System Spec: Brand foundations, voice/microcopy, component standards</li>
                <li>Component Inventory: Full props, variants, and usage notes for all components</li>
                <li>UI Pattern Library: Screen patterns with wireframes and reasoning</li>
                <li>Implementation guidance: Tailwind config, Radix UI setup, accessibility</li>
              </ul>
              <Link href="/DESIGN_SYSTEM.md" target="_blank" className="inline-block">
                <Button variant="primary">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Full Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
