type LayoutProps = React.PropsWithChildren<{}>

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className="flex items-center justify-center min-h-screen">{children}</main>
}

export default Layout
