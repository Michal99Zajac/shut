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
  const toolbox = useBookmarkGroupTreeToolbox(
    bookmarkGroups.edges.map((edge) => ({
      id: edge.node.id,
      parent: edge.node.parent?.id ?? 0,
      text: edge.node.name,
      droppable: true,
      data: {
        selected: false,
      },
    })),
  )

  return (
    <>
      <Button sx={{ mb: '16px' }} onClick={() => toolbox.tree.onInputCreate(0)} variant="contained">
        Add Bookmark Group
      </Button>
      <BookmarkTree
        ref={toolbox.tree.ref}
        tree={toolbox.tree.tree}
        onDrop={(newTree) => toolbox.tree.setTree(newTree)}
        onSelect={toolbox.tree.onSelect}
        inputProps={{
          onSubmit: toolbox.tree.onInputSubmit,
          onCancel: toolbox.tree.onCancel,
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
        <MenuItem onClick={toolbox.menu.onMenuCreateNewGroup}>Add Bookmark Group</MenuItem>
        <MenuItem onClick={() => alert(toolbox.menu.anchor?.target.id)}>My account</MenuItem>
        <MenuItem onClick={() => alert(toolbox.menu.anchor?.target.id)}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default BookmarkGroupTree
