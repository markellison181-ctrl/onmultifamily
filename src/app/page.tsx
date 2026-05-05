import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import About from '@/components/About'
import Listings from '@/components/Listings'
import Newsletter from '@/components/Newsletter'
import ValuationCTA from '@/components/ValuationCTA'
import Team from '@/components/Team'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData'

export default function Home() {
  return (
    <main>
      <OrganizationSchema />
      <WebSiteSchema />
      <Header />
      <Hero />
      <TrustedBy />
      <About />
      <Listings />
      <Newsletter />
      <ValuationCTA />
      <Team />
      <FAQ />
      <Footer />
    </main>
  )
}
