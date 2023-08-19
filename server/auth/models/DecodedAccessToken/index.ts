import { z } from 'zod'

/**
 * Special model for checking the decoded access token
 */
export const decodedAccessToken = z.object({
  userId: z.string().uuid(),
})

export type DecodedAccessToken = z.infer<typeof decodedAccessToken>
