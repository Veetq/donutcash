import { buttonVariants } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-bold">
            $
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            donutcash<span className="text-primary">.shop</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#packages" className="transition-colors hover:text-foreground">
            Packages
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#reviews" className="transition-colors hover:text-foreground">
            Reviews
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        <a href="#packages" className={buttonVariants({ size: 'sm', className: 'font-medium' })}>
          Buy now
        </a>
      </div>
    </header>
  )
}
