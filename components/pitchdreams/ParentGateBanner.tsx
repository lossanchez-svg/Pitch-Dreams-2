'use client'

import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ParentGateBannerProps {
  className?: string
}

export function ParentGateBanner({ className }: ParentGateBannerProps) {
  return (
    <div
      className={cn(
        'bg-indigo-50 border border-indigo-200 rounded-lg p-4',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-indigo-900 font-medium mb-1">
            Parent Reminder
          </p>
          <p className="text-sm text-indigo-800">
            Everything here exists so you can stay informed — without hovering.
          </p>
        </div>
      </div>
    </div>
  )
}
