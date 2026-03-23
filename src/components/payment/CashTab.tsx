'use client'

import { Work } from '@/lib/types'

interface CashTabProps {
  work: Work
}

export function CashTab({ work }: CashTabProps) {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="text-4xl font-bold text-text-primary mb-2">{work.price} €</p>
      <p className="text-gray-500">in bar erhalten?</p>
    </div>
  )
}
