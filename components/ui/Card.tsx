import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hud' | 'hud-panel' | 'parent-light'
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  const variants = {
    default: 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm',
    hud: 'hud-frame hud-grid relative overflow-hidden',
    'hud-panel': 'hud-panel border border-primary-500/20 rounded-lg',
    'parent-light': 'bg-white border border-gray-200 rounded-xl shadow-sm',
  }

  return (
    <div
      className={cn(variants[variant], 'p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-xl font-semibold text-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('text-gray-600 dark:text-gray-300', className)} {...props}>
      {children}
    </div>
  )
}
