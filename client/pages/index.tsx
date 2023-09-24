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
import { MdCreateNewFolder } from 'react-icons/md'
import IconButton from '@mui/material/IconButton'

import { BookmarkGroupSearch } from '@/bookmarks/components/BookmarkGroupSearch'
import { useQuery } from '@/hooks/useQuery'
import BookmarkSearch from '@/bookmarks/components/BookmarkSearch'
import BookmarksTable from '@/bookmarks/components/BookmarksTable'
import { useBookmarkGroupTreeToolbox } from '@/bookmarks/hooks/useBookmarkGroupTreeToolbox'
import Link from 'next/link'

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
  const bookmarkGroupsToolbox = useBookmarkGroupTreeToolbox(bookmarkGroups)

  return (
    <>
      <Link href="/create-bookmark" scroll={false}>
        Create Bookmark
      </Link>
      <h1 className="font-koulen text-4xl">Dashboard</h1>
      <p className="text-gray-500">Welcome to your dashboard!</p>
      <div className="grid grid-cols-dashboard gap-4">
        <aside>
          <div className="flex gap-2 items-center mb-2">
            <BookmarkGroupSearch />
            <IconButton
              className="!rounded"
              onClick={() => bookmarkGroupsToolbox.tree.createInput(0)}
            >
              <MdCreateNewFolder />
            </IconButton>
          </div>
          <BookmarkGroupTree toolbox={bookmarkGroupsToolbox} />
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
