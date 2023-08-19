import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  // NODE
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  // JWT
  JWT_SECRET: str({ desc: 'JWT secret' }),
})

export default env
