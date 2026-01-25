'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, LogOut, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Child {
  id: string
  nickname: string
  avatarColor: string
}

interface ParentNavbarProps {
  children?: Child[]
  currentChildId?: string
  onSelectChild?: (childId: string) => void
  onSignOut?: () => void
  className?: string
}

export function ParentNavbar({
  children = [],
  currentChildId,
  onSelectChild,
  onSignOut,
  className,
}: ParentNavbarProps) {
  const pathname = usePathname()
  const [childMenuOpen, setChildMenuOpen] = useState(false)

  const currentChild = children.find((child) => child.id === currentChildId)

  return (
    <nav
      className={cn(
        'bg-white border-b border-gray-200 sticky top-0 z-50',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/parent/dashboard"
            className="font-display text-2xl text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            PitchDreams
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/parent/dashboard"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === '/parent/dashboard'
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/parent/controls"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === '/parent/controls'
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Controls
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Child Selector */}
            {children.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setChildMenuOpen(!childMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors bg-white"
                >
                  {currentChild && (
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold',
                        currentChild.avatarColor
                      )}
                    >
                      {currentChild.nickname.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {currentChild?.nickname || 'Select Child'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {childMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setChildMenuOpen(false)}
                    />
                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            onSelectChild?.(child.id)
                            setChildMenuOpen(false)
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors',
                            currentChildId === child.id && 'bg-indigo-50'
                          )}
                        >
                          <div
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold',
                              child.avatarColor
                            )}
                          >
                            {child.nickname.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {child.nickname}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Settings */}
            <Link href="/parent/controls">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            {/* Sign Out */}
            {onSignOut && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
