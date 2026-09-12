export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground font-display text-sm font-bold">
            $
          </span>
          <span className="font-display font-semibold text-foreground">donutcash.shop</span>
        </div>
        <p>© {new Date().getFullYear()} donutcash.shop — Not affiliated with DonutSMP.</p>
      </div>
    </footer>
  )
}
