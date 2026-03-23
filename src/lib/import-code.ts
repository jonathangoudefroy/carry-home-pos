import { ImportPayload } from './types'

export function encodeImportCode(payload: ImportPayload): string {
  const json = JSON.stringify(payload)
  return btoa(unescape(encodeURIComponent(json)))
}

export function decodeImportCode(base64: string): ImportPayload | null {
  try {
    const json = decodeURIComponent(escape(atob(base64.trim())))
    const parsed = JSON.parse(json)
    if (!isValidImportPayload(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

function isValidImportPayload(obj: unknown): obj is ImportPayload {
  if (!obj || typeof obj !== 'object') return false
  const p = obj as Record<string, unknown>
  if (p.v !== 1) return false
  if (typeof p.name !== 'string' || !p.name) return false
  if (typeof p.email !== 'string' || !p.email) return false
  if (!Array.isArray(p.works) || p.works.length === 0) return false
  for (const w of p.works) {
    if (!w || typeof w !== 'object') return false
    const work = w as Record<string, unknown>
    if (typeof work.title !== 'string' || !work.title) return false
    if (typeof work.price !== 'number' || work.price <= 0) return false
  }
  return true
}
