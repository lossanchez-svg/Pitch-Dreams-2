import { ParentNavbar } from '@/components/navigation/ParentNavbar'

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ParentNavbar />
      <main className="pb-8">{children}</main>
    </div>
  )
}
