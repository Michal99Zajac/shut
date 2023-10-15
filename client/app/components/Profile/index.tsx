'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useMeSuspenseQuery } from '@/api/graphql/ssr'
import { config } from '@/config'

interface ProfileProps {
  className?: string
}

// TODO: clear cache with every logout

export function Profile({ className }: ProfileProps) {
  const {
    data: { me },
  } = useMeSuspenseQuery()

  const src = me.profileUrl || config.profile.defaultPicture

  return (
    <Image src={src} alt="avatar" width={36} height={36} className={clsx('rounded', className)} />
  )
}

export default Profile
