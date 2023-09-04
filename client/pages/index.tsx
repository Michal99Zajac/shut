import { BookmarkGroupTree } from '@/bookmarks/components/BookmarkGroupTree'

export function RootPage() {
  return (
    <>
      <h1 className="font-koulen text-4xl">Dashboard</h1>
      <p className="text-gray-500">Welcome to your dashboard!</p>
      <div>
        <BookmarkGroupTree />
      </div>
    </>
  )
}

export default RootPage
