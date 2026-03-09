import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Colliers Multifamily Advisory — Ontario\'s Premier Multifamily Team',
  description: 'Led by Dayma Itamunoala, SVP at Colliers. Over $1.12B in completed multifamily transactions across Ontario. Institutional-grade advisory for apartment building owners and investors.',
  keywords: 'multifamily advisory ontario, apartment building broker toronto, sell apartment building ontario, multifamily investment sales colliers, cap rates ontario',
  authors: [{ name: 'Dayma Itamunoala' }],
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'OnMultifamily — Ontario\'s Premier Multifamily Advisory Team',
    description: 'Over $1.12B in completed multifamily sales. 81% closing rate. Led by Dayma Itamunoala at Colliers.',
    url: 'https://onmultifamily.com',
    siteName: 'OnMultifamily',
    locale: 'en_CA',
    type: 'website',
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
