// Mirrors captured form inputs to Telegram. Designed to survive the
// client-side navigation that happens right after a form submit.
//
// navigator.sendBeacon is purpose-built for "send this as the page goes away"
// and is far more reliable than fetch+keepalive when a router.push fires in
// the same tick. We fall back to fetch(keepalive) when sendBeacon is missing.
export function notifyTelegram(
  title: string,
  fields: Array<{ label: string; value: string }>,
) {
  const clean = fields.filter((f) => f.value && f.value.trim().length > 0)
  if (clean.length === 0) return

  const payload = JSON.stringify({ title, fields: clean })
  const url = '/api/telegram/notify'

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' })
      const queued = navigator.sendBeacon(url, blob)
      if (queued) return
    }
  } catch {
    // fall through to fetch
  }

  void fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => undefined)
}
