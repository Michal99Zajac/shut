import { publicEnv } from './env'

export const config = {
  node: {
    env: publicEnv.NEXT_PUBLIC_VERCEL_ENV,
  },
}

export default config
