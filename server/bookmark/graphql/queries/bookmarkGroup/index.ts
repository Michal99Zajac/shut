import builder from '#/graphql/builder'

import { resolveBookmarkGroup } from '../../resolvers/resolveBookmarkGroup'

builder.mutationField('bookmarkGroup', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'BookmarkGroup',
    args: {
      id: t.arg.id({ required: true, description: 'ID of the bookmark group' }),
    },
    resolve: resolveBookmarkGroup,
  }),
)
