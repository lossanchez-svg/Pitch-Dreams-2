'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Mail, Target, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  const shouldAnimate = !prefersReducedMotion

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial={shouldAnimate ? 'hidden' : 'visible'}
        animate="visible"
      >
        {/* Logo */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/40 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
              <Target className="w-6 h-6 text-primary-400" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-wide">
              Pitch Dreams
            </span>
          </Link>
          <p className="mt-3 text-sm font-mono uppercase tracking-wider text-gray-500">
            Password Recovery
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden"
          variants={itemVariants}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-primary-500/50" />
          <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-primary-500/50" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-primary-500/50" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-primary-500/50" />

          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.5) 2px, rgba(6, 182, 212, 0.5) 4px)',
            }}
          />

          <div className="relative p-8">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent-400" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-400 mb-6">
                  If an account exists for <span className="text-white">{email}</span>,
                  you'll receive password reset instructions shortly.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Don't see it? Check your spam folder or try again in a few minutes.
                </p>
                <Link href="/login">
                  <Button variant="hud" size="lg" className="w-full">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-primary-400">
                      Account Recovery
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white">
                    Reset Password
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        required
                        className="
                          w-full pl-10 pr-3 py-3
                          bg-gray-800/50 border border-gray-700
                          rounded-lg text-white placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                          transition-all
                        "
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                    >
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {error}
                      </p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="hud"
                    size="lg"
                    disabled={isLoading}
                    className="
                      w-full
                      bg-gradient-to-r from-primary-600 to-primary-500
                      hover:from-primary-500 hover:to-primary-400
                      text-white border-primary-400
                      shadow-lg shadow-primary-500/25
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Bottom status bar */}
          <div className="px-8 py-3 bg-gray-800/50 border-t border-gray-800">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-600 text-center">
              Private by default // Secure password recovery
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
