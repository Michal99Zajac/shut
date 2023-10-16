/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  redirects: async () => {
    return [
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/app/:path*',
        destination: '/auth/signin',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'session',
          },
        ],
      },
      {
        source: '/auth/:path*',
        destination: '/app',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'session',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
