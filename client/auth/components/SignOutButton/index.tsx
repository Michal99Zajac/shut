'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'

import { useSignOutMutation } from '@/graphql/generated'

/**
 * Button to sign out the user. It will redirect to the sign in page.
 */
export function SignOutButton() {
  const { handleSubmit } = useForm()
  const [signOut, { loading, client }] = useSignOutMutation()
  const router = useRouter()

  const onSubmit = handleSubmit(() => {
    signOut({
      onCompleted: async () => {
        await client.clearStore()
        router.push('/auth/signin')
      },
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <Button variant="outlined" type="submit" disabled={loading}>
        Sign Out
      </Button>
    </form>
  )
}

export default SignOutButton
