/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/instagram-stories' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/instagram-stories/' : '',
}

module.exports = nextConfig