import builder from '#/graphql/builder'

import { UpdateBookmarkGroupInput } from '../../inputs/UpdateBookmarkGroupInput'
import resolveUpdateBookmarkGroup from '../../resolvers/resolveUpdateBookmarkGroup'

builder.mutationField('updateBookmarkGroup', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'BookmarkGroup',
    args: {
      id: t.arg.id({
        required: true,
        description: 'ID of the bookmark group',
        validate: { uuid: true },
      }),
      input: t.arg({ type: UpdateBookmarkGroupInput, required: true }),
    },
    resolve: resolveUpdateBookmarkGroup,
  }),
)
