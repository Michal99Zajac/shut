import { publicEnv } from './env'

export const config = {
  node: {
    env: publicEnv.NEXT_PUBLIC_VERCEL_ENV,
  },
  url: {
    http: publicEnv.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https' : 'http',
    host: publicEnv.NEXT_PUBLIC_VERCEL_URL,
  },
}

export default config
