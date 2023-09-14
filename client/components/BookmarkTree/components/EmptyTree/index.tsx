import { Button } from '@mui/material'
import { MdCreateNewFolder } from 'react-icons/md'
import { BsFillBookmarkXFill } from 'react-icons/bs'

import classes from './EmptyTree.module.css'

export interface EmptyTreeProps {
  onCreate?: () => void
}

export function EmptyTree({ onCreate }: EmptyTreeProps) {
  return (
    <div className={classes.root}>
      <span className={classes.icon}>
        <BsFillBookmarkXFill />
      </span>
      <Button variant="outlined" size="large" onClick={onCreate} startIcon={<MdCreateNewFolder />}>
        Create Group
      </Button>
    </div>
  )
}

export default EmptyTree
