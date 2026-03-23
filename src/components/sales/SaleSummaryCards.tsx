'use client'

import { COMMISSION_RATE } from '@/lib/constants'

interface SaleSummaryCardsProps {
  count: number
  total: number
}

export function SaleSummaryCards({ count, total }: SaleSummaryCardsProps) {
  const commission = total * COMMISSION_RATE

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="p-4 bg-card rounded-[var(--radius-card)] border border-border text-center">
        <p className="text-2xl font-bold text-text-primary">{count}</p>
        <p className="text-xs text-gray-500 mt-1">Verkäufe</p>
      </div>
      <div className="p-4 bg-card rounded-[var(--radius-card)] border border-border text-center">
        <p className="text-2xl font-bold text-text-primary">{total.toFixed(0)} €</p>
        <p className="text-xs text-gray-500 mt-1">Umsatz</p>
      </div>
      <div className="p-4 bg-card rounded-[var(--radius-card)] border border-border text-center">
        <p className="text-2xl font-bold text-accent">{commission.toFixed(0)} €</p>
        <p className="text-xs text-gray-500 mt-1">Provision (30%)</p>
      </div>
    </div>
  )
}
