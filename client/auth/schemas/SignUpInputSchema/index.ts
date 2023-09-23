import { z } from 'zod'

import { GQL_SignUpInputSchema } from '@/graphql/generated'

export const signUpInputSchema = GQL_SignUpInputSchema().extend({
  email: z.string().email(),
  repeatedPassword: z.string(),
})

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>
