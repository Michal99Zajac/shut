import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

interface Args {
  id: string | number
}

interface BookmarkGroupQuery extends Query {
  include?: Prisma.BookmarkGroupInclude<DefaultArgs>
  select?: Prisma.BookmarkGroupSelect<DefaultArgs>
}

/**
 * GraphQL resolver for retrieving bookmark group associated with the current authenticated user.
 *
 * @param query BookmarkGroupQuery
 * @param _ Parent
 * @param __ Args
 * @param context AuthContext
 * @returns Bookmark group associated with the authenticated user and the given id
 */
export const resolveBookmarkGroup = async (
  query: BookmarkGroupQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  const { id } = args

  const bookmarkGroup = await context.prisma.bookmarkGroup.findFirstOrThrow({
    ...query,
    where: { id: id.toString(), userId: context.user.id },
  })

  return bookmarkGroup
}

export default resolveBookmarkGroup
