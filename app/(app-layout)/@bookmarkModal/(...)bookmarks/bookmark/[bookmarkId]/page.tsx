import {
  UpdateBookmarkPage,
  UpdateBookmarkPageProps,
} from '@/pages/bookmarks/bookmark/[bookmarkId]'

type UpdateBookmarkModalPageProps = Omit<UpdateBookmarkPageProps, 'isModal'>

const UpdateBookmarkModalPage = (props: UpdateBookmarkModalPageProps) => (
  <UpdateBookmarkPage {...props} isModal />
)

export default UpdateBookmarkModalPage
