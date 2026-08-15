import type { Bank } from '@/lib/banks'
import { BankLogo } from '@/components/bank-logo'

// A stylized, brand-colored debit-card mockup shown at the top of a bank's
// card-details page. Purely illustrative — no real card data.
export function BankCardShowcase({ bank }: { bank: Bank }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-5 pb-8 pt-6"
      style={{
        backgroundImage:
          'linear-gradient(150deg, oklch(0.22 0.03 158) 0%, oklch(0.14 0.02 160) 60%, oklch(0.1 0.01 160) 100%)',
      }}
    >
      {/* soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: bank.color }}
      />

      {bank.cardImage ? (
        <div className="relative flex items-center justify-center">
          {/* Fixed card aspect-ratio frame (standard card ratio) with the
              photo filling it edge-to-edge via object-cover, so no
              letterboxing or background ever shows through as a "box". */}
          <div className="relative aspect-[1.586/1] w-full max-w-[19rem] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bank.cardImage || '/placeholder.svg'}
              alt={`${bank.name} debit card`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      ) : (
        <div className="relative flex items-end justify-center">
          {/* Back card */}
          <div className="absolute right-4 top-0 hidden w-56 -translate-y-3 rotate-3 rounded-2xl bg-neutral-800/90 p-4 shadow-2xl ring-1 ring-white/10 sm:block">
            <div className="mt-2 h-7 w-full rounded bg-neutral-950" />
            <div className="mt-3 flex items-center gap-2">
              <div className="h-6 flex-1 rounded bg-white/80" />
              <span className="rounded bg-white/90 px-1.5 py-0.5 text-[0.6rem] font-bold text-neutral-900">
                123
              </span>
            </div>
            <p className="mt-2 text-[0.6rem] text-white/50">Signature panel</p>
          </div>

          {/* Front card */}
          <div
            className="relative z-10 w-full max-w-[19rem] rounded-2xl p-5 text-white shadow-2xl ring-1 ring-white/15"
            style={{
              backgroundImage: `linear-gradient(135deg, ${bank.color} 0%, oklch(0.28 0.04 160) 120%)`,
            }}
          >
            <div className="flex items-start justify-between">
              <BankLogo bank={bank} />
              <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                Debit
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {/* EMV chip */}
              <div className="h-7 w-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 ring-1 ring-black/20" />
              {/* contactless */}
              <div className="flex flex-col gap-0.5 text-white/70" aria-hidden="true">
                <span className="text-lg leading-none">›</span>
              </div>
            </div>

            <p className="mt-4 font-mono text-lg tracking-[0.15em] text-white/95">
              2206 0000 6456 7890
            </p>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[0.55rem] uppercase tracking-wider text-white/50">
                  Card Holder
                </p>
                <p className="text-sm font-semibold tracking-wide">YOUR NAME</p>
              </div>
              <div className="text-right">
                <p className="text-[0.55rem] uppercase tracking-wider text-white/50">
                  Valid Thru
                </p>
                <p className="text-sm font-semibold">MM/YY</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
