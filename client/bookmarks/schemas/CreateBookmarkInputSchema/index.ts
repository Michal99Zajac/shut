import { z } from 'zod'

import { GQL_CreateBookmarkInputSchema } from '@/graphql/generated'

export const createBookmarkInputSchema = GQL_CreateBookmarkInputSchema().extend({
  url: z.string().url(),
})

export type CreateBookmarkInputSchema = z.infer<typeof createBookmarkInputSchema>
