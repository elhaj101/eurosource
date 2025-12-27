import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eurosource.de'
  const locales = ['en', 'de', 'ar', 'zh']

  // Base routes that exist for every locale
  const routes = ['', '/about-us', '/careers', '/collaboration']

  const sitemapEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return [
    {
      url: baseUrl, // Root redirector
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...sitemapEntries
  ]
}
