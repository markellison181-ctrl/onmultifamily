/** @type {import('next').NextConfig} */
// v2 - force redeploy
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig