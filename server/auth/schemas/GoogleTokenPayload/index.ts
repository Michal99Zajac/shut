import { z } from 'zod'

export const googleTokenPayloadSchema = z.object({
  email: z.string().email(),
  name: z.string().nullish(),
  picture: z.string(),
  given_name: z.string().nullish(),
  family_name: z.string().nullish(),
  locale: z.string(),
})

export type GoogleTokenPayload = z.infer<typeof googleTokenPayloadSchema>
