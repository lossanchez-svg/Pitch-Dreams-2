'use client'

import { Lock } from 'lucide-react'

interface LockedStateProps {
  reason: string
  subtext?: string
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function LockedState({
  reason,
  subtext,
  icon: Icon = Lock,
  className = ''
}: LockedStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
        {reason}
      </p>
      {subtext && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          {subtext}
        </p>
      )}
    </div>
  )
}

export function PermissionLockedState({ feature }: { feature: string }) {
  return (
    <LockedState
      reason={`${feature} is parent-controlled`}
      subtext="Ask your parent to enable this feature in their dashboard settings."
    />
  )
}

export function AgeGatedState({ minAge }: { minAge: number }) {
  return (
    <LockedState
      reason={`Available for ages ${minAge}+`}
      subtext="This feature unlocks as you get older. Keep training!"
    />
  )
}
