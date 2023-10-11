import { z } from 'zod'

import { GQL_ChangePasswordInputSchema } from '@/graphql/generated'

export const changePasswordInputSchema = GQL_ChangePasswordInputSchema().extend({
  repeatedNewPassword: z.string(),
})

export type ChangePasswordInputSchema = z.infer<typeof changePasswordInputSchema>
