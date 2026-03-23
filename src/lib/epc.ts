/**
 * Build an EPC069-12 QR code string for SEPA credit transfer.
 * See: https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation
 */
export function buildEpcString(
  bic: string,
  name: string,
  iban: string,
  amount: number,
  reference: string
): string {
  const lines = [
    'BCD',               // Service Tag
    '002',               // Version
    '1',                 // Character set (UTF-8)
    'SCT',               // Identification
    bic,                 // BIC
    name.slice(0, 70),   // Beneficiary name (max 70)
    iban.replace(/\s/g, ''), // IBAN
    `EUR${amount.toFixed(2)}`, // Amount
    '',                  // Purpose
    '',                  // Remittance (structured)
    reference.slice(0, 140), // Remittance (unstructured, max 140)
  ]
  return lines.join('\n')
}
