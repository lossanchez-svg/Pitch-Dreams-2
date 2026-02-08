'use client'

import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type AnimationVariant = 'static' | 'anim'

interface SkillAnimationSlotProps {
  /** The skill/drill ID to display animation for */
  skillId: string
  /** Display mode: static image or animated */
  variant?: AnimationVariant
  /** Override the animation source path */
  src?: string
  /** Alt text for accessibility */
  alt?: string
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Additional CSS classes */
  className?: string
  /** Callback when animation completes (for 'anim' variant) */
  onComplete?: () => void
}

// Size mapping for consistent dimensions
const sizeMap = {
  sm: { width: 48, height: 48, containerClass: 'w-12 h-12' },
  md: { width: 80, height: 80, containerClass: 'w-20 h-20' },
  lg: { width: 120, height: 120, containerClass: 'w-30 h-30' },
  xl: { width: 160, height: 160, containerClass: 'w-40 h-40' },
}

// Skill ID to asset path mapping
const skillAssets: Record<string, { static: string; anim?: string }> = {
  // Scanning skills
  'scanning-3point': {
    static: '/skills/static/scanning-3point.svg',
  },
  'scanning-color-cue': {
    static: '/skills/static/scanning-color-cue.svg',
  },
  // Decision chain skills
  'decision-2step': {
    static: '/skills/static/decision-2step.svg',
  },
  'decision-3rd-man': {
    static: '/skills/static/decision-3rd-man.svg',
  },
  'decision-rde': {
    static: '/skills/static/decision-rde.svg',
  },
}

/**
 * SkillAnimationSlot - Display skill illustrations with animation support
 *
 * Respects prefers-reduced-motion for accessibility.
 * Falls back to static variant when animations are disabled or unavailable.
 *
 * @example
 * // Static display
 * <SkillAnimationSlot skillId="scanning-3point" variant="static" />
 *
 * // Animated (when available)
 * <SkillAnimationSlot skillId="decision-rde" variant="anim" onComplete={() => {}} />
 */
export function SkillAnimationSlot({
  skillId,
  variant = 'static',
  src,
  alt,
  size = 'md',
  className,
  onComplete,
}: SkillAnimationSlotProps) {
  const prefersReducedMotion = useReducedMotion()

  // Get asset paths
  const assetConfig = skillAssets[skillId]
  const { width, height, containerClass } = sizeMap[size]

  // Determine which variant to actually display
  // - Use static if user prefers reduced motion
  // - Use static if no animation is available for this skill
  // - Use static if explicitly requested
  const effectiveVariant =
    prefersReducedMotion ||
    !assetConfig?.anim ||
    variant === 'static'
      ? 'static'
      : 'anim'

  // Get the source path
  const imageSrc = src || (effectiveVariant === 'anim'
    ? assetConfig?.anim
    : assetConfig?.static)

  // Fallback placeholder if no asset found
  if (!imageSrc) {
    return (
      <div
        className={cn(
          containerClass,
          'flex items-center justify-center',
          'bg-primary-100 dark:bg-primary-900/30',
          'border border-primary-200 dark:border-primary-800',
          'rounded-lg',
          className
        )}
        role="img"
        aria-label={alt || `${skillId} skill illustration placeholder`}
      >
        <span className="text-xs text-primary-500 dark:text-primary-400 font-mono uppercase">
          {skillId.slice(0, 3)}
        </span>
      </div>
    )
  }

  // For animated content (future Lottie/WebM support)
  if (effectiveVariant === 'anim' && imageSrc.endsWith('.json')) {
    // TODO: Add Lottie player integration
    // For now, fall through to static image
  }

  if (effectiveVariant === 'anim' && imageSrc.endsWith('.webm')) {
    // Video animation
    return (
      <div className={cn(containerClass, 'relative overflow-hidden rounded-lg', className)}>
        <video
          src={imageSrc}
          width={width}
          height={height}
          autoPlay
          muted
          playsInline
          onEnded={onComplete}
          className="w-full h-full object-contain"
          aria-label={alt || `${skillId} skill animation`}
        />
      </div>
    )
  }

  // Static image display (default)
  return (
    <div
      className={cn(
        containerClass,
        'relative flex items-center justify-center',
        'bg-primary-50 dark:bg-primary-900/20',
        'border border-primary-100 dark:border-primary-800',
        'rounded-lg overflow-hidden',
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={alt || `${skillId} skill illustration`}
        width={width}
        height={height}
        className="object-contain p-2"
      />
    </div>
  )
}

/**
 * Get available skill IDs that have animations
 */
export function getAvailableSkillIds(): string[] {
  return Object.keys(skillAssets)
}

/**
 * Check if a skill has an animation available
 */
export function hasAnimation(skillId: string): boolean {
  return !!skillAssets[skillId]?.anim
}
