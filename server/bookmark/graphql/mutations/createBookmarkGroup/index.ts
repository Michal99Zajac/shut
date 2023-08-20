import builder from '#/graphql/builder'

import { CreateBookmarkGroupInput } from '../../inputs/CreateBookmarkGroupInput'
import { resolveCreateBookmarkGroup } from '../../resolvers/resolveCreateBookmarkGroup'

builder.mutationField('createBookmarkGroup', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'BookmarkGroup',
    description: 'Create bookmark group',
    args: {
      input: t.arg({ type: CreateBookmarkGroupInput, required: true }),
    },
    resolve: resolveCreateBookmarkGroup,
  }),
)
