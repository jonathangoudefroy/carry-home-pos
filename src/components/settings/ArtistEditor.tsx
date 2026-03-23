'use client'

import { useState } from 'react'
import { Artist, Work } from '@/lib/types'

interface ArtistEditorProps {
  artist?: Artist
  onSave: (artist: Artist) => void
  onCancel: () => void
}

interface WorkDraft {
  id: string
  title: string
  medium: string
  price: string
}

export function ArtistEditor({ artist, onSave, onCancel }: ArtistEditorProps) {
  const [name, setName] = useState(artist?.name ?? '')
  const [email, setEmail] = useState(artist?.email ?? '')
  const [iban, setIban] = useState(artist?.iban ?? '')
  const [bic, setBic] = useState(artist?.bic ?? '')
  const [paypal, setPaypal] = useState(artist?.paypal ?? '')
  const [works, setWorks] = useState<WorkDraft[]>(
    artist?.works.map(w => ({ id: w.id, title: w.title, medium: w.medium, price: String(w.price) })) ?? [
      { id: crypto.randomUUID(), title: '', medium: '', price: '' },
    ]
  )
  const [error, setError] = useState('')

  const addWork = () => {
    setWorks(prev => [...prev, { id: crypto.randomUUID(), title: '', medium: '', price: '' }])
  }

  const removeWork = (id: string) => {
    setWorks(prev => prev.filter(w => w.id !== id))
  }

  const updateWork = (id: string, field: keyof WorkDraft, value: string) => {
    setWorks(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Name und E-Mail sind Pflichtfelder')
      return
    }
    const validWorks = works.filter(w => w.title.trim() && w.price)
    if (validWorks.length === 0) {
      setError('Mindestens ein Werk mit Titel und Preis')
      return
    }

    const finalWorks: Work[] = validWorks.map(w => {
      const existingWork = artist?.works.find(aw => aw.id === w.id)
      return {
        id: w.id,
        title: w.title.trim(),
        medium: w.medium.trim(),
        price: Number(w.price),
        sold: existingWork?.sold ?? false,
      }
    })

    onSave({
      id: artist?.id ?? crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      iban: iban.trim() || undefined,
      bic: bic.trim() || undefined,
      paypal: paypal.trim() || undefined,
      works: finalWorks,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-text-primary">
          {artist ? 'Künstler:in bearbeiten' : 'Neue:r Künstler:in'}
        </h3>
        <button type="button" onClick={onCancel} className="text-gray-400 text-sm min-h-[44px]">
          Abbrechen
        </button>
      </div>

      <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]" />
      <input placeholder="E-Mail *" type="email" value={email} onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]" />
      <input placeholder="IBAN" value={iban} onChange={e => setIban(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]" />
      <input placeholder="BIC" value={bic} onChange={e => setBic(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]" />
      <input placeholder="PayPal (E-Mail oder Username)" value={paypal} onChange={e => setPaypal(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]" />

      <div>
        <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Werke</h4>
        <div className="space-y-3">
          {works.map(w => (
            <div key={w.id} className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input placeholder="Titel *" value={w.title} onChange={e => updateWork(w.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-accent min-h-[44px]" />
                <div className="flex gap-2">
                  <input placeholder="Medium" value={w.medium} onChange={e => updateWork(w.id, 'medium', e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-accent min-h-[44px]" />
                  <input placeholder="Preis *" type="number" min="0" step="1" value={w.price}
                    onChange={e => updateWork(w.id, 'price', e.target.value)}
                    className="w-24 px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-accent min-h-[44px]" />
                </div>
              </div>
              {works.length > 1 && (
                <button type="button" onClick={() => removeWork(w.id)}
                  className="text-red-400 text-lg mt-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addWork}
          className="mt-3 text-sm text-accent font-medium min-h-[44px]">
          + Werk hinzufügen
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" className="w-full py-3 bg-accent text-white rounded-lg font-medium min-h-[44px]">
        Speichern
      </button>
    </form>
  )
}
