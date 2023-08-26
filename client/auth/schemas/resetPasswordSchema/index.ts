import { z } from 'zod'

export const resetPasswordSchema = z.object({
  password: z.string(),
  repeatedPassword: z.string(),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
