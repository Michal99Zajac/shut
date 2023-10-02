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
import { BiBookmarkPlus, BiFolderPlus } from 'react-icons/bi'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Tooltip from '@mui/material/Tooltip'

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
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/" className="font-koulen hover:underline">
          SHUT
        </Link>
        <p className="font-koulen">Dashboard</p>
      </Breadcrumbs>
      <div className="grid grid-cols-dashboard gap-6 mt-4">
        <aside>
          <div className="flex gap-2 items-center mb-2">
            <BookmarkGroupSearch />
            <Tooltip title="Add group">
              <IconButton
                size="large"
                className="!rounded"
                onClick={() => bookmarkGroupsToolbox.tree.createInput(0)}
              >
                <BiFolderPlus />
              </IconButton>
            </Tooltip>
          </div>
          <BookmarkGroupTree toolbox={bookmarkGroupsToolbox} />
        </aside>
        <section>
          <div className="gap-2 flex mb-2">
            <BookmarkSearch />
            <Tooltip title="Add bookmark">
              <Link href="/bookmarks/create">
                <IconButton size="large" className="!rounded">
                  <BiBookmarkPlus />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
          <BookmarksTable bookmarks={bookmarks} />
        </section>
      </div>
    </>
  )
}

export default RootPage
