import Link from 'next/link'
import { SearchX } from 'lucide-react'
import type { Bank } from '@/lib/banks'
import { bankSlug } from '@/lib/banks'
import { BankTile } from '@/components/bank-tile'

export function BankGrid({
  banks,
  showDivider = false,
}: {
  banks: Bank[]
  showDivider?: boolean
}) {
  return (
    <section aria-labelledby="all-heading" className="mt-8">
      {showDivider ? (
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <h2
            id="all-heading"
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
          >
            All Banks ({banks.length})
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 id="all-heading" className="text-lg font-bold tracking-tight">
            Search Results
          </h2>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {banks.length} result{banks.length === 1 ? '' : 's'}
          </span>
        </div>
      )}

      {banks.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <SearchX
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              No banks found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different bank name.
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-5 grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-5 lg:grid-cols-6">
          {banks.map((bank) => (
            <li key={bank.name}>
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
      )}
    </section>
  )
}
