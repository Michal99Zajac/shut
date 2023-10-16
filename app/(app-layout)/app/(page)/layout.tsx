interface LayoutProps {
  children: React.ReactNode
  bookmarkModal: React.ReactNode
}

const Layout = ({ bookmarkModal, children }: LayoutProps) => {
  return (
    <>
      {bookmarkModal}
      {children}
    </>
  )
}

export default Layout
