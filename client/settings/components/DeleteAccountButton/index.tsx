import {
  Alert,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import SlideTransition from '@/components/SlideTransition'
import GoogleDeleteAccountButton from '@/settings/components/GoogleDeleteAccountButton'
import { useDeleteAccountMutation } from '@/graphql/generated'
import {
  DeleteAccountInputSchema,
  deleteAccountInputSchema,
} from '@/settings/schemas/DeleteAccountInputSchema'

/**
 * Delete account button with modal confirmation.
 * The modal contains two ways to confirm the deletion of the account.
 * 1. Classic confirmation: Enter your password to confirm that you want to delete your account.
 * 2. Google confirmation: Confirm account deletion by signing in with Google.
 */
export function DeleteAccountButton() {
  const router = useRouter()
  const { register, reset, setError, handleSubmit, formState } = useForm<DeleteAccountInputSchema>({
    resolver: zodResolver(deleteAccountInputSchema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const [deleteAccount, { loading: isDeleting }] = useDeleteAccountMutation({
    onCompleted: () => {
      reset()
      setIsOpen(false)
      router.push('/auth/signin')
    },
    onError: (error) => {
      setError('password', {
        message: error.message,
      })
    },
  })

  const onClose = () => setIsOpen(false)

  const onSubmit = handleSubmit(async (data) => {
    await deleteAccount({
      variables: {
        input: {
          password: data.password,
        },
      },
    })
  })

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)} color="error">
        Delete Account
      </Button>
      <Dialog
        PaperProps={{
          className:
            '!max-h-full !max-w-full w-full h-full !m-0 md:h-auto md:!max-w-[540px] md:!m-8 md:!max-h-[calc(100%-64px)]',
        }}
        open={isOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
      >
        <DialogTitle className="!font-koulen">Delete Account</DialogTitle>
        <IconButton
          aria-label="close"
          size="medium"
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
          }}
          onClick={onClose}
        >
          <AiOutlineClose />
        </IconButton>
        <DialogContent>
          <Alert severity="error" className="!bg-red-100">
            <AlertTitle className="!font-koulen">Caution</AlertTitle>
            This action is not reversible, so please continue with caution.
          </Alert>
          <hr className="my-4" />
          <h2 className="font-koulen text-xl">Classic confirmation</h2>
          <p className="mb-4 text-sm">
            Please enter your password to confirm that you want to delete your account.
          </p>
          <form onSubmit={onSubmit}>
            <TextField
              required
              label="Password"
              type="password"
              fullWidth
              className="!mb-4"
              disabled={isDeleting}
              error={Boolean(formState.errors.password)}
              helperText={formState.errors.password?.message as string}
              {...register('password')}
            />
            <div className="text-right">
              <Button
                type="submit"
                size="medium"
                variant="outlined"
                disabled={isDeleting}
                color="error"
              >
                Confirm
              </Button>
            </div>
          </form>
          <hr className="my-4" />
          <h2 className="font-koulen text-xl">Google confirmation</h2>
          <p className="mb-4 text-sm">Confirm account deletion by signing in with Google.</p>
          <GoogleDeleteAccountButton />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteAccountButton
