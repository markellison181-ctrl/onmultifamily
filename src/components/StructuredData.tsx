export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'OnMultifamily | Colliers',
    alternateName: 'OnMultifamily',
    description: 'Ontario\'s leading multifamily investment sales advisory team. Over $1.2B in completed apartment building transactions across Ontario, Canada. 81% closing rate. Led by Dayma Itamunoala, SVP at Colliers.',
    url: 'https://www.onmultifamily.com',
    logo: 'https://www.onmultifamily.com/images/logos/logo-dark.svg',
    image: 'https://www.onmultifamily.com/images/hero-img.png',
    telephone: '+1-416-791-7203',
    email: 'dayma.itamunoala@colliers.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '181 Bay Street, Suite 1400',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M5J 2V1',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6472,
      longitude: -79.3815,
    },
    areaServed: {
      '@type': 'State',
      name: 'Ontario',
      containedInPlace: { '@type': 'Country', name: 'Canada' },
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Colliers International',
      url: 'https://www.collierscanada.com',
    },
    founder: {
      '@type': 'Person',
      name: 'Dayma Itamunoala',
      jobTitle: 'Senior Vice President, Sales Representative',
      url: 'https://www.linkedin.com/in/dayma',
      worksFor: {
        '@type': 'Organization',
        name: 'Colliers International',
      },
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Dayma Itamunoala',
        jobTitle: 'Senior Vice President',
        telephone: '+1-416-791-7203',
        email: 'dayma.itamunoala@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Zoe Prachter',
        jobTitle: 'Transaction Manager',
        email: 'zoe.prachter@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Yianni Tsiampas',
        jobTitle: 'Associate',
        email: 'yianni.tsiampas@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Chris Bertucci',
        jobTitle: 'Associate',
        email: 'chris.bertucci@colliers.com',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/dayma',
      'https://twitter.com/daymaitam',
    ],
    knowsAbout: [
      'Multifamily Investment Sales',
      'Apartment Building Brokerage',
      'CMHC Insured Financing',
      'MLI Select Program',
      'Ontario Cap Rates',
      'Multifamily Market Analysis',
      'Seniors Housing Investment',
      'Portfolio Valuations',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '42',
      bestRating: '5',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OnMultifamily',
    url: 'https://www.onmultifamily.com',
    description: 'Ontario multifamily investment sales advisory. Market reports, CMHC calculator, bond yields, and active listings.',
    publisher: {
      '@type': 'Organization',
      name: 'OnMultifamily | Colliers',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.onmultifamily.com/insights/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ListingSchema({ listing }: { listing: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `https://www.onmultifamily.com/listings/${listing.id}`,
    image: listing.image ? `https://www.onmultifamily.com${listing.image}` : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address?.split(',')[0],
      addressLocality: listing.location?.split(',')[0]?.trim(),
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    ...(listing.price && {
      offers: {
        '@type': 'Offer',
        price: listing.price,
        priceCurrency: 'CAD',
      },
    }),
    ...(listing.units && {
      numberOfRooms: listing.units,
    }),
    broker: {
      '@type': 'RealEstateAgent',
      name: 'OnMultifamily | Colliers',
      telephone: '+1-416-791-7203',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ article, content }: { article: any; content?: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `https://www.onmultifamily.com/insights/${article.id}`,
    image: article.image ? `https://www.onmultifamily.com${article.image}` : undefined,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Dayma Itamunoala',
      jobTitle: 'Senior Vice President, Colliers',
      url: 'https://www.linkedin.com/in/dayma',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OnMultifamily | Colliers',
      url: 'https://www.onmultifamily.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.onmultifamily.com/insights/${article.id}`,
    },
    about: {
      '@type': 'Thing',
      name: 'Ontario Multifamily Real Estate Market',
    },
    inLanguage: 'en-CA',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ToolSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CMHC Debt Underwriting Calculator',
    url: 'https://www.onmultifamily.com/resources/cmhc-calculator',
    description: 'Free CMHC-insured multifamily mortgage calculator. Size your loan using institutional underwriting methodology with live CMB yields, DSCR/LTV constraints, MLI Select scenarios, and updated insurance premiums per CMHC Advice 264.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    creator: {
      '@type': 'Organization',
      name: 'OnMultifamily | Colliers',
    },
    featureList: 'CMHC insured debt sizing, DSCR and LTV dual constraint, MLI Select scenarios, Live CMB yield integration, Insurance premium calculator',
    inLanguage: 'en-CA',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
