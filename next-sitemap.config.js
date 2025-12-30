/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.racketrescue.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude authenticated and admin pages from sitemap
  exclude: [
    '/dashboard',
    '/dashboard/*',
    '/my-orders',
    '/my-orders/*',
    '/admin',
    '/admin/*',
    '/confirmation',
    '/confirmation/*',
    '/track/*',
    '/api/*',
    '/offline',
  ],

  // robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/my-orders',
          '/admin',
          '/confirmation',
          '/track/',
          '/api/',
          '/_next/',
          '/offline',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
    ],
    additionalSitemaps: [],
  },

  // Custom transform for specific page priorities
  transform: async (config, path) => {
    // High priority pages
    const highPriority = ['/', '/schedule', '/membership', '/shop']
    // Medium priority pages
    const mediumPriority = ['/for-shops', '/about', '/contact', '/pricing']
    // Location pages (important for local SEO)
    const locationPages = path.startsWith('/locations/')

    let priority = config.priority
    let changefreq = config.changefreq

    if (highPriority.includes(path)) {
      priority = 1.0
      changefreq = 'daily'
    } else if (mediumPriority.includes(path) || locationPages) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path === '/privacy' || path === '/terms') {
      priority = 0.3
      changefreq = 'yearly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
