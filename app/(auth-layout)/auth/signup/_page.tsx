'use client'

import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useSignUpMutation } from '@/graphql/generated'
import { signUpInputSchema, SignUpInputSchema } from '@/auth/schemas/SignUpInputSchema'

export const Page = () => {
  const router = useRouter()
  const [signUp, { loading }] = useSignUpMutation()
  const { register, handleSubmit, setError, formState } = useForm<SignUpInputSchema>({
    resolver: zodResolver(signUpInputSchema),
  })

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.repeatedPassword) {
      setError('password', { message: 'Passwords do not match' }, { shouldFocus: true })
      setError('repeatedPassword', { message: 'Passwords do not match' })

      // stop exec the submit
      return
    }

    signUp({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
      onCompleted: () => {
        router.push('/auth/signin')
      },
    })
  })

  return (
    <form onSubmit={onSubmit} className="w-[400px] max-w-full">
      <h1 className="font-koulen text-5xl mb-2">Sign Up</h1>
      <h2 className="mb-8">Shut it all down in one place!</h2>
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
        error={Boolean(formState.errors.email)}
        helperText={formState.errors.email?.message}
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
        error={Boolean(formState.errors.password)}
        helperText={formState.errors.password?.message}
      />
      <TextField
        {...register('repeatedPassword')}
        fullWidth
        label="Repeat Password"
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
        Sign Up
      </Button>
      <p className="text-right text-sm my-2">
        Do you already have an account?{' '}
        <Link href="/auth/signin" className="text-primary underline">
          Sign In!
        </Link>
      </p>
    </form>
  )
}

export default Page
