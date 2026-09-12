const STEPS = [
  {
    title: 'Choose a package',
    body: 'Pick the amount of DonutSMP money you want. Every package is already 30% off.',
  },
  {
    title: 'Send your IGN',
    body: 'Message your Minecraft username and order details in our Discord server so we can prepare your delivery.',
  },
  {
    title: 'We deliver manually',
    body: 'After we confirm your payment, a team member delivers your money or spawners in-game. Timing depends on availability.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three simple steps between you and a fatter balance.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-background p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 font-display text-lg font-bold text-primary">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
