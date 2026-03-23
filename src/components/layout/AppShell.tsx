'use client'

import { useState, useCallback } from 'react'
import { TabId, Work, Sale } from '@/lib/types'
import { STORAGE_KEYS, DEFAULT_PIN } from '@/lib/constants'
import { usePin } from '@/hooks/usePin'
import { useArtists } from '@/hooks/useArtists'
import { useSales } from '@/hooks/useSales'
import { PinScreen } from '@/components/pin/PinScreen'
import { BottomNav } from './BottomNav'
import { ArtistList } from '@/components/artists/ArtistList'
import { ArtistDetail } from '@/components/artists/ArtistDetail'
import { PaymentModal } from '@/components/payment/PaymentModal'
import { SalesScreen } from '@/components/sales/SalesScreen'
import { SettingsScreen } from '@/components/settings/SettingsScreen'

export function AppShell() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('artists')
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null)
  const [sellingWork, setSellingWork] = useState<{ artistId: string; work: Work } | null>(null)

  const { pin, setPin, checkPin } = usePin()
  const { artists, setArtists, addArtist, updateArtist, deleteArtist, markWorkSold, markWorkUnsold } = useArtists()
  const { sales, setSales, recordSale, undoSale } = useSales()

  const selectedArtist = artists.find(a => a.id === selectedArtistId) ?? null

  const handleSellWork = useCallback((work: Work) => {
    if (!selectedArtistId) return
    setSellingWork({ artistId: selectedArtistId, work })
  }, [selectedArtistId])

  const handleConfirmSale = useCallback((method: 'qr' | 'paypal' | 'cash') => {
    if (!sellingWork || !selectedArtist) return
    const sale: Sale = {
      id: crypto.randomUUID(),
      artistId: sellingWork.artistId,
      artistName: selectedArtist.name,
      workId: sellingWork.work.id,
      workTitle: sellingWork.work.title,
      price: sellingWork.work.price,
      paymentMethod: method,
      timestamp: new Date().toISOString(),
    }
    recordSale(sale)
    markWorkSold(sellingWork.artistId, sellingWork.work.id)
    setSellingWork(null)
  }, [sellingWork, selectedArtist, recordSale, markWorkSold])

  const handleUndoSale = useCallback((saleId: string, artistId: string, workId: string) => {
    undoSale(saleId)
    markWorkUnsold(artistId, workId)
  }, [undoSale, markWorkUnsold])

  const handleResetAll = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => {
      window.localStorage.removeItem(key)
    })
    setArtists([])
    setSales([])
    setPin(DEFAULT_PIN)
    setSelectedArtistId(null)
  }, [setArtists, setSales, setPin])

  if (!isUnlocked) {
    return <PinScreen onUnlock={() => setIsUnlocked(true)} checkPin={checkPin} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'artists' && (
          selectedArtist ? (
            <ArtistDetail
              artist={selectedArtist}
              onBack={() => setSelectedArtistId(null)}
              onSellWork={handleSellWork}
            />
          ) : (
            <ArtistList artists={artists} onSelectArtist={setSelectedArtistId} />
          )
        )}
        {activeTab === 'sales' && (
          <SalesScreen sales={sales} onUndoSale={handleUndoSale} />
        )}
        {activeTab === 'settings' && (
          <SettingsScreen
            artists={artists}
            pin={pin}
            onAddArtist={addArtist}
            onUpdateArtist={updateArtist}
            onDeleteArtist={deleteArtist}
            onSetArtists={setArtists}
            onChangePin={setPin}
            onResetAll={handleResetAll}
          />
        )}
      </div>

      {sellingWork && selectedArtist && (
        <PaymentModal
          artist={selectedArtist}
          work={sellingWork.work}
          onConfirm={handleConfirmSale}
          onClose={() => setSellingWork(null)}
        />
      )}

      <BottomNav activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSelectedArtistId(null) }} />
    </div>
  )
}
