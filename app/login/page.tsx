'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Lock, Mail, Target, ArrowLeft, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const session = useSession()
  const status = session?.status
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/parent/dashboard')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Invalid email or password')
        setIsLoading(false)
        return
      }

      // Successful login - redirect to dashboard
      router.push('/parent/dashboard')
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
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
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        {/* Grid overlay */}
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

        {/* Radial accent */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          }}
        />

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(132, 204, 22, 0.2) 0%, transparent 60%)',
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
            Player Lab // Secure Access
          </p>
        </motion.div>

        {/* Login Card */}
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
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-accent-400">
                  System Ready
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">
                Sign In
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Access your training dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
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

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              {/* Error Message */}
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

              {/* Submit Button */}
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
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Links */}
            <div className="space-y-3">
              <Link
                href="/forgot-password"
                className="block text-center text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                Forgot your password?
              </Link>
              <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link
                  href="/parent/onboarding"
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Create one free
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="px-8 py-3 bg-gray-800/50 border-t border-gray-800">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-600 text-center">
              Private by default // No social features // Ad-free
            </p>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div className="mt-6 text-center" variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
