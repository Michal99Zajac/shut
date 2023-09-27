import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { InputShape } from '#/common/types/InputShape'
import { AuthContext } from '#/graphql/context'

import { BookmarkFilterInput } from '../../inputs/BookmarkFilterInput'

interface Args {
  filter?: InputShape<typeof BookmarkFilterInput> | null
}

interface BookmarksQuery extends Query {
  include?: Prisma.BookmarkInclude<DefaultArgs>
  select?: Prisma.BookmarkSelect<DefaultArgs>
}

/**
 * GraphQL resolver for retrieving the bookmarks associated with the current authenticated user.
 *
 * @param query BookmarksQuery
 * @param _ Parent
 * @param __ Args
 * @param context AuthContext
 * @returns List of bookmarks associated with the authenticated user
 */
export const resolveBookmarks = async (
  query: BookmarksQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  const { filter } = args

  const where: Prisma.BookmarkWhereInput = {
    userId: context.user.id,
  }

  if (filter?.query) {
    where.OR = [
      {
        friendlyName: {
          contains: filter.query,
          mode: 'insensitive',
        },
      },
      {
        url: {
          contains: filter.query,
          mode: 'insensitive',
        },
      },
    ]
  }

  if (filter?.group) {
    where.bookmarkGroup = {
      OR: [{ id: filter.group.id.toString() }],
    }

    if (filter.group.depth) {
      for (let i = 0; i < filter.group.depth; i++) {
        // TODO: implement recursive query
      }
    }
  }

  return context.prisma.bookmark.findMany({ ...query, where })
}

export default resolveBookmarks
