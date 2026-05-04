import React from 'react'

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OnMultifamily - Colliers Multifamily Team",
    "alternateName": "Ontario's Premier Multifamily Advisory Team",
    "url": "https://onmultifamily.com",
    "logo": "https://onmultifamily.com/images/onmultifamily-logo.png",
    "description": "Led by Dayma Itamunoala, SVP at Colliers, Ontario's most active multifamily investment sales team. Over $1.2 billion in completed transactions since 2018.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "dayma.itamunoala@colliers.com",
      "areaServed": "Ontario, Canada"
    },
    "founder": {
      "@type": "Person",
      "name": "Dayma Itamunoala",
      "jobTitle": "Senior Vice President, Head of Multifamily (Ontario)",
      "worksFor": {
        "@type": "Organization",
        "name": "Colliers International"
      }
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Colliers International",
      "url": "https://www.colliers.com"
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "serviceType": [
      "Multifamily Investment Sales",
      "Apartment Building Advisory",
      "Real Estate Investment Advisory",
      "Property Valuation Services"
    ],
    "knowsAbout": [
      "Ontario multifamily market",
      "apartment building sales",
      "cap rates",
      "CMHC financing",
      "multifamily investment"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "OnMultifamily Team",
    "description": "Ontario's premier multifamily advisory team specializing in apartment building investment sales across Toronto, Ottawa, Hamilton, London, and other Ontario markets.",
    "url": "https://onmultifamily.com",
    "telephone": "Available through Colliers Toronto",
    "email": "dayma.itamunoala@colliers.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "Ontario",
      "addressCountry": "Canada"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Toronto"
      },
      {
        "@type": "City", 
        "name": "Ottawa"
      },
      {
        "@type": "City",
        "name": "Hamilton"
      },
      {
        "@type": "City",
        "name": "London"
      },
      {
        "@type": "City",
        "name": "Kitchener"
      },
      {
        "@type": "State",
        "name": "Ontario"
      }
    ],
    "priceRange": "Multifamily properties from $5M to $100M+",
    "paymentAccepted": "Professional real estate services",
    "openingHours": "Mo-Fr 09:00-17:00",
    "specialties": [
      "Apartment building sales",
      "Multifamily investment advisory", 
      "Portfolio valuations",
      "CMHC MLI Select financing",
      "Market intelligence"
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Dayma Itamunoala",
        "jobTitle": "Senior Vice President, Head of Multifamily (Ontario)"
      },
      {
        "@type": "Person", 
        "name": "Aman Rana",
        "jobTitle": "Associate Vice President, Seniors Housing"
      },
      {
        "@type": "Person",
        "name": "Zoe Prachter", 
        "jobTitle": "Transaction Manager"
      },
      {
        "@type": "Person",
        "name": "Yianni Tsiampas",
        "jobTitle": "Associate"
      },
      {
        "@type": "Person",
        "name": "Chris Bertucci",
        "jobTitle": "Associate" 
      }
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Multifamily Investment Sales Advisory",
    "description": "Comprehensive apartment building investment sales and advisory services across Ontario, including market analysis, valuations, transaction management, and capital markets advisory.",
    "provider": {
      "@type": "Organization",
      "name": "OnMultifamily Team"
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Multifamily Advisory Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property Valuation",
            "description": "Complimentary opinion of value for apartment buildings"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Investment Sales Advisory",
            "description": "Complete transaction management from listing to closing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Market Intelligence",
            "description": "Comprehensive market reports and analysis"
          }
        }
      ]
    }
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dayma Itamunoala",
    "jobTitle": "Senior Vice President, Head of Multifamily (Ontario)",
    "worksFor": {
      "@type": "Organization",
      "name": "Colliers International",
      "department": "Multifamily Investment Sales"
    },
    "email": "dayma.itamunoala@colliers.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "Ontario", 
      "addressCountry": "Canada"
    },
    "knowsAbout": [
      "multifamily real estate",
      "apartment building investment",
      "Ontario real estate market",
      "cap rate analysis",
      "real estate investment advisory"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Real Estate License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Real Estate Council of Ontario"
        }
      }
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OnMultifamily",
    "alternateName": "Ontario's Premier Multifamily Advisory Team",
    "url": "https://onmultifamily.com",
    "description": "Ontario's most active multifamily investment sales team. Over $1.2 billion in transactions. Market intelligence, property valuations, and expert advisory services.",
    "publisher": {
      "@type": "Organization",
      "name": "OnMultifamily Team"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://onmultifamily.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "OnMultifamily Team"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  )
}

export default StructuredData