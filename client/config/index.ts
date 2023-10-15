export const config = {
  profile: {
    defaultPicture: '/media/profile/picture.png',
  },
  oauth: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    },
  },
  vercel: {
    url: process.env.NEXT_PUBLIC_VERCEL_URL,
    env: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
  client: {
    https: process.env.NEXT_PUBLIC_HTTPS === 'false' ? false : true,
    host: process.env.NEXT_PUBLIC_HOST,
    url: `${process.env.NEXT_PUBLIC_HTTPS === 'false' ? 'http' : 'https'}://${
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? process.env.NEXT_PUBLIC_HOST
        : process.env.NEXT_PUBLIC_VERCEL_URL
    }`,
  },
}

export default config
