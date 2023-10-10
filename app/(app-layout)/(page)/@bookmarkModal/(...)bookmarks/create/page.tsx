import type { Metadata } from 'next'

import { CreateBookmarkPage, CreateBookmarkPageProps } from '@/pages/bookmarks/create'

export const metadata: Metadata = {
  title: 'Shut | Create Bookmark',
}

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default (props: CreateBookmarkPageProps) => <CreateBookmarkPage {...props} isModal />
