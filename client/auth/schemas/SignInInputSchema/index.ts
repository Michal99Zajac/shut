import { z } from 'zod'

import { GQL_SignInInputSchema } from '@/graphql/generated'

export const signInInputSchema = GQL_SignInInputSchema().extend({
  email: z.string().email(),
})

export type SignInInputSchema = z.infer<typeof signInInputSchema>
