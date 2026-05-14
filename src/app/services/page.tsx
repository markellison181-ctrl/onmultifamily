import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Investment Sales Services | Apartment Buildings, Seniors Housing, Student Housing | OnMultifamily',
  description: 'Full-service multifamily investment sales advisory across Ontario. Sell your apartment building, seniors housing property, or student residence with Ontario\'s most active team. $1.2B+ in completed transactions. 81% closing rate. Colliers International.',
  keywords: [
    'sell apartment building Ontario',
    'sell multifamily Ontario',
    'apartment building broker Ontario',
    'multifamily investment sales advisory',
    'sell seniors housing Ontario',
    'sell student housing Ontario',
    'apartment building valuation Ontario',
    'multifamily listing agent Ontario',
    'Colliers multifamily services',
    'apartment building disposition Ontario',
  ],
  alternates: {
    canonical: 'https://www.onmultifamily.com/services',
  },
}

export default function ServicesPage() {
  redirect('/')
}
