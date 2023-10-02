import { z } from 'zod'

import { GQL_RequestNewPasswordInputSchema } from '@/graphql/generated'

export const requestNewPasswordInputSchema = GQL_RequestNewPasswordInputSchema().extend({
  email: z.string().email(),
})

export type RequestNewPasswordInputSchema = z.infer<typeof requestNewPasswordInputSchema>
