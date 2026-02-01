'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
  Building2,
  MapPin,
  Search,
  Clock,
  Star,
  StarOff,
  ExternalLink,
  CheckCircle,
  Plus,
} from 'lucide-react'
import { getFacilityMapsUrl, buildGoogleMapsSearchUrl, extractPlaceIdFromMapsUrl, isGoogleMapsUrl } from '@/lib/maps'

export interface FacilityData {
  id?: string
  name: string
  city?: string | null
  state?: string | null
  country?: string | null
  googlePlaceId?: string | null
  mapsUrl?: string | null
  isVerified?: boolean
  isSaved?: boolean
  source?: 'GOOGLE_MAPS' | 'MANUAL'
}

interface FacilityPickerProps {
  savedFacilities: FacilityData[]
  recentFacilities: FacilityData[]
  selectedFacility: FacilityData | null
  onSelect: (facility: FacilityData | null) => void
  onSaveNew: (facility: Omit<FacilityData, 'id'>) => void
}

type Tab = 'saved' | 'manual' | 'maps'

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
  const [saveForReuse, setSaveForReuse] = useState(false)
  const [mapsSearchQuery, setMapsSearchQuery] = useState('')
  const [pastedMapsUrl, setPastedMapsUrl] = useState('')

  // Combine saved and recent, removing duplicates
  const allSavedFacilities = [...savedFacilities]
  const recentNotSaved = recentFacilities.filter(
    r => !savedFacilities.some(s => s.id === r.id)
  )

  const handleSelectExisting = (facility: FacilityData) => {
    onSelect(facility)
  }

  const handleManualSubmit = () => {
    if (!manualName.trim()) return

    const facility: Omit<FacilityData, 'id'> = {
      name: manualName.trim(),
      city: manualCity.trim() || null,
      source: 'MANUAL',
      isVerified: false,
      isSaved: saveForReuse,
    }

    if (saveForReuse) {
      onSaveNew(facility)
    }

    onSelect(facility as FacilityData)
  }

  const handleMapsSearch = () => {
    if (!mapsSearchQuery.trim()) return
    const url = buildGoogleMapsSearchUrl(mapsSearchQuery)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handlePastedUrl = () => {
    if (!pastedMapsUrl.trim()) return

    if (!isGoogleMapsUrl(pastedMapsUrl)) {
      alert('Please paste a valid Google Maps URL')
      return
    }

    const placeId = extractPlaceIdFromMapsUrl(pastedMapsUrl)

    const facility: Omit<FacilityData, 'id'> = {
      name: mapsSearchQuery.trim() || 'Location from Maps',
      mapsUrl: pastedMapsUrl,
      googlePlaceId: placeId,
      source: placeId ? 'GOOGLE_MAPS' : 'MANUAL',
      isVerified: !!placeId,
      isSaved: true,
    }

    onSaveNew(facility)
    onSelect(facility as FacilityData)
  }

  const handleClear = () => {
    onSelect(null)
    setManualName('')
    setManualCity('')
    setPastedMapsUrl('')
    setMapsSearchQuery('')
    setSaveForReuse(false)
  }

  // If a facility is already selected, show the selection
  if (selectedFacility) {
    const mapsInfo = getFacilityMapsUrl(selectedFacility)

    return (
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
          Facility
        </label>
        <Card variant="hud-panel" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedFacility.isVerified
                  ? 'bg-accent-500/20 border border-accent-500/40'
                  : 'bg-gray-700/50 border border-gray-600'
              }`}>
                <Building2 className={`w-5 h-5 ${
                  selectedFacility.isVerified ? 'text-accent-400' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200">
                    {selectedFacility.name}
                  </span>
                  {selectedFacility.isVerified && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-accent-500/20 text-accent-400">
                      Verified
                    </span>
                  )}
                </div>
                {(selectedFacility.city || selectedFacility.state) && (
                  <p className="text-sm text-gray-500">
                    {[selectedFacility.city, selectedFacility.state].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={mapsInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-primary-400"
                title={mapsInfo.type === 'place' ? 'Open in Maps' : 'Find on Maps'}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
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
          { key: 'manual' as Tab, label: 'Type', icon: Plus },
          { key: 'maps' as Tab, label: 'Maps', icon: MapPin },
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
                      showStar
                    />
                  ))}
                </div>
              </div>
            )}

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
                      showClock
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
                <p className="text-xs mt-1">Type one or search Maps to add</p>
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
                placeholder="Facility name (e.g., Touch N Go)"
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

        {/* Maps Search Tab */}
        {activeTab === 'maps' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Search Google Maps to find the facility, then paste the link here.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={mapsSearchQuery}
                onChange={(e) => setMapsSearchQuery(e.target.value)}
                placeholder="Search (e.g., Touch N Go Tustin)"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                variant="secondary"
                onClick={handleMapsSearch}
                disabled={!mapsSearchQuery.trim()}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-gray-900 text-gray-500">then paste the link</span>
              </div>
            </div>

            <div>
              <input
                type="url"
                value={pastedMapsUrl}
                onChange={(e) => setPastedMapsUrl(e.target.value)}
                placeholder="Paste Google Maps link here"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <Button
              variant="hud"
              onClick={handlePastedUrl}
              disabled={!pastedMapsUrl.trim()}
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Use This Location
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
  showStar,
  showClock,
}: {
  facility: FacilityData
  onSelect: () => void
  showStar?: boolean
  showClock?: boolean
}) {
  const mapsInfo = getFacilityMapsUrl(facility)

  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-colors text-left"
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        facility.isVerified
          ? 'bg-accent-500/20'
          : 'bg-gray-700/50'
      }`}>
        <Building2 className={`w-4 h-4 ${
          facility.isVerified ? 'text-accent-400' : 'text-gray-400'
        }`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-200 truncate">
            {facility.name}
          </span>
          {facility.isVerified && (
            <span className="text-[10px] px-1 py-0.5 rounded bg-accent-500/20 text-accent-400 flex-shrink-0">
              Verified
            </span>
          )}
        </div>
        {(facility.city || facility.state) && (
          <p className="text-xs text-gray-500 truncate">
            {[facility.city, facility.state].filter(Boolean).join(', ')}
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
  )
}

export default FacilityPicker
