import builder from '#/graphql/builder'

import { CreateBookmarkInput } from '../../inputs/CreateBookmarkInput'
import { resolveCreateBookmark } from '../../resolvers/resolveCreateBookmark'

builder.mutationField('createBookmark', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'Bookmark',
    args: {
      input: t.arg({ type: CreateBookmarkInput, required: true }),
    },
    resolve: resolveCreateBookmark,
  }),
)
