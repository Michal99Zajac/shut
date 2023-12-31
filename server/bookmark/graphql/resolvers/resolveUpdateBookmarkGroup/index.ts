import type { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Parent } from '#/common/types/Parent'
import { Query } from '#/common/types/Query'
import { InputShape } from '#/common/types/InputShape'
import { AuthContext } from '#/graphql/context'

import { UpdateBookmarkGroupInput } from '../../inputs/UpdateBookmarkGroupInput'

interface UpdateBookmarkGroupQuery extends Query {
  include?: Prisma.BookmarkGroupInclude<DefaultArgs>
  select?: Prisma.BookmarkGroupSelect<DefaultArgs>
}

interface Args {
  id: string | number
  input: InputShape<typeof UpdateBookmarkGroupInput>
}

/**
 * GraphQL resolver for updaing a bookmark group.
 *
 * @param query UpdateBookmarkGroupQuery
 * @param _ Parent
 * @param args Args
 * @param context AuthContext
 * @returns Updated bookmark group
 */
export const resolveUpdateBookmarkGroup = async (
  query: UpdateBookmarkGroupQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  const { input, id } = args

  const data: Prisma.BookmarkGroupUpdateInput = {
    description: input.description === null ? null : input.description,
    name: input.name ? input.name : undefined,
  }

  if (input.parentId === null) {
    data.depth = 0
    data.parent = {
      disconnect: true,
    }
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

  const updatedBookmarkGroup = context.prisma.bookmarkGroup.update({
    ...query,
    where: {
      id: id.toString(),
      user: {
        id: context.user.id,
      },
    },
    data,
  })

  return updatedBookmarkGroup
}

export default resolveUpdateBookmarkGroup
