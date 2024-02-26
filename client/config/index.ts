export const config = {
  profile: {
    defaultPicture: '/media/profile/picture.png',
  },
  oauth: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    },
  },
}

export default config
