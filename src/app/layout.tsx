import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.onmultifamily.com'),
  title: {
    default: 'Ontario Multifamily Brokerage | Colliers | Dayma Itamunoala',
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
    title: 'Ontario Multifamily Brokerage | OnMultifamily | Colliers',
    description: 'Over $1.2B in completed multifamily sales across Ontario. 81% closing rate. Led by Dayma Itamunoala, SVP at Colliers.',
    url: 'https://www.onmultifamily.com',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/hero-img.png',
        width: 1200,
        height: 630,
        alt: 'OnMultifamily | Ontario Multifamily Brokerage | Colliers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ontario Multifamily Brokerage | OnMultifamily | Colliers',
    description: 'Over $1.2B in completed multifamily sales across Ontario. 81% closing rate. Led by Dayma Itamunoala, SVP at Colliers.',
    images: ['/images/hero-img.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://www.onmultifamily.com" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
