import Image from 'next/image'
import Link from 'next/link'

import SignOutButton from '@/auth/components/SignOutButton'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="flex items-center justify-between p-4 mb-2">
        <Image src="/shut-logo.svg" alt="logo" width={32} height={42} />
        <div className="flex gap-2 items-center">
          <div className="inline-block mr-4">
            <Link
              className="font-koulen px-2 py-1 rounded-md hover:bg-primary hover:bg-opacity-5"
              href="/"
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="font-koulen px-2 py-1 rounded-md hover:bg-primary hover:bg-opacity-5"
            >
              Settings
            </Link>
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

export default Layout
