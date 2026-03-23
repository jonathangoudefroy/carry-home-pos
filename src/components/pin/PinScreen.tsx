'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PinScreenProps {
  onUnlock: () => void
  checkPin: (input: string) => boolean
}

export function PinScreen({ onUnlock, checkPin }: PinScreenProps) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleDigit = (digit: string) => {
    setError(false)
    const next = input + digit
    if (next.length <= 4) {
      setInput(next)
      if (next.length === 4) {
        if (checkPin(next)) {
          onUnlock()
        } else {
          setError(true)
          setTimeout(() => {
            setInput('')
            setError(false)
          }, 600)
        }
      }
    }
  }

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1))
    setError(false)
  }

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <Image
        src="/carry-LogoRot-transparent.png"
        alt="Carry"
        width={120}
        height={120}
        className="mb-8"
      />
      <p className="text-lg text-gray-600 mb-6">PIN eingeben</p>
      <div className="flex gap-3 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-colors ${
              error
                ? 'bg-red-500 border-red-500'
                : i < input.length
                  ? 'bg-accent border-accent'
                  : 'border-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 w-[280px]">
        {digits.map((d, i) => {
          if (d === '') return <div key={i} />
          if (d === 'del') {
            return (
              <button
                key={i}
                onClick={handleDelete}
                className="h-16 rounded-xl text-xl text-gray-500 active:bg-gray-100 transition-colors"
              >
                &#9003;
              </button>
            )
          }
          return (
            <button
              key={i}
              onClick={() => handleDigit(d)}
              className="h-16 rounded-xl text-2xl font-medium text-text-primary bg-card active:bg-gray-200 transition-colors"
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
