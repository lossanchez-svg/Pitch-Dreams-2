'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

// Route metadata mapping for human-readable breadcrumb labels
const routeLabels: Record<string, string> = {
  // Parent routes
  'parent': 'Parent',
  'dashboard': 'Dashboard',
  'controls': 'Controls',
  'add-child': 'Add Child',
  'onboarding': 'Onboarding',
  // Child routes
  'child': 'Child',
  'home': 'Home',
  'training': 'Training',
  'learn': 'Learn',
  'progress': 'Progress',
  'log': 'Session Log',
  // Auth routes
  'login': 'Login',
  // Misc
  'styleguide': 'Style Guide',
  'hud-demo': 'HUD Demo',
  'components-demo': 'Components Demo',
}

interface BreadcrumbsProps {
  homeHref?: string
  homeLabel?: string
  className?: string
  variant?: 'default' | 'hud'
}

export function Breadcrumbs({
  homeHref = '/',
  homeLabel = 'Home',
  className = '',
  variant = 'default',
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // Skip breadcrumbs on home page
  if (pathname === '/') return null

  // Split path and filter out empty segments and dynamic IDs
  const segments = pathname.split('/').filter(Boolean)

  // Build breadcrumb items
  const items: Array<{ label: string; href: string; isLast: boolean }> = []
  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    // Skip UUID-like segments (child IDs) in display but keep in path
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)

    if (!isUuid) {
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      items.push({ label, href: currentPath, isLast })
    }
  })

  const baseStyles = variant === 'hud'
    ? 'text-cyan-400'
    : 'text-gray-600 dark:text-gray-400'

  const linkStyles = variant === 'hud'
    ? 'hover:text-cyan-300 transition-colors'
    : 'hover:text-gray-900 dark:hover:text-gray-200 transition-colors'

  const separatorStyles = variant === 'hud'
    ? 'text-cyan-600'
    : 'text-gray-400 dark:text-gray-500'

  const activeStyles = variant === 'hud'
    ? 'text-cyan-200 font-medium'
    : 'text-gray-900 dark:text-gray-100 font-medium'

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${baseStyles} ${className}`}>
      <ol className="flex items-center gap-1.5">
        {/* Home link */}
        <li className="flex items-center">
          <Link href={homeHref} className={`flex items-center gap-1 ${linkStyles}`}>
            <Home className="w-4 h-4" />
            <span className="sr-only md:not-sr-only">{homeLabel}</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className={`w-4 h-4 ${separatorStyles}`} aria-hidden="true" />
            {item.isLast ? (
              <span className={activeStyles} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className={linkStyles}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
