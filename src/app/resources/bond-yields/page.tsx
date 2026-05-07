import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BondYieldTracker from '@/components/BondYieldTracker'

export const metadata = {
  title: 'Bond Yield Tracker | Live GoC Rates & CMB Spreads | OnMultifamily',
  description: 'Track live Government of Canada bond yields that drive apartment building mortgage pricing in Ontario. 2-Year, 5-Year, 10-Year GoC, Bank of Canada overnight rate, and CMB spreads. Updated daily.',
  keywords: ['GoC bond yields', 'Government of Canada yields', 'CMB spreads', 'multifamily mortgage rates Canada', 'apartment building interest rates Ontario', 'CMHC mortgage rates', '5 year GoC yield', 'Bank of Canada rate'],
  alternates: { canonical: 'https://www.onmultifamily.com/resources/bond-yields' },
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
