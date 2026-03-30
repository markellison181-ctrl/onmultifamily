import { notFound } from 'next/navigation'
import listingsData from '@/data/listings.json'
import ListingDetail from '@/components/ListingDetail'

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

  return {
    title: `${listing.title} | ${priceDisplay} | ${listing.units} Units | OnMultifamily`,
    description: `${listing.headline} Located in ${listing.location}. ${listing.description.substring(0, 150)}...`,
    openGraph: {
      title: `${listing.title} | ${priceDisplay}`,
      description: listing.headline,
      images: listing.image ? [listing.image] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} | ${priceDisplay}`,
      description: listing.headline,
      images: listing.image ? [listing.image] : [],
    },
  }
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = listingsData.find(l => l.id === params.id)
  if (!listing) notFound()
  const otherListings = listingsData.filter(l => l.id !== listing.id).slice(0, 2)
  return <ListingDetail listing={listing} otherListings={otherListings} />
}
