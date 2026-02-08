'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Star, CheckCircle } from 'lucide-react'

interface SessionRatingProps {
  onSubmit: (rating: number) => void
  onSkip?: () => void
}

export function SessionRating({ onSubmit, onSkip }: SessionRatingProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const ratingLabels: Record<number, string> = {
    1: 'Struggled',
    2: 'Tough',
    3: 'Okay',
    4: 'Good',
    5: 'Crushed it!',
  }

  const displayRating = hoveredRating ?? rating

  return (
    <Card variant="hud" className="p-6 text-center">
      <h3 className="font-display text-xl text-gray-100 mb-2">
        How did that go?
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Quick rating helps us adapt future sessions
      </p>

      {/* Star rating */}
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => setRating(value)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`w-10 h-10 transition-colors ${
                displayRating && value <= displayRating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Rating label */}
      <p className={`text-lg font-medium mb-6 h-7 ${displayRating ? 'text-gray-200' : 'text-gray-600'}`}>
        {displayRating ? ratingLabels[displayRating] : 'Tap to rate'}
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        {onSkip && (
          <Button variant="ghost" onClick={onSkip} className="flex-1">
            Skip
          </Button>
        )}
        <Button
          variant="hud"
          onClick={() => rating && onSubmit(rating)}
          disabled={!rating}
          className="flex-1"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Done
        </Button>
      </div>
    </Card>
  )
}

export default SessionRating
