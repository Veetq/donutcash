const REASONS = [
  { value: '100+', label: 'shops compared', copy: 'We checked the market before setting our prices.' },
  { value: '2–100×', label: 'higher elsewhere', copy: 'Some shops charge twice as much. Others go far beyond that.' },
  { value: 'Low', label: 'market pricing', copy: 'Straightforward packages built to keep your cost down.' },
]

export function WhyUs() {
  return (
    <section id="why-us" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-6 md:py-8">
      <div className="rounded-2xl border border-primary/20 bg-primary/[0.045] px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Why DonutCash</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">Prices that make sense.</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We looked over 100 shops before building our packages. Some charge 2× more, some 20×, and some up to 100×.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {REASONS.map((reason) => (
              <div key={reason.label} className="min-w-0 rounded-xl border border-border/70 bg-background/45 px-3 py-3 sm:px-4">
                <p className="font-display text-xl font-bold text-primary sm:text-2xl">{reason.value}</p>
                <p className="mt-1 text-xs font-semibold text-foreground">{reason.label}</p>
                <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{reason.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
