'use client'

import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import {
  requestNewPasswordInputSchema,
  RequestNewPasswordInputSchema,
} from '@/auth/schemas/RequestNewPasswordInputSchema'
import { useRequestNewPasswordMutation } from '@/graphql/generated'

export function Page() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<RequestNewPasswordInputSchema>({
    resolver: zodResolver(requestNewPasswordInputSchema),
  })
  const [requestNewPassword, { loading: isLoading }] = useRequestNewPasswordMutation()

  const onSubmit = handleSubmit(async (data) => {
    requestNewPassword({
      variables: {
        input: {
          email: data.email,
        },
      },
      onCompleted: () => {
        router.push('/auth/forgot-password/wait-for-email')
      },
    })
  })

  return (
    <form onSubmit={onSubmit} className="w-[400px] max-w-full">
      <h1 className="font-koulen text-5xl mb-2">Reset password</h1>
      <h2 className="mb-8">
        Enter the email associated with your account and we&apos;ll send an email with instructions
        to reset your password.
      </h2>
      <TextField
        {...register('email')}
        fullWidth
        label="Email"
        margin="normal"
        size="medium"
        type="email"
        variant="outlined"
        required
        disabled={isLoading}
      />
      <Button
        fullWidth
        type="submit"
        disabled={isLoading}
        sx={{ mt: '16px' }}
        size="large"
        variant="contained"
      >
        Send request
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

export default Page
