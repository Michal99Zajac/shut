'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { BiCog, BiSolidDashboard } from 'react-icons/bi'

import { useMeSuspenseQuery } from '@/api/graphql/ssr'
import { config } from '@/config'
import SignOutMenuItem from '@/auth/components/SignOutMenuItem'

interface ProfileMenuProps {
  className?: string
}

/**
 * Profile menu to show the user's avatar and a menu to navigate to the dashboard and settings.
 */
export function ProfileMenu({ className }: ProfileMenuProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const {
    data: { me },
  } = useMeSuspenseQuery()
  const src = me.profileUrl || config.profile.defaultPicture

  return (
    <>
      <Image
        src={src}
        alt="avatar"
        width={36}
        height={36}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        onKeyDown={(e) => e.key === 'Enter' && setAnchorEl(e.currentTarget)}
        tabIndex={0}
        className={clsx(
          'rounded cursor-pointer transition-shadow hover:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] ',
          className,
        )}
      />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => router.push('/app')}>
          <ListItemIcon>
            <BiSolidDashboard />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => router.push('/app/settings')}>
          <ListItemIcon>
            <BiCog />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <SignOutMenuItem />
      </Menu>
    </>
  )
}

export default ProfileMenu
