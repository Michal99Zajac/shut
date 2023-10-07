import type { Metadata } from 'next'

import {
  UpdateBookmarkPage,
  UpdateBookmarkPageProps,
} from '@/pages/bookmarks/bookmark/[bookmarkId]'

export const metadata: Metadata = {
  title: 'Shut | Update Bookmark',
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (props: UpdateBookmarkPageProps) => <UpdateBookmarkPage {...props} isModal />
