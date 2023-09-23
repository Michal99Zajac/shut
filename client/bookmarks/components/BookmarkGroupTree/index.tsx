'use client'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

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
      <Button sx={{ mb: '16px' }} onClick={() => toolbox.tree.onInputCreate(0)} variant="contained">
        Add Bookmark Group
      </Button>
      <BookmarkTree
        ref={toolbox.tree.ref}
        tree={toolbox.tree.tree}
        onDrop={toolbox.tree.onDrop}
        onSelect={toolbox.tree.onSelect}
        inputProps={{
          onSubmit: toolbox.tree.onInputSubmit,
          onCancel: toolbox.tree.clearInputs,
          placeholder: 'New folder',
        }}
        emptyProps={{
          onCreate: () => toolbox.tree.onInputCreate(0),
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
        <MenuItem onClick={toolbox.menu.onAdd}>Add Bookmark Group</MenuItem>
        <MenuItem onClick={toolbox.menu.onRename}>Rename Bookmark Group</MenuItem>
        <MenuItem onClick={toolbox.menu.onDelete}>Delete Bookmark Group</MenuItem>
      </Menu>
    </>
  )
}

export default BookmarkGroupTree
