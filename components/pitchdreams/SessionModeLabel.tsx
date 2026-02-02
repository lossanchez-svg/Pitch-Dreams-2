'use client'

import { getSessionModeDisplay, type SessionMode } from '@/lib/session-mode'

interface SessionModeLabelProps {
  mode: SessionMode
  explanation?: string
  compact?: boolean
}

export function SessionModeLabel({ mode, explanation, compact = false }: SessionModeLabelProps) {
  const display = getSessionModeDisplay(mode)

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-800/50 ${display.color}`}>
        <span>{display.icon}</span>
        <span className="text-sm font-medium">{display.label}</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{display.icon}</span>
        <div>
          <h3 className={`font-display text-lg ${display.color}`}>
            {display.label}
          </h3>
          <p className="text-xs text-gray-500">{display.description}</p>
        </div>
      </div>
      {explanation && (
        <p className="text-sm text-gray-400 mt-2 pt-2 border-t border-gray-700">
          {explanation}
        </p>
      )}
    </div>
  )
}

export default SessionModeLabel
