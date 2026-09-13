import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Up to 30% OFF — Limited time sale
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
            DonutSMP money and spawners, delivered by our team.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Stack your balance and dominate the server. Get{' '}
            <span className="font-semibold text-foreground">1B for just $20</span> — the more you
            buy, the more you save, up to 30% off.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#packages"
              className={buttonVariants({ size: 'lg', className: 'text-base font-semibold' })}
            >
              Shop packages
            </a>
            <a
              href="#how"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'text-base',
              })}
            >
              How it works
            </a>
          </div>

          <dl className="mt-10 flex gap-8">
            <div>
              <dt className="text-2xl font-bold font-display text-foreground">Manual</dt>
              <dd className="text-sm text-muted-foreground">Delivery</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold font-display text-foreground">1.2k+</dt>
              <dd className="text-sm text-muted-foreground">Orders filled</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold font-display text-foreground">24/7</dt>
              <dd className="text-sm text-muted-foreground">Live support</dd>
            </div>
          </dl>
        </div>

        <div className="relative z-10">
          <div className="relative mx-auto aspect-square max-w-md rounded-3xl border border-border bg-card/60 p-6">
            <Image
              src="/images/cash-stack.png"
              alt="A stack of cash representing DonutSMP in-game money"
              width={640}
              height={640}
              priority
              className="h-full w-full object-contain drop-shadow-2xl"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-primary/30 bg-background px-5 py-2 text-sm font-semibold shadow-lg">
              <span className="text-primary">1B</span> = $20 USD
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
