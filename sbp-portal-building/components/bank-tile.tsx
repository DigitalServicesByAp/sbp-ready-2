'use client'

import { useState } from 'react'
import type { Bank } from '@/lib/banks'

export function BankTile({ bank }: { bank: Bank }) {
  const [failed, setFailed] = useState(false)
  const showLogo = bank.logo && !failed

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-white p-2.5 shadow-sm transition-all duration-100 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring group-active:scale-[0.96] group-active:border-primary/40 group-active:shadow-none">
        <div className="flex h-12 w-16 items-center justify-center">
          {showLogo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={bank.logo || '/placeholder.svg'}
              alt={`${bank.name} logo`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              onError={() => setFailed(true)}
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center rounded-lg text-base font-bold tracking-tight text-white"
              style={{ backgroundColor: bank.color }}
            >
              {bank.short}
            </span>
          )}
        </div>
      </div>
      <span className="line-clamp-2 w-full text-[0.7rem] font-semibold leading-tight text-foreground">
        {bank.name}
      </span>
    </div>
  )
}
