import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.racketrescue.com"

  // High priority pages
  const highPriorityPages = [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/schedule`, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/membership`, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/shop`, changeFrequency: "daily" as const, priority: 1 },
  ]

  // Medium priority pages
  const mediumPriorityPages = [
    { url: `${baseUrl}/about`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/for-shops`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/locations/laguna-beach`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/locations/newport-beach`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/locations/irvine`, changeFrequency: "weekly" as const, priority: 0.8 },
  ]

  // Standard priority pages
  const standardPriorityPages = [
    { url: `${baseUrl}/services`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/strings`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/rackets`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/referrals`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/durability`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/login`, changeFrequency: "weekly" as const, priority: 0.7 },
  ]

  // Low priority pages
  const lowPriorityPages = [
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
  ]

  const lastModified = new Date()

  return [...highPriorityPages, ...mediumPriorityPages, ...standardPriorityPages, ...lowPriorityPages].map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
