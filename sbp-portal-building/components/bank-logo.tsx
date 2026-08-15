'use client'

import { useState } from 'react'
import type { Bank } from '@/lib/banks'

export function BankLogo({
  bank,
  size = 'md',
}: {
  bank: Bank
  size?: 'md' | 'lg'
}) {
  const [failed, setFailed] = useState(false)
  const dimension = size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'
  const textSize = size === 'lg' ? 'text-lg' : 'text-sm'

  if (bank.logo && !failed) {
    return (
      <span
        className={`flex ${dimension} shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bank.logo || '/placeholder.svg'}
          alt={`${bank.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`flex ${dimension} ${textSize} shrink-0 items-center justify-center rounded-xl font-bold tracking-tight text-white shadow-sm ring-1 ring-black/5`}
      style={{ backgroundColor: bank.color }}
    >
      {bank.short}
    </span>
  )
}
