'use client'

import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS, DEFAULT_PIN } from '@/lib/constants'
import { useCallback } from 'react'

export function usePin() {
  const [pin, setPin] = useLocalStorage(STORAGE_KEYS.PIN, DEFAULT_PIN)

  const checkPin = useCallback((input: string) => {
    return input === pin
  }, [pin])

  return { pin, setPin, checkPin }
}
