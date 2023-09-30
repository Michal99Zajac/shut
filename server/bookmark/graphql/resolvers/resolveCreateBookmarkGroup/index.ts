import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Parent } from '#/common/types/Parent'
import { Query } from '#/common/types/Query'
import { InputShape } from '#/common/types/InputShape'
import { AuthContext } from '#/graphql/context'
import { CreateBookmarkGroupInput } from '../../inputs/CreateBookmarkGroupInput'

interface CreateBookmarkGroupQuery extends Query {
  include?: Prisma.BookmarkGroupInclude<DefaultArgs>
  select?: Prisma.BookmarkGroupSelect<DefaultArgs>
}

interface Args {
  input: InputShape<typeof CreateBookmarkGroupInput>
}

/**
 * GraphQL resolver for creating a new bookmark group associated with the current authenticated user.
 *
 * @param query CreateBookmarkGroupQuery
 * @param _ Parent
 * @param args Args
 * @param context AuthContext
 * @returns The newly created bookmark group
 */
export const resolveCreateBookmarkGroup = async (
  query: CreateBookmarkGroupQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  const { input } = args

  const data: Prisma.BookmarkGroupCreateInput = {
    name: input.name,
    description: input.description,
    user: {
      connect: {
        id: context.user.id,
      },
    },
  }

  if (input.parentId) {
    const parent = await context.prisma.bookmarkGroup.findFirstOrThrow({
      where: {
        id: input.parentId.toString(),
      },
    })

    data.depth = parent.depth + 1
    data.parent = {
      connect: {
        id: parent.id,
      },
    }
  }

  // create new bookmark group assigned to the current user
  const newBookmarkGroup = await context.prisma.bookmarkGroup.create({
    ...query,
    data,
  })

  return newBookmarkGroup
}

export default resolveCreateBookmarkGroup
