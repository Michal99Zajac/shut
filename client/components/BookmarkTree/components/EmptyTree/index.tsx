import { Button } from '@mui/material'
import { MdCreateNewFolder } from 'react-icons/md'
import Image from 'next/image'

import classes from './EmptyTree.module.css'

export interface EmptyTreeProps {
  onCreate?: () => void
}

export function EmptyTree({ onCreate }: EmptyTreeProps) {
  return (
    <div className={classes.root}>
      <Image
        alt="A hand with a phone that has an x icon"
        src="/media/dashboard/empty-bookmark-groups.svg"
        width={300}
        height={300}
        style={{ width: '300px', height: '300px' }}
        className="mb-4 grayscale object-contain"
      />
      <Button
        variant="text"
        className="!text-gray-400"
        size="large"
        onClick={onCreate}
        startIcon={<MdCreateNewFolder />}
      >
        Create Bookmark Group
      </Button>
    </div>
  )
}

export default EmptyTree
