import { env } from './env'

export const config = {
  vercel: {
    url: env.VERCEL_URL,
    env: env.VERCEL_ENV,
  },
  server: {
    https: env.HTTPS,
    host: env.HOST,
    url: `${env.HTTPS ? 'https' : 'http'}://${
      env.VERCEL_ENV === 'production' ? env.HOST : env.VERCEL_URL
    }`,
  },
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
    short: {
      secret: env.JWT_SHORT_SECRET,
      options: {
        expiresIn: 60 * 10, // 10 min
      },
    },
  },
  secure: {
    password: {
      salt: env.SECURE_PASSWORD_SALT,
    },
    data: {
      algorithm: 'aes-256-cbc',
      salt: env.SECURE_SALT,
      secret: env.SECURE_SECRET,
    },
  },
  aws: {
    sender: env.SERVER_AWS_SES_SENDER,
    access: {
      key: env.SERVER_AWS_ACCESS_KEY,
      secret: env.SERVER_AWS_SECRET_ACCESS_KEY,
    },
    region: env.SERVER_AWS_REGION,
  },
  oauth: {
    google: {
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUri: `${env.HTTPS ? 'https' : 'http'}://${
        env.VERCEL_ENV === 'production' ? env.HOST : env.VERCEL_URL
      }`,
    },
  },
}

export default config
