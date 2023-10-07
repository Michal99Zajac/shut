import { z } from 'zod'

export const googleAccessDataSchema = z.object({
  access_token: z.string(),
  expiry_date: z.number(),
  scope: z.string(),
  token_type: z.string(),
  refresh_token: z.string(),
})

export type GoogleAccessData = z.infer<typeof googleAccessDataSchema>
