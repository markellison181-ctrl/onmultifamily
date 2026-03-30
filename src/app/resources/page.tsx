import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ResourcesHub from '@/components/ResourcesHub'

export const metadata = {
  title: 'Resources | Tools & Market Data | OnMultifamily',
  description: 'Free tools for Ontario multifamily owners: live bond yield tracker, CMHC debt underwriting calculator, market reports, and more.',
}

export default function ResourcesPage() {
  return (
    <main>
      <Header />
      <ResourcesHub />
      <Footer />
    </main>
  )
}
