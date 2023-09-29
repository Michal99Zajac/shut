import { GQL_BookmarkFilterInput, GQL_BookmarkGroupsQuery } from '@/graphql/generated'
import { useMemo } from 'react'
import maxBookmarkGroupDepth from '@/bookmarks/utils/maxBookmarkGroupDepth'

export interface UseBookmarksFilterProps {
  /**
   *
   */
  query: {
    /**
     *
     */
    bookmarkQuery?: string
    /**
     *
     */
    bookmarkGroupId?: string
  }
  /**
   *
   */
  bookmarkGroups: GQL_BookmarkGroupsQuery['bookmarkGroups']
}

/**
 * TODO: add come comments
 */
export const useBookmarksFilter = ({
  query,
  bookmarkGroups,
}: UseBookmarksFilterProps): GQL_BookmarkFilterInput => {
  const depth = useMemo(() => {
    if (!query.bookmarkGroupId) return 0

    return maxBookmarkGroupDepth(query.bookmarkGroupId, bookmarkGroups)
  }, [query.bookmarkGroupId, bookmarkGroups])

  return useMemo(() => {
    const filter: GQL_BookmarkFilterInput = {}

    if (query.bookmarkQuery) {
      filter.query = query.bookmarkQuery
    }

    if (query.bookmarkGroupId) {
      filter.group = {
        id: query.bookmarkGroupId,
        depth: depth,
      }
    }

    return filter
  }, [query, depth])
}

export default useBookmarksFilter
