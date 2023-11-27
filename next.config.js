// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipMiddlewareUrlNormalize: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname:
          '/dj1v6wmjv/image/upload/v1700748175/rental-cars-cloudinary/**',
      },
    ],
  },
};

module.exports = nextConfig;
