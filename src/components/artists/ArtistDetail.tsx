'use client'

import { Artist, Work } from '@/lib/types'

interface ArtistDetailProps {
  artist: Artist
  onBack: () => void
  onSellWork: (work: Work) => void
}

export function ArtistDetail({ artist, onBack, onSellWork }: ArtistDetailProps) {
  const available = artist.works.filter(w => w.soldCount < w.quantity)
  const fullySold = artist.works.filter(w => w.soldCount >= w.quantity)

  return (
    <div className="p-4 pb-24">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-accent font-medium mb-4 min-h-[44px]"
      >
        &larr; Zurück
      </button>
      <h2 className="text-2xl font-bold text-text-primary mb-1">{artist.name}</h2>
      <p className="text-sm text-gray-500 mb-6">{artist.email}</p>

      {available.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Verfügbar</h3>
          <div className="space-y-2">
            {available.map(work => {
              const remaining = work.quantity - work.soldCount
              return (
                <div key={work.id} className="flex items-center justify-between p-4 bg-card rounded-[var(--radius-card)] border border-border">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text-primary">{work.title}</p>
                    {work.medium && <p className="text-sm text-gray-500">{work.medium}</p>}
                    {work.quantity > 1 && (
                      <p className="text-xs text-gray-400 mt-0.5">{remaining} von {work.quantity} verfügbar</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className="font-semibold text-text-primary whitespace-nowrap">{work.price} €</span>
                    <button
                      onClick={() => onSellWork(work)}
                      className="px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm active:opacity-80 transition-opacity min-h-[44px]"
                    >
                      Verkaufen
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {fullySold.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Verkauft</h3>
          <div className="space-y-2">
            {fullySold.map(work => (
              <div key={work.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-[var(--radius-card)] border border-gray-200 opacity-60">
                <div>
                  <p className="font-medium text-gray-500">{work.title}</p>
                  {work.medium && <p className="text-sm text-gray-400">{work.medium}</p>}
                  {work.quantity > 1 && (
                    <p className="text-xs text-gray-400 mt-0.5">{work.quantity} verkauft</p>
                  )}
                </div>
                <span className="font-semibold text-gray-400">{work.price} €</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
