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
  title: 'Sell Your Student Housing Property in Ontario | Student Residence Broker | Colliers',
  description: 'Sell your student housing property or purpose-built student accommodation in Ontario. The Colliers Ontario Multifamily Team advises on student residence investment sales, including university partnerships, P3 student housing, and private PBSA assets. Currently advising on the University of Toronto student residence portfolio. Free confidential valuation.',
  keywords: [
    'sell student housing Ontario',
    'sell student residence Ontario',
    'sell student accommodation Ontario',
    'sell PBSA Ontario',
    'sell purpose built student accommodation Ontario',
    'student housing broker Ontario',
    'student residence broker Ontario',
    'student housing investment sales Ontario',
    'student housing valuation Ontario',
    'student housing for sale Ontario',
    'student residence for sale Ontario',
    'student housing for sale Toronto',
    'sell student housing Toronto',
    'sell student housing Ottawa',
    'sell student housing Waterloo',
    'sell student housing Kingston',
    'sell student housing London Ontario',
    'sell student housing Hamilton',
    'sell student housing Guelph',
    'student housing P3 Ontario',
    'university residence investment sales',
    'university student housing partnership',
    'P3 student housing Ontario',
    'student housing disposition Ontario',
    'student housing opinion of value',
    'what is my student housing worth',
    'best student housing broker Ontario',
    'student housing cap rate Ontario',
    'student housing market Ontario',
    'CMHC student housing financing',
    'Colliers student housing',
    'Colliers student residence sales',
    'Dayma Itamunoala student housing',
    'student housing near university',
    'off campus student housing for sale',
    'on campus student housing investment',
    'student housing leasehold interest',
    'university of toronto student residence',
  ],
  openGraph: {
    title: 'Sell Your Student Housing Property in Ontario | Colliers',
    description: 'Student housing investment sales advisory. Purpose-built student accommodation, university residences, P3 partnerships. Currently advising on U of T student residence portfolio.',
    url: 'https://www.onmultifamily.com/services/student-housing',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/images/hero-img.png', width: 1200, height: 630, alt: 'Sell Your Student Housing Property in Ontario - Colliers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your Student Housing Property in Ontario | Colliers',
    description: 'Student housing investment sales. PBSA, university residences, P3 partnerships. Free valuation.',
    images: ['/images/hero-img.png'],
  },
  alternates: {
    canonical: 'https://www.onmultifamily.com/services/student-housing',
  },
}

function StudentHousingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Student Housing Investment Sales Advisory',
    description: 'Specialized student housing and purpose-built student accommodation (PBSA) investment sales advisory in Ontario. Covers university residence partnerships, P3 student housing transactions, private PBSA assets, leasehold interest sales, and off-campus student housing portfolios. Currently advising on the University of Toronto student residence portfolio (Oak House and Chestnut Residence). Full transaction management from valuation through closing.',
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
    serviceType: 'Student Housing Investment Sales',
    audience: {
      '@type': 'Audience',
      audienceType: 'University real estate offices, student housing owners, PBSA investors, P3 housing operators, institutional investors, pension funds',
    },
    offers: {
      '@type': 'Offer',
      description: 'Complimentary confidential opinion of value for student housing property owners across Ontario',
      price: '0',
      priceCurrency: 'CAD',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function StudentHousingPage() {
  return (
    <main>
      <StudentHousingSchema />
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
