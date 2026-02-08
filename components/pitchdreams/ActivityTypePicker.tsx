'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import {
  User,
  Users,
  Building2,
  Trophy,
  Dribbble,
  Home,
  Target,
} from 'lucide-react'

export type ActivityType =
  | 'SELF_TRAINING'
  | 'COACH_1ON1'
  | 'TEAM_TRAINING'
  | 'FACILITY_CLASS'
  | 'OFFICIAL_GAME'
  | 'FUTSAL_GAME'
  | 'INDOOR_LEAGUE_GAME'

interface ActivityTypeOption {
  type: ActivityType
  label: string
  description: string
  icon: React.ReactNode
  color: string
  category: 'training' | 'game'
}

const activityTypes: ActivityTypeOption[] = [
  {
    type: 'SELF_TRAINING',
    label: 'Self Training',
    description: 'Solo practice or drills',
    icon: <User className="w-6 h-6" />,
    color: 'cyan',
    category: 'training',
  },
  {
    type: 'COACH_1ON1',
    label: '1:1 Coaching',
    description: 'Private session with a coach',
    icon: <Target className="w-6 h-6" />,
    color: 'purple',
    category: 'training',
  },
  {
    type: 'TEAM_TRAINING',
    label: 'Team Training',
    description: 'Practice with your team',
    icon: <Users className="w-6 h-6" />,
    color: 'green',
    category: 'training',
  },
  {
    type: 'FACILITY_CLASS',
    label: 'Facility Class',
    description: 'Training at a soccer facility',
    icon: <Building2 className="w-6 h-6" />,
    color: 'orange',
    category: 'training',
  },
  {
    type: 'OFFICIAL_GAME',
    label: 'Official Game',
    description: 'League or tournament match',
    icon: <Trophy className="w-6 h-6" />,
    color: 'yellow',
    category: 'game',
  },
  {
    type: 'FUTSAL_GAME',
    label: 'Futsal Game',
    description: 'Indoor 5v5 futsal match',
    icon: <Dribbble className="w-6 h-6" />,
    color: 'pink',
    category: 'game',
  },
  {
    type: 'INDOOR_LEAGUE_GAME',
    label: 'Indoor League',
    description: 'Indoor soccer league game',
    icon: <Home className="w-6 h-6" />,
    color: 'blue',
    category: 'game',
  },
]

interface ActivityTypePickerProps {
  selectedType: ActivityType | null
  onSelect: (type: ActivityType) => void
}

const colorClasses: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    ring: 'ring-cyan-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    ring: 'ring-purple-500',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    ring: 'ring-green-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    ring: 'ring-orange-500',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    ring: 'ring-yellow-500',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    ring: 'ring-pink-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    ring: 'ring-blue-500',
  },
}

export function ActivityTypePicker({ selectedType, onSelect }: ActivityTypePickerProps) {
  const trainingTypes = activityTypes.filter(t => t.category === 'training')
  const gameTypes = activityTypes.filter(t => t.category === 'game')

  return (
    <div className="space-y-6">
      {/* Training Activities */}
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
          Training Activities
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {trainingTypes.map((activity) => {
            const colors = colorClasses[activity.color]
            const isSelected = selectedType === activity.type

            return (
              <button
                key={activity.type}
                onClick={() => onSelect(activity.type)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  isSelected
                    ? `${colors.bg} ${colors.border} ring-2 ${colors.ring}`
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`mb-2 ${isSelected ? colors.text : 'text-gray-400'}`}>
                  {activity.icon}
                </div>
                <p className={`font-medium text-sm ${isSelected ? colors.text : 'text-gray-200'}`}>
                  {activity.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Game Activities */}
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
          Games & Matches
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gameTypes.map((activity) => {
            const colors = colorClasses[activity.color]
            const isSelected = selectedType === activity.type

            return (
              <button
                key={activity.type}
                onClick={() => onSelect(activity.type)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  isSelected
                    ? `${colors.bg} ${colors.border} ring-2 ${colors.ring}`
                    : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`mb-2 ${isSelected ? colors.text : 'text-gray-400'}`}>
                  {activity.icon}
                </div>
                <p className={`font-medium text-sm ${isSelected ? colors.text : 'text-gray-200'}`}>
                  {activity.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ActivityTypePicker
