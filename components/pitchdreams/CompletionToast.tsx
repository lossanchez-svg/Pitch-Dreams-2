'use client'

import { CheckCircle2, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CompletionToastProps {
  message?: string
  show: boolean
  onClose: () => void
  duration?: number
}

const completionMessages = [
  "Nice work. That's one brick in your foundation.",
  "Logged. Your future self just got better.",
  "Progress doesn't shout. It just shows up.",
  "Another step forward. Keep climbing.",
  "Solid session. The work is adding up.",
]

export function CompletionToast({
  message,
  show,
  onClose,
  duration = 3000
}: CompletionToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const displayMessage = message || completionMessages[Math.floor(Math.random() * completionMessages.length)]

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for fade-out animation
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  if (!show && !isVisible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 left-4 md:left-auto md:min-w-96 z-50 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 leading-relaxed">
              {displayMessage}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
