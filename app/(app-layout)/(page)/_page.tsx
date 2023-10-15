'use client'

import { BiBookmarkPlus, BiChevronLeft, BiFolderPlus, BiMenuAltLeft } from 'react-icons/bi'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Tooltip from '@mui/material/Tooltip'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useState } from 'react'

import { BookmarkGroupSearch } from '@/bookmarks/components/BookmarkGroupSearch'
import { useQuery } from '@/hooks/useQuery'
import BookmarkSearch from '@/bookmarks/components/BookmarkSearch'
import BookmarksTable from '@/bookmarks/components/BookmarksTable'
import { useBookmarkGroupTreeToolbox } from '@/bookmarks/hooks/useBookmarkGroupTreeToolbox'
import useBookmarksFilter from '@/bookmarks/hooks/useBookmarksFilter'
import { BookmarkGroupTree } from '@/bookmarks/components/BookmarkGroupTree'
import { useBookmarkGroupsSuspenseQuery, useBookmarksSuspenseQuery } from '@/api/graphql/ssr'

interface Query {
  bookmarkGroupQuery: string
  bookmarkGroupId: string
  bookmarkQuery: string
}

export const Page: Client.Page = () => {
  const query = useQuery<Query>()
  const [isDrawer, setIsDrawer] = useState(false)
  const {
    data: { bookmarkGroups },
  } = useBookmarkGroupsSuspenseQuery({
    variables: {
      filter: {
        query: query.query.bookmarkGroupQuery,
      },
    },
    fetchPolicy: 'cache-and-network',
  })
  const bookmarksFilter = useBookmarksFilter({
    query: {
      bookmarkGroupId: query.query.bookmarkGroupId,
      bookmarkQuery: query.query.bookmarkQuery,
    },
    bookmarkGroups: bookmarkGroups,
  })
  const {
    data: { bookmarks },
    networkStatus,
    fetchMore: fetchMoreBookmarks,
  } = useBookmarksSuspenseQuery({
    variables: {
      filter: bookmarksFilter,
      first: 20,
    },
    fetchPolicy: 'cache-and-network',
  })
  const bookmarkGroupsToolbox = useBookmarkGroupTreeToolbox(bookmarkGroups)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-koulen text-4xl">Dashboard</h1>
        <Tooltip title="Open bookmark group menu">
          <IconButton
            size="medium"
            onClick={() => setIsDrawer(true)}
            className="!rounded md:!hidden"
          >
            <BiMenuAltLeft />
          </IconButton>
        </Tooltip>
      </div>
      <Breadcrumbs aria-label="breadcrumb" className="!mb-6">
        <Link href="/" className="font-koulen hover:underline">
          SHUT
        </Link>
        <p className="font-koulen">Dashboard</p>
      </Breadcrumbs>
      <div className="grid md:grid-cols-dashboard gap-6">
        <aside className="hidden md:block">
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
          <BookmarksTable
            bookmarks={bookmarks}
            hasMore={bookmarks.pageInfo.hasNextPage}
            loading={networkStatus === 3}
            onLoadMore={() => {
              fetchMoreBookmarks({
                variables: {
                  after: bookmarks.pageInfo.endCursor,
                },
              })
            }}
          />
        </section>
      </div>
      <SwipeableDrawer
        onOpen={() => setIsDrawer(true)}
        anchor="left"
        open={isDrawer}
        onClose={() => setIsDrawer(false)}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <div className="w-screen max-w-lg relative flex flex-col p-6 h-screen">
          <h1 className="font-koulen text-xl mb-9">Bookmark Group</h1>
          <IconButton
            aria-label="close"
            size="medium"
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
            onClick={() => setIsDrawer(false)}
          >
            <BiChevronLeft />
          </IconButton>
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
        </div>
      </SwipeableDrawer>
    </>
  )
}

export default Page
