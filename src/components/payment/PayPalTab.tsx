'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Artist, Work } from '@/lib/types'

interface PayPalTabProps {
  artist: Artist
  work: Work
}

function isEmail(value: string): boolean {
  return value.includes('@')
}

export function PayPalTab({ artist, work }: PayPalTabProps) {
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const paypalValue = artist.paypal || ''
  const isPayPalUsername = !isEmail(paypalValue)
  const paypalLink = isPayPalUsername ? `https://paypal.me/${paypalValue}/${work.price}` : null

  useEffect(() => {
    if (!paypalLink) return
    QRCode.toDataURL(paypalLink, { width: 280, margin: 2, errorCorrectionLevel: 'M' })
      .then(setQrUrl)
      .catch(console.error)
  }, [paypalLink])

  if (!artist.paypal) {
    return <p className="text-center text-gray-400 py-8">Kein PayPal hinterlegt</p>
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paypalValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  // Email address: no QR, just copy button
  if (!isPayPalUsername) {
    return (
      <div className="flex flex-col items-center py-8">
        <p className="text-lg font-semibold text-text-primary mb-2">PayPal an {paypalValue}</p>
        <p className="text-sm text-gray-500 mb-4">{work.price} €</p>
        <button
          onClick={handleCopy}
          className="px-6 py-3 bg-[#0070ba] text-white rounded-lg font-medium active:opacity-80 transition-opacity min-h-[44px]"
        >
          {copied ? 'Kopiert!' : 'E-Mail kopieren'}
        </button>
      </div>
    )
  }

  // Username: QR code + link fallback
  return (
    <div className="flex flex-col items-center py-4">
      {qrUrl ? (
        <img src={qrUrl} alt="PayPal QR Code" className="w-[250px] h-[250px]" />
      ) : (
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg animate-pulse" />
      )}
      <p className="text-sm text-gray-500 mt-3">{work.price} € an {artist.name}</p>
      <a
        href={paypalLink!}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#0070ba] underline mt-2 min-h-[44px] flex items-center"
      >
        {paypalLink}
      </a>
    </div>
  )
}
