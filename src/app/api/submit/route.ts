import { Resend } from 'resend'
import { ImportPayload } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const payload: ImportPayload = await request.json()

    if (!payload.name || !payload.email || !payload.works?.length) {
      return Response.json({ error: 'Ungültige Daten' }, { status: 400 })
    }

    const importCode = btoa(unescape(encodeURIComponent(JSON.stringify(payload))))

    const worksHtml = payload.works
      .map(w => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${w.title}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${w.medium || '–'}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${w.price} €</td></tr>`)
      .join('')

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0F131A">
        <h2 style="color:#FE4F40">Neue Anmeldung: ${payload.name}</h2>
        <table style="width:100%;margin:16px 0">
          <tr><td style="color:#888;padding:4px 0">Name</td><td>${payload.name}</td></tr>
          <tr><td style="color:#888;padding:4px 0">E-Mail</td><td>${payload.email}</td></tr>
          ${payload.iban ? `<tr><td style="color:#888;padding:4px 0">IBAN</td><td>${payload.iban}</td></tr>` : ''}
          ${payload.bic ? `<tr><td style="color:#888;padding:4px 0">BIC</td><td>${payload.bic}</td></tr>` : ''}
          ${payload.paypal ? `<tr><td style="color:#888;padding:4px 0">PayPal</td><td>${payload.paypal}</td></tr>` : ''}
        </table>
        <h3>Werke (${payload.works.length})</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#f8f9fa"><th style="padding:8px 12px;text-align:left">Titel</th><th style="padding:8px 12px;text-align:left">Medium</th><th style="padding:8px 12px;text-align:right">Preis</th></tr></thead>
          <tbody>${worksHtml}</tbody>
        </table>
        <h3 style="margin-top:24px">Import-Code</h3>
        <pre style="background:#f8f9fa;padding:12px;border-radius:8px;font-size:12px;word-break:break-all;white-space:pre-wrap">${importCode}</pre>
      </div>
    `

    const { error } = await resend.emails.send({
      from: 'Carry Home <onboarding@resend.dev>',
      to: 'goudyjonny@googlemail.com',
      subject: `Neue Anmeldung: ${payload.name} (${payload.works.length} Werke)`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Submit API error:', err)
    return Response.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
