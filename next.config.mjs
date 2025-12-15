/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
    ],
  },

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  onDemandEntries: { maxInactiveAge: 1000 * 60 * 60 },
};

export default nextConfig;
