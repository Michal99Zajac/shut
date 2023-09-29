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
import Link from 'next/link'

import { BookmarkGroupSearch } from '@/bookmarks/components/BookmarkGroupSearch'
import { useQuery } from '@/hooks/useQuery'
import BookmarkSearch from '@/bookmarks/components/BookmarkSearch'
import BookmarksTable from '@/bookmarks/components/BookmarksTable'
import { useBookmarkGroupTreeToolbox } from '@/bookmarks/hooks/useBookmarkGroupTreeToolbox'
import useBookmarksFilter from '@/bookmarks/hooks/useBookmarksFilter'

interface Query {
  bookmarkGroupQuery: string
  bookmarkGroupId: string
  bookmarkQuery: string
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
          query: query.query.bookmarkGroupQuery,
        },
      },
      fetchPolicy: 'cache-and-network',
    },
  )
  const bookmarksFilter = useBookmarksFilter({
    query: {
      bookmarkGroupId: query.query.bookmarkGroupId,
      bookmarkQuery: query.query.bookmarkQuery,
    },
    bookmarkGroups: bookmarkGroups,
  })
  const {
    data: { bookmarks },
  } = useSuspenseQuery<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>(BookmarksDocument, {
    variables: {
      filter: bookmarksFilter,
    },
    fetchPolicy: 'cache-and-network',
  })
  const bookmarkGroupsToolbox = useBookmarkGroupTreeToolbox(bookmarkGroups)

  return (
    <>
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
          <div className="gap-2 flex mb-2">
            <BookmarkSearch />
            <Link href="/create-bookmark?isModal=true">
              <IconButton size="large" className="!rounded">
                <MdCreateNewFolder />
              </IconButton>
            </Link>
          </div>
          <BookmarksTable bookmarks={bookmarks} />
        </section>
      </div>
    </>
  )
}

export default RootPage
