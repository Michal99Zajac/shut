import builder from '#/graphql/builder'

import { resolveDeleteBookmarkGroup } from '../../resolvers/resolveDeleteBookmarkGroup'

builder.mutationField('deleteBookmarkGroup', (t) =>
  t.withAuth({ logged: true }).id({
    description: 'Delete a bookmark group',
    args: {
      id: t.arg.id({
        description: 'Bookmark group ID',
        required: true,
        validate: {
          uuid: true,
        },
      }),
    },
    resolve: resolveDeleteBookmarkGroup,
  }),
)
