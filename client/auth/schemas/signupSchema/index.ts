import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  repeatedPassword: z.string(),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
