import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  // JWT
  JWT_SECRET: str({ desc: 'JWT secret' }),
  JWT_REFRESH_SECRET: str({ desc: 'JWT refresh secret' }),
})

export default env
