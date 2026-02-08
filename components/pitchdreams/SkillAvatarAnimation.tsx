'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { animationFallbacks } from '@/lib/skills/registry'

interface SkillAvatarAnimationProps {
  animationKey: string
  fallbackSvg: string
  alt: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  autoPlay?: boolean
  loop?: boolean
  onAnimationEnd?: () => void
}

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
}

const sizeDimensions = {
  sm: 96,
  md: 128,
  lg: 192,
  xl: 256,
}

/**
 * SkillAvatarAnimation Component
 *
 * Displays skill track drill animations with:
 * - prefers-reduced-motion support (shows static SVG)
 * - IntersectionObserver for lazy loading
 * - Graceful fallback to static SVG if animation fails
 * - Accessible alt text and ARIA attributes
 */
export function SkillAvatarAnimation({
  animationKey,
  fallbackSvg,
  alt,
  className = '',
  size = 'md',
  autoPlay = true,
  loop = true,
  onAnimationEnd,
}: SkillAvatarAnimationProps) {
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Once in view, we can disconnect
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  // Handle play state
  useEffect(() => {
    if (isInView && autoPlay && !prefersReducedMotion && !hasError) {
      setIsPlaying(true)
    }
  }, [isInView, autoPlay, prefersReducedMotion, hasError])

  const handleImageError = useCallback(() => {
    setHasError(true)
    setIsPlaying(false)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    if (!loop) {
      setIsPlaying(false)
      onAnimationEnd?.()
    }
  }, [loop, onAnimationEnd])

  // Toggle play/pause for manual control
  const togglePlay = useCallback(() => {
    if (prefersReducedMotion || hasError) return
    setIsPlaying((prev) => !prev)
  }, [prefersReducedMotion, hasError])

  // Determine which image to show
  const shouldShowStatic = prefersReducedMotion || hasError || !isInView
  const imageSrc = shouldShowStatic
    ? fallbackSvg
    : animationFallbacks[animationKey] || fallbackSvg

  const dimensions = sizeDimensions[size]

  return (
    <div
      ref={containerRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-xl transition-opacity duration-500 ${
          isPlaying ? 'opacity-100' : 'opacity-50'
        }`}
      />

      {/* Main animation/image container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-800/50 border-2 border-gray-700/50 transition-all duration-300 ${
          isPlaying ? 'border-primary-500/50 shadow-lg shadow-primary-500/20' : ''
        }`}
      >
        {isInView && (
          <Image
            src={imageSrc}
            alt={alt}
            width={dimensions}
            height={dimensions}
            className={`object-contain transition-transform duration-300 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
            onError={handleImageError}
            onLoad={() => {
              // For future: trigger animation start
              if (!loop && isPlaying) {
                // Simulate animation end for static images
                const timer = setTimeout(handleAnimationComplete, 3000)
                return () => clearTimeout(timer)
              }
            }}
            priority={false}
          />
        )}

        {/* Loading placeholder */}
        {!isInView && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Play/Pause overlay for interactive control */}
        {!prefersReducedMotion && !hasError && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors group"
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            <div
              className={`w-12 h-12 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                !isPlaying ? 'opacity-70' : ''
              }`}
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-white" />
              ) : (
                <PlayIcon className="w-6 h-6 text-white ml-1" />
              )}
            </div>
          </button>
        )}
      </div>

      {/* Reduced motion indicator */}
      {prefersReducedMotion && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 whitespace-nowrap">
          Motion reduced
        </div>
      )}
    </div>
  )
}

// Simple icon components
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  )
}

export default SkillAvatarAnimation
