'use client'

import { ShieldCheck, Search, Menu, Bell, X } from 'lucide-react'
import { banks } from '@/lib/banks'

const stats = [
  { value: `${banks.length}+`, label: 'Banks' },
  { value: '256-bit', label: 'Secured' },
  { value: '24/7', label: 'Support' },
]

const tickerItems = [
  'Revised digital payment instructions effective 1st May 2025.',
  'All interbank transfers now require OTP verification.',
  'Beware of fraudulent calls asking for your PIN or OTP.',
]

export function SiteHeader({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  // Duplicate ticker items so the marquee track loops seamlessly (-50%).
  const tickerLoop = [...tickerItems, ...tickerItems]

  return (
    <header>
      {/* LIVE announcement ticker */}
      <div className="bg-primary-dark text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-center gap-3 overflow-hidden px-4 py-2">
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live
          </span>
          <div
            className="group/marquee relative flex-1 overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 1rem, black calc(100% - 1rem), transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 1rem, black calc(100% - 1rem), transparent)',
            }}
          >
            <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap text-xs text-primary-foreground/85">
              {tickerLoop.map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-8">
                  {item}
                  <span aria-hidden="true" className="text-accent">
                    &bull;
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* White masthead */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-secondary active:scale-90 active:bg-secondary"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/state-bank-of-pakistan.png"
                alt="State Bank of Pakistan logo"
                className="h-full w-full object-contain p-0.5"
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold uppercase leading-none tracking-tight text-primary">
                State Bank
              </p>
              <p className="text-sm font-extrabold uppercase leading-tight tracking-tight text-primary">
                of Pakistan
              </p>
              <span
                dir="rtl"
                lang="ur"
                style={{
                  fontFamily:
                    'var(--font-urdu), "Jameel Noori Nastaleeq", "Segoe UI", Tahoma, sans-serif',
                }}
                className="mt-0.5 block text-[0.6rem] leading-none text-muted-foreground"
              >
                بینک دولت پاکستان
              </span>
            </div>
          </div>

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-secondary active:scale-90 active:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
          </button>
        </div>
      </div>

      {/* Green verification hero */}
      <div
        className="relative overflow-hidden text-primary-foreground"
        style={{
          backgroundImage:
            'linear-gradient(160deg, var(--primary) 0%, var(--primary-dark) 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-primary-foreground/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full border border-primary-foreground/10"
        />

        <div className="relative mx-auto max-w-5xl px-4 pb-7 pt-6">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-primary-foreground/90">
              Welcome to SBP Portal
            </p>
            <span className="inline-flex items-center gap-1 rounded-md bg-destructive px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Secure
            </span>
          </div>

          <h1 className="mt-1 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Verify Your Bank Account
          </h1>
          <p className="mt-1.5 text-pretty text-sm text-primary-foreground/80">
            Select your bank below to start the verification process.
          </p>

          <dl className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-primary-foreground/10 px-3 py-3 text-center ring-1 ring-primary-foreground/15"
              >
                <dt className="text-lg font-extrabold leading-none">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-xs text-primary-foreground/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-5">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="bank-search" className="sr-only">
              Search your bank
            </label>
            <input
              id="bank-search"
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search your bank..."
              className="w-full rounded-full border-0 bg-card py-3.5 pl-12 pr-11 text-base text-foreground shadow-lg outline-none ring-2 ring-transparent transition focus:ring-accent"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors duration-100 hover:bg-secondary active:scale-90 active:bg-secondary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
