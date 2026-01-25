'use client'

import { useState } from 'react'
import { Shield, Lock, Users, Target, TrendingUp, Mail, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface ParentTrustSafetyModalProps {
  onComplete: (agreed: boolean) => void
  ctaText?: string
  mode?: 'signup' | 'continue'
}

const trustCards = [
  {
    icon: Shield,
    title: 'No Strangers. No DMs.',
    description: 'Zero public profiles. Zero direct messages. Zero contact from anyone outside your household.',
  },
  {
    icon: Lock,
    title: 'Private by Default',
    description: 'Your child\'s training data stays private. No leaderboards, no comparisons, no exposure.',
  },
  {
    icon: Users,
    title: 'You\'re the Gatekeeper',
    description: 'Every feature permission lives in your parent dashboard. You decide what your child sees and does.',
  },
  {
    icon: Target,
    title: 'Motivation Without Manipulation',
    description: 'No dark patterns. No shame language. No streak-loss panic. Just honest progress tracking.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive, Not Comparisons',
    description: 'Your child competes against their own yesterday — not against other kids in a feed.',
  },
  {
    icon: Mail,
    title: 'Transparent Always',
    description: 'You\'ll know exactly what we collect, why, and how to export or delete it — anytime.',
  },
]

export function ParentTrustSafetyModal({
  onComplete,
  ctaText = 'Create Parent Account',
  mode = 'signup'
}: ParentTrustSafetyModalProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
        <div className="sticky top-0 z-10 bg-gradient-to-b from-white dark:from-gray-900 to-white/95 dark:to-gray-900/95 px-6 pt-6 pb-4">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50">
                Built for Kids. Approved by Parents.
              </h2>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                PitchDreams is Private Training — Not Social Media.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {trustCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card
                  key={index}
                  className="p-4 hover:shadow-md transition-shadow duration-base border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded transition-all peer-checked:bg-primary-600 peer-checked:border-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2 flex items-center justify-center">
                  <Check className={`w-3 h-3 text-white transition-opacity ${agreed ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 select-none">
                I agree to the <span className="font-semibold">PitchDreams Parent Trust & Safety Pledge</span> and understand this platform is designed for private, parent-supervised youth development.
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => onComplete(agreed)}
              disabled={!agreed}
              className="flex-1 h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
