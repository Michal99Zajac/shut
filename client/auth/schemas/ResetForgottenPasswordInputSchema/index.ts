import { z } from 'zod'

import { GQL_ResetForgottenPasswordInputSchema } from '@/graphql/generated'

export const resetForgottenPasswordInputSchema = GQL_ResetForgottenPasswordInputSchema().extend({
  repeatedPassword: z.string(),
})

export type ResetForgottenPasswordInputSchema = z.infer<typeof resetForgottenPasswordInputSchema>
