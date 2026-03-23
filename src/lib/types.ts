export interface Work {
  id: string
  title: string
  medium: string
  price: number
  sold: boolean
}

export interface Artist {
  id: string
  name: string
  email: string
  iban?: string
  bic?: string
  paypal?: string
  works: Work[]
}

export interface Sale {
  id: string
  artistId: string
  artistName: string
  workId: string
  workTitle: string
  price: number
  paymentMethod: 'qr' | 'paypal' | 'cash'
  timestamp: string
}

export interface ImportPayload {
  v: 1
  name: string
  email: string
  iban?: string
  bic?: string
  paypal?: string
  works: { title: string; price: number; medium?: string }[]
}

export type TabId = 'artists' | 'sales' | 'settings'
