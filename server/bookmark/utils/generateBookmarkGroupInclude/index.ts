import { Prisma } from '@prisma/client'

/**
 * Generates the include object for retrieving bookmark group with parent.
 *
 * @param depth Depth of the bookmark group
 * @returns Include object for retrieving bookmark group with parent
 */
export const generateBookmarkGroupInclude = (depth: number): Prisma.BookmarkGroupInclude => {
  if (depth === 0)
    return {
      parent: true,
    }

  return {
    parent: {
      include: generateBookmarkGroupInclude(depth - 1),
    },
  }
}

export default generateBookmarkGroupInclude
