'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

import { NavigationTab } from '@/components/NavigationTab'
import { useSignOutMutation } from '@/graphql/generated'

type AppLayoutProps = React.PropsWithChildren<{
  bookmarkModal: React.ReactNode
}>

export function AppLayout({ children, bookmarkModal }: AppLayoutProps) {
  const { handleSubmit } = useForm()
  const [signOut, { loading }] = useSignOutMutation()
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
      {bookmarkModal}
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
      <main className="px-6">{children}</main>
    </>
  )
}

export default AppLayout
