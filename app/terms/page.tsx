import Link from 'next/link'
import { FileText } from 'lucide-react'
import { PublicHeader } from '@/components/navigation/PublicHeader'
import { PublicFooter } from '@/components/navigation/PublicFooter'

export const metadata = {
  title: 'Terms of Service | Pitch Dreams',
  description: 'Terms of Service for Pitch Dreams - Please read before using our service',
}

export default function TermsOfServicePage() {
  const lastUpdated = 'February 8, 2026'
  const contactEmail = 'pitchdreams.soccer@gmail.com'

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <PublicHeader />

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Terms of Service</h1>
            <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-invert prose-gray max-w-none">
          {/* Important Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-display font-semibold text-amber-400 mt-0 mb-4">Important: Please Read Carefully</h2>
            <p className="text-gray-300 mb-0">
              By accessing or using Pitch Dreams, you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our service. These terms include important limitations on our liability
              and your rights.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By creating an account, accessing, or using Pitch Dreams (&quot;the Service&quot;), you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;)
              agree to be bound by these Terms of Service (&quot;Terms&quot;), our{' '}
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300">Privacy Policy</Link>, and all
              applicable laws and regulations. If you are a parent or guardian creating an account for your child, you
              agree to these Terms on behalf of yourself and your child.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">2. Description of Service</h2>
            <p className="text-gray-300">
              Pitch Dreams is a youth soccer training application that provides:
            </p>
            <ul className="text-gray-300">
              <li>Suggested training drills and exercises</li>
              <li>Progress tracking and goal setting</li>
              <li>Educational content about soccer</li>
              <li>Activity logging features</li>
            </ul>
            <p className="text-gray-300">
              <strong>The Service is provided for informational and educational purposes only.</strong> We are not a
              professional sports training organization, medical provider, or certified coaching institution.
            </p>
          </section>

          {/* Section 3 - CRITICAL */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">3. Important Disclaimers</h2>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 my-4">
              <h3 className="text-lg font-semibold text-red-400 mt-0 mb-3">Not Professional Training or Medical Advice</h3>
              <p className="text-gray-300 mb-0">
                Pitch Dreams is <strong>not a substitute for professional soccer coaching, athletic training, or medical advice</strong>.
                The drills, exercises, and suggestions provided are general in nature and may not be appropriate for all
                individuals. Always consult with a qualified coach, trainer, or healthcare provider before beginning any
                new exercise program, especially for children.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-200 mt-4">Physical Activity Risks</h3>
            <p className="text-gray-300">
              Soccer and physical exercise involve inherent risks of injury. By using this Service, you acknowledge that:
            </p>
            <ul className="text-gray-300">
              <li>Physical activity carries risks including but not limited to muscle strains, sprains, fractures, and other injuries</li>
              <li>You (or your child) should be in adequate physical condition to perform the suggested activities</li>
              <li>You should stop any exercise immediately if you experience pain, dizziness, or discomfort</li>
              <li>Children should always be supervised during physical activities</li>
              <li>You are solely responsible for ensuring activities are performed safely and appropriately</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-4">No Guarantee of Results</h3>
            <p className="text-gray-300">
              We make no guarantees regarding athletic improvement, skill development, team selection, or any other outcomes
              from using the Service. Results vary based on individual effort, physical ability, consistency, and many
              other factors outside our control.
            </p>
          </section>

          {/* Section 4 - LIABILITY */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">4. Limitation of Liability</h2>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 my-4">
              <p className="text-gray-300 mb-4">
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</strong>
              </p>
              <ul className="text-gray-300 space-y-3 mb-0">
                <li>
                  <strong>Pitch Dreams, its owners, operators, employees, and affiliates shall not be liable for any
                  direct, indirect, incidental, special, consequential, or punitive damages</strong> arising out of or
                  related to your use of the Service, including but not limited to:
                  <ul className="mt-2">
                    <li>Personal injury or property damage</li>
                    <li>Physical injuries sustained during training or exercise</li>
                    <li>Loss of data or service interruptions</li>
                    <li>Any errors or inaccuracies in content</li>
                    <li>Unauthorized access to your account</li>
                  </ul>
                </li>
                <li>
                  <strong>Our total liability</strong> for any claims arising from your use of the Service shall not
                  exceed the amount you paid to us (if any) in the twelve (12) months preceding the claim, or $100 USD,
                  whichever is less.
                </li>
                <li>
                  <strong>Some jurisdictions do not allow the exclusion or limitation of certain damages.</strong> If
                  these laws apply to you, some or all of the above limitations may not apply, and you may have additional rights.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">5. Assumption of Risk and Indemnification</h2>
            <p className="text-gray-300">
              <strong>You expressly assume all risks</strong> associated with using the Service and performing any physical
              activities suggested by the Service.
            </p>
            <p className="text-gray-300">
              You agree to <strong>indemnify, defend, and hold harmless</strong> Pitch Dreams and its owners, operators,
              employees, and affiliates from any claims, damages, losses, liabilities, costs, or expenses (including
              reasonable attorneys&apos; fees) arising from:
            </p>
            <ul className="text-gray-300">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any injury or damage to yourself, your child, or others resulting from activities performed in connection with the Service</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">6. Parental Responsibility</h2>
            <p className="text-gray-300">
              If you are a parent or guardian using this Service for your child:
            </p>
            <ul className="text-gray-300">
              <li>You are responsible for supervising your child&apos;s use of the Service</li>
              <li>You are responsible for ensuring activities are age-appropriate and safe for your child</li>
              <li>You are responsible for supervising physical activities, especially for younger children</li>
              <li>You agree to these Terms on behalf of your child and accept full responsibility</li>
              <li>You confirm that your child does not have any medical conditions that would make physical activity unsafe without medical supervision</li>
            </ul>
          </section>

          {/* Section 7 - AS-IS */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">7. Service Provided &quot;As Is&quot;</h2>
            <p className="text-gray-300">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="text-gray-300">
              <li>Implied warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness of content</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
            <p className="text-gray-300">
              We do not warrant that the Service will meet your specific requirements or expectations.
            </p>
          </section>

          {/* Section 8 - PRICING */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">8. Pricing and Payment</h2>
            <p className="text-gray-300">
              <strong>Current Status:</strong> The Service is currently provided free of charge during our initial release period.
            </p>
            <p className="text-gray-300">
              <strong>Future Changes:</strong> We reserve the right to:
            </p>
            <ul className="text-gray-300">
              <li>Introduce paid subscription tiers or premium features at any time</li>
              <li>Modify, limit, or discontinue free access to certain features</li>
              <li>Change pricing for paid services with reasonable notice</li>
              <li>Offer promotional pricing that may vary by user or region</li>
            </ul>
            <p className="text-gray-300">
              If we introduce paid features, you will not be charged without your explicit consent. We will provide
              reasonable notice before any changes that would affect your current access level.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">9. User Accounts and Conduct</h2>
            <p className="text-gray-300">You agree to:</p>
            <ul className="text-gray-300">
              <li>Provide accurate and complete information when creating an account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not share your account with others</li>
              <li>Not use the Service for any unlawful purpose</li>
              <li>Not attempt to interfere with or disrupt the Service</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">10. Intellectual Property</h2>
            <p className="text-gray-300">
              All content, features, and functionality of the Service, including but not limited to text, graphics,
              logos, icons, images, audio, video, and software, are owned by Pitch Dreams or its licensors and are
              protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-300">
              You may not copy, modify, distribute, sell, or lease any part of the Service without our prior written consent.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">11. Termination</h2>
            <p className="text-gray-300">
              We reserve the right to suspend or terminate your account at any time, with or without cause, with or
              without notice. You may also delete your account at any time through the Parent Controls section.
            </p>
            <p className="text-gray-300">
              Upon termination, your right to use the Service will immediately cease. Sections of these Terms that by
              their nature should survive termination will survive, including but not limited to: Limitation of Liability,
              Indemnification, and Governing Law.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">12. Modifications to Terms</h2>
            <p className="text-gray-300">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by:
            </p>
            <ul className="text-gray-300">
              <li>Posting the updated Terms on this page with a new &quot;Last Updated&quot; date</li>
              <li>Sending an email notification to registered users (for significant changes)</li>
            </ul>
            <p className="text-gray-300">
              Your continued use of the Service after changes are posted constitutes your acceptance of the modified Terms.
              If you do not agree to the changes, you must stop using the Service and delete your account.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">13. Governing Law and Disputes</h2>
            <p className="text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              United States, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-300">
              Any disputes arising from these Terms or your use of the Service shall be resolved through binding
              arbitration in accordance with the rules of the American Arbitration Association, except that you may
              bring claims in small claims court if your claims qualify.
            </p>
            <p className="text-gray-300">
              <strong>Class Action Waiver:</strong> You agree that any dispute resolution proceedings will be conducted
              only on an individual basis and not in a class, consolidated, or representative action.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">14. Severability</h2>
            <p className="text-gray-300">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited
              or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-8">
            <h2 className="text-xl font-display font-semibold text-white border-b border-gray-700 pb-2">15. Contact Us</h2>
            <p className="text-gray-300">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul className="text-gray-300">
              <li><strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-primary-400 hover:text-primary-300">{contactEmail}</a></li>
            </ul>
          </section>

          {/* Acknowledgment */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-white mt-0 mb-3">Acknowledgment</h3>
            <p className="text-gray-300 mb-0">
              By using Pitch Dreams, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service and our{' '}
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300">Privacy Policy</Link>.
              If you are a parent or guardian, you also agree on behalf of your child.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
