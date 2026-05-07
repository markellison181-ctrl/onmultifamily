import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CMHCCalculator from '@/components/CMHCCalculator'
import { ToolSchema } from '@/components/StructuredData'

export const metadata = {
  title: 'CMHC Debt Underwriting Calculator | Free Apartment Mortgage Calculator | OnMultifamily',
  description: 'Free CMHC-insured mortgage calculator for apartment buildings. Size your loan with DSCR, LTV, MLI Select scenarios, live CMB yields, and insurance premiums. Used by Ontario multifamily owners and investors.',
  keywords: ['CMHC calculator', 'CMHC mortgage calculator', 'apartment building mortgage calculator', 'MLI Select calculator', 'multifamily mortgage Ontario', 'CMHC insured financing calculator', 'DSCR calculator multifamily', 'apartment building financing Ontario'],
  alternates: { canonical: 'https://www.onmultifamily.com/resources/cmhc-calculator' },
}

export default function CMHCCalculatorPage() {
  return (
    <main>
      <ToolSchema />
      <Header />
      <CMHCCalculator />
      <Footer />
    </main>
  )
}
