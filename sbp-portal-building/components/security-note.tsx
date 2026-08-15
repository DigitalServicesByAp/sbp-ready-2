import { ShieldCheck } from 'lucide-react'

export function SecurityNote() {
  return (
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-4">
      <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        All data is encrypted end-to-end using 256-bit TLS. This portal is
        authorised by the State Bank of Pakistan.
      </p>
    </div>
  )
}
