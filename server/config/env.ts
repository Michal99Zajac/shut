import { cleanEnv, str, bool } from 'envalid'

export const env = cleanEnv(process.env, {
  // VERCEL
  VERCEL_URL: str({ desc: 'Vercel URL' }),
  VERCEL_ENV: str({ desc: 'Vercel environment' }),
  // SERVER
  HTTPS: bool({ desc: 'HTTPS', default: true }),
  HOST: str({ desc: 'Host' }),
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
})

export default env
