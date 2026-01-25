'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Trophy, FileText, TrendingUp, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

export function ChildBottomNav() {
  const params = useParams()
  const pathname = usePathname()
  const childId = params?.childId as string

  const navItems: NavItem[] = [
    {
      href: `/child/${childId}/home`,
      icon: Home,
      label: 'Home',
    },
    {
      href: `/child/${childId}/training`,
      icon: Trophy,
      label: 'Train',
    },
    {
      href: `/child/${childId}/log`,
      icon: FileText,
      label: 'Log',
    },
    {
      href: `/child/${childId}/progress`,
      icon: TrendingUp,
      label: 'Progress',
    },
    {
      href: `/child/${childId}/learn`,
      icon: BookOpen,
      label: 'Learn',
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary-500/20 bg-gray-900/95 backdrop-blur-lg">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around h-20">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 min-w-[68px]',
                  'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-950',
                  isActive && 'hud-glow-cyan',
                  !isActive && 'hover:bg-gray-800/50'
                )}
              >
                <Icon
                  className={cn(
                    'h-6 w-6 transition-colors',
                    isActive ? 'text-primary-400' : 'text-gray-400'
                  )}
                />
                <span
                  className={cn(
                    'text-xs font-medium uppercase tracking-wide transition-colors',
                    isActive ? 'text-primary-400' : 'text-gray-400'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* HUD Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
    </nav>
  )
}
