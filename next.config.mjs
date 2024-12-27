/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/usamaimdadsian.github.io/' : '',
  basePath: isProd ? '/usamaimdadsian.github.io' : '',
  output: 'export'
};


export default nextConfig;
