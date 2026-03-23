'use client'

import { useState } from 'react'
import { Artist } from '@/lib/types'
import { ArtistCard } from './ArtistCard'

interface ArtistListProps {
  artists: Artist[]
  onSelectArtist: (id: string) => void
}

export function ArtistList({ artists, onSelectArtist }: ArtistListProps) {
  const [search, setSearch] = useState('')

  const filtered = artists.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 pb-24">
      <input
        type="text"
        placeholder="Künstler:in suchen..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-[var(--radius-card)] border border-border bg-white text-base mb-4 outline-none focus:border-accent"
      />
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">
          {artists.length === 0 ? 'Noch keine Künstler:innen. Füge welche in den Einstellungen hinzu.' : 'Keine Ergebnisse'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(artist => (
            <ArtistCard key={artist.id} artist={artist} onClick={() => onSelectArtist(artist.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
