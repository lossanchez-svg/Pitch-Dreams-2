'use client'

import Link from 'next/link'
import { Settings, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Breadcrumbs } from './Breadcrumbs'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface ParentHeaderProps {
  title?: string
  showBreadcrumbs?: boolean
  className?: string
}

export function ParentHeader({
  title,
  showBreadcrumbs = true,
  className = '',
}: ParentHeaderProps) {
  return (
    <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border ${className}`}>
      <div className="container mx-auto px-4">
        {/* Top bar with logo and actions */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/parent/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PD</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:inline">
              PitchDreams
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/parent/controls"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Breadcrumbs row */}
        {showBreadcrumbs && (
          <div className="py-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <Breadcrumbs homeHref="/parent/dashboard" homeLabel="Dashboard" />
              {title && (
                <h1 className="text-lg font-semibold text-foreground hidden md:block">
                  {title}
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
