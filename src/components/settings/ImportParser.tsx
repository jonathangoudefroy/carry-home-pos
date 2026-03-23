'use client'

import { useState } from 'react'
import { decodeImportCode } from '@/lib/import-code'
import { Artist, ImportPayload } from '@/lib/types'

interface ImportParserProps {
  existingArtists: Artist[]
  onImport: (artist: Artist) => void
}

export function ImportParser({ existingArtists, onImport }: ImportParserProps) {
  const [code, setCode] = useState('')
  const [preview, setPreview] = useState<ImportPayload | null>(null)
  const [error, setError] = useState('')
  const [duplicate, setDuplicate] = useState(false)

  const handleParse = () => {
    setError('')
    setDuplicate(false)
    const payload = decodeImportCode(code)
    if (!payload) {
      setError('Ungültiger Import-Code')
      return
    }
    setPreview(payload)
    const exists = existingArtists.some(
      a => a.email.toLowerCase() === payload.email.toLowerCase()
    )
    setDuplicate(exists)
  }

  const handleImport = () => {
    if (!preview) return
    const artist: Artist = {
      id: crypto.randomUUID(),
      name: preview.name,
      email: preview.email,
      iban: preview.iban,
      bic: preview.bic,
      paypal: preview.paypal,
      works: preview.works.map(w => ({
        id: crypto.randomUUID(),
        title: w.title,
        medium: w.medium ?? '',
        price: w.price,
        sold: false,
      })),
    }
    onImport(artist)
    setCode('')
    setPreview(null)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text-primary">Import-Code einfügen</h3>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Base64 Import-Code hier einfügen..."
        rows={4}
        className="w-full px-4 py-3 border border-border rounded-lg text-sm font-mono outline-none focus:border-accent resize-none"
      />
      <button
        onClick={handleParse}
        disabled={!code.trim()}
        className="w-full py-3 bg-accent text-white rounded-lg font-medium disabled:opacity-40 min-h-[44px]"
      >
        Code prüfen
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {preview && (
        <div className="p-4 bg-card rounded-[var(--radius-card)] border border-border space-y-2">
          <p className="font-semibold">{preview.name}</p>
          <p className="text-sm text-gray-500">{preview.email}</p>
          <p className="text-sm text-gray-500">
            {preview.works.length} Werk{preview.works.length !== 1 ? 'e' : ''}
          </p>
          {duplicate && (
            <p className="text-sm text-yellow-600">
              Ein:e Künstler:in mit dieser E-Mail existiert bereits. Import erstellt einen neuen Eintrag.
            </p>
          )}
          <button
            onClick={handleImport}
            className="w-full py-3 bg-success text-white rounded-lg font-medium min-h-[44px]"
          >
            Importieren
          </button>
        </div>
      )}
    </div>
  )
}
