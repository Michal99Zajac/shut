export const config = {
  profile: {
    defaultPicture: '/media/profile/picture.png',
  },
  oauth: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    },
  },
  client: {
    url: `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${
      process.env.NEXT_PUBLIC_VERCEL_URL
    }`,
  },
}

export default config
