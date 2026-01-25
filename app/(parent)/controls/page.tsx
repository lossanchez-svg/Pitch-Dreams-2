'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import {
  FeaturePermissionsPanel,
  DataExportDeletePanel,
  ParentGateBanner,
} from '@/components/pitchdreams'

// Mock data - will be replaced with actual child data
const mockChild = {
  id: '1',
  nickname: 'Alex',
  age: 12,
}

export default function ParentControlsPage() {
  const [activeTab, setActiveTab] = useState('permissions')

  const handleSavePermissions = async (permissions: any) => {
    // TODO: Implement Prisma mutation
    console.log('Saving permissions:', permissions)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleExportData = async () => {
    // TODO: Implement data export
    console.log('Exporting data for child:', mockChild.id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion
    console.log('Deleting account for child:', mockChild.id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Controls</h1>
        <p className="text-gray-600">
          Manage permissions and data for {mockChild.nickname}.
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
              childId={mockChild.id}
              childAge={mockChild.age}
              initialPermissions={{
                freeTextEnabled: false,
                challengesEnabled: true,
              }}
              onSave={handleSavePermissions}
            />
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="py-6">
            <DataExportDeletePanel
              childId={mockChild.id}
              childNickname={mockChild.nickname}
              onExport={handleExportData}
              onDelete={handleDeleteAccount}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
