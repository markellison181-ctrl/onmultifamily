import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'OnMultifamily - Ontario\'s Premier Multifamily Advisory Team | Colliers',
  description: 'Led by Dayma Itamunoala, Ontario\'s #1 multifamily team at Colliers. $1.12B+ in completed sales, 81% closing rate. Institutional-grade multifamily advisory across Ontario.',
  keywords: 'multifamily, ontario, toronto, investment sales, colliers, apartment buildings, cap rates, real estate',
  authors: [{ name: 'Dayma Itamunoala' }],
  icons: {
    icon: '/images/logos/favicon.jpg',
    shortcut: '/images/logos/favicon.jpg',
    apple: '/images/logos/favicon.jpg',
  },
  openGraph: {
    title: 'OnMultifamily - Ontario\'s Premier Multifamily Advisory Team',
    description: '$1.12B+ in completed multifamily sales. 81% closing percentage. 3,000+ units sold since 2018.',
    url: 'https://onmultifamily.com',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OnMultifamily - Ontario\'s Premier Multifamily Advisory Team',
    description: '$1.12B+ in completed multifamily sales. Ontario\'s #1 multifamily team at Colliers.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}