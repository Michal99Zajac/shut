import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

interface Args {
  /**
   * Bookmark ID
   */
  id: string | number
}

interface BookmarkQuery extends Query {
  include?: Prisma.BookmarkInclude<DefaultArgs>
  select?: Prisma.BookmarkSelect<DefaultArgs>
}

/**
 * GraphQL resolver for retrieving a specific bookmark associated with the current authenticated user
 *
 * @param query BookmarkQuery
 * @param _ Parent
 * @param __ Args
 * @param context AuthContext
 * @returns The specific bookmark associated with the authenticated user and matching the given ID
 */
export const resolveBookmark = async (
  query: BookmarkQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  const { id } = args

  const bookmark = await context.prisma.bookmark.findFirstOrThrow({
    ...query,
    where: { id: id.toString(), userId: context.user.id },
  })

  return bookmark
}

export default resolveBookmark
