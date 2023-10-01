import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  // NODE
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  // JWT
  JWT_SECRET: str({ desc: 'JWT secret' }),
  JWT_RESET_SECRET: str({ desc: 'JWT reset secret' }),
  // AWS SES
  AWS_SES_SENDER: str({ desc: 'AWS SES email' }),
  AWS_ACCESS_KEY: str({ desc: 'AWS access key' }),
  AWS_SECRET_ACCESS_KEY: str({ desc: 'AWS secret access key' }),
  AWS_REGION: str({ desc: 'AWS region' }),
})

export default env
