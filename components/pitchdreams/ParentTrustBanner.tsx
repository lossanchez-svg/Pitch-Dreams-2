'use client'

import { Shield, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ParentTrustBannerProps {
  onLearnMore?: () => void
  className?: string
}

export function ParentTrustBanner({ onLearnMore, className = '' }: ParentTrustBannerProps) {
  return (
    <div className={`bg-gradient-to-r from-indigo-50 to-primary-50 dark:from-indigo-900/20 dark:to-primary-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
          <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
            PitchDreams is private, parent-controlled, and ad-free
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built for real player development, not engagement metrics.
          </p>
        </div>
        {onLearnMore ? (
          <button
            onClick={onLearnMore}
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Safety & Controls</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        ) : (
          <Link
            href="/parent/controls"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Safety & Controls</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
