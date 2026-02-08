import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { LearnPageContent } from './LearnPageContent'

interface LearnPageProps {
  params: {
    childId: string
  }
}

// Define quiz question type
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

export default async function ChildLearnPage({ params }: LearnPageProps) {
  // Verify ownership
  const { child } = await verifyChildOwnership(params.childId)

  // Fetch lessons appropriate for child's age
  const lessons = await prisma.lesson.findMany({
    where: {
      ageMin: { lte: child.age },
      ageMax: { gte: child.age },
    },
    select: {
      id: true,
      title: true,
      category: true,
      content: true,
      readingTime: true,
      difficulty: true,
      quizQuestions: true,
    },
    orderBy: [
      { category: 'asc' },
      { difficulty: 'asc' },
    ],
  })

  // Fetch lesson progress for this child
  const lessonProgress = await prisma.lessonProgress.findMany({
    where: { childId: params.childId },
    select: {
      lessonId: true,
      completed: true,
      quizScore: true,
      quizTotal: true,
    },
  })

  // Create a map of lesson progress
  type LessonProgressRecord = typeof lessonProgress[number]
  type LessonRecord = typeof lessons[number]
  const progressMap = new Map(
    lessonProgress.map((p: LessonProgressRecord) => [p.lessonId, p])
  )

  // Combine lessons with progress and parse quiz questions
  const lessonsWithProgress = lessons.map((lesson: LessonRecord) => {
    const progress = progressMap.get(lesson.id) as LessonProgressRecord | undefined
    return {
      id: lesson.id,
      title: lesson.title,
      category: lesson.category,
      content: lesson.content,
      readingTime: lesson.readingTime,
      difficulty: lesson.difficulty,
      quizQuestions: lesson.quizQuestions as unknown as QuizQuestion[],
      completed: progress?.completed ?? false,
      quizScore: progress?.quizScore ?? null,
      quizTotal: progress?.quizTotal ?? null,
    }
  })

  return (
    <LearnPageContent
      childId={params.childId}
      lessons={lessonsWithProgress}
    />
  )
}
