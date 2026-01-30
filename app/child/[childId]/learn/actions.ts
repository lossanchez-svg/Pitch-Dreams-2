'use server'

import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { revalidatePath } from 'next/cache'

interface LessonProgressData {
  completed: boolean
}

interface QuizResultData {
  score: number
  total: number
}

export async function saveLessonProgress(
  childId: string,
  lessonId: string,
  data: LessonProgressData
) {
  // Verify ownership
  await verifyChildOwnership(childId)

  // Upsert lesson progress
  const progress = await prisma.lessonProgress.upsert({
    where: {
      childId_lessonId: {
        childId,
        lessonId,
      },
    },
    update: {
      completed: data.completed,
    },
    create: {
      childId,
      lessonId,
      completed: data.completed,
    },
  })

  // Revalidate learn page
  revalidatePath(`/child/${childId}/learn`)

  return { success: true, progressId: progress.id }
}

export async function saveQuizResult(
  childId: string,
  lessonId: string,
  data: QuizResultData
) {
  // Verify ownership
  await verifyChildOwnership(childId)

  // Upsert lesson progress with quiz score
  const progress = await prisma.lessonProgress.upsert({
    where: {
      childId_lessonId: {
        childId,
        lessonId,
      },
    },
    update: {
      completed: true,
      quizScore: data.score,
      quizTotal: data.total,
    },
    create: {
      childId,
      lessonId,
      completed: true,
      quizScore: data.score,
      quizTotal: data.total,
    },
  })

  // Revalidate learn page
  revalidatePath(`/child/${childId}/learn`)

  return { success: true, progressId: progress.id }
}
