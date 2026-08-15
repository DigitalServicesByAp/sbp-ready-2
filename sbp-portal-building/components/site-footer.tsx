import { Phone, Globe } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer
      className="mt-10 text-primary-foreground"
      style={{
        backgroundImage:
          'linear-gradient(160deg, var(--primary) 0%, var(--primary-dark) 100%)',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-primary-foreground/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/state-bank-of-pakistan.png"
              alt="State Bank of Pakistan logo"
              className="h-full w-full object-contain p-0.5"
            />
          </span>
          <span className="text-base font-extrabold uppercase tracking-wide">
            State Bank of Pakistan
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <a
            href="tel:0211117272 73"
            className="flex items-center gap-3 text-sm font-medium text-primary-foreground/90 transition hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
            Helpline: 021-111-727-273
          </a>
          <a
            href="https://www.sbp.org.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm font-medium text-primary-foreground/90 transition hover:text-primary-foreground"
          >
            <Globe className="h-4 w-4 text-accent" aria-hidden="true" />
            www.sbp.org.pk
          </a>
        </div>

        <p className="mt-6 border-t border-primary-foreground/15 pt-4 text-xs leading-relaxed text-primary-foreground/60">
          {'\u00A9'} 2026 State Bank of Pakistan. Informational reference only
          {' \u2014 '}not an official verification portal.
        </p>
      </div>
    </footer>
  )
}
