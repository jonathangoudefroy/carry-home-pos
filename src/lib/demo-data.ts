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
      { id: 'jg-1', title: 'Urban Fragments I', medium: 'Acryl auf Leinwand', price: 120, sold: false },
      { id: 'jg-2', title: 'Urban Fragments II', medium: 'Acryl auf Leinwand', price: 150, sold: false },
      { id: 'jg-3', title: 'Berliner Morgen', medium: 'Fotografie', price: 80, sold: false },
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
      { id: 'mn-1', title: 'Stille Wasser', medium: 'Öl auf Holz', price: 200, sold: false },
      { id: 'mn-2', title: 'Nachtschicht', medium: 'Mixed Media', price: 95, sold: false },
      { id: 'mn-3', title: 'Kreuzberg Blues', medium: 'Siebdruck', price: 60, sold: false },
      { id: 'mn-4', title: 'Sommerlicht', medium: 'Aquarell', price: 110, sold: false },
    ],
  },
]
