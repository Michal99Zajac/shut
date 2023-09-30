import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { BiBookmarkPlus, BiFolderMinus, BiFolderPlus, BiRename } from 'react-icons/bi'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/navigation'

import { BookmarkTree } from '@/components/BookmarkTree'
import { BookmarkGroupTreeToolbox } from '@/bookmarks/hooks/useBookmarkGroupTreeToolbox'

import { EmptyTree } from './components/EmptyTree'

export interface BookmarkGroupTreeProps {
  toolbox: BookmarkGroupTreeToolbox
}

export function BookmarkGroupTree({ toolbox }: BookmarkGroupTreeProps) {
  const router = useRouter()

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
        <MenuItem sx={{ width: '200px' }} onClick={toolbox.menu.addBookmarkGroup}>
          <ListItemIcon>
            <BiFolderPlus />
          </ListItemIcon>
          <ListItemText>Add</ListItemText>
        </MenuItem>
        <MenuItem onClick={toolbox.menu.renameBookmarkGroup}>
          <ListItemIcon>
            <BiRename />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(`/bookmarks/create?bookmarkGroupId=${toolbox.menu.anchor?.id}`)
            toolbox.menu.closeMenu()
          }}
        >
          <ListItemIcon>
            <BiBookmarkPlus />
          </ListItemIcon>
          <ListItemText>Add Bookmark</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={toolbox.menu.deleteBookmarkGroup}>
          <ListItemIcon>
            <BiFolderMinus />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default BookmarkGroupTree
