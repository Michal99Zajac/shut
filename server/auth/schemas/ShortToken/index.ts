import { z } from 'zod'

/**
 * Special schema for checking the reset token
 */
export const shortTokenSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(['RESET', 'VERIFY']),
})

export type ShortToken = z.infer<typeof shortTokenSchema>
