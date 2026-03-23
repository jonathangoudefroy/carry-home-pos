'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { buildEpcString } from '@/lib/epc'
import { Artist, Work } from '@/lib/types'

interface QrCodeTabProps {
  artist: Artist
  work: Work
}

export function QrCodeTab({ artist, work }: QrCodeTabProps) {
  const [qrUrl, setQrUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!artist.iban || !artist.bic) return
    const epc = buildEpcString(artist.bic, artist.name, artist.iban, work.price, work.title)
    QRCode.toDataURL(epc, { width: 280, margin: 2 })
      .then(setQrUrl)
      .catch(console.error)
  }, [artist, work])

  if (!artist.iban) {
    return <p className="text-center text-gray-400 py-8">Kein IBAN hinterlegt</p>
  }

  return (
    <div className="flex flex-col items-center py-4">
      {qrUrl ? (
        <img src={qrUrl} alt="QR Code" className="w-[250px] h-[250px]" />
      ) : (
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg animate-pulse" />
      )}
      <p className="text-sm text-gray-500 mt-3">{work.price} € an {artist.name}</p>
      <p className="text-xs text-gray-400 mt-1">IBAN: {artist.iban}</p>
    </div>
  )
}
