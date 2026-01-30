'use client'

// File: /components/marketing/HeroNoRankings.tsx
// Drop-in Hero component for PitchDreams landing page.
// Uses Next.js App Router + Tailwind CSS + Framer Motion.
// Respects prefers-reduced-motion for accessibility.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Shield, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

/** Status chip for cockpit header - displays system status indicators */
function StatusChip({
  children,
  variant = 'default',
  pulse = false
}: {
  children: React.ReactNode
  variant?: 'default' | 'online' | 'focus'
  pulse?: boolean
}) {
  const variantStyles = {
    default: 'bg-primary-500/10 border-primary-500/30 text-primary-400',
    online: 'bg-accent-500/10 border-accent-500/30 text-accent-400',
    focus: 'bg-secondary-500/10 border-secondary-500/30 text-secondary-400',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-1
        text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider
        border rounded
        ${variantStyles[variant]}
        ${pulse ? 'animate-pulse-subtle' : ''}
      `}
    >
      {variant === 'online' && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
      )}
      {children}
    </span>
  )
}

/** Corner bracket decoration for HUD panels */
function CornerBrackets({ className = '' }: { className?: string }) {
  return (
    <>
      {/* Top-left */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary-500/60 ${className}`} />
      {/* Top-right */}
      <div className={`absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary-500/60 ${className}`} />
      {/* Bottom-left */}
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary-500/60 ${className}`} />
      {/* Bottom-right */}
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary-500/60 ${className}`} />
    </>
  )
}

/** Telemetry data row item */
function TelemetryItem({ label, value, highlight = false }: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className={`text-xs sm:text-sm font-mono font-semibold ${highlight ? 'text-accent-400' : 'text-gray-300'}`}>
        {value}
      </span>
    </div>
  )
}

/** Bullet point with HUD styling */
function HudBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
      <span className="text-gray-300 text-sm sm:text-base">{children}</span>
    </li>
  )
}

// ============================================================================
// COCKPIT PREVIEW COMPONENT
// ============================================================================

