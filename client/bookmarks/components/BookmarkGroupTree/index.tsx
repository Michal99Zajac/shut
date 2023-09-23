'use client'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { BookmarkTree, BookmarkTreeNode } from '@/components/BookmarkTree'

import { useBookmarkGroupTreeToolbox } from './hooks/useBookmarkGroupTreeToolbox'

const SampleData: BookmarkTreeNode[] = [
  // {
  //   id: 1,
  //   parent: 0,
  //   text: 'Folder 1',
  //   droppable: true,
  //   data: {
  //     selected: false,
  //   },
  // },
  // {
  //   id: 2,
  //   parent: 0,
  //   text: 'Folder 2',
  //   droppable: true,
  //   data: {
  //     selected: false,
  //   },
  // },
  // {
  //   id: 3,
  //   parent: 2,
  //   text: 'Folder 2-1',
  //   droppable: true,
  //   data: {
  //     selected: false,
  //   },
  // },
]

export function BookmarkGroupTree() {
  const toolbox = useBookmarkGroupTreeToolbox(SampleData)

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
