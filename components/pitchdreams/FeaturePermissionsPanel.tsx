'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'
import { Info, Clock, MessageSquare, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturePermissions {
  freeTextEnabled: boolean
  challengesEnabled: boolean
  trainingWindowStart?: string // HH:MM format
  trainingWindowEnd?: string // HH:MM format
}

interface FeaturePermissionsPanelProps {
  childId: string
  childAge: number
  initialPermissions?: FeaturePermissions
  onSave?: (permissions: FeaturePermissions) => Promise<void>
  className?: string
}

export function FeaturePermissionsPanel({
  childId,
  childAge,
  initialPermissions = {
    freeTextEnabled: false,
    challengesEnabled: true,
  },
  onSave,
  className,
}: FeaturePermissionsPanelProps) {
  const [permissions, setPermissions] = useState<FeaturePermissions>(initialPermissions)
  const [saving, setSaving] = useState(false)

  const handleToggle = async (key: keyof FeaturePermissions, value: boolean) => {
    const updated = { ...permissions, [key]: value }
    setPermissions(updated)

    if (onSave) {
      setSaving(true)
      try {
        await onSave(updated)
      } finally {
        setSaving(false)
      }
    }
  }

  const handleTimeChange = async (
    key: 'trainingWindowStart' | 'trainingWindowEnd',
    value: string
  ) => {
    const updated = { ...permissions, [key]: value }
    setPermissions(updated)

    if (onSave) {
      setSaving(true)
      try {
        await onSave(updated)
      } finally {
        setSaving(false)
      }
    }
  }

  const freeTextAvailable = childAge >= 14

  return (
    <Card variant="parent-light" className={cn('p-6', className)}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Feature Permissions
          </h3>
          <p className="text-sm text-gray-600">
            Control what your child can access in PitchDreams.
          </p>
        </div>

        {/* Free Text Permission */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-5 w-5 text-gray-700" />
              <label
                htmlFor={`free-text-${childId}`}
                className="font-medium text-gray-900"
              >
                Free Text Notes
              </label>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Allow your child to write custom notes in session logs.
            </p>
            {!freeTextAvailable && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Free text is only available for ages 14+. Your child is currently {childAge} years old.
                </p>
              </div>
            )}
          </div>
          <Switch
            id={`free-text-${childId}`}
            checked={permissions.freeTextEnabled}
            onCheckedChange={(checked) => handleToggle('freeTextEnabled', checked)}
            disabled={!freeTextAvailable || saving}
          />
        </div>

        {/* Challenges Permission */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-5 w-5 text-gray-700" />
              <label
                htmlFor={`challenges-${childId}`}
                className="font-medium text-gray-900"
              >
                Skill Challenges
              </label>
            </div>
            <p className="text-sm text-gray-600">
              Allow your child to attempt timed skill challenges.
            </p>
          </div>
          <Switch
            id={`challenges-${childId}`}
            checked={permissions.challengesEnabled}
            onCheckedChange={(checked) => handleToggle('challengesEnabled', checked)}
            disabled={saving}
          />
        </div>

        {/* Training Window */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-gray-700" />
            <h4 className="font-medium text-gray-900">Training Window</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Set times when your child can log training sessions. Leave blank for unrestricted.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label
                htmlFor={`start-time-${childId}`}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Time
              </label>
              <input
                id={`start-time-${childId}`}
                type="time"
                value={permissions.trainingWindowStart || ''}
                onChange={(e) => handleTimeChange('trainingWindowStart', e.target.value)}
                disabled={saving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* End Time */}
            <div>
              <label
                htmlFor={`end-time-${childId}`}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Time
              </label>
              <input
                id={`end-time-${childId}`}
                type="time"
                value={permissions.trainingWindowEnd || ''}
                onChange={(e) => handleTimeChange('trainingWindowEnd', e.target.value)}
                disabled={saving}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Saving Indicator */}
        {saving && (
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
            Saving changes...
          </div>
        )}
      </div>
    </Card>
  )
}
