import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import Link from 'next/link'
import { MdCreateNewFolder } from 'react-icons/md'

export function BookmarksTableEmpty() {
  return (
    <Paper className="!bg-gray-50 !shadow-none !py-10 !px-4 flex flex-col items-center">
      <Image
        alt="A hand with a phone that has an x icon"
        src="/media/dashboard/empty-bookmarks.svg"
        width={300}
        height={300}
        style={{ width: '300px', height: '300px' }}
        className="mb-4 grayscale object-contain"
      />
      <Link href="/bookmarks/create?isModal=true">
        <Button
          variant="text"
          className="!text-gray-400"
          size="large"
          startIcon={<MdCreateNewFolder />}
        >
          Create Bookmark
        </Button>
      </Link>
    </Paper>
  )
}

export default BookmarksTableEmpty
