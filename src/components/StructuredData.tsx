const ONTARIO_MARKETS = [
  'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill',
  'Oakville', 'Burlington', 'Hamilton', 'St. Catharines', 'Niagara Falls', 'Welland',
  'Kitchener', 'Waterloo', 'Cambridge', 'Guelph', 'London', 'Windsor', 'Ottawa',
  'Kingston', 'Barrie', 'Oshawa', 'Whitby', 'Ajax', 'Pickering', 'Peterborough',
  'Belleville', 'Sudbury', 'Sault Ste. Marie', 'Thunder Bay', 'North Bay',
  'Brantford', 'Sarnia', 'Chatham-Kent', 'Cornwall', 'Owen Sound', 'Orillia',
  'Cobourg', 'Port Hope', 'Brockville', 'Woodstock', 'Stratford', 'Simcoe',
  'Timmins', 'Kenora', 'Deep River', 'Pembroke', 'Meaford',
]

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'OnMultifamily | Colliers',
    alternateName: ['OnMultifamily', 'Colliers Ontario Multifamily Team', 'Dayma Itamunoala Team'],
    description: 'Ontario\'s leading multifamily investment sales advisory team. Over $1.2B in completed apartment building transactions across Ontario, Canada. 81% closing rate. Specializing in apartment buildings, seniors housing, and student housing. Led by Dayma Itamunoala, SVP at Colliers.',
    url: 'https://www.onmultifamily.com',
    logo: 'https://www.onmultifamily.com/images/logos/logo-dark.svg',
    image: 'https://www.onmultifamily.com/images/hero-img.png',
    telephone: '+1-647-915-3193',
    email: 'dayma.itamunoala@colliers.com',
    priceRange: '$$$',
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
    areaServed: ONTARIO_MARKETS.map(city => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: 'Ontario', containedInPlace: { '@type': 'Country', name: 'Canada' } },
    })),
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
      telephone: '+1-647-915-3193',
      email: 'dayma.itamunoala@colliers.com',
      worksFor: { '@type': 'Organization', name: 'Colliers International' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Ivey Business School, Western University' },
      knowsAbout: ['Multifamily Investment Sales', 'Apartment Building Brokerage', 'CMHC Financing', 'Ontario Cap Rates', 'Seniors Housing', 'Student Housing', 'Portfolio Advisory'],
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Dayma Itamunoala',
        jobTitle: 'Senior Vice President, Sales Representative',
        telephone: '+1-647-915-3193',
        email: 'dayma.itamunoala@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Zoe Prachter',
        jobTitle: 'Transaction Manager',
        telephone: '+1-647-798-9565',
        email: 'zoe.prachter@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Yianni Tsiampas',
        jobTitle: 'Sales Representative',
        telephone: '+1-647-924-0901',
        email: 'yianni.tsiampas@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Chris Bertucci',
        jobTitle: 'Sales Representative',
        telephone: '+1-416-620-2359',
        email: 'chris.bertucci@colliers.com',
      },
      {
        '@type': 'Person',
        name: 'Aman Rana',
        jobTitle: 'Seniors Housing Advisor',
        telephone: '+1-647-971-8384',
        email: 'aman.rana@colliers.com',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/dayma',
      'https://twitter.com/daymaitam',
      'https://www.collierscanada.com/en-ca/experts/dayma-itamunoala',
    ],
    knowsAbout: [
      'Multifamily Investment Sales',
      'Apartment Building Brokerage',
      'Apartment Building Valuation',
      'CMHC Insured Financing',
      'MLI Select Program',
      'Ontario Apartment Cap Rates',
      'GTA Multifamily Market',
      'Multifamily Market Analysis',
      'Seniors Housing Investment Sales',
      'Student Housing Investment Sales',
      'Retirement Home Sales',
      'Portfolio Valuations',
      'Off-Market Apartment Sales',
      'Above Guideline Increases',
      'Multifamily Due Diligence',
      'Rent Roll Analysis',
      'Apartment Building Repositioning',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Multifamily Advisory Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Apartment Building Sales Advisory',
            description: 'Full-service investment sales advisory for apartment building owners across Ontario. From 10-unit walk-ups to 1,000+ suite institutional portfolios.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Complimentary Property Valuation',
            description: 'Confidential opinion of value for apartment buildings anywhere in Ontario. No cost, no obligation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seniors Housing Investment Sales',
            description: 'Specialized advisory for retirement residences, long-term care facilities, and assisted living properties across Ontario.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Student Housing Investment Sales',
            description: 'Advisory services for student residence and purpose-built student accommodation transactions.',
          },
        },
      ],
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
    description: 'Ontario multifamily investment sales advisory. Apartment buildings, seniors housing, student housing. Market reports, CMHC calculator, bond yields, and active listings across Ontario.',
    publisher: {
      '@type': 'Organization',
      name: 'OnMultifamily | Colliers',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.onmultifamily.com/insights/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
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

export function FAQPageSchema() {
  const faqs = [
    {
      question: 'What is the average cap rate for Ontario multifamily?',
      answer: 'Cap rates for stabilized apartment buildings in Ontario currently range from 4.25% to 5.75%, but we see a wide range depending on the specific asset. Location, building age, suite mix, occupancy, capital condition, and financing structure all play a role. A turnkey midrise in midtown Toronto will trade very differently than a value-add lowrise in a secondary market. Greater Toronto Area properties typically trade at the lower end, while smaller markets offer higher yields.',
    },
    {
      question: 'What is CMHC MLI Select?',
      answer: 'MLI Select is CMHC\'s points-based mortgage insurance program that offers enhanced terms - lower interest rates, longer amortization (up to 50 years), and higher LTV (up to 95%) - for projects meeting affordability, accessibility, and energy efficiency criteria.',
    },
    {
      question: 'How long does a typical multifamily sale take?',
      answer: 'From listing to close, a well-positioned multifamily sale typically takes 90-120 days. The marketing period is usually 4-6 weeks, followed by due diligence and closing. Portfolio transactions and larger assets may take longer.',
    },
    {
      question: 'What information do I need for a valuation?',
      answer: 'At minimum, we need the property address, unit count, current rent roll, and a summary of operating expenses. Ideally, we\'d also review the last 2-3 years of financial statements and capital expenditure history.',
    },
    {
      question: 'Do you work with buyers as well?',
      answer: 'Yes. We represent both sellers and buyers in multifamily transactions. For buyers, we provide access to on-market and off-market opportunities, underwriting support, and transaction management from offer through close.',
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
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

export function ListingSchema({ listing }: { listing: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `https://www.onmultifamily.com/listings/${listing.id}`,
    image: listing.image ? `https://www.onmultifamily.com${listing.image}` : undefined,
    datePosted: new Date().toISOString().split('T')[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address?.split(',')[0],
      addressLocality: listing.location?.split(',')[0]?.trim(),
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    ...(listing.lat && listing.lng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.lat,
        longitude: listing.lng,
      },
    }),
    ...(listing.price && {
      offers: {
        '@type': 'Offer',
        price: listing.price,
        priceCurrency: 'CAD',
        availability: listing.status === 'Under Contract' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      },
    }),
    ...(listing.units && {
      numberOfRooms: listing.units,
    }),
    broker: {
      '@type': 'RealEstateAgent',
      name: 'OnMultifamily | Colliers',
      telephone: '+1-647-915-3193',
      url: 'https://www.onmultifamily.com',
    },
  }

  // Breadcrumb for listing
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.onmultifamily.com' },
      { '@type': 'ListItem', position: 2, name: 'Listings', item: 'https://www.onmultifamily.com/#listings' },
      { '@type': 'ListItem', position: 3, name: listing.title, item: `https://www.onmultifamily.com/listings/${listing.id}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
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
      logo: { '@type': 'ImageObject', url: 'https://www.onmultifamily.com/images/logos/logo-dark.svg' },
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
    isAccessibleForFree: true,
    keywords: article.tags?.join(', '),
  }

  // Breadcrumb for article
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.onmultifamily.com' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.onmultifamily.com/insights' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.onmultifamily.com/insights/${article.id}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
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
    description: 'Free CMHC-insured multifamily mortgage calculator. Size your loan using institutional underwriting methodology with live CMB yields, DSCR/LTV constraints, MLI Select scenarios, and updated insurance premiums. Built for Ontario apartment building owners and investors.',
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
      url: 'https://www.onmultifamily.com',
    },
    featureList: 'CMHC insured debt sizing, DSCR and LTV dual constraint, MLI Select scenarios, Live CMB yield integration, Insurance premium calculator, Amortization up to 50 years',
    inLanguage: 'en-CA',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.onmultifamily.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.onmultifamily.com/resources' },
      { '@type': 'ListItem', position: 3, name: 'CMHC Calculator', item: 'https://www.onmultifamily.com/resources/cmhc-calculator' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
