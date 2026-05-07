import { notFound } from 'next/navigation'
import listingsData from '@/data/listings.json'
import ListingDetail from '@/components/ListingDetail'
import { ListingSchema } from '@/components/StructuredData'

export async function generateStaticParams() {
  return listingsData.map(l => ({ id: l.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = listingsData.find(l => l.id === params.id)
  
  if (!listing) {
    return {
      title: 'Property Not Found | OnMultifamily',
      description: 'The requested property listing could not be found.'
    }
  }

  const priceDisplay = listing.price 
    ? `$${(listing.price / 1000000).toFixed(1)}M` 
    : 'Price Upon Request'

  const city = listing.location?.split(',')[0]?.trim() || 'Ontario'
  const unitText = listing.units ? `${listing.units}-unit ` : ''
  const typeText = listing.type === 'Student Housing' ? 'student housing' : listing.type === 'Seniors Housing' ? 'seniors housing' : 'apartment building'

  return {
    title: `${listing.title} | ${unitText}${typeText} for sale in ${city} | OnMultifamily`,
    description: `${unitText}${typeText} for sale in ${city}, Ontario. ${listing.headline || listing.description.substring(0, 150)} Listed by Dayma Itamunoala, Colliers.`,
    keywords: [
      `apartment building for sale ${city}`,
      `multifamily for sale ${city}`,
      `${unitText}apartment building ${city}`,
      `investment property ${city} Ontario`,
      `${typeText} for sale Ontario`,
      'Colliers multifamily',
      'Dayma Itamunoala',
    ],
    openGraph: {
      title: `${listing.title} | ${priceDisplay} | ${city}`,
      description: `${unitText}${typeText} for sale in ${city}. ${listing.headline || listing.description.substring(0, 120)}`,
      images: listing.image ? [{ url: listing.image, width: 1200, height: 630, alt: `${listing.title} - ${typeText} for sale in ${city}` }] : [],
      type: 'website',
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} | ${priceDisplay}`,
      description: `${unitText}${typeText} for sale in ${city}, Ontario.`,
      images: listing.image ? [listing.image] : [],
    },
    alternates: {
      canonical: `https://www.onmultifamily.com/listings/${listing.id}`,
    },
  }
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = listingsData.find(l => l.id === params.id)
  if (!listing) notFound()
  const otherListings = listingsData.filter(l => l.id !== listing.id).slice(0, 2)
  return (
    <>
      <ListingSchema listing={listing} />
      <ListingDetail listing={listing} otherListings={otherListings} />
    </>
  )
}
