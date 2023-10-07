'use client'

import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { signInInputSchema, SignInInputSchema } from '@/auth/schemas/SignInInputSchema'
import { useSignInMutation } from '@/graphql/generated'
import { GoogleLoginButton } from '@/auth/components/GoogleLoginButton'

export const SignInPage = () => {
  const router = useRouter()
  const [signIn, { loading }] = useSignInMutation()
  const { register, handleSubmit } = useForm<SignInInputSchema>({
    resolver: zodResolver(signInInputSchema),
  })

  const onSubmit = handleSubmit((data) => {
    signIn({
      variables: {
        input: data,
      },
      onCompleted: () => {
        router.push('/')
      },
    })
  })

  return (
    <form onSubmit={onSubmit} className="w-[400px] max-w-full">
      <h1 className="font-koulen text-5xl mb-2">Sign In</h1>
      <h2 className="mb-8">Welcome back! Sign in to your account!</h2>
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
      <TextField
        {...register('password')}
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        size="medium"
        variant="outlined"
        required
        disabled={loading}
      />
      <div className="text-right">
        <Link href="/auth/forgot-password" className="text-sm text-gray-500 my-2 underline">
          Forgot password?
        </Link>
      </div>
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
        Are you new here?{' '}
        <Link href="/auth/signup" className="text-primary underline">
          Sign Up!
        </Link>
      </p>
      <hr className="my-4" />
      <GoogleLoginButton />
    </form>
  )
}

export default SignInPage
