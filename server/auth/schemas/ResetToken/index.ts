import { z } from 'zod'

/**
 * Special schema for checking the reset token
 */
export const resetTokenSchema = z.object({
  userId: z.string().uuid(),
  type: z.literal('RESET'),
})

export type ResetToken = z.infer<typeof resetTokenSchema>
