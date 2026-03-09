import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BondYieldTracker from '@/components/BondYieldTracker'

export const metadata = {
  title: 'Bond Yield Tracker — Live GoC Rates | OnMultifamily',
  description: 'Track live Government of Canada bond yields that drive multifamily mortgage pricing. 5-Year GoC, 10-Year, overnight rate, and CMB spreads.',
}

export default function BondYieldsPage() {
  return (
    <main>
      <Header />
      <BondYieldTracker />
      <Footer />
    </main>
  )
}