function CockpitPreview({ shouldAnimate }: { shouldAnimate: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  const animate = shouldAnimate && !prefersReducedMotion

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  const calibrationVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 }
    }
  }

  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto lg:mx-0"
      variants={containerVariants}
      initial={animate ? 'hidden' : 'visible'}
      animate="visible"
      aria-label="Session Mode preview showing today's training modules, consistency, and personal bests in a futuristic cockpit-style interface."
      role="img"
    >
      {/* Main cockpit card */}
      <div className="relative bg-gray-900/90 backdrop-blur-xl border border-primary-500/30 rounded-lg overflow-hidden">
        {/* Corner brackets */}
        <CornerBrackets />

        {/* Scanline effect overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.5) 2px, rgba(6, 182, 212, 0.5) 4px)',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content */}
        <div className="relative z-20 p-4 sm:p-6">
          {/* Header row */}
          <motion.div
            className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-primary-500/20"
            variants={itemVariants}
          >
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary-400">
              SESSION MODE
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <StatusChip variant="online" pulse>SYSTEM: ONLINE</StatusChip>
              <StatusChip variant="focus">FOCUS: FIRST TOUCH</StatusChip>
              <StatusChip>DURATION: 20 MIN</StatusChip>
            </div>
          </motion.div>

          {/* Calibration sweep line */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent mb-4 origin-left"
            variants={calibrationVariants}
          />

          {/* Main session info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {/* Today's Session */}
            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">
                Today&apos;s Session
              </h4>
              <p className="text-sm text-gray-400 font-mono">
                <span className="text-gray-500">Modules:</span>{' '}
                <span className="text-primary-300">Ball Mastery</span>
                <span className="text-gray-600 mx-1">&middot;</span>
                <span className="text-primary-300">First Touch</span>
                <span className="text-gray-600 mx-1">&middot;</span>
                <span className="text-primary-300">Passing</span>
                <span className="text-gray-600 mx-1">&middot;</span>
                <span className="text-primary-300">Game IQ</span>
              </p>
              <p className="text-sm font-mono">
                <span className="text-gray-500">Difficulty:</span>{' '}
                <span className="text-accent-400">Intermediate</span>
              </p>
            </div>

            {/* Mock CTA button (non-clickable) */}
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <div
                className="
                  w-full py-3 px-4
                  bg-gradient-to-r from-primary-600/20 to-primary-500/10
                  border border-primary-500/50 rounded
                  text-center font-display font-bold uppercase tracking-widest text-primary-300
                  cursor-default select-none
                "
                aria-hidden="true"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  START SESSION
                </span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary-500/10 blur-xl rounded -z-10" />
            </motion.div>
          </motion.div>

          {/* Telemetry row */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-primary-500/20"
            variants={itemVariants}
          >
            <TelemetryItem label="Consistency" value="3x / week" />
            <TelemetryItem label="PB: Juggles" value="42 (+7)" highlight />
            <TelemetryItem label="RPE Target" value="7/10" />
          </motion.div>

          {/* Bottom strip */}
          <motion.div
            className="mt-4 pt-3 border-t border-gray-800"
            variants={itemVariants}
          >
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-gray-600 text-center">
              NO RANKINGS // PRIVATE TRAINING // YOU VS YOU
            </p>
          </motion.div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

export default function HeroNoRankings() {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  // Ensure animations only run after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldAnimate = mounted && !prefersReducedMotion

  // Animation variants for text content
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-950"
      aria-labelledby="hero-headline"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Pitch grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial gradient accent */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 70% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">

          {/* Left column: Text content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={textContainerVariants}
            initial={shouldAnimate ? 'hidden' : 'visible'}
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={textItemVariants}>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.2em] text-primary-400">
                <span className="w-8 h-px bg-primary-500" />
                PITCHDREAMS // PLAYER LAB
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
              variants={textItemVariants}
            >
              NO RANKINGS.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                JUST YOU VS YOU.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed"
              variants={textItemVariants}
            >
              Build your edge with daily sessions, Personal Bests, and Game IQ.
              Competitive, disciplined, and fun — without social pressure.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={textItemVariants}
            >
              <Link href="/parent/onboarding" className="inline-block">
                <Button
                  variant="hud"
                  size="lg"
                  className="
                    w-full sm:w-auto
                    bg-gradient-to-r from-primary-600 to-primary-500
                    hover:from-primary-500 hover:to-primary-400
                    text-white border-primary-400
                    shadow-lg shadow-primary-500/25
                    min-h-touch-lg
                  "
                >
                  <span className="flex items-center gap-2">
                    Build My Training Plan
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
              <Link href="#parent-controls" className="inline-block">
                <Button
                  variant="ghost"
                  size="lg"
                  className="
                    w-full sm:w-auto
                    text-gray-400 hover:text-white
                    hover:bg-white/5
                    border border-gray-700 hover:border-gray-600
                    min-h-touch-lg
                  "
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    See How Parent Controls Work
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              className="flex items-center gap-2 text-sm text-gray-500"
              variants={textItemVariants}
            >
              <Shield className="w-4 h-4 text-accent-500 shrink-0" />
              <p>
                Not social media. No strangers. No messaging. Ad-free. Private by default.
              </p>
            </motion.div>

            {/* Feature bullets */}
            <motion.div
              className="pt-4 border-t border-gray-800"
              variants={textItemVariants}
            >
              <ul className="space-y-3">
                <HudBullet>
                  <strong className="text-white">Consistency Chain</strong> — never breaks, it pauses
                </HudBullet>
                <HudBullet>
                  <strong className="text-white">Personal Bests</strong> — juggles, wall passes, speed
                </HudBullet>
                <HudBullet>
                  <strong className="text-white">Game IQ</strong> — 2–4 minute lessons + quick quizzes
                </HudBullet>
              </ul>
            </motion.div>

            {/* Kid hype microcopy */}
            <motion.p
              className="text-sm font-mono text-primary-400/80 uppercase tracking-wider"
              variants={textItemVariants}
            >
              <ChevronRight className="inline w-4 h-4 mr-1" />
              Pro-level habits start small.
            </motion.p>
          </motion.div>

          {/* Right column: Cockpit preview */}
          <div className="lg:pl-4">
            <CockpitPreview shouldAnimate={shouldAnimate} />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
    </section>
  )
}
