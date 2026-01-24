import Link from 'next/link'
import { ArrowRight, Shield, Users, Target, Lock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pitch Dreams</h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition"
          >
            Log In
          </Link>
          <Link
            href="/parent/onboarding"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Train Smart. Stay Safe. Track Progress.
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          A web app for young soccer players (ages 8–18) to build discipline, learn the game,
          and track improvement—with parent controls and privacy-by-design.
        </p>
        <Link
          href="/parent/onboarding"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-lg rounded-lg hover:bg-blue-600 transition shadow-lg"
        >
          Start Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Safety Promise */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-accent" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Promise to Parents</h3>
          </div>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl">✓</span>
              <span>No ads or data selling</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl">✓</span>
              <span>Minimal data collection (nickname + age for kids)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl">✓</span>
              <span>You control everything (features, export, delete)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl">✓</span>
              <span>No hidden social features</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl">✓</span>
              <span>Privacy-by-design for young athletes</span>
            </li>
          </ul>
          <Link
            href="/privacy"
            className="mt-6 inline-block text-primary hover:underline"
          >
            Read our Privacy Policy (plain English, 2-minute read) →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Built for Young Athletes
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Daily Training Plans
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              10–20 minute guided drills personalized by age, position, and goals. Just hit "Start Training" and go.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Quick Progress Logging
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Log sessions in under 60 seconds with taps, not typing. Track streaks, personal bests, and consistency.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <Lock className="w-12 h-12 text-primary mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Parent Controls
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Set permissions, view progress, export data, and delete profiles—all with full transparency.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Get Started?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Create a free account in under 3 minutes.
        </p>
        <Link
          href="/parent/onboarding"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-lg rounded-lg hover:bg-blue-600 transition shadow-lg"
        >
          Create Free Account <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-primary transition">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Pitch Dreams. Built with privacy and safety in mind.
        </p>
      </footer>
    </div>
  )
}
