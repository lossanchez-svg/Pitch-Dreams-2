'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

interface ThemeToggleProps {
  variant?: 'default' | 'hud'
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({ variant = 'default', showLabel = false, className = '' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
    )
  }

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />
    }
    if (resolvedTheme === 'dark') {
      return <Moon className="w-5 h-5" />
    }
    return <Sun className="w-5 h-5" />
  }

  const getLabel = () => {
    if (theme === 'system') return 'System'
    if (theme === 'dark') return 'Dark'
    return 'Light'
  }

  const baseStyles = variant === 'hud'
    ? 'flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors'
    : 'flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'

  return (
    <button
      onClick={cycleTheme}
      className={`${baseStyles} ${className}`}
      aria-label={`Current theme: ${getLabel()}. Click to change.`}
    >
      {getIcon()}
      {showLabel && (
        <span className="text-sm font-medium">{getLabel()}</span>
      )}
    </button>
  )
}
