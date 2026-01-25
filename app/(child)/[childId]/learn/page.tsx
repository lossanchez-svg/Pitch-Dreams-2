'use client'

import { useState } from 'react'
import { LessonCard, QuizCard } from '@/components/pitchdreams'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { X } from 'lucide-react'

// Mock lessons - will be replaced with Prisma data
const mockLessons = [
  {
    id: '1',
    title: 'Reading the Game: Space and Time',
    category: 'Positioning',
    readingTime: 5,
    description: 'Learn to see opportunities before they happen by understanding space.',
    completed: false,
  },
  {
    id: '2',
    title: 'First Touch Fundamentals',
    category: 'Technique',
    readingTime: 4,
    description: 'Master the foundation of ball control with proper first touch mechanics.',
    completed: false,
  },
  {
    id: '3',
    title: 'Decision Making Under Pressure',
    category: 'Tactics',
    readingTime: 6,
    description: 'Develop faster, smarter decisions when opponents close you down.',
    completed: true,
  },
  {
    id: '4',
    title: 'Recovery and Injury Prevention',
    category: 'Recovery',
    readingTime: 7,
    description: 'Essential stretches and recovery protocols to train consistently.',
    completed: false,
  },
]

// Mock quiz
const mockQuiz = {
  id: 'q1',
  question: 'When receiving a pass under pressure, where should your first touch direct the ball?',
  options: [
    {
      id: 'a',
      text: 'Into open space away from the defender',
      isCorrect: true,
    },
    {
      id: 'b',
      text: 'Directly back to the passer',
      isCorrect: false,
    },
    {
      id: 'c',
      text: 'Straight ahead regardless of defenders',
      isCorrect: false,
    },
    {
      id: 'd',
      text: 'Stop the ball completely before looking up',
      isCorrect: false,
    },
  ],
  explanation: 'Your first touch should take the ball into space away from pressure, giving you time and options for your next action. This is a fundamental principle of playing under pressure.',
}

export default function ChildLearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(lessonId)
    // TODO: Fetch lesson content and display in modal/drawer
    console.log('Open lesson:', lessonId)
  }

  const handleQuizComplete = (correct: boolean) => {
    console.log('Quiz completed:', correct ? 'Correct' : 'Incorrect')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="hud-label mb-2">Knowledge Base</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Learn & Grow
        </h1>
        <p className="text-gray-300">
          Build your soccer IQ with lessons and knowledge checks.
        </p>
      </div>

      {/* Quiz Section (Conditionally shown) */}
      {showQuiz ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-primary-400">
              Knowledge Check
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuiz(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <QuizCard
            id={mockQuiz.id}
            question={mockQuiz.question}
            options={mockQuiz.options}
            explanation={mockQuiz.explanation}
            onComplete={handleQuizComplete}
          />
        </div>
      ) : (
        /* Show Quiz Button */
        <Card variant="hud-panel" className="p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="hud-label mb-1">Test Your Knowledge</div>
              <p className="text-gray-300">
                Take a quiz to check your understanding.
              </p>
            </div>
            <Button
              variant="hud"
              onClick={() => setShowQuiz(true)}
            >
              Start Quiz
            </Button>
          </div>
        </Card>
      )}

      {/* Lessons Grid */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-primary-400 mb-6">
          Available Lessons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              category={lesson.category}
              readingTime={lesson.readingTime}
              description={lesson.description}
              completed={lesson.completed}
              onClick={() => handleLessonClick(lesson.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic">
          "Smart players win before the ball moves."
        </p>
      </div>
    </div>
  )
}
