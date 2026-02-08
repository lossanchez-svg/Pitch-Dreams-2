'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
  User,
  Clock,
  Star,
  CheckCircle,
  Plus,
} from 'lucide-react'

export interface CoachData {
  id?: string
  displayName: string
  isSaved?: boolean
}

interface CoachPickerProps {
  savedCoaches: CoachData[]
  recentCoaches: CoachData[]
  selectedCoach: CoachData | null
  onSelect: (coach: CoachData | null) => void
  onSaveNew: (coach: Omit<CoachData, 'id'>) => void
}

export function CoachPicker({
  savedCoaches,
  recentCoaches,
  selectedCoach,
  onSelect,
  onSaveNew,
}: CoachPickerProps) {
  const [showAddNew, setShowAddNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [saveForReuse, setSaveForReuse] = useState(false)

  // Combine saved and recent, removing duplicates
  const allSavedCoaches = [...savedCoaches]
  const recentNotSaved = recentCoaches.filter(
    r => !savedCoaches.some(s => s.id === r.id)
  )

  const handleSelectExisting = (coach: CoachData) => {
    onSelect(coach)
    setShowAddNew(false)
  }

  const handleAddNew = () => {
    if (!newName.trim()) return

    const coach: Omit<CoachData, 'id'> = {
      displayName: newName.trim(),
      isSaved: saveForReuse,
    }

    if (saveForReuse) {
      onSaveNew(coach)
    }

    onSelect(coach as CoachData)
    setNewName('')
    setSaveForReuse(false)
    setShowAddNew(false)
  }

  const handleClear = () => {
    onSelect(null)
    setNewName('')
    setSaveForReuse(false)
    setShowAddNew(false)
  }

  // If a coach is already selected, show the selection
  if (selectedCoach) {
    return (
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
          Coach / Trainer
        </label>
        <Card variant="hud-panel" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <span className="font-medium text-gray-200">
                {selectedCoach.displayName}
              </span>
            </div>
            <button
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-gray-300"
            >
              Change
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
        Coach / Trainer (optional)
      </label>

      {/* Add New Form */}
      {showAddNew ? (
        <div className="space-y-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Coach name (display only)"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />

          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={saveForReuse}
              onChange={(e) => setSaveForReuse(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
            />
            Save for reuse
          </label>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setShowAddNew(false)
                setNewName('')
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="hud"
              onClick={handleAddNew}
              disabled={!newName.trim()}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Saved Coaches */}
          {allSavedCoaches.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Saved</p>
              <div className="flex flex-wrap gap-2">
                {allSavedCoaches.map((coach) => (
                  <button
                    key={coach.id}
                    onClick={() => handleSelectExisting(coach)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-colors text-sm"
                  >
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-gray-200">{coach.displayName}</span>
                    <Star className="w-3 h-3 text-yellow-500/70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Coaches */}
          {recentNotSaved.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Recent</p>
              <div className="flex flex-wrap gap-2">
                {recentNotSaved.slice(0, 5).map((coach) => (
                  <button
                    key={coach.id}
                    onClick={() => handleSelectExisting(coach)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-colors text-sm"
                  >
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-300">{coach.displayName}</span>
                    <Clock className="w-3 h-3 text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add New Button */}
          <button
            onClick={() => setShowAddNew(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-700 hover:border-purple-500/50 transition-colors text-sm text-gray-400 hover:text-purple-400 w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add coach
          </button>
        </div>
      )}
    </div>
  )
}

export default CoachPicker
