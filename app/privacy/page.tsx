import Link from 'next/link'
import { Target, ArrowLeft, Shield } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Pitch Dreams',
  description: 'Privacy Policy for Pitch Dreams - How we protect your family\'s data',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'February 3, 2026'
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
          <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Privacy Policy</h1>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-invert prose-gray max-w-none">
          {/* Plain English Summary */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-display font-semibold text-white mt-0 mb-4">The Short Version (Plain English)</h2>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li><strong>We don&apos;t sell your data.</strong> Ever. To anyone.</li>
              <li><strong>We don&apos;t show ads.</strong> No tracking for advertisers.</li>
              <li><strong>Kids only need a nickname and age.</strong> No real names, emails, or photos required from children.</li>
              <li><strong>Parents control everything.</strong> Export or delete your family&apos;s data anytime.</li>
              <li><strong>We use your data only to run the app.</strong> Training plans, progress tracking, and account management.</li>
            </ul>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">1. Who We Are</h2>
            <p className="text-gray-300">
              Pitch Dreams (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a youth soccer training application designed to help young athletes
              develop their skills through guided training sessions, progress tracking, and educational content. We are committed
              to protecting the privacy of our users, especially children.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">2. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-200 mt-4">From Parents/Guardians:</h3>
            <ul className="text-gray-300">
              <li><strong>Email address</strong> - Required for account creation and password recovery</li>
              <li><strong>Name</strong> - Optional, for personalization</li>
              <li><strong>Password</strong> - Stored securely using industry-standard hashing (never in plain text)</li>
              <li><strong>Email preferences</strong> - Whether you want to receive weekly progress summaries</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-4">From Child Profiles (entered by parents):</h3>
            <ul className="text-gray-300">
              <li><strong>Nickname</strong> - A display name (does not need to be their real name)</li>
              <li><strong>Age</strong> - Used to provide age-appropriate training content</li>
              <li><strong>Position preference</strong> - Optional, for personalized training</li>
              <li><strong>Training goals</strong> - Selected from preset options</li>
              <li><strong>Avatar color</strong> - For visual personalization</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-4">Training and Activity Data:</h3>
            <ul className="text-gray-300">
              <li>Training session logs (drills completed, duration, effort level)</li>
              <li>Skill challenge attempts and scores</li>
              <li>Lesson progress and quiz results</li>
              <li>Activity logs (practice sessions, games, classes attended)</li>
              <li>Check-in data (energy level, mood - used to adapt training intensity)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-4">What We Do NOT Collect:</h3>
            <ul className="text-gray-300">
              <li>Children&apos;s real names (unless parent chooses to use it as nickname)</li>
              <li>Children&apos;s email addresses</li>
              <li>Photos or videos</li>
              <li>Precise location data</li>
              <li>School information</li>
              <li>Social media accounts</li>
              <li>Payment information (the app is currently free)</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">3. How We Use Your Information</h2>
            <p className="text-gray-300">We use the collected information solely to:</p>
            <ul className="text-gray-300">
              <li>Provide personalized training plans based on age, position, and goals</li>
              <li>Track and display progress over time</li>
              <li>Adapt training intensity based on check-in responses</li>
              <li>Send password reset emails when requested</li>
              <li>Send optional weekly progress summary emails to parents</li>
              <li>Maintain and improve the application</li>
            </ul>
            <p className="text-gray-300">
              <strong>We do not:</strong> Sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">4. Children&apos;s Privacy (COPPA Compliance)</h2>
            <p className="text-gray-300">
              Pitch Dreams is designed with children&apos;s privacy as a top priority. We comply with the Children&apos;s Online
              Privacy Protection Act (COPPA):
            </p>
            <ul className="text-gray-300">
              <li><strong>Parental consent:</strong> Only parents/guardians can create accounts and add child profiles</li>
              <li><strong>Minimal data:</strong> We collect only what&apos;s necessary to provide the service (nickname and age)</li>
              <li><strong>No direct contact:</strong> Children cannot be contacted by other users or third parties through our app</li>
              <li><strong>No social features:</strong> There are no chat rooms, messaging, or public profiles</li>
              <li><strong>Parental control:</strong> Parents can review, export, and delete all data associated with their children at any time</li>
              <li><strong>No behavioral advertising:</strong> We do not display ads or track children for advertising purposes</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">5. Data Storage and Security</h2>
            <ul className="text-gray-300">
              <li><strong>Encryption:</strong> All data is transmitted using HTTPS/TLS encryption</li>
              <li><strong>Password security:</strong> Passwords are hashed using industry-standard algorithms and never stored in plain text</li>
              <li><strong>Database:</strong> Data is stored in secure, encrypted databases hosted in the United States</li>
              <li><strong>Access controls:</strong> Only authorized personnel have access to production data, and only when necessary for support or maintenance</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">6. Third-Party Services</h2>
            <p className="text-gray-300">We use the following third-party services to operate Pitch Dreams:</p>
            <ul className="text-gray-300">
              <li><strong>Vercel</strong> - Website hosting (USA-based)</li>
              <li><strong>Supabase</strong> - Database hosting (USA-based)</li>
              <li><strong>Resend</strong> - Transactional emails (password reset, weekly summaries)</li>
            </ul>
            <p className="text-gray-300">
              These services are bound by their own privacy policies and are selected for their commitment to data protection.
              We do not share data with analytics providers, advertising networks, or data brokers.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">7. Your Rights</h2>
            <p className="text-gray-300">As a user of Pitch Dreams, you have the right to:</p>
            <ul className="text-gray-300">
              <li><strong>Access:</strong> View all data associated with your account</li>
              <li><strong>Export:</strong> Download your data in a portable format</li>
              <li><strong>Correction:</strong> Update or correct any information</li>
              <li><strong>Deletion:</strong> Delete your account and all associated data permanently</li>
              <li><strong>Opt-out:</strong> Disable optional features like weekly email summaries</li>
            </ul>
            <p className="text-gray-300">
              These controls are available in the Parent Controls section of the app. Data deletion requests are processed
              immediately - we do not retain deleted data.
            </p>
          </section>

          {/* Section 8 - California */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">8. California Privacy Rights (CCPA/CPRA)</h2>
            <p className="text-gray-300">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA)
              and California Privacy Rights Act (CPRA):
            </p>
            <ul className="text-gray-300">
              <li><strong>Right to Know:</strong> You can request details about the categories and specific pieces of personal information we collect</li>
              <li><strong>Right to Delete:</strong> You can request deletion of your personal information</li>
              <li><strong>Right to Opt-Out of Sale:</strong> We do not sell personal information, so this right does not apply</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
              <li><strong>Right to Correct:</strong> You can request correction of inaccurate personal information</li>
            </ul>
            <p className="text-gray-300">
              To exercise these rights, contact us at <a href={`mailto:${contactEmail}`} className="text-primary-400 hover:text-primary-300">{contactEmail}</a> or
              use the controls in the Parent Controls section of the app.
            </p>
          </section>

          {/* Section 9 - Other States */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">9. Other U.S. State Privacy Rights</h2>
            <p className="text-gray-300">
              Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), and other states with comprehensive
              privacy laws have similar rights to access, correct, delete, and port their data. We honor these rights for all users
              regardless of location.
            </p>
            <p className="text-gray-300">
              <strong>Important:</strong> We do not engage in targeted advertising, sell personal data, or process data for profiling
              in furtherance of decisions that produce legal or similarly significant effects. Therefore, opt-out rights related to
              these activities do not apply.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">10. Data Retention</h2>
            <p className="text-gray-300">
              We retain your data for as long as your account is active. If you delete your account:
            </p>
            <ul className="text-gray-300">
              <li>All personal data is permanently deleted immediately</li>
              <li>We do not keep backups of deleted user data</li>
              <li>Aggregated, anonymized statistics may be retained for service improvement</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">11. Cookies and Tracking</h2>
            <p className="text-gray-300">
              Pitch Dreams uses only essential cookies required for the application to function:
            </p>
            <ul className="text-gray-300">
              <li><strong>Session cookies:</strong> To keep you logged in</li>
              <li><strong>Security tokens:</strong> To prevent cross-site request forgery</li>
            </ul>
            <p className="text-gray-300">
              We do not use tracking cookies, analytics cookies, or advertising cookies. We do not use pixel trackers,
              fingerprinting, or any other tracking technologies.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">12. Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by:
            </p>
            <ul className="text-gray-300">
              <li>Posting the updated policy on this page with a new &quot;Last Updated&quot; date</li>
              <li>Sending an email notification to registered users (for significant changes)</li>
            </ul>
            <p className="text-gray-300">
              Your continued use of Pitch Dreams after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">13. Contact Us</h2>
            <p className="text-gray-300">
              If you have questions about this Privacy Policy, want to exercise your privacy rights, or have concerns about
              how we handle data, please contact us:
            </p>
            <ul className="text-gray-300">
              <li><strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-primary-400 hover:text-primary-300">{contactEmail}</a></li>
            </ul>
            <p className="text-gray-300">
              We aim to respond to all privacy-related inquiries within 30 days.
            </p>
          </section>

          {/* Closing */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-8">
            <p className="text-gray-300 mb-0">
              <strong>Our commitment:</strong> Pitch Dreams was built by parents who understand the importance of protecting
              children online. Privacy isn&apos;t just a legal requirement for us - it&apos;s a core value. If you ever have concerns
              about how we handle your family&apos;s data, please reach out. We&apos;re here to help.
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
