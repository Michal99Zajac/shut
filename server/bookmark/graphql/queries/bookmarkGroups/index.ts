import builder from '#/graphql/builder'

import { resolveBookmarkGroups } from '../../resolvers/resolveBookmarkGroups'

builder.queryField('bookmarkGroups', (t) =>
  t.withAuth({ logged: true }).prismaConnection({
    type: 'BookmarkGroup',
    description: 'Get bookmark groups of the current user',
    cursor: 'id',
    maxSize: 100,
    resolve: resolveBookmarkGroups,
  }),
)
