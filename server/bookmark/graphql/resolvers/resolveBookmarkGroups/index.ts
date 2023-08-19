import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

interface Args {}

interface BookmarkGroupsQuery extends Query {
  include?: Prisma.BookmarkGroupInclude<DefaultArgs>
  select?: Prisma.BookmarkGroupSelect<DefaultArgs>
}

/**
 * GraphQL resolver for retrieving all bookmark groups associated with the current authenticated user.
 *
 * @param query BookmarkGroupsQuery
 * @param _ Parent
 * @param __ Args
 * @param context AuthContext
 * @returns List of bookmark groups associated with the authenticated user
 */
export const resolveBookmarkGroups = async (
  query: BookmarkGroupsQuery,
  _: Parent,
  __: Args,
  context: AuthContext,
) => {
  return context.prisma.bookmarkGroup.findMany({ ...query, where: { userId: context.user.id } })
}

export default resolveBookmarkGroups
