import { BookmarkGroup } from '@prisma/client'

/**
 * Returns the path of the given bookmark group.
 *
 * @param bookmarkGroup Bookmark group with parent
 * @returns Path of the given bookmark group
 */
export const getBookmarkGroupPath = (
  bookmarkGroup: BookmarkGroup & { parent?: BookmarkGroup | null },
): string[] => {
  if (!bookmarkGroup.parent) {
    return [bookmarkGroup.name]
  }

  return [bookmarkGroup.name, ...getBookmarkGroupPath(bookmarkGroup.parent)]
}

export default getBookmarkGroupPath
