'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
  Users,
  Clock,
  Star,
  CheckCircle,
  Plus,
  Trophy,
  Dribbble,
  Home,
  GraduationCap,
  MoreHorizontal,
} from 'lucide-react'

export type ProgramType = 'TEAM' | 'FUTSAL' | 'INDOOR' | 'CLASS' | 'OTHER'

export interface ProgramData {
  id?: string
  name: string
  type: ProgramType
  isSaved?: boolean
}

interface ProgramPickerProps {
  savedPrograms: ProgramData[]
  recentPrograms: ProgramData[]
  selectedProgram: ProgramData | null
  onSelect: (program: ProgramData | null) => void
  onSaveNew: (program: Omit<ProgramData, 'id'>) => void
}

const programTypeIcons: Record<ProgramType, React.ReactNode> = {
  TEAM: <Trophy className="w-4 h-4" />,
  FUTSAL: <Dribbble className="w-4 h-4" />,
  INDOOR: <Home className="w-4 h-4" />,
  CLASS: <GraduationCap className="w-4 h-4" />,
  OTHER: <MoreHorizontal className="w-4 h-4" />,
}

const programTypeLabels: Record<ProgramType, string> = {
  TEAM: 'Team',
  FUTSAL: 'Futsal',
  INDOOR: 'Indoor',
  CLASS: 'Class',
  OTHER: 'Other',
}

const programTypeColors: Record<ProgramType, string> = {
  TEAM: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40',
  FUTSAL: 'text-pink-400 bg-pink-500/20 border-pink-500/40',
  INDOOR: 'text-blue-400 bg-blue-500/20 border-blue-500/40',
  CLASS: 'text-green-400 bg-green-500/20 border-green-500/40',
  OTHER: 'text-gray-400 bg-gray-500/20 border-gray-500/40',
}

export function ProgramPicker({
  savedPrograms,
  recentPrograms,
  selectedProgram,
  onSelect,
  onSaveNew,
}: ProgramPickerProps) {
  const [showAddNew, setShowAddNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<ProgramType>('TEAM')
  const [saveForReuse, setSaveForReuse] = useState(false)

  // Combine saved and recent, removing duplicates
  const allSavedPrograms = [...savedPrograms]
  const recentNotSaved = recentPrograms.filter(
    r => !savedPrograms.some(s => s.id === r.id)
  )

  const handleSelectExisting = (program: ProgramData) => {
    onSelect(program)
    setShowAddNew(false)
  }

  const handleAddNew = () => {
    if (!newName.trim()) return

    const program: Omit<ProgramData, 'id'> = {
      name: newName.trim(),
      type: newType,
      isSaved: saveForReuse,
    }

    if (saveForReuse) {
      onSaveNew(program)
    }

    onSelect(program as ProgramData)
    setNewName('')
    setNewType('TEAM')
    setSaveForReuse(false)
    setShowAddNew(false)
  }

  const handleClear = () => {
    onSelect(null)
    setNewName('')
    setNewType('TEAM')
    setSaveForReuse(false)
    setShowAddNew(false)
  }

  // If a program is already selected, show the selection
  if (selectedProgram) {
    const colorClass = programTypeColors[selectedProgram.type]

    return (
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
          Program / Team
        </label>
        <Card variant="hud-panel" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${colorClass}`}>
                {programTypeIcons[selectedProgram.type]}
              </div>
              <div>
                <span className="font-medium text-gray-200">
                  {selectedProgram.name}
                </span>
                <p className="text-xs text-gray-500">
                  {programTypeLabels[selectedProgram.type]}
                </p>
              </div>
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
        Program / Team (optional)
      </label>

      {/* Add New Form */}
      {showAddNew ? (
        <div className="space-y-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Program or team name"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />

          {/* Program Type Selection */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Type</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(programTypeLabels) as ProgramType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setNewType(type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    newType === type
                      ? programTypeColors[type]
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  {programTypeIcons[type]}
                  {programTypeLabels[type]}
                </button>
              ))}
            </div>
          </div>

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
                setNewType('TEAM')
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
          {/* Saved Programs */}
          {allSavedPrograms.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Saved</p>
              <div className="flex flex-wrap gap-2">
                {allSavedPrograms.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => handleSelectExisting(program)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-colors text-sm"
                  >
                    <span className={programTypeColors[program.type].split(' ')[0]}>
                      {programTypeIcons[program.type]}
                    </span>
                    <span className="text-gray-200">{program.name}</span>
                    <Star className="w-3 h-3 text-yellow-500/70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Programs */}
          {recentNotSaved.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Recent</p>
              <div className="flex flex-wrap gap-2">
                {recentNotSaved.slice(0, 5).map((program) => (
                  <button
                    key={program.id}
                    onClick={() => handleSelectExisting(program)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-colors text-sm"
                  >
                    <span className="text-gray-400">
                      {programTypeIcons[program.type]}
                    </span>
                    <span className="text-gray-300">{program.name}</span>
                    <Clock className="w-3 h-3 text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add New Button */}
          <button
            onClick={() => setShowAddNew(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-700 hover:border-primary-500/50 transition-colors text-sm text-gray-400 hover:text-primary-400 w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add program or team
          </button>
        </div>
      )}
    </div>
  )
}

export default ProgramPicker
