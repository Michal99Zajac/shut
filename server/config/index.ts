import { env } from './env'

export const config = {
  jwt: {
    access: {
      secret: env.JWT_SECRET,
      options: {
        expiresIn: '15m',
      },
    },
    refresh: {
      secret: env.JWT_REFRESH_SECRET,
      options: {
        expiresIn: '7d',
      },
    },
  },
}

export default config
