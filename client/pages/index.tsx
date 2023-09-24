'use client'

import { BookmarkGroupTree } from '@/bookmarks/components/BookmarkGroupTree'
import {
  GQL_BookmarkGroupsQuery,
  GQL_BookmarkGroupsQueryVariables,
  GQL_BookmarksQuery,
  GQL_BookmarksQueryVariables,
  BookmarksDocument,
  BookmarkGroupsDocument,
} from '@/graphql/generated'
import { useSuspenseQuery } from '@apollo/client'

import { useQuery } from '@/hooks/useQuery'
import BookmarkSearch from '@/bookmarks/components/BookmarkSearch'
import BookmarksTable from '@/bookmarks/components/BookmarksTable'

interface Query {
  qGroup: string
  bookmarkGroupId: string
}

export function RootPage() {
  const query = useQuery<Query>()
  const {
    data: { bookmarkGroups },
  } = useSuspenseQuery<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>(
    BookmarkGroupsDocument,
    {
      variables: {
        filter: {
          query: query.query.qGroup,
        },
      },
      fetchPolicy: 'cache-and-network',
    },
  )
  const {
    data: { bookmarks },
  } = useSuspenseQuery<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>(BookmarksDocument)

  return (
    <>
      <h1 className="font-koulen text-4xl">Dashboard</h1>
      <p className="text-gray-500">Welcome to your dashboard!</p>
      <div className="grid grid-cols-dashboard gap-4">
        <aside>
          <BookmarkGroupTree bookmarkGroups={bookmarkGroups} />
        </aside>
        <section>
          <BookmarkSearch className="!mb-2" />
          <BookmarksTable bookmarks={bookmarks} />
        </section>
      </div>
    </>
  )
}

export default RootPage
