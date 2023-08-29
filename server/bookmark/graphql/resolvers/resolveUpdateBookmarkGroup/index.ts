import { Prisma } from '@prisma/client'
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

  const updatedBookmarkGroup = context.prisma.bookmarkGroup.update({
    ...query,
    where: {
      id: id.toString(),
      user: {
        id: context.user.id,
      },
    },
    data: {
      description: input.description === null ? undefined : input.description,
      name: input.name === null ? undefined : input.name,
      parent: {
        connect: {
          id: input.parentId === null ? undefined : input.parentId?.toString(),
        },
      },
    },
  })

  return updatedBookmarkGroup
}

export default resolveUpdateBookmarkGroup
