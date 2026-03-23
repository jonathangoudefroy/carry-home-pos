import { Artist } from './types'

export const DEMO_ARTISTS: Artist[] = [
  {
    id: 'demo-jonathan',
    name: 'Jonathan Goudefroy',
    email: 'jonathan@example.com',
    iban: 'DE89370400440532013000',
    bic: 'COBADEFFXXX',
    paypal: 'jonathan@example.com',
    works: [
      { id: 'jg-1', title: 'Urban Fragments I', medium: 'Acryl auf Leinwand, 60x60cm', price: 120, quantity: 1, soldCount: 0 },
      { id: 'jg-2', title: 'Urban Fragments II', medium: 'Acryl auf Leinwand, 80x60cm', price: 150, quantity: 1, soldCount: 0 },
      { id: 'jg-3', title: 'Berliner Morgen', medium: 'Fotografie, 30x40cm', price: 80, quantity: 3, soldCount: 0 },
    ],
  },
  {
    id: 'demo-michael',
    name: 'Michael Nickel',
    email: 'michael@example.com',
    iban: 'DE27100777770209299700',
    bic: 'DEUTDEDBBER',
    paypal: '',
    works: [
      { id: 'mn-1', title: 'Stille Wasser', medium: 'Öl auf Holz, 50x70cm', price: 200, quantity: 1, soldCount: 0 },
      { id: 'mn-2', title: 'Nachtschicht', medium: 'Mixed Media, 40x40cm', price: 95, quantity: 1, soldCount: 0 },
      { id: 'mn-3', title: 'Kreuzberg Blues', medium: 'Siebdruck, A3', price: 60, quantity: 5, soldCount: 0 },
      { id: 'mn-4', title: 'Sommerlicht', medium: 'Aquarell, 30x40cm', price: 110, quantity: 1, soldCount: 0 },
    ],
  },
]
