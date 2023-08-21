import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'

import { InputShape } from '#/common/types/InputShape'
import { Query } from '#/common/types/Query'
import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

import { CreateBookmarkInput } from '../../inputs/CreateBookmarkInput'

interface CreateBookmarkQuery extends Query {
  include?: Prisma.BookmarkInclude<DefaultArgs>
  select?: Prisma.BookmarkSelect<DefaultArgs>
}

interface Args {
  input: InputShape<typeof CreateBookmarkInput>
}

/**
 * Resolver for creating a bookmark
 *
 * @param query CreateBookmarkQuery
 * @param _ Parent
 * @param args Args
 * @param context AuthContext
 * @returns Newly created bookmark object
 */
export const resolveCreateBookmark = async (
  query: CreateBookmarkQuery,
  _: Parent,
  args: Args,
  context: AuthContext,
) => {
  // prepare data
  const { bookmarkGroupId, ...data } = args.input

  try {
    // create bookmark
    const newBookamark = await context.prisma.bookmark.create({
      ...query,
      data: {
        ...data,
        bookmarkGroupId: bookmarkGroupId.toString(),
        userId: context.user.id,
      },
    })

    return newBookamark
  } catch (error) {
    console.error(error)
    throw new GraphQLError('Bookmark creation failed')
  }
}

export default resolveCreateBookmark
