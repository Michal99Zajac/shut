import { z } from 'zod'

import { ZISignUpInputSchema } from '@/graphql/generated'

export const signUpInputSchema = ZISignUpInputSchema().extend({
  email: z.string().email(),
  repeatedPassword: z.string(),
})

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>
