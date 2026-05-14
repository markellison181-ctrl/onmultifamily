import { Metadata } from 'next'
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
import { OrganizationSchema, FAQPageSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Sell Your Seniors Housing Property in Ontario | Retirement Home Broker | Colliers',
  description: 'Sell your seniors housing property, retirement residence, or long-term care facility in Ontario. The Colliers Ontario Multifamily Team specializes in seniors housing investment sales with dedicated expertise in retirement homes, assisted living, memory care, and long-term care. Free confidential valuation. Contact Aman Rana or Dayma Itamunoala.',
  keywords: [
    'sell seniors housing Ontario',
    'sell retirement home Ontario',
    'sell retirement residence Ontario',
    'sell long term care facility Ontario',
    'sell assisted living Ontario',
    'sell nursing home Ontario',
    'sell memory care facility Ontario',
    'seniors housing broker Ontario',
    'retirement home broker Ontario',
    'retirement residence broker Ontario',
    'long term care broker Ontario',
    'seniors housing investment sales Ontario',
    'retirement home valuation Ontario',
    'seniors housing valuation Ontario',
    'seniors housing for sale Ontario',
    'retirement home for sale Ontario',
    'retirement residence for sale Toronto',
    'retirement home for sale GTA',
    'sell seniors housing Toronto',
    'sell retirement home Toronto',
    'sell retirement home Hamilton',
    'sell retirement home Ottawa',
    'sell seniors housing Kitchener',
    'sell seniors housing London Ontario',
    'seniors housing disposition Ontario',
    'seniors housing opinion of value',
    'what is my retirement home worth',
    'how to sell retirement home Ontario',
    'best seniors housing broker Ontario',
    'seniors housing market Ontario',
    'seniors housing cap rate Ontario',
    'CMHC seniors housing financing',
    'Colliers seniors housing',
    'Colliers retirement home sales',
    'Aman Rana seniors housing',
    'Dayma Itamunoala seniors housing',
    'seniors living investment sales',
    'independent living for sale Ontario',
    'continuing care retirement community Ontario',
    'CCRC for sale Ontario',
  ],
  openGraph: {
    title: 'Sell Your Seniors Housing Property in Ontario | Colliers',
    description: 'Dedicated seniors housing investment sales advisory. Retirement residences, assisted living, long-term care, memory care. Free confidential valuation across Ontario.',
    url: 'https://www.onmultifamily.com/services/seniors-housing',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/images/hero-img.png', width: 1200, height: 630, alt: 'Sell Your Seniors Housing Property in Ontario - Colliers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your Seniors Housing Property in Ontario | Colliers',
    description: 'Dedicated seniors housing investment sales. Retirement homes, assisted living, LTC. Free valuation.',
    images: ['/images/hero-img.png'],
  },
  alternates: {
    canonical: 'https://www.onmultifamily.com/services/seniors-housing',
  },
}

function SeniorsHousingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Seniors Housing Investment Sales Advisory',
    description: 'Specialized seniors housing and retirement residence investment sales advisory in Ontario. Covers retirement residences, assisted living, memory care, long-term care, and independent living properties. Includes valuation, market positioning, buyer qualification from institutional and private capital, CMHC financing coordination, and full transaction management.',
    provider: {
      '@type': 'RealEstateAgent',
      name: 'OnMultifamily | Colliers',
      url: 'https://www.onmultifamily.com',
      telephone: '+1-647-915-3193',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '181 Bay Street, Suite 1400',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        postalCode: 'M5J 2V1',
        addressCountry: 'CA',
      },
    },
    areaServed: {
      '@type': 'State',
      name: 'Ontario',
      containedInPlace: { '@type': 'Country', name: 'Canada' },
    },
    serviceType: 'Seniors Housing Investment Sales',
    audience: {
      '@type': 'Audience',
      audienceType: 'Seniors housing owners, retirement residence operators, long-term care operators, family-owned retirement homes, institutional investors, private equity',
    },
    offers: {
      '@type': 'Offer',
      description: 'Complimentary confidential opinion of value for seniors housing property owners across Ontario',
      price: '0',
      priceCurrency: 'CAD',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function SeniorsHousingPage() {
  return (
    <main>
      <SeniorsHousingSchema />
      <OrganizationSchema />
      <FAQPageSchema />
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
