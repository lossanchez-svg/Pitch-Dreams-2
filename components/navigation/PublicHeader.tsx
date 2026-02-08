import Link from 'next/link'
import { Target, ArrowLeft } from 'lucide-react'

interface PublicHeaderProps {
  backHref?: string
  backLabel?: string
  showBackButton?: boolean
}

/**
 * Consistent header for public pages (about, contact, privacy, etc.)
 * Designed to work well on web and map to iOS navigation patterns.
 */
export function PublicHeader({
  backHref = '/',
  backLabel = 'Back to Home',
  showBackButton = true,
}: PublicHeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-wide">Pitch Dreams</span>
        </Link>
        {showBackButton && (
          <Link
            href={backHref}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm min-h-[44px] px-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backLabel}</span>
          </Link>
        )}
      </div>
    </header>
  )
}
