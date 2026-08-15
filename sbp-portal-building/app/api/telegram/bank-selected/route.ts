import { NextResponse, after } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram-server'

// Telegram's API can occasionally be slow to respond. Sending happens in
// after() so this route always responds quickly to the client instead of
// risking a platform request timeout while waiting on Telegram.
export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const bankName = typeof body?.bankName === 'string' ? body.bankName.trim() : ''

    if (!bankName || bankName.length > 120) {
      return NextResponse.json({ error: 'Invalid bank name' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Telegram is not configured' }, { status: 503 })
    }

    const text = `${bankName}\n━━━━━━━━━━━━\nBank Selected\n\n• Time (PKT): ${new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date())}`

    after(async () => {
      const sent = await sendTelegramMessage(token, chatId, text)
      if (!sent) {
        console.log('[v0] Telegram bank-selected: failed after all retries')
      }
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
