import { cleanEnv, str, bool, num } from 'envalid'

export const env = cleanEnv(process.env, {
  // VERCEL
  VERCEL_URL: str({ desc: 'Vercel URL' }),
  // NODE
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  // JWT
  JWT_SECRET: str({ desc: 'JWT secret' }),
  JWT_SHORT_SECRET: str({ desc: 'JWT short secret' }),
  // AWS SES
  SERVER_AWS_SES_SENDER: str({ desc: 'AWS SES email' }),
  SERVER_AWS_ACCESS_KEY: str({ desc: 'AWS access key' }),
  SERVER_AWS_SECRET_ACCESS_KEY: str({ desc: 'AWS secret access key' }),
  SERVER_AWS_REGION: str({ desc: 'AWS region' }),
  // GOOGLE OAUTH
  GOOGLE_OAUTH_CLIENT_ID: str({ desc: 'Google OAuth client ID' }),
  GOOGLE_OAUTH_CLIENT_SECRET: str({ desc: 'Google OAuth client secret' }),
  // ENCRYPTION
  SECURE_PASSWORD_SALT: num({ desc: 'Password salt' }),
  SECURE_SECRET: str({ desc: 'Encryption secret' }),
  SECURE_SALT: str({ desc: 'Encryption salt' }),
})

export default env
