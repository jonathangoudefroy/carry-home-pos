'use client'

import { useState } from 'react'
import { Artist, Work } from '@/lib/types'
import { QrCodeTab } from './QrCodeTab'
import { PayPalTab } from './PayPalTab'
import { CashTab } from './CashTab'

type PaymentTab = 'qr' | 'paypal' | 'cash'

interface PaymentModalProps {
  artist: Artist
  work: Work
  onConfirm: (method: 'qr' | 'paypal' | 'cash') => void
  onClose: () => void
}

export function PaymentModal({ artist, work, onConfirm, onClose }: PaymentModalProps) {
  const defaultTab: PaymentTab = artist.iban ? 'qr' : artist.paypal ? 'paypal' : 'cash'
  const [activeTab, setActiveTab] = useState<PaymentTab>(defaultTab)

  const tabs: { id: PaymentTab; label: string; available: boolean }[] = [
    { id: 'qr', label: 'QR / SEPA', available: !!artist.iban },
    { id: 'paypal', label: 'PayPal', available: !!artist.paypal },
    { id: 'cash', label: 'Bar', available: true },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl p-6 pb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary">
            {work.title} — {work.price} €
          </h3>
          <button onClick={onClose} className="text-gray-400 text-2xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center">
            &times;
          </button>
        </div>

        <div className="flex border-b border-border mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={!tab.available}
              className={`flex-1 py-3 text-sm font-medium text-center transition-colors min-h-[44px] ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : tab.available
                    ? 'text-gray-400'
                    : 'text-gray-200 cursor-not-allowed'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'qr' && <QrCodeTab artist={artist} work={work} />}
        {activeTab === 'paypal' && <PayPalTab artist={artist} work={work} />}
        {activeTab === 'cash' && <CashTab work={work} />}

        <button
          onClick={() => onConfirm(activeTab)}
          className="w-full mt-4 py-4 bg-success text-white rounded-xl font-semibold text-base active:opacity-80 transition-opacity min-h-[52px]"
        >
          Verkauf bestätigen
        </button>
      </div>
    </div>
  )
}
