'use client'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useChangePasswordMutation } from '@/graphql/generated'
import {
  ChangePasswordInputSchema,
  changePasswordInputSchema,
} from '@/settings/schemas/ChangePasswordInputSchema'

/**
 * Form to change the password of the user.
 */
export function SecureForm() {
  const [changePassword, { loading: isChangePasswordLoading }] = useChangePasswordMutation()
  const { setError, handleSubmit, reset, formState, register } = useForm<ChangePasswordInputSchema>(
    {
      resolver: zodResolver(changePasswordInputSchema),
    },
  )

  const onSubmit = handleSubmit(async (data) => {
    if (data.newPassword !== data.repeatedNewPassword) {
      setError('newPassword', { message: 'Passwords do not match' }, { shouldFocus: true })
      setError('repeatedNewPassword', { message: 'Passwords do not match' })

      // stop exec the submit
      return
    }

    await changePassword({
      variables: {
        input: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      },
      onCompleted: () => {
        reset()
      },
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Password"
        type="password"
        className="!mb-4"
        fullWidth
        placeholder="password"
        required
        disabled={isChangePasswordLoading}
        error={Boolean(formState.errors.oldPassword)}
        helperText={formState.errors.oldPassword?.message}
        {...register('oldPassword')}
      />
      <TextField
        label="New password"
        type="password"
        className="!mb-4"
        fullWidth
        placeholder="new password"
        required
        disabled={isChangePasswordLoading}
        error={Boolean(formState.errors.newPassword)}
        helperText={formState.errors.newPassword?.message}
        {...register('newPassword')}
      />
      <TextField
        label="Repeated new password"
        type="password"
        className="!mb-4"
        fullWidth
        placeholder="password"
        required
        disabled={isChangePasswordLoading}
        error={Boolean(formState.errors.repeatedNewPassword)}
        helperText={formState.errors.repeatedNewPassword?.message}
        {...register('repeatedNewPassword')}
      />
      <div className="text-right">
        <Button
          size="medium"
          type="submit"
          disabled={!formState.isDirty || isChangePasswordLoading}
          variant="contained"
        >
          Update
        </Button>
      </div>
    </form>
  )
}

export default SecureForm
