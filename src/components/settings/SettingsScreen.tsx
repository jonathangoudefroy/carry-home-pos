'use client'

import { useState } from 'react'
import { Artist } from '@/lib/types'
import { DEMO_ARTISTS } from '@/lib/demo-data'
import { ArtistEditor } from './ArtistEditor'
import { ImportParser } from './ImportParser'
import { PinChanger } from './PinChanger'

interface SettingsScreenProps {
  artists: Artist[]
  pin: string
  onAddArtist: (artist: Artist) => void
  onUpdateArtist: (artist: Artist) => void
  onDeleteArtist: (id: string) => void
  onSetArtists: (artists: Artist[]) => void
  onChangePin: (pin: string) => void
  onResetAll: () => void
}

export function SettingsScreen({
  artists,
  pin,
  onAddArtist,
  onUpdateArtist,
  onDeleteArtist,
  onSetArtists,
  onChangePin,
  onResetAll,
}: SettingsScreenProps) {
  const [editingArtist, setEditingArtist] = useState<Artist | 'new' | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleLoadDemo = () => {
    const existing = new Set(artists.map(a => a.id))
    const toAdd = DEMO_ARTISTS.filter(d => !existing.has(d.id))
    onSetArtists([...artists, ...toAdd])
  }

  const handleSaveArtist = (artist: Artist) => {
    if (editingArtist === 'new') {
      onAddArtist(artist)
    } else {
      onUpdateArtist(artist)
    }
    setEditingArtist(null)
  }

  const handleReset = () => {
    onResetAll()
    setShowResetConfirm(false)
  }

  if (editingArtist) {
    return (
      <div className="p-4 pb-24">
        <ArtistEditor
          artist={editingArtist === 'new' ? undefined : editingArtist}
          onSave={handleSaveArtist}
          onCancel={() => setEditingArtist(null)}
        />
      </div>
    )
  }

  return (
    <div className="p-4 pb-24 space-y-6">
      <h2 className="text-xl font-bold text-text-primary">Einstellungen</h2>

      {/* Artist management */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-text-primary">Künstler:innen ({artists.length})</h3>
          <button
            onClick={() => setEditingArtist('new')}
            className="text-sm text-accent font-medium min-h-[44px]"
          >
            + Hinzufügen
          </button>
        </div>
        {artists.length === 0 ? (
          <p className="text-sm text-gray-400">Keine Künstler:innen vorhanden</p>
        ) : (
          <div className="space-y-2">
            {artists.map(artist => (
              <div key={artist.id} className="flex items-center justify-between p-3 bg-card rounded-[var(--radius-card)] border border-border">
                <div>
                  <p className="font-medium text-text-primary">{artist.name}</p>
                  <p className="text-xs text-gray-500">{artist.works.length} Werke</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingArtist(artist)}
                    className="text-xs text-accent font-medium min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => onDeleteArtist(artist.id)}
                    className="text-xs text-red-500 font-medium min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Import */}
      <ImportParser existingArtists={artists} onImport={onAddArtist} />

      {/* Demo data */}
      <div>
        <button
          onClick={handleLoadDemo}
          className="w-full py-3 bg-card border border-border rounded-lg font-medium text-text-primary min-h-[44px]"
        >
          Demo-Daten laden
        </button>
      </div>

      {/* PIN */}
      <PinChanger currentPin={pin} onChangePin={onChangePin} />

      {/* Reset */}
      <div>
        {showResetConfirm ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-3">
            <p className="text-sm text-red-700 font-medium">Alle Daten unwiderruflich löschen?</p>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium min-h-[44px]">
                Ja, alles löschen
              </button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-3 bg-white border border-border rounded-lg font-medium min-h-[44px]">
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 bg-white border border-red-200 rounded-lg font-medium text-red-500 min-h-[44px]"
          >
            Alle Daten zurücksetzen
          </button>
        )}
      </div>
    </div>
  )
}
