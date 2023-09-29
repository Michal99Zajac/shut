import { GQL_BookmarkGroupsQuery } from '@/graphql/generated'

/**
 * TODO: add comments
 *
 * @param rootBookmarkGroupId
 * @param bookmarkGroups
 */
export const maxBookmarkGroupDepth = (
  rootBookmarkGroupId: string | number,
  bookmarkGroups: GQL_BookmarkGroupsQuery['bookmarkGroups'],
) => {
  const getDepth = (parentIds: (string | number)[]): number => {
    // check if parents have any children
    const children = bookmarkGroups.filter(
      (bookmarkGroup) => bookmarkGroup.parent?.id && parentIds.includes(bookmarkGroup.parent.id),
    )

    // there aren't any leafs
    if (children.length <= 0) return 0

    // recursive get depth
    return getDepth(children.map((child) => child.id)) + 1
  }

  return getDepth([rootBookmarkGroupId])
}

export default maxBookmarkGroupDepth
