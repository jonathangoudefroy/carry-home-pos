'use client'

import { useState } from 'react'

interface ImportCodeDisplayProps {
  code: string
  email: string
}

export function ImportCodeDisplay({ code, email }: ImportCodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select textarea
    }
  }

  const mailtoSubject = encodeURIComponent('Carry Art Market - Mein Import-Code')
  const mailtoBody = encodeURIComponent(`Hallo,\n\nhier ist mein Import-Code für den Carry Affordable Art Market:\n\n${code}\n\nViele Grüße`)
  const mailtoLink = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-[#0F131A]">Dein Import-Code</h3>
      <p className="text-sm text-gray-600">Kopiere diesen Code und sende ihn an den Veranstalter.</p>
      <textarea
        readOnly
        value={code}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-xs font-mono bg-white outline-none resize-none"
        onFocus={e => e.target.select()}
      />
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 py-3 bg-[#FE4F40] text-white rounded-lg font-medium min-h-[44px]"
        >
          {copied ? 'Kopiert!' : 'Code kopieren'}
        </button>
        <a
          href={mailtoLink}
          className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-medium text-center text-[#0F131A] min-h-[44px] flex items-center justify-center"
        >
          Per E-Mail senden
        </a>
      </div>
    </div>
  )
}
