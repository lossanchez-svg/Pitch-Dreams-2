'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  BallControlIcon,
  ShootingIcon,
  DribblingIcon,
  PassingIcon,
  DefenseIcon,
  GameIQIcon,
} from '@/components/illustrations'

interface SkillCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>
  title: string
  description: string
  delay: number
  shouldAnimate: boolean
  accentColor: string
}

function SkillCard({ icon: Icon, title, description, delay, shouldAnimate, accentColor }: SkillCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: 'easeOut' }
    }
  }

  return (
    <motion.div
      className="group relative bg-gray-900/50 border border-gray-800 hover:border-primary-500/30 rounded-xl p-6 transition-all duration-300"
      variants={cardVariants}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />

      {/* Content */}
      <div className="relative">
        {/* Icon container */}
        <div className={`w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300 transition-colors`}>
          <Icon size={32} />
        </div>

        {/* Title */}
        <h4 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-primary-200 transition-colors">
          {title}
        </h4>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary-500/40" />
      </div>
    </motion.div>
  )
}

const skills = [
  {
    icon: BallControlIcon,
    title: 'Ball Control',
    description: 'Master the fundamentals of first touch, receiving passes, and keeping the ball close under pressure.',
    accentColor: 'from-cyan-500/5 to-transparent',
  },
  {
    icon: ShootingIcon,
    title: 'Shooting',
    description: 'Develop power, accuracy, and technique for scoring from various distances and angles.',
    accentColor: 'from-red-500/5 to-transparent',
  },
  {
    icon: DribblingIcon,
    title: 'Dribbling',
    description: 'Learn moves, feints, and changes of pace to beat defenders and create space.',
    accentColor: 'from-yellow-500/5 to-transparent',
  },
  {
    icon: PassingIcon,
    title: 'Passing',
    description: 'Perfect short and long passes, through balls, and weight of pass for team play.',
    accentColor: 'from-green-500/5 to-transparent',
  },
  {
    icon: DefenseIcon,
    title: 'Defense',
    description: 'Build solid defensive positioning, tackling technique, and interception skills.',
    accentColor: 'from-purple-500/5 to-transparent',
  },
  {
    icon: GameIQIcon,
    title: 'Game IQ',
    description: 'Understand tactics, positioning, and decision-making through video lessons and quizzes.',
    accentColor: 'from-blue-500/5 to-transparent',
  },
]

export default function TrainSkillsSection() {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = !prefersReducedMotion

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section className="relative py-20 bg-gray-950">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial={shouldAnimate ? 'hidden' : 'visible'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary-400 mb-4">
            <span className="w-8 h-px bg-primary-500" />
            TRAIN SKILLS
            <span className="w-8 h-px bg-primary-500" />
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Master Every Aspect of the Game
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our training modules cover all essential soccer skills, with personalized drills
            adapted to your age and skill level.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              delay={index * 0.1}
              shouldAnimate={shouldAnimate}
              accentColor={skill.accentColor}
            />
          ))}
        </div>

        {/* Soccer ball decorative element */}
        <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary-400 w-full h-full">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M50 10 L60 30 L55 45 L45 45 L40 30 Z" />
            <path d="M50 10 L60 30 L55 45 L45 45 L40 30 Z" transform="rotate(72 50 50)" />
            <path d="M50 10 L60 30 L55 45 L45 45 L40 30 Z" transform="rotate(144 50 50)" />
            <path d="M50 10 L60 30 L55 45 L45 45 L40 30 Z" transform="rotate(216 50 50)" />
            <path d="M50 10 L60 30 L55 45 L45 45 L40 30 Z" transform="rotate(288 50 50)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
