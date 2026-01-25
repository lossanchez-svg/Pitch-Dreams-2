import { ChildBottomNav } from '@/components/navigation/ChildBottomNav'

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-950 dark hud-grid">
      <main className="pb-24">{children}</main>
      <ChildBottomNav />
    </div>
  )
}
