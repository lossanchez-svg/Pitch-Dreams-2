'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
import { Breadcrumbs } from './Breadcrumbs'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface ChildHeaderProps {
  title?: string
  showBackButton?: boolean
  showBreadcrumbs?: boolean
  backHref?: string
  variant?: 'default' | 'hud'
  className?: string
}

export function ChildHeader({
  title,
  showBackButton = true,
  showBreadcrumbs = false,
  backHref,
  variant = 'hud',
  className = '',
}: ChildHeaderProps) {
  const params = useParams()
  const router = useRouter()
  const childId = params.childId as string

  const homeHref = childId ? `/child/${childId}/home` : '/parent/dashboard'
  const defaultBackHref = backHref || homeHref

  const isHud = variant === 'hud'

  const headerStyles = isHud
    ? 'bg-gray-950/95 backdrop-blur border-b border-cyan-500/20'
    : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border'

  const titleStyles = isHud
    ? 'text-cyan-400 font-display'
    : 'text-foreground'

  const buttonStyles = isHud
    ? 'p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors'
    : 'p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground'

  return (
    <header className={`sticky top-0 z-40 ${headerStyles} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left: Back button or logo */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className={buttonStyles}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Link href={homeHref} className={buttonStyles} aria-label="Home">
              <Home className="w-5 h-5" />
            </Link>
            {title && (
              <h1 className={`text-lg font-semibold ${titleStyles}`}>
                {title}
              </h1>
            )}
          </div>

          {/* Right: Theme toggle */}
          <ThemeToggle variant={isHud ? 'hud' : 'default'} />
        </div>

        {/* Optional breadcrumbs for specific pages */}
        {showBreadcrumbs && (
          <div className="py-2 border-t border-cyan-500/10">
            <Breadcrumbs
              homeHref={homeHref}
              homeLabel="Home"
              variant={isHud ? 'hud' : 'default'}
            />
          </div>
        )}
      </div>
    </header>
  )
}
