import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronLeft } from 'lucide-react'
import { banks, bankSlug, getBankBySlug } from '@/lib/banks'
import { BankLogo } from '@/components/bank-logo'
import { OtpForm } from '@/components/otp-form'

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
    title: `${bank.name} | Verify OTP`,
    description: `Verify the OTP to complete your ${bank.name} transaction.`,
  }
}

export default async function VerifyOtpPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ mobile?: string }>
}) {
  const { slug } = await params
  const { mobile } = await searchParams
  const bank = getBankBySlug(slug)
  if (!bank) notFound()

  return (
    <main className="min-h-dvh">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-4">
          <Link
            href={`/bank/${slug}/balance`}
            aria-label="Back to account balance"
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
        <OtpForm
          slug={slug}
          mobile={mobile ?? ''}
          bankName={bank.name}
          mode="reverify"
          activeStep={4}
        />
      </div>
    </main>
  )
}
