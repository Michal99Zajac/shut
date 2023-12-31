import builder from '#/graphql/builder'

import BookmarkFilterInput from '../../inputs/BookmarkFilterInput'
import { resolveBookmarks } from '../../resolvers/resolveBookmarks'

builder.queryField('bookmarks', (t) =>
  t.withAuth({ logged: true }).prismaConnection({
    type: 'Bookmark',
    description: 'Get bookmarks of the current user',
    cursor: 'id',
    maxSize: 100,
    edgesNullable: false,
    defaultSize: 20,
    args: {
      filter: t.arg({ type: BookmarkFilterInput, required: false }),
    },
    resolve: resolveBookmarks,
  }),
)
