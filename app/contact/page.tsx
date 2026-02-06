import Link from 'next/link'
import { Target, ArrowLeft, Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react'

export const metadata = {
  title: 'Contact | Pitch Dreams',
  description: 'Contact Pitch Dreams - Get in touch with questions, feedback, or support requests',
}

export default function ContactPage() {
  const contactEmail = 'pitchdreams.soccer@gmail.com'

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
            <Mail className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Contact Us</h1>
            <p className="text-gray-400 text-sm">We&apos;d love to hear from you</p>
          </div>
        </div>

        <div className="prose prose-invert prose-gray max-w-none">
          {/* Main Contact */}
          <section className="mb-10">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-display font-semibold text-white mt-0 mb-4">Get in Touch</h2>
              <p className="text-gray-300 mb-4">
                Have a question, suggestion, or just want to say hello? We read every message and do our best
                to respond within 48 hours.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-5 py-3 rounded-lg transition-colors no-underline text-base"
              >
                <Mail className="w-5 h-5" />
                {contactEmail}
              </a>
            </div>
          </section>

          {/* Contact Reasons */}
          <section className="mb-10">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">How Can We Help?</h2>

            <div className="grid gap-4 mt-6">
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white m-0 mb-1">General Questions</h3>
                    <p className="text-gray-400 m-0 text-sm">
                      Questions about how Pitch Dreams works, account help, or anything else.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white m-0 mb-1">Feature Requests</h3>
                    <p className="text-gray-400 m-0 text-sm">
                      Have an idea for how we can make Pitch Dreams better? We&apos;re all ears.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bug className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white m-0 mb-1">Bug Reports</h3>
                    <p className="text-gray-400 m-0 text-sm">
                      Found something that&apos;s not working right? Let us know and we&apos;ll fix it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Concerns */}
          <section className="mb-10">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">Privacy Questions</h2>
            <p className="text-gray-300">
              For questions about how we handle your data, requests to export your information, or to delete
              your account, please email us at{' '}
              <a href={`mailto:${contactEmail}`} className="text-primary-400 hover:text-primary-300">
                {contactEmail}
              </a>.
            </p>
            <p className="text-gray-300">
              You can also review our{' '}
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </Link>{' '}
              for details on how we protect your family&apos;s information.
            </p>
          </section>

          {/* Response Time */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-white mt-0 mb-2">Response Time</h3>
            <p className="text-gray-300 mb-0">
              We&apos;re a small team, but we take every message seriously. Expect a response within
              <strong> 1-2 business days</strong>. For urgent account issues, please include &quot;URGENT&quot;
              in your subject line.
            </p>
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
              <Link href="/about" className="text-gray-500 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy
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
