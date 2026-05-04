import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://onmultifamily.com'),
  title: {
    default: 'Ontario Multifamily Brokerage | Colliers | Dayma Itamunoala',
    template: '%s | OnMultifamily | Colliers',
  },
  description: 'Ontario multifamily brokerage led by Dayma Itamunoala, SVP at Colliers. Over $1.2B in apartment building sales across Ontario. 81% closing rate. Expert advisory for owners and investors.',
  keywords: [
    'Ontario multifamily brokerage',
    'apartment building broker Ontario',
    'sell apartment building Ontario',
    'multifamily investment sales Colliers',
    'cap rates Ontario',
    'multifamily broker Toronto',
    'apartment building advisory Ontario',
    'Dayma Itamunoala',
    'Colliers multifamily Ontario',
    'multifamily investment sales advisory',
  ],
  authors: [{ name: 'Dayma Itamunoala' }],
  icons: { icon: '/favicon.png' },
  alternates: {
    canonical: 'https://onmultifamily.com',
  },
  openGraph: {
    title: 'Ontario Multifamily Brokerage | OnMultifamily | Colliers',
    description: 'Over $1.2B in completed multifamily sales across Ontario. 81% closing rate. Led by Dayma Itamunoala, SVP at Colliers.',
    url: 'https://onmultifamily.com',
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
