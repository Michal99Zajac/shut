import IconButton from '@mui/material/IconButton'
import { BiTrash } from 'react-icons/bi'

import { useDeleteBookmarkMutation } from '@/graphql/generated'

interface DeleteBookmarkIconButtonProps {
  bookmarkId: string
}

export function DeleteBookmarkIconButton({ bookmarkId }: DeleteBookmarkIconButtonProps) {
  const [deleteBookmark] = useDeleteBookmarkMutation({
    refetchQueries: ['Bookmarks'],
  })

  const handleDelete = () => {
    deleteBookmark({
      variables: {
        id: bookmarkId,
      },
    })
  }

  return (
    <IconButton size="small" className="!rounded" onClick={handleDelete}>
      <BiTrash />
    </IconButton>
  )
}

export default DeleteBookmarkIconButton
