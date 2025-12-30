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
}

module.exports = nextConfig

