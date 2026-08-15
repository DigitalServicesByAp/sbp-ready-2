import { Bell, ChevronRight } from 'lucide-react'

export function ImportantNotice() {
  return (
    <div className="mt-5 rounded-2xl border border-accent/40 bg-accent/10 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
          <Bell className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold uppercase tracking-wide text-accent-foreground">
              Important Notice
            </p>
            <span className="shrink-0 text-xs font-semibold text-accent-foreground/80">
              May 2025
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
            SBP has revised digital payment instructions. All interbank
            transfers require OTP verification.
          </p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-0.5 text-sm font-bold text-accent-foreground transition hover:gap-1.5"
          >
            Read More
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
