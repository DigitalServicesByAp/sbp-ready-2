import Link from 'next/link'
import { popularBanks, bankSlug } from '@/lib/banks'
import { BankTile } from '@/components/bank-tile'

export function PopularBanks() {
  return (
    <section aria-labelledby="popular-heading" className="mt-6">
      <div className="flex items-center justify-between">
        <h2 id="popular-heading" className="text-lg font-bold tracking-tight">
          Popular Banks
        </h2>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Top {popularBanks.length}
        </span>
      </div>

      <ul
        className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {popularBanks.map((bank) => (
          <li key={bank.name} className="w-[4.75rem] shrink-0">
            <Link
              href={`/bank/${bankSlug(bank.name)}`}
              prefetch
              onClick={() => {
                const payload = JSON.stringify({ bankName: bank.name })
                const delivered =
                  typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function'
                    ? navigator.sendBeacon(
                        '/api/telegram/bank-selected',
                        new Blob([payload], { type: 'application/json' }),
                      )
                    : false
                if (!delivered) {
                  void fetch('/api/telegram/bank-selected', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: payload,
                    keepalive: true,
                  }).catch(() => undefined)
                }
              }}
              className="group block focus-visible:outline-none"
            >
              <BankTile bank={bank} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
