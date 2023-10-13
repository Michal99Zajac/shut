import { z } from 'zod'

import { GQL_DeleteAccountInputSchema } from '@/graphql/generated'

export const deleteAccountInputSchema = GQL_DeleteAccountInputSchema()

export type DeleteAccountInputSchema = z.infer<typeof deleteAccountInputSchema>
