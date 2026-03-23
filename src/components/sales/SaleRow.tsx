'use client'

import { Sale } from '@/lib/types'

interface SaleRowProps {
  sale: Sale
  onUndo: () => void
}

const methodLabels: Record<string, string> = {
  qr: 'QR/SEPA',
  paypal: 'PayPal',
  cash: 'Bar',
}

export function SaleRow({ sale, onUndo }: SaleRowProps) {
  const time = new Date(sale.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-[var(--radius-card)] border border-border">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-primary truncate">{sale.workTitle}</p>
        <p className="text-sm text-gray-500">{sale.artistName} &middot; {methodLabels[sale.paymentMethod]} &middot; {time}</p>
      </div>
      <div className="flex items-center gap-3 ml-3">
        <span className="font-semibold text-text-primary whitespace-nowrap">{sale.price} €</span>
        <button
          onClick={onUndo}
          className="text-xs text-red-500 font-medium px-2 py-1 rounded hover:bg-red-50 active:bg-red-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          Rückgängig
        </button>
      </div>
    </div>
  )
}
