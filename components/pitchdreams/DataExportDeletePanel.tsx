'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Download, Trash2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DataExportDeletePanelProps {
  childId: string
  childNickname: string
  onExport?: () => Promise<void>
  onDelete?: () => Promise<void>
  className?: string
}

export function DataExportDeletePanel({
  childId,
  childNickname,
  onExport,
  onDelete,
  className,
}: DataExportDeletePanelProps) {
  const [exporting, setExporting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleExport = async () => {
    if (!onExport) return

    setExporting(true)
    try {
      await onExport()
    } finally {
      setExporting(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete || deleteConfirmText !== 'DELETE') return

    setDeleting(true)
    try {
      await onDelete()
      setDeleteDialogOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Card variant="parent-light" className={cn('p-6', className)}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Data & Privacy
            </h3>
            <p className="text-sm text-gray-600">
              Export or delete all data for {childNickname}.
            </p>
          </div>

          {/* Export Data */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Download className="h-5 w-5 text-gray-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  Export All Data
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Download a complete JSON file containing all of {childNickname}'s training sessions, progress data, and account information.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleExport}
                  disabled={exporting}
                  className="w-full sm:w-auto"
                >
                  {exporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Delete Data */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Trash2 className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  Delete All Data
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Permanently delete {childNickname}'s account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Account"
        description={`Are you sure you want to permanently delete ${childNickname}'s account? All training sessions, progress data, and account information will be permanently removed.`}
      >
        <div className="space-y-4">
          {/* Warning */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900 mb-1">
                This action cannot be undone
              </p>
              <p className="text-sm text-red-800">
                All data will be permanently deleted from our servers. You will not be able to recover this information.
              </p>
            </div>
          </div>

          {/* Confirmation Input */}
          <div>
            <label
              htmlFor="delete-confirm"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Type <span className="font-mono font-bold">DELETE</span> to confirm:
            </label>
            <input
              id="delete-confirm"
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              autoComplete="off"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                setDeleteDialogOpen(false)
                setDeleteConfirmText('')
              }}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={deleteConfirmText !== 'DELETE' || deleting}
            >
              {deleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Permanently
                </>
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
