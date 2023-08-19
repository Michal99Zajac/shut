import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

interface Args {}

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
  __: Args,
  context: AuthContext,
) => {
  return context.prisma.bookmark.findMany({ ...query, where: { userId: context.user.id } })
}

export default resolveBookmarks
