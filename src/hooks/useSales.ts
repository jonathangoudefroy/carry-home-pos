'use client'

import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import { Sale } from '@/lib/types'
import { useCallback } from 'react'

export function useSales() {
  const [sales, setSales] = useLocalStorage<Sale[]>(STORAGE_KEYS.SALES, [])

  const recordSale = useCallback((sale: Sale) => {
    setSales(prev => [sale, ...prev])
  }, [setSales])

  const undoSale = useCallback((saleId: string) => {
    setSales(prev => prev.filter(s => s.id !== saleId))
  }, [setSales])

  const clearSales = useCallback(() => {
    setSales([])
  }, [setSales])

  return { sales, setSales, recordSale, undoSale, clearSales }
}
