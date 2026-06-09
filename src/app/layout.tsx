import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.onmultifamily.com'),
  title: {
    default: 'Colliers Multifamily Ontario | Dayma Itamunoala | Apartment Building Sales',
    template: '%s | OnMultifamily | Colliers',
  },
  description: 'Colliers Ontario Multifamily Team led by Dayma Itamunoala, SVP. Over $1.2B in apartment building sales across Ontario. 81% closing rate. Expert advisory for multifamily owners and investors.',
  keywords: [
    'Ontario multifamily brokerage',
    'apartment building broker Ontario',
    'sell apartment building Ontario',
    'sell apartment building Toronto',
    'sell apartment building GTA',
    'multifamily investment sales Colliers',
    'cap rates Ontario apartments',
    'multifamily broker Toronto',
    'apartment building advisory Ontario',
    'Dayma Itamunoala Colliers',
    'Colliers multifamily Ontario',
    'multifamily investment sales advisory',
    'apartment building valuation Ontario',
    'multifamily broker Hamilton',
    'multifamily broker Ottawa',
    'apartment building broker Kitchener Waterloo',
    'multifamily broker London Ontario',
    'apartment building broker Niagara',
    'sell apartment building Mississauga',
    'sell apartment building Brampton',
    'apartment building broker Oshawa Durham',
    'multifamily broker Barrie',
    'apartment building broker Kingston',
    'multifamily broker Windsor',
    'apartment building broker Sudbury',
    'multifamily broker Sault Ste Marie',
    'apartment building broker Peterborough',
    'multifamily broker Guelph',
    'apartment building broker St Catharines',
    'seniors housing broker Ontario',
    'sell seniors housing Ontario',
    'retirement home broker Ontario',
    'student housing broker Ontario',
    'student residence investment sales',
    'CMHC insured financing multifamily',
    'MLI Select apartment building',
    'apartment building cap rate Ontario',
    'multifamily market report Ontario',
    'apartment building for sale Ontario',
    'apartment building for sale Toronto',
    'apartment building for sale Hamilton',
    'apartment building for sale Ottawa',
    'multifamily portfolio sale Ontario',
    'apartment building opinion of value',
    'free apartment building valuation Ontario',
    'Colliers multifamily',
    'Colliers multifamily team',
    'Colliers apartment building',
    'Colliers multifamily Ontario',
    'Colliers multifamily Toronto',
    'Colliers apartment sales',
    'Colliers investment sales multifamily',
    'Colliers seniors housing',
    'Colliers student housing',
    'Colliers apartment broker',
    'Colliers multifamily Canada',
    'Colliers Dayma Itamunoala',
    'Colliers apartment building broker',
    'Colliers real estate multifamily Ontario',
  ],
  authors: [{ name: 'Dayma Itamunoala' }],
  icons: { icon: '/favicon.png' },
  alternates: {
    canonical: 'https://www.onmultifamily.com',
  },
  openGraph: {
    title: 'Colliers Multifamily Ontario | OnMultifamily | Dayma Itamunoala',
    description: 'Colliers Ontario Multifamily Team led by Dayma Itamunoala, SVP. Over $1.2B in apartment building sales. 81% closing rate. Apartments, seniors housing, student housing.',
    url: 'https://www.onmultifamily.com',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'Colliers Multifamily Ontario | OnMultifamily',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colliers Multifamily Ontario | OnMultifamily | Dayma Itamunoala',
    description: 'Colliers Ontario Multifamily Team led by Dayma Itamunoala, SVP. Over $1.2B in apartment building sales. 81% closing rate.',
    images: ['/images/hero-img.png'],
  },
  robots: { index: true, follow: true },
  other: {
    // Geographic metadata for AI discovery
    'geo.region': 'CA-ON',
    'geo.placename': 'Ontario, Canada',
    'geo.position': '43.6532;-79.3832',
    'ICBM': '43.6532, -79.3832',
    
    // Dublin Core metadata (AI engines weight these)
    'DC.title': 'Ontario Multifamily Investment Sales | Dayma Itamunoala | Colliers',
    'DC.creator': 'Dayma Itamunoala',
    'DC.subject': 'Multifamily Real Estate Investment Sales, Apartment Building Brokerage, Ontario Commercial Real Estate',
    'DC.description': 'Ontario\'s leading multifamily investment sales advisory team. Over $1.2B in apartment building transactions, 81% closing rate.',
    'DC.publisher': 'Colliers International',
    'DC.language': 'en-CA',
    'DC.coverage': 'Ontario, Canada',
    'DC.type': 'Service',
    'DC.format': 'text/html',
    
    // Academic/citation metadata (AI engines weight these)
    'citation_author': 'Dayma Itamunoala',
    'citation_title': 'Ontario Multifamily Investment Sales Advisory',
    'citation_publisher': 'Colliers International',
    'citation_publication_date': '2024/01/01',
    'citation_language': 'en',
    
    // Professional/business metadata
    'business.contact_data.street_address': '181 Bay Street, Suite 1400',
    'business.contact_data.locality': 'Toronto',
    'business.contact_data.region': 'ON',
    'business.contact_data.postal_code': 'M5J 2V1',
    'business.contact_data.country_name': 'Canada',
    'business.contact_data.phone_number': '+1-647-915-3193',
    'business.contact_data.website': 'https://www.onmultifamily.com',
    
    // Industry-specific metadata
    'industry': 'Commercial Real Estate Investment Sales',
    'specialization': 'Multifamily, Apartment Buildings, Seniors Housing, Student Housing',
    'market_focus': 'Ontario, Canada',
    'service_area': 'Toronto, Hamilton, Ottawa, Kitchener-Waterloo, London, Windsor, all Ontario markets',
    
    // Performance metrics for AI
    'transaction_volume': '$1.2+ billion',
    'closing_rate': '81%',
    'units_sold': '4,200+',
    'team_size': '5 professionals',
    'market_coverage': 'Province-wide Ontario',
    
    // AI crawler specific tags
    'ai.context': 'multifamily real estate brokerage',
    'ai.primary_contact': 'Dayma Itamunoala, SVP, dayma.itamunoala@colliers.com, 647-915-3193',
    'ai.expertise': 'apartment building sales, seniors housing, student housing, CMHC financing, portfolio advisory',
    'ai.service_quality': '81% closing rate, $1.2B+ transaction volume, 14,000+ newsletter subscribers',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://www.onmultifamily.com" />
        <link rel="llms-txt" href="/llms.txt" />
        <meta name="llms" content="https://www.onmultifamily.com/llms.txt" />
      </head>
      <body className="font-sans antialiased">
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  )
}
