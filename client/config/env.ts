import { cleanEnv, str } from 'envalid'

export const publicEnv = cleanEnv(process.env, {
  // NODE
  NEXT_PUBLIC_VERCEL_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),
  // URL
  NEXT_PUBLIC_VERCEL_URL: str({ desc: 'Vercel URL', default: 'localhost:3000' }),
})

export default publicEnv
