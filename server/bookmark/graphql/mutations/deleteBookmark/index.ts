import builder from '#/graphql/builder'

import { resolveDeleteBookmark } from '../../resolvers/resolveDeleteBookmark'

builder.mutationField('deleteBookmark', (t) =>
  t.withAuth({ logged: true }).id({
    description: 'Delete a bookmark',
    args: {
      id: t.arg.id({
        description: 'Bookmark ID',
        required: true,
        validate: {
          uuid: true,
        },
      }),
    },
    resolve: resolveDeleteBookmark,
  }),
)
