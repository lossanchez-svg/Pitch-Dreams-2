'use client'

import { Shield, Lock, Eye, FileText } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface ParentTrustCardProps {
  onLearnMore?: () => void
  className?: string
}

export function ParentTrustCard({
  onLearnMore,
  className,
}: ParentTrustCardProps) {
  return (
    <Card variant="parent-light" className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Shield className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-xl text-gray-900 mb-1">
            Built for Kids. Approved by Parents.
          </h3>
          <p className="text-gray-600 text-sm">
            PitchDreams is a private training tool, not social media. Your child's data is protected and never shared.
          </p>
        </div>
      </div>

      {/* Trust Features */}
      <div className="space-y-3 mb-4">
        {/* No Social Features */}
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">No Social Features</p>
            <p className="text-xs text-gray-600">
              No profiles, no followers, no comparison. Just training.
            </p>
          </div>
        </div>

        {/* Parent Visibility */}
        <div className="flex items-start gap-3">
          <Eye className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Full Parent Visibility</p>
            <p className="text-xs text-gray-600">
              You see everything your child does. No hidden activity.
            </p>
          </div>
        </div>

        {/* Your Data, Your Control */}
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Your Data, Your Control</p>
            <p className="text-xs text-gray-600">
              Export or delete all data anytime. No questions asked.
            </p>
          </div>
        </div>
      </div>

      {/* Learn More Link */}
      {onLearnMore && (
        <button
          onClick={onLearnMore}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          Learn more about our safety commitment →
        </button>
      )}
    </Card>
  )
}
