import { Card } from '@/components/ui/Card'
import { trainingArcs, getAllArcs, type ArcId } from '@/lib/arcs/definitions'
import Link from 'next/link'
import { ArrowLeft, Shield, Heart, Brain, Clock, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Training Arcs Explained | PitchDreams',
  description: 'Learn how training arcs help your child stay motivated and improve their soccer skills.',
}

const arcColors: Record<ArcId, { bg: string; border: string; text: string }> = {
  vision: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
  },
  tempo: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  decision_chain: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
  },
}

export default function TrainingArcsExplainerPage() {
  const arcs = getAllArcs()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/parent/dashboard"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="font-display text-4xl text-primary-400 mb-2">
          Training Arcs Explained
        </h1>
        <p className="text-gray-400 text-lg">
          How themed training helps your child stay motivated and improve
        </p>
      </div>

      {/* What is an Arc */}
      <Card variant="hud" className="p-6 mb-8">
        <h2 className="font-display text-2xl text-white mb-4">What is a Training Arc?</h2>
        <p className="text-gray-300 mb-4">
          A Training Arc is a themed focus period (typically 3-7 days) where your child concentrates
          on developing a specific skill area. Think of it like chapters in their soccer development story.
        </p>
        <p className="text-gray-300 mb-4">
          Instead of random drills, arcs provide structure and narrative. Each arc has:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
          <li>A clear focus (Vision, Tempo, or Decision Making)</li>
          <li>Related drills that build on each other</li>
          <li>Game IQ lessons that reinforce concepts</li>
          <li>Progress tracking to show improvement</li>
          <li>A completion celebration when finished</li>
        </ul>
      </Card>

      {/* The Three Arcs */}
      <h2 className="font-display text-2xl text-white mb-4">The Three Arcs</h2>
      <div className="space-y-6 mb-8">
        {arcs.map((arc) => {
          const colors = arcColors[arc.id]
          return (
            <Card
              key={arc.id}
              variant="hud-panel"
              className={`p-6 ${colors.bg} ${colors.border} border`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{arc.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-display text-xl ${colors.text} mb-1`}>
                    {arc.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{arc.subtitle}</p>
                  <p className="text-gray-300 mb-4">{arc.parentExplanation}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span>{arc.recommendedDurationDays} days</span>
                    <span>•</span>
                    <span>{arc.drillIds.length} drills</span>
                    <span>•</span>
                    <span>{arc.gameIqIds.length} lessons</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* How Wellbeing Check-ins Work */}
      <Card variant="hud" className="p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-red-400" />
          <h2 className="font-display text-2xl text-white">How Check-ins Work</h2>
        </div>
        <p className="text-gray-300 mb-4">
          Before each training session, your child completes a quick check-in (10-20 seconds) that asks about:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
          <li><strong>Energy level</strong> (1-5) - How energized are they feeling?</li>
          <li><strong>Soreness</strong> - Any muscle soreness from recent activity?</li>
          <li><strong>Focus</strong> (1-5) - How mentally ready are they?</li>
          <li><strong>Mood</strong> - General feeling (emoji selection)</li>
          <li><strong>Time available</strong> - 10, 20, or 30 minutes</li>
          <li><strong>Pain flag</strong> - Any actual pain (not just soreness)</li>
        </ul>
        <p className="text-gray-300">
          Based on these inputs, the app adjusts the session automatically. Low energy?
          Shorter, mentally-focused session. High energy? Full intensity workout.
          Pain flagged? Gentle recovery activities with a safety message.
        </p>
      </Card>

      {/* Safety Guarantees */}
      <Card variant="hud" className="p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-green-400" />
          <h2 className="font-display text-2xl text-white">Safety Guarantees</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong className="text-white">No shame or pressure.</strong> We never guilt children
              for missing sessions or having low energy. Every message is supportive.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong className="text-white">Pain triggers safety messaging.</strong> If your child
              reports pain, they see a message to check with a parent or coach before continuing.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong className="text-white">"You vs you" framing only.</strong> No comparisons to
              other kids. Progress is always measured against their own past performance.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong className="text-white">Recovery days count.</strong> Pausing an arc or doing
              lighter training doesn't break progress. Rest is part of development.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300">
              <strong className="text-white">No dark patterns.</strong> No fake urgency, no
              manipulative notifications, no FOMO tactics. Just honest training tools.
            </p>
          </div>
        </div>
      </Card>

      {/* Parent Controls */}
      <Card variant="hud-panel" className="p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="font-display text-2xl text-white">Parent Controls</h2>
        </div>
        <p className="text-gray-300 mb-4">
          You have full control over your child's training arcs:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
          <li>View active arc progress from the parent dashboard</li>
          <li>Pause or disable arcs at any time</li>
          <li>See check-in history and session quality ratings</li>
          <li>Receive weekly email summaries of progress (if enabled)</li>
        </ul>
        <div className="mt-6">
          <Link
            href="/parent/controls"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            Go to Parent Controls
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </Card>

      {/* FAQ */}
      <h2 className="font-display text-2xl text-white mb-4">Common Questions</h2>
      <div className="space-y-4 mb-8">
        <Card variant="hud-panel" className="p-4">
          <h3 className="font-medium text-white mb-2">What if my child wants to skip the check-in?</h3>
          <p className="text-gray-400 text-sm">
            They can skip it and proceed with a default session. However, the check-in helps
            personalize their training, so we encourage using it.
          </p>
        </Card>
        <Card variant="hud-panel" className="p-4">
          <h3 className="font-medium text-white mb-2">Can they do arcs out of order?</h3>
          <p className="text-gray-400 text-sm">
            Yes! While we suggest Vision → Tempo → Decision Chain, they can start any arc
            they're interested in. Motivation matters more than sequence.
          </p>
        </Card>
        <Card variant="hud-panel" className="p-4">
          <h3 className="font-medium text-white mb-2">What happens when all arcs are complete?</h3>
          <p className="text-gray-400 text-sm">
            They can repeat arcs to deepen their skills, or continue training without an active arc.
            The check-in and adaptive session features work either way.
          </p>
        </Card>
        <Card variant="hud-panel" className="p-4">
          <h3 className="font-medium text-white mb-2">Is the data used for anything else?</h3>
          <p className="text-gray-400 text-sm">
            Check-in data is only used to personalize your child's training sessions. We don't
            sell data or use it for advertising. See our Privacy Policy for details.
          </p>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          Questions? Contact us at support@pitchdreams.com
        </p>
      </div>
    </div>
  )
}
