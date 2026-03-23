'use client'

import { Artist } from '@/lib/types'

interface ArtistCardProps {
  artist: Artist
  onClick: () => void
}

export function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const availableCount = artist.works.reduce((sum, w) => sum + (w.quantity - w.soldCount), 0)
  const totalCount = artist.works.reduce((sum, w) => sum + w.quantity, 0)
  const hasIban = !!artist.iban
  const hasPaypal = !!artist.paypal

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-card rounded-[var(--radius-card)] border border-border active:bg-gray-100 transition-colors"
    >
      <h3 className="font-semibold text-text-primary text-lg">{artist.name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {availableCount} von {totalCount} verfügbar
      </p>
      <div className="flex gap-2 mt-2">
        {hasIban && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">QR</span>
        )}
        {hasPaypal && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700">PayPal</span>
        )}
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">Bar</span>
      </div>
    </button>
  )
}
