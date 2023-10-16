'use client'

import Image from 'next/image'
import Link from 'next/link'
import useMedia from 'react-use/lib/useMedia'
import dynamic from 'next/dynamic'

import SignOutButton from '@/auth/components/SignOutButton'
import Profile from '@/app/components/Profile'

const ProfileMenu = dynamic(() => import('@/app/components/ProfileMenu'), {
  loading: () => <div className="w-9 h-9 rounded bg-gray-100" />,
})

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isSmallScreen = useMedia('(max-width: 768px)')

  return (
    <>
      <header className="flex items-center justify-between p-4 mb-2">
        <Image src="/shut-logo.svg" alt="logo" width={32} height={42} />
        <div className="hidden md:flex gap-2 items-center">
          <div className="inline-block">
            <Link
              className="font-koulen px-2 py-1 rounded-md hover:bg-primary hover:bg-opacity-5"
              href="/app"
            >
              Dashboard
            </Link>
            <Link
              href="/app/settings"
              className="font-koulen px-2 py-1 rounded-md hover:bg-primary hover:bg-opacity-5"
            >
              Settings
            </Link>
          </div>
          <Profile />
          <SignOutButton />
        </div>
        {isSmallScreen && <ProfileMenu />}
      </header>
      <main className="p-4">{children}</main>
    </>
  )
}

export default Layout
