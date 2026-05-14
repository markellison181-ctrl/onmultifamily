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
import { OrganizationSchema, WebSiteSchema, FAQPageSchema } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Sell Your Apartment Building in Ontario | #1 Multifamily Broker | Colliers',
  description: 'Looking to sell your apartment building in Ontario? The Colliers Ontario Multifamily Team has sold $1.2B+ in apartment buildings across Toronto, Hamilton, Ottawa, Kitchener-Waterloo, London, and every Ontario market. 81% closing rate. 4,200+ units sold. Free confidential valuation. Contact Dayma Itamunoala, SVP.',
  keywords: [
    'sell apartment building Ontario',
    'sell apartment building Toronto',
    'sell apartment building GTA',
    'sell apartment building Hamilton',
    'sell apartment building Ottawa',
    'sell apartment building Kitchener',
    'sell apartment building London Ontario',
    'sell apartment building Mississauga',
    'sell apartment building Brampton',
    'sell apartment building Niagara',
    'sell apartment building Barrie',
    'sell apartment building Kingston',
    'sell apartment building Windsor',
    'sell apartment building Oshawa',
    'sell apartment building Sudbury',
    'sell apartment building Sault Ste Marie',
    'sell apartment building Peterborough',
    'sell apartment building Guelph',
    'sell apartment building St Catharines',
    'sell apartment building Oakville',
    'sell apartment building Burlington',
    'apartment building broker Ontario',
    'apartment building broker Toronto',
    'apartment building listing agent Ontario',
    'apartment building investment sales Ontario',
    'apartment building valuation Ontario',
    'free apartment building valuation',
    'apartment building opinion of value',
    'multifamily broker Ontario',
    'multifamily investment sales Ontario',
    'multifamily listing agent Toronto',
    'apartment building disposition Ontario',
    'apartment building sale advisory',
    'how to sell apartment building Ontario',
    'what is my apartment building worth Ontario',
    'apartment building appraisal Ontario',
    'best apartment building broker Ontario',
    'top multifamily broker Ontario',
    'CMHC insured apartment building sale',
    'MLI Select apartment building',
    'apartment building cap rate Ontario',
    'rent controlled apartment building sale Ontario',
    'purpose built rental apartment sale Ontario',
    'walk up apartment building for sale Ontario',
    'high rise apartment building for sale Ontario',
    'mid rise apartment building for sale Ontario',
    'Colliers apartment building sales',
    'Colliers multifamily Ontario',
    'Dayma Itamunoala apartment buildings',
  ],
  openGraph: {
    title: 'Sell Your Apartment Building in Ontario | Colliers Multifamily',
    description: '$1.2B+ in apartment building sales across Ontario. 81% closing rate. Free confidential valuation from Ontario\'s most active multifamily team.',
    url: 'https://www.onmultifamily.com/services/apartment-buildings',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/images/hero-img.png', width: 1200, height: 630, alt: 'Sell Your Apartment Building in Ontario - Colliers Multifamily' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your Apartment Building in Ontario | Colliers',
    description: '$1.2B+ in apartment building sales. 81% closing rate. Free valuation.',
    images: ['/images/hero-img.png'],
  },
  alternates: {
    canonical: 'https://www.onmultifamily.com/services/apartment-buildings',
  },
}

function ApartmentBuildingsSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Apartment Building Investment Sales Advisory',
    description: 'Full-service apartment building sales advisory for owners across Ontario. From boutique 10-unit walk-ups to 1,000+ suite institutional portfolios. Includes market valuation, marketing strategy, buyer qualification, negotiation, and transaction management through closing.',
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
    serviceType: 'Apartment Building Investment Sales',
    audience: {
      '@type': 'Audience',
      audienceType: 'Apartment building owners, multifamily investors, private owners, institutional investors, family offices, REITs',
    },
    offers: {
      '@type': 'Offer',
      description: 'Complimentary confidential opinion of value for apartment building owners across Ontario',
      price: '0',
      priceCurrency: 'CAD',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Apartment Building Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Apartment Building Sales Advisory' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Free Apartment Building Valuation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Multifamily Portfolio Disposition' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CMHC Financing Coordination' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Buyer Advisory and Acquisition Support' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Market Intelligence and Research Reports' } },
      ],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function ApartmentBuildingsPage() {
  return (
    <main>
      <ApartmentBuildingsSchema />
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
