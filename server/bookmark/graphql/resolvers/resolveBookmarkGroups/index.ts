import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { InputShape } from '#/common/types/InputShape'
import { AuthContext } from '#/graphql/context'
import { BookmarkGroupFilterInput } from '#/bookmark/graphql/inputs/BookmarkGroupFilterInput'

interface Args {
  filter?: InputShape<typeof BookmarkGroupFilterInput> | null
}

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
  args: Args,
  context: AuthContext,
) => {
  const where: Prisma.BookmarkGroupWhereInput = {
    user: {
      id: context.user.id,
    },
  }

  if (args.filter?.query) {
    where.OR = [
      { name: { contains: args.filter.query, mode: 'insensitive' } },
      {
        parent: {
          name: { contains: args.filter.query, mode: 'insensitive' },
        },
      },
      {
        parent: {
          parent: {
            name: { contains: args.filter.query, mode: 'insensitive' },
          },
        },
      },
    ]
  }

  return context.prisma.bookmarkGroup.findMany({ ...query, where })
}

export default resolveBookmarkGroups
