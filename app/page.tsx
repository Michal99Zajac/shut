import Button from '@mui/material/Button'
import Link from 'next/link'

import classes from '@/styles/Root.module.css'

const bookmarks = Array(10).fill(0)

const Page: Client.Page = () => {
  return (
    <div>
      <div className={classes.bookmarkGrid}>
        {bookmarks.map((_, index) => (
          <div key={index} className={classes.bookmark} />
        ))}
      </div>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <h1 className="font-koulen text-4xl sm:text-8xl text-center text-white mb-6">
          Your bookmarks
          <br />
          everywhere, always
        </h1>
        <div className="bg-white p-2 rounded-lg w-[240px]">
          <Button LinkComponent={Link} href="/app" fullWidth>
            Start using
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
