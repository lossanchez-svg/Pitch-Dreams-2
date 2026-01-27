'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import {
  FeaturePermissionsPanel,
  DataExportDeletePanel,
  ParentGateBanner,
} from '@/components/pitchdreams'
import { updateChildPermissions, exportChildData, deleteChildAccount } from '@/app/(parent)/controls/actions'

interface Child {
  id: string
  nickname: string
  age: number
  freeTextEnabled: boolean
}

interface ParentControlsContentProps {
  child: Child
}

export function ParentControlsContent({ child }: ParentControlsContentProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('permissions')

  const handleSavePermissions = async (permissions: {
    freeTextEnabled: boolean
  }) => {
    await updateChildPermissions(child.id, permissions)
  }

  const handleExportData = async () => {
    const data = await exportChildData(child.id)

    // Download as JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${child.nickname}-pitchdreams-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = async () => {
    await deleteChildAccount(child.id)
    router.push('/parent/dashboard')
    router.refresh()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Controls</h1>
        <p className="text-gray-600">
          Manage permissions and data for {child.nickname}.
        </p>
      </div>

      {/* Parent Gate Banner */}
      <ParentGateBanner className="mb-6" />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions">
          <div className="py-6">
            <FeaturePermissionsPanel
              childId={child.id}
              childAge={child.age}
              initialPermissions={{
                freeTextEnabled: child.freeTextEnabled,
              }}
              onSave={handleSavePermissions}
            />
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="py-6">
            <DataExportDeletePanel
              childId={child.id}
              childNickname={child.nickname}
              onExport={handleExportData}
              onDelete={handleDeleteAccount}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
