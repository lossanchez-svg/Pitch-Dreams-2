'use client'

import { Play, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PrimaryCTASectionProps {
  playerName: string
  onStartSession: () => void
  sessionsThisWeek?: number
  consistencyDays?: number
}

const encouragementLines = [
  "Every session is a brick in your foundation.",
  "Today's work, tomorrow's wins.",
  "Progress doesn't shout. It just shows up.",
  "You're building something real here.",
  "The future you is watching. Make them proud.",
]

export function PrimaryCTASection({
  playerName,
  onStartSession,
  sessionsThisWeek = 0,
  consistencyDays = 0
}: PrimaryCTASectionProps) {
  const randomLine = encouragementLines[Math.floor(Math.random() * encouragementLines.length)]

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 rounded-2xl p-6 md:p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
            Welcome back, {playerName}.
          </h1>
          <p className="text-primary-100 text-sm md:text-base">
            {randomLine}
          </p>
        </div>

        {(sessionsThisWeek > 0 || consistencyDays > 0) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {sessionsThisWeek > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{sessionsThisWeek} session{sessionsThisWeek !== 1 ? 's' : ''} this week</span>
              </div>
            )}
            {consistencyDays > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse-subtle" />
                <span>{consistencyDays}-day consistency chain</span>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={onStartSession}
          className="w-full md:w-auto bg-white hover:bg-gray-50 text-primary-700 font-semibold h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-base group"
        >
          <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Start Today's Session
        </Button>
      </div>
    </div>
  )
}
