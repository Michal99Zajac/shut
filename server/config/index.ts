import { env } from './env'

export const config = {
  node: {
    env: env.NODE_ENV,
  },
  jwt: {
    access: {
      secret: env.JWT_SECRET,
      options: {
        expiresIn: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
  secure: {
    saltRounds: 10,
  },
}

export default config
