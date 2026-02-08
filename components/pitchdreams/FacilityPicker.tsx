'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
  Building2,
  Search,
  Clock,
  Star,
  ExternalLink,
  CheckCircle,
  Plus,
} from 'lucide-react'
import { buildGoogleMapsSearchUrl } from '@/lib/maps'

export interface FacilityData {
  id?: string
  name: string
  city?: string | null
  mapsUrl?: string | null
  isSaved?: boolean
}

interface FacilityPickerProps {
  savedFacilities: FacilityData[]
  recentFacilities: FacilityData[]
  selectedFacility: FacilityData | null
  onSelect: (facility: FacilityData | null, mapsUrlFreeform?: string) => void
  onSaveNew: (facility: Omit<FacilityData, 'id'>) => void
}

type Tab = 'saved' | 'manual'

export function FacilityPicker({
  savedFacilities,
  recentFacilities,
  selectedFacility,
  onSelect,
  onSaveNew,
}: FacilityPickerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('saved')
  const [manualName, setManualName] = useState('')
  const [manualCity, setManualCity] = useState('')
  const [manualMapsUrl, setManualMapsUrl] = useState('')
  const [saveForReuse, setSaveForReuse] = useState(true) // Default ON

  // Combine saved and recent, removing duplicates
  const allSavedFacilities = [...savedFacilities]
  const recentNotSaved = recentFacilities.filter(
    r => !savedFacilities.some(s => s.id === r.id)
  )

  const handleSelectExisting = (facility: FacilityData) => {
    onSelect(facility)
  }

  const handleSearchMaps = () => {
    const query = [manualName, manualCity].filter(Boolean).join(' ')
    if (!query.trim()) return
    const url = buildGoogleMapsSearchUrl(query)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSearchMapsForFacility = (facility: FacilityData) => {
    const query = [facility.name, facility.city].filter(Boolean).join(' ')
    const url = buildGoogleMapsSearchUrl(query)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleManualSubmit = () => {
    if (!manualName.trim()) return

    const mapsUrlToSave = manualMapsUrl.trim() || null

    if (saveForReuse) {
      const facility: Omit<FacilityData, 'id'> = {
        name: manualName.trim(),
        city: manualCity.trim() || null,
        mapsUrl: mapsUrlToSave,
        isSaved: true,
      }
      onSaveNew(facility)
      onSelect(facility as FacilityData)
    } else {
      // One-off: pass facility without id and optional mapsUrl as freeform
      const facility: FacilityData = {
        name: manualName.trim(),
        city: manualCity.trim() || null,
      }
      onSelect(facility, mapsUrlToSave || undefined)
    }
  }

  const handleClear = () => {
    onSelect(null)
    setManualName('')
    setManualCity('')
    setManualMapsUrl('')
    setSaveForReuse(true)
  }

  // If a facility is already selected, show the selection
  if (selectedFacility) {
    const hasMapUrl = !!selectedFacility.mapsUrl
    const searchUrl = buildGoogleMapsSearchUrl(
      [selectedFacility.name, selectedFacility.city].filter(Boolean).join(' ')
    )

    return (
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
          Facility
        </label>
        <Card variant="hud-panel" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700/50 border border-gray-600">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <span className="font-medium text-gray-200">
                  {selectedFacility.name}
                </span>
                {selectedFacility.city && (
                  <p className="text-sm text-gray-500">
                    {selectedFacility.city}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasMapUrl ? (
                <a
                  href={selectedFacility.mapsUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs text-primary-400 hover:bg-gray-700 transition-colors"
                  title="Open in Maps"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open Maps
                </a>
              ) : (
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-primary-400 hover:bg-gray-700 transition-colors"
                  title="Search on Maps"
                >
                  <Search className="w-3 h-3" />
                  Search Maps
                </a>
              )}
              <button
                onClick={handleClear}
                className="text-sm text-gray-500 hover:text-gray-300"
              >
                Change
              </button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
        Facility (optional)
      </label>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-800/50 rounded-lg">
        {[
          { key: 'saved' as Tab, label: 'Saved', icon: Star },
          { key: 'manual' as Tab, label: 'Type Manually', icon: Plus },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-sm transition-colors ${
              activeTab === key
                ? 'bg-primary-500/20 text-primary-400'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {/* Recent Facilities */}
            {recentNotSaved.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Recent</p>
                <div className="space-y-2">
                  {recentNotSaved.slice(0, 5).map((facility) => (
                    <FacilityListItem
                      key={facility.id}
                      facility={facility}
                      onSelect={() => handleSelectExisting(facility)}
                      onSearchMaps={() => handleSearchMapsForFacility(facility)}
                      showClock
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Saved Facilities */}
            {allSavedFacilities.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Saved</p>
                <div className="space-y-2">
                  {allSavedFacilities.map((facility) => (
                    <FacilityListItem
                      key={facility.id}
                      facility={facility}
                      onSelect={() => handleSelectExisting(facility)}
                      onSearchMaps={() => handleSearchMapsForFacility(facility)}
                      showStar
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {allSavedFacilities.length === 0 && recentNotSaved.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No saved facilities yet</p>
                <p className="text-xs mt-1">Type one manually to add</p>
              </div>
            )}
          </div>
        )}

        {/* Manual Entry Tab */}
        {activeTab === 'manual' && (
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="Facility name (required)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <input
                type="text"
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
                placeholder="City (optional)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <input
                type="url"
                value={manualMapsUrl}
                onChange={(e) => setManualMapsUrl(e.target.value)}
                placeholder="Google Maps link (optional)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <Button
              variant="secondary"
              onClick={handleSearchMaps}
              disabled={!manualName.trim()}
              className="w-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Google Maps
            </Button>

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={saveForReuse}
                onChange={(e) => setSaveForReuse(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
              />
              Save for reuse
            </label>

            <Button
              variant="hud"
              onClick={handleManualSubmit}
              disabled={!manualName.trim()}
              className="w-full"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Use This Facility
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper component for facility list items
function FacilityListItem({
  facility,
  onSelect,
  onSearchMaps,
  showStar,
  showClock,
}: {
  facility: FacilityData
  onSelect: () => void
  onSearchMaps: () => void
  showStar?: boolean
  showClock?: boolean
}) {
  const hasMapsUrl = !!facility.mapsUrl

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-colors">
      <button
        onClick={onSelect}
        className="flex-1 flex items-center gap-3 text-left"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-700/50">
          <Building2 className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="font-medium text-gray-200 truncate block">
            {facility.name}
          </span>
          {facility.city && (
            <p className="text-xs text-gray-500 truncate">
              {facility.city}
            </p>
          )}
        </div>

        {showStar && (
          <Star className="w-4 h-4 text-yellow-500/70 flex-shrink-0" />
        )}
        {showClock && (
          <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {/* Maps action */}
      {hasMapsUrl ? (
        <a
          href={facility.mapsUrl!}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-primary-400 hover:bg-gray-700 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-3 h-3" />
          Open Maps
        </a>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSearchMaps()
          }}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-primary-400 hover:bg-gray-700 transition-colors flex-shrink-0"
        >
          <Search className="w-3 h-3" />
          Search Maps
        </button>
      )}
    </div>
  )
}

export default FacilityPicker
