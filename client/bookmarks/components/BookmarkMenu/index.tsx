import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/navigation'
import { BiEdit, BiTrash } from 'react-icons/bi'

import { useDeleteBookmarkMutation } from '@/graphql/generated'

export type AnchorEl = {
  target: HTMLElement
  id: string
}
export interface BookmarkMenuProps {
  anchorEl: AnchorEl | null
  onClose: () => void
}

export function BookmarkMenu({ anchorEl, onClose }: BookmarkMenuProps) {
  const router = useRouter()
  const [deleteBookmark] = useDeleteBookmarkMutation({
    refetchQueries: ['Bookmarks', 'BookmarkGroups'],
  })

  const handleDelete = () => {
    if (!anchorEl) return null

    deleteBookmark({
      variables: {
        id: anchorEl.id,
      },
      onCompleted: onClose,
    })
  }

  return (
    <Menu anchorEl={anchorEl?.target} open={!!anchorEl?.target} onClose={onClose}>
      <MenuItem
        sx={{ width: '200px' }}
        onClick={() => {
          router.push(`/bookmarks/bookmark/${anchorEl?.id}`)
          onClose()
        }}
      >
        <ListItemIcon>
          <BiEdit />
        </ListItemIcon>
        <ListItemText>Update bookmark</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <BiTrash />
        </ListItemIcon>
        <ListItemText>Delete bookmark</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default BookmarkMenu
