'use client'

import { Flame, Trophy, Zap, Target, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function HUDDemoPage() {
  return (
    <div className="min-h-screen bg-gray-950 dark hud-grid">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Pitch Lines */}
        <div className="pitch-lines mb-12 p-8 rounded-lg">
          <div className="hud-label mb-2 animate-system-online">System Initialized</div>
          <h1 className="font-display text-5xl text-primary-400 mb-4 animate-system-online">
            Welcome back, player.
          </h1>
          <p className="text-gray-300 text-lg">
            Your training simulator is online. Ready to level up?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* HUD Frame Card */}
          <Card variant="hud" className="hud-scanline">
            <div className="hud-label mb-4">Consistency Tracker</div>
            <div className="flex items-center gap-4">
              <Flame className="h-12 w-12 text-accent-400" />
              <div>
                <div className="font-display text-4xl text-accent-400">5</div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
            </div>
            <div className="mt-4 hud-chip">
              <TrendingUp className="h-4 w-4" />
              +2 from last week
            </div>
          </Card>

          {/* HUD Panel Card */}
          <Card variant="hud-panel">
            <div className="hud-label mb-4">Session Count</div>
            <div className="flex items-center gap-4">
              <Trophy className="h-12 w-12 text-primary-400 hud-glow-cyan" />
              <div>
                <div className="font-mono text-4xl text-primary-400">12</div>
                <div className="text-sm text-gray-400">This Month</div>
              </div>
            </div>
            <div className="mt-4 hud-chip">
              <Target className="h-4 w-4" />
              Goal: 16 sessions
            </div>
          </Card>

          {/* Another HUD Frame */}
          <Card variant="hud" className="hud-scanline">
            <div className="hud-label mb-4">Performance Index</div>
            <div className="flex items-center gap-4">
              <Zap className="h-12 w-12 text-secondary-400" />
              <div>
                <div className="font-display text-4xl text-secondary-400">8.7</div>
                <div className="text-sm text-gray-400">Avg RPE</div>
              </div>
            </div>
            <div className="mt-4 hud-chip">
              <TrendingUp className="h-4 w-4" />
              Peak performance
            </div>
          </Card>
        </div>

        {/* Main CTA Section */}
        <div className="hud-frame hud-panel hud-scanline p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="hud-label mb-2">Training Mode</div>
              <h2 className="font-display text-3xl text-primary-400 mb-2">
                Today's Session
              </h2>
              <p className="text-gray-300">
                3 drills selected for your skill level. Est. 25 minutes.
              </p>
            </div>
            <Button variant="hud" size="lg" className="min-w-[200px]">
              Lock it in
            </Button>
          </div>
        </div>

        {/* Data Chips Section */}
        <div className="bg-gray-900/50 backdrop-blur rounded-lg p-6 border border-primary-500/20 mb-12">
          <div className="hud-label mb-4">System Metrics</div>
          <div className="flex flex-wrap gap-3">
            <span className="hud-chip">
              <Flame className="h-4 w-4" />
              STREAK: 5 DAYS
            </span>
            <span className="hud-chip">
              <Trophy className="h-4 w-4" />
              SESSIONS: 12
            </span>
            <span className="hud-chip">
              <Target className="h-4 w-4" />
              COMPLETION: 94%
            </span>
            <span className="hud-chip">
              <Zap className="h-4 w-4" />
              AVG RPE: 8.7
            </span>
            <span className="hud-chip">
              <TrendingUp className="h-4 w-4" />
              PROGRESS: +15%
            </span>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="space-y-6">
          <div className="hud-panel p-6 rounded-lg">
            <div className="hud-label mb-4">Display Font (Rajdhani)</div>
            <h1 className="font-display text-5xl text-primary-400 mb-2">TRAINING MODE</h1>
            <h2 className="font-display text-4xl text-accent-400 mb-2">LOCK IT IN</h2>
            <h3 className="font-display text-3xl text-secondary-400">LEVEL UP</h3>
          </div>

          <div className="hud-panel p-6 rounded-lg">
            <div className="hud-label mb-4">Mono Font (JetBrains Mono)</div>
            <div className="font-mono space-y-2">
              <div className="text-2xl text-primary-400">SESSION_TIMER: 15:00</div>
              <div className="text-xl text-accent-400">REP_COUNT: 12 / 15</div>
              <div className="text-lg text-gray-300">STATUS: ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Animation Demo */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Click buttons to see animations:</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant="hud"
              onClick={() => {
                // Lock-in animation triggers on click
              }}
            >
              Lock-In Animation
            </Button>
            <Button
              variant="primary"
              className="hud-glow-cyan animate-glow-pulse"
            >
              Glow Pulse
            </Button>
            <Button variant="primary" className="animate-calibrate">
              Calibrate
            </Button>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm italic">
            "No rankings. Just you vs you — and you're winning."
          </p>
        </div>
      </div>
    </div>
  )
}
