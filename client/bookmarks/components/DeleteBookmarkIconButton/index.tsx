import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { BiTrash } from 'react-icons/bi'
import Tooltip from '@mui/material/Tooltip'

import { useDeleteBookmarkMutation } from '@/graphql/generated'

interface DeleteBookmarkIconButtonProps {
  bookmarkId: string
  onDeleted?: () => void
  size?: IconButtonProps['size']
}

export function DeleteBookmarkIconButton({
  bookmarkId,
  size = 'small',
  onDeleted,
}: DeleteBookmarkIconButtonProps) {
  const [deleteBookmark] = useDeleteBookmarkMutation({
    refetchQueries: ['Bookmarks', 'BookmarkGroups'],
  })

  const handleDelete = () => {
    deleteBookmark({
      variables: {
        id: bookmarkId,
      },
      onCompleted: onDeleted,
    })
  }

  return (
    <Tooltip title="Delete bookmark">
      <IconButton size={size} className="!rounded" onClick={handleDelete}>
        <BiTrash />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteBookmarkIconButton
