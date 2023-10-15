'use client'

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { AiOutlineClose } from 'react-icons/ai'
import { BiFolder, BiFolderOpen } from 'react-icons/bi'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { usePathname, useRouter } from 'next/navigation'

import {
  CreateBookmarkInputSchema,
  createBookmarkInputSchema,
} from '@/bookmarks/schemas/CreateBookmarkInputSchema'
import { MegaDialog } from '@/components/MegaDialog'
import { SlideTransition } from '@/components/SlideTransition'
import { useUpdateBookmarkMutation } from '@/graphql/generated'
import DeleteBookmarkIconButton from '@/bookmarks/components/DeleteBookmarkIconButton'
import { useBookmarkGroupsSuspenseQuery, useBookmarkSuspenseQuery } from '@/api/graphql/ssr'

export const Page: Client.Page<{ bookmarkId: string }> = ({ params }) => {
  const { bookmarkId } = params
  const pathname = usePathname()
  const router = useRouter()
  const [updateBookmark] = useUpdateBookmarkMutation({
    refetchQueries: ['Bookmarks', 'Bookmark', 'BookmarkGroups'],
  })
  const { data: bookmark } = useBookmarkSuspenseQuery({
    variables: {
      id: bookmarkId,
    },
    fetchPolicy: 'cache-and-network',
  })
  const {
    data: { bookmarkGroups },
  } = useBookmarkGroupsSuspenseQuery({
    fetchPolicy: 'cache-and-network',
  })
  const { register, handleSubmit, formState, control } = useForm<CreateBookmarkInputSchema>({
    resolver: zodResolver(createBookmarkInputSchema),
    defaultValues: {
      bookmarkGroupId: bookmark.bookmark.bookmarkGroup.id,
      url: bookmark.bookmark.url,
      friendlyName: bookmark.bookmark.friendlyName,
    },
  })

  const onSubmit = handleSubmit((data) => {
    updateBookmark({
      variables: {
        id: bookmarkId,
        input: {
          bookmarkGroupId: data.bookmarkGroupId,
          friendlyName: data.friendlyName,
          url: data.url,
        },
      },
      onCompleted: () => {
        closeDialog()
      },
    })
  })

  const closeDialog = () => {
    router.push('/')
  }

  return (
    <MegaDialog
      sx={{
        '.MuiPaper-root': {
          width: '520px',
        },
      }}
      isMega
      closeAfterTransition={false}
      TransitionComponent={SlideTransition}
      open={pathname === `/bookmarks/bookmark/${bookmarkId}`}
      onClose={closeDialog}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle className="!font-koulen">Update Bookmark</DialogTitle>
        <IconButton
          aria-label="close"
          size="medium"
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
          }}
          onClick={closeDialog}
        >
          <AiOutlineClose />
        </IconButton>
        <DialogContent>
          <TextField
            className="!mb-4"
            {...register('friendlyName')}
            label="Friendly Name"
            fullWidth
            required
            FormHelperTextProps={{
              className: '!text-red-500',
            }}
            helperText={formState.errors.friendlyName?.message}
          />
          <TextField
            className="!mb-4"
            {...register('url')}
            label="URL"
            required
            fullWidth
            FormHelperTextProps={{
              className: '!text-red-500',
            }}
            helperText={formState.errors.url?.message}
          />
          <div>
            <FormControl fullWidth>
              <InputLabel id="bookmark-group-label">Bookmark Group</InputLabel>
              <Controller
                control={control}
                name="bookmarkGroupId"
                render={({ field }) => (
                  <Select
                    labelId="bookmark-group-label"
                    fullWidth
                    required
                    label="Bookmark Group"
                    inputProps={field}
                  >
                    {bookmarkGroups.map((bookmarkGroup) => (
                      <MenuItem
                        sx={{
                          paddingInlineStart: `${12 * bookmarkGroup.depth + 16}px`,
                        }}
                        key={bookmarkGroup.id}
                        value={bookmarkGroup.id}
                      >
                        <div className="flex gap-2 items-center">
                          {!bookmarkGroup.parent?.id ? <BiFolderOpen /> : <BiFolder />}
                          <span>{bookmarkGroup.name}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.bookmarkGroupId?.message && (
                <FormHelperText>{formState.errors.bookmarkGroupId?.message}</FormHelperText>
              )}
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className="!flex !justify-between">
          <DeleteBookmarkIconButton bookmarkId={bookmarkId} size="medium" onDeleted={closeDialog} />
          <Button size="large" type="submit">
            Update bookmark
          </Button>
        </DialogActions>
      </form>
    </MegaDialog>
  )
}

export default Page
