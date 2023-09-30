import { BookmarkGroup } from '@prisma/client'

import { Context } from '#/graphql/context'
import { generateBookmarkGroupInclude } from '#/bookmark/utils/generateBookmarkGroupInclude'
import { getBookmarkGroupPath } from '#/bookmark/utils/getBookmarkGroupPath'

type Parent = BookmarkGroup

interface Args {}

/**
 * GraphQL resolver for retrieving the path of a bookmark group.
 *
 * @param bookmarkGroup Parent
 * @param _ Args
 * @param context Context
 * @returns Path of the given bookmark group
 */
export const resolveBookmarkGroupPath = async (
  bookmarkGroup: Parent,
  _: Args,
  context: Context,
) => {
  if (!bookmarkGroup.parentId) {
    return bookmarkGroup.name
  }

  // Get the nested bookmark group
  const nestedBookmarkGroup = await context.prisma.bookmarkGroup.findFirstOrThrow({
    where: {
      id: bookmarkGroup.id,
    },
    include: generateBookmarkGroupInclude(bookmarkGroup.depth),
  })

  // Generate the path
  return getBookmarkGroupPath(nestedBookmarkGroup).join(' / ')
}

export default resolveBookmarkGroupPath
