import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CMHCCalculator from '@/components/CMHCCalculator'
import { ToolSchema } from '@/components/StructuredData'

export const metadata = {
  title: 'CMHC Debt Underwriting Calculator | OnMultifamily',
  description: 'Free CMHC mortgage calculator for multifamily properties. Size your insured loan with DSCR, LTV, and MLI Select credit scenarios. Built for Ontario apartment owners.',
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
