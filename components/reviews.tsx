const REVIEWS = [
  { name: 'Jax', rating: 5, text: 'Fast and easy.' },
  { name: 'Milo', rating: 5, text: 'Got my money, no stress.' },
  { name: 'Kira', rating: 4, text: 'Quick reply and smooth deal.' },
  { name: 'Nova', rating: 5, text: 'Good prices. Would buy again.' },
  { name: 'Ash', rating: 4, text: 'Simple process, friendly seller.' },
  { name: 'Rex', rating: 5, text: 'Spawners arrived right on time.' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="tracking-[0.18em] text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}<span className="text-muted-foreground/35">{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 md:py-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Reviews</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Good deals, happy players.</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">A few words from the DonutCash community.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 px-5 py-3 text-sm shadow-lg shadow-primary/5">
          <span className="font-display text-2xl font-bold">4.8</span>
          <span className="ml-2 text-amber-400">★★★★★</span>
          <span className="ml-2 text-muted-foreground">community rating</span>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review) => (
          <article key={`${review.name}-${review.text}`} className="rounded-2xl border border-border bg-card/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">{review.name}</span>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">&quot;{review.text}&quot;</p>
          </article>
        ))}
      </div>
    </section>
  )
}
