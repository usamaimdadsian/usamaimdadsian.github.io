/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '' : '',
  basePath: isProd ? '' : '',
  output: 'export', // emit a static site to ./out for GitHub Pages
};
export default nextConfig;
