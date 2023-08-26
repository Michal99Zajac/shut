import { cleanEnv, str } from 'envalid'

export const publicEnv = cleanEnv(process.env, {
  // NODE
  NEXT_PUBLIC_VERCEL_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),
})

export default publicEnv
