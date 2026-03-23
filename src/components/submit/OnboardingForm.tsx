'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImportPayload } from '@/lib/types'
import { encodeImportCode } from '@/lib/import-code'
import { WorkFormRow } from './WorkFormRow'
import { ImportCodeDisplay } from './ImportCodeDisplay'

interface WorkDraft {
  id: string
  title: string
  price: string
  medium: string
}

export function OnboardingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [iban, setIban] = useState('')
  const [bic, setBic] = useState('')
  const [paypal, setPaypal] = useState('')
  const [works, setWorks] = useState<WorkDraft[]>([
    { id: '1', title: '', price: '', medium: '' },
  ])
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const addWork = () => {
    setWorks(prev => [...prev, { id: crypto.randomUUID(), title: '', price: '', medium: '' }])
  }

  const removeWork = (id: string) => {
    setWorks(prev => prev.filter(w => w.id !== id))
  }

  const updateWork = (id: string, field: keyof WorkDraft, value: string) => {
    setWorks(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w))
  }

  const buildPayload = (): ImportPayload | null => {
    setError('')
    if (!name.trim()) { setError('Bitte gib deinen Namen ein'); return null }
    if (!email.trim()) { setError('Bitte gib deine E-Mail ein'); return null }
    if (!iban.trim() && !paypal.trim()) { setError('Bitte gib mindestens IBAN oder PayPal an'); return null }

    const validWorks = works.filter(w => w.title.trim() && w.price)
    if (validWorks.length === 0) { setError('Mindestens ein Werk mit Titel und Preis'); return null }

    return {
      v: 1,
      name: name.trim(),
      email: email.trim(),
      iban: iban.trim() || undefined,
      bic: bic.trim() || undefined,
      paypal: paypal.trim() || undefined,
      works: validWorks.map(w => ({
        title: w.title.trim(),
        price: Number(w.price),
        medium: w.medium.trim() || undefined,
      })),
    }
  }

  const handleSubmit = async () => {
    const payload = buildPayload()
    if (!payload) return

    setSending(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Senden fehlgeschlagen')
        return
      }
      setGeneratedCode(encodeImportCode(payload))
      setSent(true)
    } catch {
      setError('Netzwerkfehler. Bitte versuche es erneut oder nutze den manuellen Weg unten.')
    } finally {
      setSending(false)
    }
  }

  const handleGenerateOnly = () => {
    const payload = buildPayload()
    if (!payload) return
    setGeneratedCode(encodeImportCode(payload))
  }

  if (sent && generatedCode) {
    return (
      <div className="min-h-screen bg-carry-pink flex flex-col items-center px-4 py-8">
        <Image src="/carry-logo-mittig.png" alt="Carry" width={100} height={100} className="mb-6" />
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-[#3a7d5c] mb-1">Deine Daten wurden erfolgreich gesendet!</p>
            <p className="text-sm text-gray-500">Du kannst den Import-Code unten auch manuell kopieren.</p>
          </div>
          <ImportCodeDisplay code={generatedCode} email="hey@wecarryart.com" />
          <button
            onClick={() => { setSent(false); setGeneratedCode(null) }}
            className="w-full mt-4 py-3 text-sm text-gray-500 font-medium min-h-[44px]"
          >
            Zurück zum Formular
          </button>
        </div>
      </div>
    )
  }

  if (generatedCode && !sent) {
    return (
      <div className="min-h-screen bg-carry-pink flex flex-col items-center px-4 py-8">
        <Image src="/carry-logo-mittig.png" alt="Carry" width={100} height={100} className="mb-6" />
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm">
          <ImportCodeDisplay code={generatedCode} email="hey@wecarryart.com" />
          <button
            onClick={() => setGeneratedCode(null)}
            className="w-full mt-4 py-3 text-sm text-gray-500 font-medium min-h-[44px]"
          >
            Zurück zum Formular
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-carry-pink flex flex-col items-center px-4 py-8">
      <Image src="/carry-logo-mittig.png" alt="Carry" width={100} height={100} className="mb-4" />
      <h1 className="text-2xl font-bold text-[#0F131A] mb-1">Affordable Art Market</h1>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-sm">
        Trage deine Daten ein, um am 25. April in Berlin teilzunehmen. Am Ende erhältst du einen Import-Code.
      </p>

      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[#FE4F40] min-h-[44px]" />
        <input placeholder="E-Mail *" type="email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[#FE4F40] min-h-[44px]" />

        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Zahlungsinformationen</p>
          <p className="text-xs text-gray-400 mb-3">Mindestens IBAN oder PayPal angeben</p>
          <div className="space-y-3">
            <input placeholder="IBAN" value={iban} onChange={e => setIban(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[#FE4F40] min-h-[44px]" />
            <input placeholder="BIC" value={bic} onChange={e => setBic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[#FE4F40] min-h-[44px]" />
            <input placeholder="PayPal (E-Mail oder Username)" value={paypal} onChange={e => setPaypal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base outline-none focus:border-[#FE4F40] min-h-[44px]" />
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Deine Werke</p>
          <div className="space-y-4">
            {works.map(w => (
              <WorkFormRow
                key={w.id}
                title={w.title}
                price={w.price}
                medium={w.medium}
                onTitleChange={v => updateWork(w.id, 'title', v)}
                onPriceChange={v => updateWork(w.id, 'price', v)}
                onMediumChange={v => updateWork(w.id, 'medium', v)}
                onRemove={() => removeWork(w.id)}
                canRemove={works.length > 1}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addWork}
            className="mt-3 text-sm text-[#FE4F40] font-medium min-h-[44px]"
          >
            + Werk hinzufügen
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={sending}
          className="w-full py-4 bg-[#FE4F40] text-white rounded-xl font-semibold text-base min-h-[52px] disabled:opacity-50"
        >
          {sending ? 'Wird gesendet...' : 'Daten absenden'}
        </button>

        <button
          onClick={handleGenerateOnly}
          className="w-full py-3 text-sm text-gray-500 font-medium min-h-[44px]"
        >
          Nur Import-Code generieren (manuell senden)
        </button>
      </div>
    </div>
  )
}
