'use client'

import { BookmarkGroupTree } from '@/bookmarks/components/BookmarkGroupTree'
import {
  GQL_BookmarkGroupsQuery,
  GQL_BookmarkGroupsQueryVariables,
  BookmarkGroupsDocument,
} from '@/graphql/generated'
import { useSuspenseQuery } from '@apollo/client'

export function RootPage() {
  const { data } = useSuspenseQuery<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>(
    BookmarkGroupsDocument,
  )

  return (
    <>
      <h1 className="font-koulen text-4xl">Dashboard</h1>
      <p className="text-gray-500">Welcome to your dashboard!</p>
      <div>
        <BookmarkGroupTree bookmarkGroups={data.bookmarkGroups} />
      </div>
    </>
  )
}

export default RootPage
