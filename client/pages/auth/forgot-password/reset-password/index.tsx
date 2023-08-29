'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { resetPasswordSchema, ResetPasswordSchema } from '@/auth/schemas/resetPasswordSchema'
import { sleep } from '@/utils/sleep'

export function ResetPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, setError, formState } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.repeatedPassword) {
      setError('password', { message: 'Passwords do not match' }, { shouldFocus: true })
      setError('repeatedPassword', { message: 'Passwords do not match' })

      // stop exec the submit
      return
    }

    setLoading(true)
    await sleep(2000)
    router.push('/auth/signin')
    setLoading(false)
  })

  return (
    <form className="w-[400px]" onSubmit={onSubmit}>
      <h1 className="font-koulen text-5xl mb-2">Create new password</h1>
      <h2 className="mb-8">Your new password must be different from previous used password.</h2>
      <TextField
        {...register('password')}
        fullWidth
        label="Password"
        margin="normal"
        size="medium"
        type="password"
        variant="outlined"
        required
        disabled={loading}
        error={Boolean(formState.errors.password)}
        helperText={formState.errors.password?.message}
      />
      <TextField
        {...register('repeatedPassword')}
        fullWidth
        label="Confirm password"
        type="password"
        margin="normal"
        size="medium"
        variant="outlined"
        required
        disabled={loading}
        error={Boolean(formState.errors.repeatedPassword)}
        helperText={formState.errors.repeatedPassword?.message}
      />
      <Button
        disabled={loading}
        fullWidth
        type="submit"
        sx={{ mt: '16px' }}
        size="large"
        variant="contained"
      >
        Sign In
      </Button>
      <p className="text-right text-sm my-2">
        However, do you remember the password?{' '}
        <Link href="/auth/signin" className="text-primary underline">
          Sign In!
        </Link>
      </p>
    </form>
  )
}

export default ResetPasswordPage
