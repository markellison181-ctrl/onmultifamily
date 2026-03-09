import { notFound } from 'next/navigation'
import listingsData from '@/data/listings.json'
import ListingDetail from '@/components/ListingDetail'

export async function generateStaticParams() {
  return listingsData.map(l => ({ id: l.id }))
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = listingsData.find(l => l.id === params.id)
  if (!listing) notFound()
  const otherListings = listingsData.filter(l => l.id !== listing.id).slice(0, 2)
  return <ListingDetail listing={listing} otherListings={otherListings} />
}
