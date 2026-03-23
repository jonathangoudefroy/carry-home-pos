'use client'

import { useState } from 'react'

interface PinChangerProps {
  currentPin: string
  onChangePin: (newPin: string) => void
}

export function PinChanger({ currentPin, onChangePin }: PinChangerProps) {
  const [oldPin, setOldPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (oldPin !== currentPin) {
      setMessage('Alter PIN ist falsch')
      return
    }
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setMessage('PIN muss 4 Ziffern haben')
      return
    }
    if (newPin !== confirmPin) {
      setMessage('PINs stimmen nicht überein')
      return
    }
    onChangePin(newPin)
    setOldPin('')
    setNewPin('')
    setConfirmPin('')
    setMessage('PIN geändert!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-semibold text-text-primary">PIN ändern</h3>
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        placeholder="Alter PIN"
        value={oldPin}
        onChange={e => setOldPin(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]"
      />
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        placeholder="Neuer PIN"
        value={newPin}
        onChange={e => setNewPin(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]"
      />
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        placeholder="Neuer PIN bestätigen"
        value={confirmPin}
        onChange={e => setConfirmPin(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg text-base outline-none focus:border-accent min-h-[44px]"
      />
      <button type="submit" className="w-full py-3 bg-accent text-white rounded-lg font-medium min-h-[44px]">
        PIN ändern
      </button>
      {message && <p className={`text-sm ${message.includes('geändert') ? 'text-success' : 'text-red-500'}`}>{message}</p>}
    </form>
  )
}
