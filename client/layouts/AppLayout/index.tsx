'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/navigation'

import { NavigationTab } from '@/components/NavigationTab'

const signOutMutation = gql`
  mutation SignOut {
    signOut
  }
`

export function AppLayout({ children }: React.PropsWithChildren) {
  const { handleSubmit } = useForm()
  const [signOut, { loading }] = useMutation(signOutMutation)
  const router = useRouter()

  const onSubmit = handleSubmit(() => {
    signOut({
      onCompleted: () => {
        router.push('/auth/signin')
      },
    })
  })

  return (
    <>
      <header className="flex items-center justify-between p-4 mb-6">
        <Image src="/shut-logo.svg" alt="logo" width={32} height={42} />
        <div className="flex gap-2 items-center">
          <div className="inline-block mr-4">
            <NavigationTab href="/">Dashboard</NavigationTab>
            <NavigationTab href="/settings">Settings</NavigationTab>
          </div>
          <Image
            src="/develop/avatar.jpeg"
            alt="avatar"
            width={36}
            height={36}
            className="rounded"
          />
          <form onSubmit={onSubmit}>
            <Button variant="text" type="submit" disabled={loading}>
              Sign Out
            </Button>
          </form>
        </div>
      </header>
      <main className="px-4">{children}</main>
    </>
  )
}

export default AppLayout
