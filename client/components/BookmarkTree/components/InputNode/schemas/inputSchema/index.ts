import { z } from 'zod'

export const inputSchema = z.object({
  input: z.string().nonempty(),
})

export type InputSchema = z.infer<typeof inputSchema>
