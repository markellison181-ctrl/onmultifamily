import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Record | OnMultifamily | Colliers Ontario Multifamily',
  description: 'Completed apartment building transactions across Ontario. $1.59B+ in multifamily sales by the OnMultifamily team at Colliers.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TrackRecordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
