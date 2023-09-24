'use client'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MdCreateNewFolder } from 'react-icons/md'
import IconButton from '@mui/material/IconButton'

import { BookmarkGroupSearch } from '@/bookmarks/components/BookmarkGroupSearch'
import { BookmarkTree } from '@/components/BookmarkTree'
import { GQL_BookmarkGroupsQuery } from '@/graphql/generated'

import { useBookmarkGroupTreeToolbox } from './hooks/useBookmarkGroupTreeToolbox'

export interface BookmarkGroupTreeProps {
  bookmarkGroups: GQL_BookmarkGroupsQuery['bookmarkGroups']
}

export function BookmarkGroupTree({ bookmarkGroups }: BookmarkGroupTreeProps) {
  const toolbox = useBookmarkGroupTreeToolbox(bookmarkGroups)

  return (
    <>
      <div className="flex gap-2 items-center mb-2">
        <BookmarkGroupSearch />
        <IconButton className="!rounded" onClick={() => toolbox.tree.createInput(0)}>
          <MdCreateNewFolder />
        </IconButton>
      </div>
      <BookmarkTree
        ref={toolbox.tree.ref}
        tree={toolbox.tree.tree}
        onDrop={toolbox.tree.updateBookmarkGroupParent}
        onSelect={toolbox.tree.selectBookmarkGroup}
        inputProps={{
          onSubmit: toolbox.tree.submitInput,
          onCancel: toolbox.tree.resetBookmarkGroupTree,
          placeholder: 'New folder',
        }}
        emptyProps={{
          onCreate: () => toolbox.tree.createInput(0),
        }}
        moreProps={{
          onClick: toolbox.menu.openMenu,
        }}
      />
      <Menu
        anchorEl={toolbox.menu.anchor?.target}
        open={!!toolbox.menu.anchor?.target}
        onClose={toolbox.menu.closeMenu}
      >
        <MenuItem onClick={toolbox.menu.addBookmarkGroup}>Add Bookmark Group</MenuItem>
        <MenuItem onClick={toolbox.menu.renameBookmarkGroup}>Rename Bookmark Group</MenuItem>
        <MenuItem onClick={toolbox.menu.deleteBookmarkGroup}>Delete Bookmark Group</MenuItem>
      </Menu>
    </>
  )
}

export default BookmarkGroupTree
