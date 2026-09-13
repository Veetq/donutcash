const FAQS = [
  {
    q: 'How much does DonutSMP money cost?',
    a: 'The flat rate is $20 USD per 1 billion. Thanks to the current 30% off sale, larger packages scale at the same great rate.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Most orders are delivered in-game within a few minutes. During peak hours it can take a little longer, but our support team is online 24/7.',
  },
  {
    q: 'What do you need from me?',
    a: 'Just your exact Minecraft username at checkout so we can send the money to the right account.',
  },
  {
    q: 'Is this safe?',
    a: 'Yes. Payments are processed through a secure checkout and we never ask for your account password.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="faq-reveal mx-auto max-w-3xl scroll-mt-20 px-4 py-12 md:py-16">
      <div className="animate-product-in text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="animate-product-in mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {FAQS.map((item) => (
          <details key={item.q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium">
              {item.q}
              <span className="text-primary transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="faq-answer"><p className="pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p></div>
          </details>
        ))}
      </div>
    </section>
  )
}
