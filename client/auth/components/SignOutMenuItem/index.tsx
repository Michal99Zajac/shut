import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useRouter } from 'next/navigation'
import { BiLogOut } from 'react-icons/bi'

import { useSignOutMutation } from '@/graphql/generated'

/**
 * Menu item to sign out the user. It will redirect to the sign in page.
 */
export function SignOutMenuItem() {
  const [signOut, { loading }] = useSignOutMutation()
  const router = useRouter()

  const onSubmit = () => {
    signOut({
      onCompleted: () => {
        router.push('/auth/signin')
      },
    })
  }

  return (
    <MenuItem onClick={onSubmit} disabled={loading}>
      <ListItemIcon>
        <BiLogOut />
      </ListItemIcon>
      Sign Out
    </MenuItem>
  )
}

export default SignOutMenuItem
