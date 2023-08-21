import builder from '#/graphql/builder'

import { UpdateBookmarkInput } from '../../inputs/UpdateBookmarkInput'
import resolveUpdateBookmark from '../../resolvers/resolveUpdateBookmark'

builder.mutationField('updateBookmark', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'Bookmark',
    args: {
      id: t.arg.id({
        required: true,
        description: 'ID of the bookmark',
        validate: { uuid: true },
      }),
      input: t.arg({ type: UpdateBookmarkInput, required: true }),
    },
    resolve: resolveUpdateBookmark,
  }),
)
