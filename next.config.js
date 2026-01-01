/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'qtrypzzcjebvfcihiynt.supabase.co' },
      // Tennis equipment manufacturer CDNs
      { protocol: 'https', hostname: 'www.wilson.com' },
      { protocol: 'https', hostname: 'www.luxilon.com' },
      { protocol: 'https', hostname: 'img.babolat.com' },
      { protocol: 'https', hostname: 'www.solinco.com' },
      { protocol: 'https', hostname: 'www.tecnifibre.com' },
      { protocol: 'https', hostname: 'head.com' },
      { protocol: 'https', hostname: 'www.tournagrip.com' },
      { protocol: 'https', hostname: 'www.yonex.com' },
      { protocol: 'https', hostname: 'www.gammasports.com' },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Headers to ensure favicon/icons are properly cached and refreshed
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/favicon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

