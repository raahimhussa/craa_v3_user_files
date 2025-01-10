/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/home',
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'd2z8m6u1famt8l.cloudfront.net'],
  },
  swcMinify: false,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
