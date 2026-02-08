import Link from 'next/link'
import { Target } from 'lucide-react'

/**
 * Consistent footer for public pages (about, contact, privacy, etc.)
 */
export function PublicFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-primary-400" />
            </div>
            <span className="text-sm font-display font-semibold text-gray-400">Pitch Dreams</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">
              Home
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">
              About
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">
              Privacy
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-white transition-colors min-h-[44px] flex items-center">
              Contact
            </Link>
          </nav>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Pitch Dreams
          </p>
        </div>
      </div>
    </footer>
  )
}
