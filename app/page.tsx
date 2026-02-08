import Link from 'next/link'
import { ArrowRight, Shield, Users, Target, Lock } from 'lucide-react'
import HeroNoRankings from '@/components/marketing/HeroNoRankings'
import TrainSkillsSection from '@/components/marketing/TrainSkillsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-wide">Pitch Dreams</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              href="/parent/onboarding"
              className="px-4 py-2 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-lg hover:bg-primary-500/30 transition-colors text-sm font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Option B: NO RANKINGS */}
      <HeroNoRankings />

      {/* Safety Promise - Parent Controls Section */}
      <section id="parent-controls" className="relative py-20 bg-gray-900">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 sm:p-10">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary-500/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary-500/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary-500/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary-500/40" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary-400 mb-1">Parent Controls</p>
                  <h3 className="text-2xl font-display font-bold text-white">Our Promise to Parents</h3>
                </div>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="mt-1 w-5 h-5 bg-accent-500/20 border border-accent-500/40 rounded flex items-center justify-center text-accent-400 text-xs font-bold shrink-0">✓</span>
                  <span>No ads or data selling</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 w-5 h-5 bg-accent-500/20 border border-accent-500/40 rounded flex items-center justify-center text-accent-400 text-xs font-bold shrink-0">✓</span>
                  <span>Minimal data collection (nickname + age for kids)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 w-5 h-5 bg-accent-500/20 border border-accent-500/40 rounded flex items-center justify-center text-accent-400 text-xs font-bold shrink-0">✓</span>
                  <span>You control everything (features, export, delete)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 w-5 h-5 bg-accent-500/20 border border-accent-500/40 rounded flex items-center justify-center text-accent-400 text-xs font-bold shrink-0">✓</span>
                  <span>No hidden social features</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 w-5 h-5 bg-accent-500/20 border border-accent-500/40 rounded flex items-center justify-center text-accent-400 text-xs font-bold shrink-0">✓</span>
                  <span>Privacy-by-design for young athletes</span>
                </li>
              </ul>
              <Link
                href="/privacy"
                className="mt-8 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                Read our Privacy Policy (plain English, 2-minute read)
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Train Skills Section */}
      <TrainSkillsSection />

      {/* Features */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary-400 mb-4">
              <span className="w-8 h-px bg-primary-500" />
              FEATURES
              <span className="w-8 h-px bg-primary-500" />
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Built for Young Athletes
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group relative bg-gray-900/50 border border-gray-800 hover:border-primary-500/30 rounded-xl p-6 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="text-lg font-display font-semibold text-white mb-2">
                  Daily Training Plans
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  10–20 minute guided drills personalized by age, position, and goals. Just hit &quot;Start Training&quot; and go.
                </p>
              </div>
            </div>

            <div className="group relative bg-gray-900/50 border border-gray-800 hover:border-accent-500/30 rounded-xl p-6 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-accent-500/10 border border-accent-500/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent-400" />
                </div>
                <h4 className="text-lg font-display font-semibold text-white mb-2">
                  Quick Progress Logging
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Log sessions in under 60 seconds with taps, not typing. Track streaks, personal bests, and consistency.
                </p>
              </div>
            </div>

            <div className="group relative bg-gray-900/50 border border-gray-800 hover:border-secondary-500/30 rounded-xl p-6 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-secondary-500/10 border border-secondary-500/30 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-secondary-400" />
                </div>
                <h4 className="text-lg font-display font-semibold text-white mb-2">
                  Parent Controls
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Set permissions, view progress, export data, and delete profiles—all with full transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gray-900">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-primary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-wider text-accent-400 bg-accent-500/10 border border-accent-500/30 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Ready to start
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Create a free account in under 3 minutes. No credit card required.
          </p>
          <Link
            href="/parent/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/25 min-h-[48px]"
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-sm font-display font-semibold text-gray-400">Pitch Dreams</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-gray-500 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Pitch Dreams
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
