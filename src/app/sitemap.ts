import { MetadataRoute } from 'next'
import listingsData from '@/data/listings.json'
import articlesData from '@/data/articles.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.onmultifamily.com'
  const now = new Date().toISOString().split('T')[0]

  // Core pages
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/cmhc-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/bond-yields`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ]

  // All active listings
  const listings: MetadataRoute.Sitemap = listingsData.map((listing) => ({
    url: `${baseUrl}/listings/${listing.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // All articles
  const articles: MetadataRoute.Sitemap = articlesData.map((article) => ({
    url: `${baseUrl}/insights/${article.id}`,
    lastModified: article.date || now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...pages, ...listings, ...articles]
}
