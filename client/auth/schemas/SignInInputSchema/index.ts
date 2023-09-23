import { z } from 'zod'

import { ZISignInInputSchema } from '@/graphql/generated'

export const signInInputSchema = ZISignInInputSchema().extend({
  email: z.string().email(),
})

export type SignInInputSchema = z.infer<typeof signInInputSchema>
