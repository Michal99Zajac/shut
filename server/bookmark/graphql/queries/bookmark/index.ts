import builder from '#/graphql/builder'

import resolveBookmark from '../../resolvers/resolveBookmark'

builder.queryField('bookmark', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'Bookmark',
    description: 'Get a bookmark by ID',
    args: {
      id: t.arg.id({ required: true, description: 'Bookmark ID' }),
    },
    resolve: resolveBookmark,
  }),
)
