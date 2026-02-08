'use client'

import { Eye, Brain, Crosshair, Target, Zap, Shield, Move, Footprints, Users, RotateCcw } from 'lucide-react'

export interface FocusTag {
  id: string
  key: string
  label: string
  category: string
}

interface FocusTagPickerProps {
  tags: FocusTag[]
  selectedTags: string[]
  onChange: (selectedIds: string[]) => void
  maxSelections?: number
}

const tagIcons: Record<string, React.ReactNode> = {
  scanning: <Eye className="w-4 h-4" />,
  decision_chain: <Brain className="w-4 h-4" />,
  first_touch: <Crosshair className="w-4 h-4" />,
  finishing: <Target className="w-4 h-4" />,
  speed_of_play: <Zap className="w-4 h-4" />,
  defending: <Shield className="w-4 h-4" />,
  movement: <Move className="w-4 h-4" />,
  dribbling: <Footprints className="w-4 h-4" />,
  passing: <Users className="w-4 h-4" />,
  transitions: <RotateCcw className="w-4 h-4" />,
}

export function FocusTagPicker({
  tags,
  selectedTags,
  onChange,
  maxSelections = 3,
}: FocusTagPickerProps) {
  const handleToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter(id => id !== tagId))
    } else if (selectedTags.length < maxSelections) {
      onChange([...selectedTags, tagId])
    }
  }

  const skillTrackTags = tags.filter(t => t.category === 'skill_track')
  const generalTags = tags.filter(t => t.category === 'general')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400">
          Focus Areas
        </p>
        <p className="text-xs text-gray-500">
          {selectedTags.length}/{maxSelections} selected
        </p>
      </div>

      {/* Skill Track Tags (Priority) */}
      {skillTrackTags.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Skill Tracks</p>
          <div className="flex flex-wrap gap-2">
            {skillTrackTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id)
              const icon = tagIcons[tag.key]

              return (
                <button
                  key={tag.id}
                  onClick={() => handleToggle(tag.id)}
                  disabled={!isSelected && selectedTags.length >= maxSelections}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-primary-500/20 border-primary-500/50 text-primary-400'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {icon}
                  {tag.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* General Tags */}
      {generalTags.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">General</p>
          <div className="flex flex-wrap gap-2">
            {generalTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id)
              const icon = tagIcons[tag.key]

              return (
                <button
                  key={tag.id}
                  onClick={() => handleToggle(tag.id)}
                  disabled={!isSelected && selectedTags.length >= maxSelections}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gray-500/20 border-gray-500/50 text-gray-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {icon}
                  {tag.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FocusTagPicker
