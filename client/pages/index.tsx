'use client'

import { BookmarkGroupTree } from '@/bookmarks/components/BookmarkGroupTree'
import {
  GQL_BookmarkGroupsQuery,
  GQL_BookmarkGroupsQueryVariables,
  BookmarkGroupsDocument,
} from '@/graphql/generated'
import { useSuspenseQuery } from '@apollo/client'

import { useQuery } from '@/hooks/useQuery'

interface Query {
  qGroup: string
  bookmarkGroupId: string
}

export function RootPage() {
  const query = useQuery<Query>()
  const { data } = useSuspenseQuery<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>(
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
