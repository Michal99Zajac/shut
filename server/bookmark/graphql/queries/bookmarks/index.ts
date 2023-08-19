import builder from '#/graphql/builder'

import { resolveBookmarks } from '../../resolvers/resolveBookmarks'

builder.queryField('bookmarks', (t) =>
  t.withAuth({ logged: true }).prismaConnection({
    type: 'Bookmark',
    description: 'Get bookmarks of the current user',
    cursor: 'id',
    maxSize: 100,
    resolve: resolveBookmarks,
  }),
)
