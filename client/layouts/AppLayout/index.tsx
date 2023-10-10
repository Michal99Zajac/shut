import Image from 'next/image'

import { NavigationTab } from '@/components/NavigationTab'
import SignOutButton from '@/auth/components/SignOutButton'

type AppLayoutProps = React.PropsWithChildren<{
  bookmarkModal: React.ReactNode
}>

export function AppLayout({ children, bookmarkModal }: AppLayoutProps) {
  return (
    <>
      {bookmarkModal}
      <header className="flex items-center justify-between p-4 mb-2">
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
          <SignOutButton />
        </div>
      </header>
      <main className="p-4">{children}</main>
    </>
  )
}

export default AppLayout
