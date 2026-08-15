'use client'

import { useMemo, useState } from 'react'
import { banks } from '@/lib/banks'
import { SiteHeader } from '@/components/site-header'
import { ImportantNotice } from '@/components/important-notice'
import { PopularBanks } from '@/components/popular-banks'
import { BankGrid } from '@/components/bank-grid'
import { SecurityNote } from '@/components/security-note'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return banks
    return banks.filter((bank) => bank.name.toLowerCase().includes(q))
  }, [query])

  const isSearching = query.trim().length > 0

  return (
    <main className="min-h-dvh">
      <SiteHeader query={query} onQueryChange={setQuery} />

      <div className="mx-auto max-w-5xl px-4">
        {!isSearching && (
          <>
            <ImportantNotice />
            <PopularBanks />
          </>
        )}

        <BankGrid banks={filtered} showDivider={!isSearching} />

        <SecurityNote />
      </div>

      <SiteFooter />
    </main>
  )
}
