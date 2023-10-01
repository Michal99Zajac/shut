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
    reset: {
      secret: env.JWT_RESET_SECRET,
      options: {
        expiresIn: 60 * 10, // 10 min
      },
    },
  },
  secure: {
    saltRounds: 10,
  },
  aws: {
    sender: env.AWS_SES_SENDER,
    access: {
      key: env.AWS_ACCESS_KEY,
      secret: env.AWS_SECRET_ACCESS_KEY,
    },
    region: env.AWS_REGION,
  },
}

export default config
