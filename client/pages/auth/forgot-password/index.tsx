'use client'

import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { sleep } from '@/common/utils/sleep'
import { passwordRequestSchema, PasswordRequestSchema } from '@/auth/schemas/passwordRequestSchema'

export function ForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<PasswordRequestSchema>({
    resolver: zodResolver(passwordRequestSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    await sleep(2000)
    router.push('/auth/forgot-password/wait-for-email')
    setLoading(false)
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
        disabled={loading}
      />
      <Button
        fullWidth
        type="submit"
        disabled={loading}
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

export default ForgotPasswordPage
