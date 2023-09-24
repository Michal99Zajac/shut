import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { BookmarkTree } from '@/components/BookmarkTree'
import { BookmarkGroupTreeToolbox } from '@/bookmarks/hooks/useBookmarkGroupTreeToolbox'

import { EmptyTree } from './components/EmptyTree'

export interface BookmarkGroupTreeProps {
  toolbox: BookmarkGroupTreeToolbox
}

export function BookmarkGroupTree({ toolbox }: BookmarkGroupTreeProps) {
  if (toolbox.tree.tree.length === 0)
    return <EmptyTree onCreate={() => toolbox.tree.createInput(0)} />

  return (
    <>
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
