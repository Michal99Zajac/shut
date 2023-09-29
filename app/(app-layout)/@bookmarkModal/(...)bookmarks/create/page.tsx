import { CreateBookmarkPage, CreateBookmarkPageProps } from '@/pages/bookmarks/create'

type CreateBookmarkModalPageProps = Omit<CreateBookmarkPageProps, 'isModal'>

const CreateBookmarkModalPage = (props: CreateBookmarkModalPageProps) => (
  <CreateBookmarkPage {...props} isModal />
)

export default CreateBookmarkModalPage
