'use client'

import { useState } from 'react'
import { LessonCard, QuizCard } from '@/components/pitchdreams'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { X, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { saveLessonProgress, saveQuizResult } from './actions'

interface QuizQuestion {
  id: string
  question: string
  options: Array<{
    id: string
    text: string
    isCorrect: boolean
  }>
  explanation: string
}

interface Lesson {
  id: string
  title: string
  category: string
  content: string
  readingTime: number
  difficulty: string
  quizQuestions: QuizQuestion[]
  completed: boolean
  quizScore: number | null
  quizTotal: number | null
}

interface LearnPageContentProps {
  childId: string
  lessons: Lesson[]
}

export function LearnPageContent({ childId, lessons }: LearnPageContentProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleLessonClick = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId)
    if (lesson) {
      setSelectedLesson(lesson)
      setShowQuiz(false)
      setCurrentQuizIndex(0)
      setQuizScore(0)
      setQuizCompleted(false)
    }
  }

  const handleCloseLesson = async () => {
    if (selectedLesson && !selectedLesson.completed) {
      // Mark lesson as read (but not quiz completed)
      setIsSaving(true)
      try {
        await saveLessonProgress(childId, selectedLesson.id, {
          completed: false,
        })
      } catch (error) {
        console.error('Failed to save progress:', error)
      } finally {
        setIsSaving(false)
      }
    }
    setSelectedLesson(null)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
    setCurrentQuizIndex(0)
    setQuizScore(0)
    setQuizCompleted(false)
  }

  const handleQuizAnswer = async (correct: boolean) => {
    if (correct) {
      setQuizScore((prev) => prev + 1)
    }

    const quizQuestions = selectedLesson?.quizQuestions || []

    if (currentQuizIndex < quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuizIndex((prev) => prev + 1)
    } else {
      // Quiz complete
      setQuizCompleted(true)

      if (selectedLesson) {
        const finalScore = correct ? quizScore + 1 : quizScore
        setIsSaving(true)
        try {
          await saveQuizResult(childId, selectedLesson.id, {
            score: finalScore,
            total: quizQuestions.length,
          })
        } catch (error) {
          console.error('Failed to save quiz result:', error)
        } finally {
          setIsSaving(false)
        }
      }
    }
  }

  const currentQuiz = selectedLesson?.quizQuestions?.[currentQuizIndex]
  const completedCount = lessons.filter((l) => l.completed).length

  // If viewing a lesson
  if (selectedLesson) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Lesson Header */}
        <div className="mb-8">
          <button
            onClick={handleCloseLesson}
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lessons
          </button>
          <div className="hud-label mb-2">{selectedLesson.category}</div>
          <h1 className="font-display text-4xl text-primary-400 mb-2">
            {selectedLesson.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {selectedLesson.readingTime} min read • {selectedLesson.difficulty}
          </p>
        </div>

        {/* Quiz Mode */}
        {showQuiz && currentQuiz && !quizCompleted ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-primary-400">
                Knowledge Check ({currentQuizIndex + 1}/{selectedLesson.quizQuestions.length})
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
              id={currentQuiz.id}
              question={currentQuiz.question}
              options={currentQuiz.options}
              explanation={currentQuiz.explanation}
              onComplete={handleQuizAnswer}
            />
          </div>
        ) : quizCompleted ? (
          // Quiz Complete
          <Card variant="hud-panel" className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-accent-400 mx-auto mb-4" />
            <h2 className="font-display text-3xl text-white mb-2">
              Quiz Complete!
            </h2>
            <p className="text-gray-300 text-xl mb-6">
              You scored {quizScore} out of {selectedLesson.quizQuestions.length}
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="ghost" onClick={() => setShowQuiz(false)}>
                Review Lesson
              </Button>
              <Button variant="hud" onClick={handleCloseLesson}>
                Back to Lessons
              </Button>
            </div>
          </Card>
        ) : (
          // Lesson Content
          <div className="space-y-8">
            <Card variant="hud" className="p-8">
              <div className="prose prose-invert max-w-none">
                {/* Render content - split by paragraphs */}
                {selectedLesson.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>

            {/* Quiz CTA */}
            {selectedLesson.quizQuestions && selectedLesson.quizQuestions.length > 0 && (
              <Card variant="hud-panel" className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="hud-label mb-1">Test Your Knowledge</div>
                    <p className="text-gray-300">
                      Take a {selectedLesson.quizQuestions.length}-question quiz to check your understanding.
                    </p>
                    {selectedLesson.quizScore !== null && (
                      <p className="text-sm text-accent-400 mt-1">
                        Previous score: {selectedLesson.quizScore}/{selectedLesson.quizTotal}
                      </p>
                    )}
                  </div>
                  <Button variant="hud" onClick={handleStartQuiz}>
                    {selectedLesson.quizScore !== null ? 'Retake Quiz' : 'Start Quiz'}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    )
  }

  // Main lessons list
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/child/${childId}/home`}
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="hud-label mb-2">Knowledge Base</div>
        <h1 className="font-display text-5xl text-primary-400 mb-2">
          Learn & Grow
        </h1>
        <p className="text-gray-300">
          Build your soccer IQ with lessons and knowledge checks.
        </p>
      </div>

      {/* Progress Overview */}
      <Card variant="hud-panel" className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/40 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <div className="hud-label mb-1">Progress</div>
              <p className="text-gray-300">
                <span className="text-primary-400 font-display text-2xl">{completedCount}</span>
                <span className="text-gray-500"> / {lessons.length} lessons completed</span>
              </p>
            </div>
          </div>
          {completedCount === lessons.length && lessons.length > 0 && (
            <div className="flex items-center gap-2 text-accent-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">All Complete!</span>
            </div>
          )}
        </div>
      </Card>

      {/* Lessons Grid */}
      <div className="mb-8">
        <h2 className="font-display text-2xl text-primary-400 mb-6">
          Available Lessons
        </h2>
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                category={lesson.category}
                readingTime={lesson.readingTime}
                description={lesson.content.slice(0, 120) + '...'}
                completed={lesson.completed}
                onClick={() => handleLessonClick(lesson.id)}
              />
            ))}
          </div>
        ) : (
          <Card variant="hud-panel" className="p-8 text-center">
            <p className="text-gray-400">No lessons available yet. Check back soon!</p>
          </Card>
        )}
      </div>

      {/* Footer Quote */}
      <div className="text-center mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic">
          &quot;Smart players win before the ball moves.&quot;
        </p>
      </div>
    </div>
  )
}
