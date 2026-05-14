import { notFound } from 'next/navigation'
import listingsData from '@/data/listings.json'
import ListingDetail from '@/components/ListingDetail'
import { ListingSchema } from '@/components/StructuredData'

export async function generateStaticParams() {
  return listingsData.map(l => ({ id: l.id }))
}

// Neighbourhood context for richer SEO descriptions
const neighbourhoodContext: Record<string, string> = {
  '30-springhurst-avenue': 'Located in Toronto\'s Parkdale-Liberty Village corridor, steps from the waterfront, BMO Field, and Exhibition Place. Strong rental demand driven by proximity to downtown, transit, and lakefront amenities.',
  '700-spadina-avenue': 'Situated on the University of Toronto\'s St. George campus in the heart of downtown Toronto. One of Canada\'s premier post-secondary institutions with 75,000+ students.',
  '89-chestnut-street': 'Located at the southern edge of the University of Toronto\'s St. George campus in downtown Toronto, adjacent to the Discovery District and Toronto\'s entertainment core.',
  '231-vaughan-road': 'Situated in Toronto\'s Oakwood-Vaughan neighbourhood near St. Clair West, a rapidly gentrifying corridor with strong rental demand, transit access, and neighbourhood amenities.',
  '149-cosburn-avenue': 'Located in East York, one of Toronto\'s most established residential rental neighbourhoods with excellent transit access and strong tenant demand.',
  '116-spencer-avenue': 'Situated in Parkdale, one of Toronto\'s highest-demand rental submarkets with strong transit access, walkability, and proximity to the waterfront and downtown core.',
  '165-colborne-avenue': 'Located in Richmond Hill, a high-growth GTA suburb with strong rental fundamentals driven by population growth, transit expansion, and limited new rental supply.',
  '1083-main-street-east': 'Situated in Hamilton\'s east end, one of Ontario\'s most active multifamily investment markets. Hamilton has seen significant rental growth and institutional investor interest.',
  '56-south-forster-park-drive': 'Located in Oakville, one of the GTA\'s most affluent suburbs with extremely limited rental supply and strong demographics.',
  '49-st-marys-river-drive': 'Situated in Sault Ste. Marie, a Northern Ontario market with stable rental demand, affordable entry points, and CMHC-insurable assets.',
  '17-19-collier-street': 'Located in St. Catharines, the Niagara Region\'s largest city with growing rental demand driven by Brock University, healthcare, and population growth.',
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

  const pricePerUnitDisplay = listing.pricePerUnit
    ? `$${Math.round(listing.pricePerUnit / 1000)}K/unit`
    : ''

  const city = listing.location?.split(',')[0]?.trim() || 'Ontario'
  const unitText = listing.units ? `${listing.units}-unit ` : ''
  const typeText = listing.type === 'Student Housing' ? 'student housing' : listing.type === 'Seniors Housing' ? 'seniors housing' : 'apartment building'
  const typeTextCap = listing.type === 'Student Housing' ? 'Student Housing' : listing.type === 'Seniors Housing' ? 'Seniors Housing' : 'Apartment Building'
  
  const neighbourhood = neighbourhoodContext[listing.id] || ''
  const statusText = listing.status === 'Under Contract' ? ' (Under Contract)' : ''
  const priceLine = listing.price ? ` Offered at ${priceDisplay}${pricePerUnitDisplay ? ` (${pricePerUnitDisplay})` : ''}.` : ''

  // Rich description combining property details + neighbourhood + team credibility
  const richDescription = `${unitText}${typeText} for sale in ${city}, Ontario${statusText}.${priceLine} ${listing.headline || listing.description.substring(0, 120)} ${neighbourhood} Listed by Dayma Itamunoala, SVP at Colliers. $1.2B+ in Ontario multifamily sales. Request a confidential information package.`.trim()

  // Property-type specific keywords
  const typeKeywords = listing.type === 'Student Housing' ? [
    `student housing for sale ${city}`,
    `student residence for sale ${city}`,
    `student accommodation investment ${city}`,
    `PBSA for sale Ontario`,
    `university residence investment`,
    'student housing broker Ontario',
    'student housing investment sales',
  ] : listing.type === 'Seniors Housing' ? [
    `seniors housing for sale ${city}`,
    `retirement home for sale ${city}`,
    `retirement residence for sale ${city}`,
    `long term care for sale Ontario`,
    'seniors housing broker Ontario',
    'retirement home investment sales Ontario',
  ] : [
    `apartment building for sale ${city}`,
    `apartment for sale ${city} Ontario`,
    `multifamily for sale ${city}`,
    `${unitText}apartment building ${city}`,
    `rental property for sale ${city}`,
    `investment property for sale ${city}`,
    `purpose built rental for sale ${city}`,
    `apartment building for sale Ontario`,
    `sell apartment building ${city}`,
  ]

  return {
    title: `${listing.title} | ${unitText}${typeTextCap} For Sale in ${city}${statusText} | Colliers`,
    description: richDescription.substring(0, 320),
    keywords: [
      ...typeKeywords,
      `${typeText} for sale Ontario`,
      `${city} multifamily investment`,
      `${city} rental property investment`,
      `${city} apartment building broker`,
      'Colliers multifamily Ontario',
      'Dayma Itamunoala',
      'OnMultifamily',
      'multifamily investment sales Ontario',
      'apartment building valuation Ontario',
      listing.unitMix ? `${listing.unitMix} apartment building` : '',
      listing.units ? `${listing.units} unit apartment building for sale` : '',
    ].filter(Boolean),
    openGraph: {
      title: `${listing.title} | ${priceDisplay} | ${unitText}${typeTextCap} in ${city}`,
      description: `${unitText}${typeText} for sale in ${city}, Ontario.${priceLine} ${listing.headline || listing.description.substring(0, 120)}`,
      images: listing.image ? [{ url: listing.image, width: 1200, height: 630, alt: `${listing.title} - ${unitText}${typeText} for sale in ${city}` }] : [],
      type: 'website',
      locale: 'en_CA',
      url: `https://www.onmultifamily.com/listings/${listing.id}`,
      siteName: 'OnMultifamily | Colliers',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.title} | ${priceDisplay} | ${city}`,
      description: `${unitText}${typeText} for sale in ${city}, Ontario.${priceLine}`,
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
