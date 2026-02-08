import { prisma } from '@/lib/db'
import { verifyChildOwnership } from '@/lib/child-helpers'
import { SkillTrackContent } from './SkillTrackContent'

interface SkillTrackPageProps {
  params: {
    childId: string
  }
}

// Define types to match Prisma schema
interface SkillTrackDrillDB {
  id: string
  key: string
  title: string
  track: string
  durationMinutes: number
  recommendedFrequency: string
  animationKey: string
  whyItMatters: string
  coachTips: unknown
  metricConfig: unknown
  createdAt: Date
  updatedAt: Date
}

interface SkillTrackDrillLogDB {
  id: string
  childId: string
  drillId: string
  repsCount: number | null
  confidence: number | null
  metricData: unknown
  createdAt: Date
  drill: SkillTrackDrillDB
}

export default async function SkillTrackPage({ params }: SkillTrackPageProps) {
  // Verify ownership
  const { child } = await verifyChildOwnership(params.childId)

  // Fetch skill track drills from database
  const skillTrackDrills = await prisma.skillTrackDrill.findMany({
    orderBy: [
      { track: 'asc' },
      { title: 'asc' },
    ],
  }) as SkillTrackDrillDB[]

  // Fetch recent drill logs for this child
  const recentLogs = await prisma.skillTrackDrillLog.findMany({
    where: {
      childId: params.childId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
    include: {
      drill: true,
    },
  }) as SkillTrackDrillLogDB[]

  // Calculate completion stats per drill
  const drillStats = skillTrackDrills.map((drill: SkillTrackDrillDB) => {
    const logs = recentLogs.filter((log: SkillTrackDrillLogDB) => log.drillId === drill.id)
    const totalAttempts = logs.length
    const avgConfidence = logs.length > 0
      ? logs.reduce((sum: number, log: SkillTrackDrillLogDB) => sum + (log.confidence || 0), 0) / logs.length
      : 0
    const lastAttempt = logs[0]?.createdAt || null

    return {
      drillId: drill.id,
      totalAttempts,
      avgConfidence: Math.round(avgConfidence * 10) / 10,
      lastAttempt,
    }
  })

  return (
    <SkillTrackContent
      childId={params.childId}
      childName={child.nickname}
      skillTrackDrills={skillTrackDrills}
      drillStats={drillStats}
    />
  )
}
