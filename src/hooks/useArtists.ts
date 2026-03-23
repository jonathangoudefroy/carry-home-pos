'use client'

import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/constants'
import { Artist } from '@/lib/types'
import { useCallback } from 'react'

export function useArtists() {
  const [artists, setArtists] = useLocalStorage<Artist[]>(STORAGE_KEYS.ARTISTS, [])

  const addArtist = useCallback((artist: Artist) => {
    setArtists(prev => [...prev, artist])
  }, [setArtists])

  const updateArtist = useCallback((updated: Artist) => {
    setArtists(prev => prev.map(a => a.id === updated.id ? updated : a))
  }, [setArtists])

  const deleteArtist = useCallback((id: string) => {
    setArtists(prev => prev.filter(a => a.id !== id))
  }, [setArtists])

  const markWorkSold = useCallback((artistId: string, workId: string) => {
    setArtists(prev => prev.map(a => {
      if (a.id !== artistId) return a
      return { ...a, works: a.works.map(w => w.id === workId ? { ...w, sold: true } : w) }
    }))
  }, [setArtists])

  const markWorkUnsold = useCallback((artistId: string, workId: string) => {
    setArtists(prev => prev.map(a => {
      if (a.id !== artistId) return a
      return { ...a, works: a.works.map(w => w.id === workId ? { ...w, sold: false } : w) }
    }))
  }, [setArtists])

  return { artists, setArtists, addArtist, updateArtist, deleteArtist, markWorkSold, markWorkUnsold }
}
