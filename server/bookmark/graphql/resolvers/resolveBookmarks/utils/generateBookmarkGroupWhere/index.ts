import { Prisma } from '@prisma/client'

export type BookmarkGroupWhere = Prisma.BookmarkWhereInput['bookmarkGroup']

/**
 * TODO: Add some comments
 *
 * @param id
 * @param depth
 * @returns
 */
export const generateBookmarkGroupWhere = (
  id: string | number,
  depth: number,
): BookmarkGroupWhere => {
  if (depth <= 0) {
    return { id: id.toString() }
  }

  return {
    OR: [
      { id: id.toString() },
      {
        parent: generateBookmarkGroupWhere(id, depth - 1),
      },
    ],
  }
}

export default generateBookmarkGroupWhere
