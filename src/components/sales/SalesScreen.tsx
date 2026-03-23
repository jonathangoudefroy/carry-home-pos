'use client'

import { Sale } from '@/lib/types'
import { SaleSummaryCards } from './SaleSummaryCards'
import { SaleRow } from './SaleRow'

interface SalesScreenProps {
  sales: Sale[]
  onUndoSale: (saleId: string, artistId: string, workId: string) => void
}

export function SalesScreen({ sales, onUndoSale }: SalesScreenProps) {
  const total = sales.reduce((sum, s) => sum + s.price, 0)

  const handleExportCsv = () => {
    const header = 'Werk,Künstler:in,Preis,Zahlungsart,Zeitpunkt'
    const rows = sales.map(s =>
      `"${s.workTitle}","${s.artistName}",${s.price},${s.paymentMethod},${s.timestamp}`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `carry-sales-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">Verkäufe</h2>
        {sales.length > 0 && (
          <button
            onClick={handleExportCsv}
            className="text-sm text-accent font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors min-h-[44px]"
          >
            CSV Export
          </button>
        )}
      </div>

      <SaleSummaryCards count={sales.length} total={total} />

      {sales.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">Noch keine Verkäufe</p>
      ) : (
        <div className="space-y-2">
          {sales.map(sale => (
            <SaleRow
              key={sale.id}
              sale={sale}
              onUndo={() => onUndoSale(sale.id, sale.artistId, sale.workId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
