import builder from '#/graphql/builder'

import { BookmarkGroupFilterInput } from '../../inputs/BookmarkGroupFilterInput'
import { resolveBookmarkGroups } from '../../resolvers/resolveBookmarkGroups'

builder.queryField('bookmarkGroups', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: ['BookmarkGroup'],
    args: {
      filter: t.arg({
        description:
          'Filter for bookmark groups. If a filter is given, only groups up to level 3 are included in the data',
        type: BookmarkGroupFilterInput,
        required: false,
      }),
    },
    description: 'Get bookmark groups of the current user',
    resolve: resolveBookmarkGroups,
  }),
)
