import Link from 'next/link'
import { Target, ArrowLeft, Heart, Users, Sparkles, Shield } from 'lucide-react'

export const metadata = {
  title: 'About | Pitch Dreams',
  description: 'About Pitch Dreams - Youth soccer training app built to help kids develop skills and love for the game',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-wide">Pitch Dreams</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">About Pitch Dreams</h1>
            <p className="text-gray-400 text-sm">Helping young athletes reach their potential</p>
          </div>
        </div>

        <div className="prose prose-invert prose-gray max-w-none">
          {/* Mission */}
          <section className="mb-10">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              Pitch Dreams exists to help young soccer players develop their skills, build confidence, and fall in love
              with the beautiful game. We believe every child deserves access to quality training guidance, regardless
              of their family&apos;s resources or location.
            </p>
          </section>

          {/* Why We Built This */}
          <section className="mb-10">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">Why We Built This</h2>
            <p className="text-gray-300">
              As soccer parents, we saw a gap: elite training programs are expensive and inaccessible, while free resources
              are scattered and overwhelming. Kids were either over-scheduled with intense competitive programs or left
              without any structured guidance at all.
            </p>
            <p className="text-gray-300">
              Pitch Dreams fills that gap with bite-sized, age-appropriate training sessions that kids can do in their
              backyard, at the park, or anywhere with a ball. No expensive equipment. No long commutes. Just fun,
              effective training that fits into real family life.
            </p>
          </section>

          {/* Core Values */}
          <section className="mb-10">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">What We Believe</h2>

            <div className="grid gap-6 mt-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-accent-400" />
                  <h3 className="text-lg font-semibold text-white m-0">Fun First</h3>
                </div>
                <p className="text-gray-300 m-0">
                  Kids who enjoy training will train more. We design every session to be engaging and rewarding,
                  not a chore. Progress comes naturally when kids want to play.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary-400" />
                  <h3 className="text-lg font-semibold text-white m-0">No Rankings, No Pressure</h3>
                </div>
                <p className="text-gray-300 m-0">
                  We don&apos;t compare kids to each other. There are no leaderboards, no public scores, no competition
                  against peers. Each child&apos;s journey is their own, measured only against their personal progress.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white m-0">Privacy by Design</h3>
                </div>
                <p className="text-gray-300 m-0">
                  We collect only what&apos;s necessary and never sell data. Kids use nicknames, not real names.
                  Parents have full control to export or delete data anytime. No ads, no tracking.
                </p>
              </div>
            </div>
          </section>

          {/* The App */}
          <section className="mb-10">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">How It Works</h2>
            <ul className="text-gray-300 space-y-2">
              <li><strong>Personalized training plans</strong> based on age, position, and goals</li>
              <li><strong>5-15 minute sessions</strong> that fit between homework and dinner</li>
              <li><strong>Skill challenges</strong> that make practice feel like play</li>
              <li><strong>Progress tracking</strong> so kids can see themselves improving</li>
              <li><strong>Parent dashboard</strong> to stay informed without hovering</li>
              <li><strong>Educational content</strong> teaching game concepts and sportsmanship</li>
            </ul>
          </section>

          {/* Contact CTA */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-8">
            <p className="text-gray-300 mb-4">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg transition-colors no-underline"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-sm font-display font-semibold text-gray-400">Pitch Dreams</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                Home
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
