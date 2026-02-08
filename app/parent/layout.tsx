import { ParentHeader } from '@/components/navigation/ParentHeader'

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <ParentHeader />
      <main className="pb-8">{children}</main>
    </div>
  )
}
