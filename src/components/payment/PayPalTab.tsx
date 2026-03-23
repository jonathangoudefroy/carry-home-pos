'use client'

import { Artist, Work } from '@/lib/types'

interface PayPalTabProps {
  artist: Artist
  work: Work
}

export function PayPalTab({ artist, work }: PayPalTabProps) {
  if (!artist.paypal) {
    return <p className="text-center text-gray-400 py-8">Kein PayPal hinterlegt</p>
  }

  const paypalLink = `https://paypal.me/${artist.paypal}/${work.price}`

  return (
    <div className="flex flex-col items-center py-8">
      <p className="text-lg font-semibold text-text-primary mb-2">{work.price} €</p>
      <p className="text-sm text-gray-500 mb-4">an {artist.name} via PayPal</p>
      <a
        href={paypalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#0070ba] text-white rounded-lg font-medium active:opacity-80 transition-opacity min-h-[44px] inline-flex items-center"
      >
        PayPal öffnen
      </a>
      <p className="text-xs text-gray-400 mt-3">{artist.paypal}</p>
    </div>
  )
}
