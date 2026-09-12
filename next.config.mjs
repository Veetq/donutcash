/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/donutcash',
  assetPrefix: '/donutcash/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
