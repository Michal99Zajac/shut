const appRoutes = ['/']
const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password']

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true,
      },
      ...appRoutes.map((route) => ({
        source: route,
        destination: '/auth/signin',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'session',
          },
        ],
      })),
      ...authRoutes.map((route) => ({
        source: route,
        destination: '/',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'session',
          },
        ],
      })),
    ]
  },
}

module.exports = nextConfig
