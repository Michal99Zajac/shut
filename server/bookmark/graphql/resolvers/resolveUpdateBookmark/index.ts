import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'

import { InputShape } from '#/common/types/InputShape'
import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

import { UpdateBookmarkInput } from '../../inputs/UpdateBookmarkInput'

interface UpdateBookmarkQuery extends Query {
  include?: Prisma.BookmarkInclude<DefaultArgs>
  select?: Prisma.BookmarkSelect<DefaultArgs>
}

interface Args {
  id: string | number
  input: InputShape<typeof UpdateBookmarkInput>
}

/**
 * Resolver for updaing a bookmark
 *
 * @param query UpdateBookmarkQuery
 * @param _ Parent
 * @param args Args
 * @param context AuthContext
 * @returns Updated bookmark object
 */
export const resolveUpdateBookmark = async (
  query: UpdateBookmarkQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  const { input, id } = args

  try {
    const updatedBookmark = context.prisma.bookmark.update({
      ...query,
      where: {
        id: id.toString(),
        user: {
          id: context.user.id,
        },
      },
      data: {
        bookmarkGroupId: input.bookmarkGroupId?.toString() || undefined,
        friendlyName: input.friendlyName || undefined,
        url: input.url || undefined,
        description: input.description || undefined,
      },
    })

    return updatedBookmark
  } catch (error) {
    console.error(error)
    throw new GraphQLError('Bookmark update failed')
  }
}

export default resolveUpdateBookmark
