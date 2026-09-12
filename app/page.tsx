import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Packages } from '@/components/packages'
import { HowItWorks } from '@/components/how-it-works'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'
import { TrustSection } from '@/components/trust-section'
import { Reviews } from '@/components/reviews'

export default function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Packages />
        <TrustSection />
        <HowItWorks />
        <Reviews />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
