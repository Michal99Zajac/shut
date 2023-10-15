'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useMeSuspenseQuery } from '~/client/api/graphql/ssr'

interface ProfileProps {
  className?: string
}

export function Profile({ className }: ProfileProps) {
  const {
    data: { me },
  } = useMeSuspenseQuery()

  return (
    <Image
      src="/media/profile/picture.png"
      alt="avatar"
      width={36}
      height={36}
      className={clsx('rounded', className)}
    />
  )
}

export default Profile
