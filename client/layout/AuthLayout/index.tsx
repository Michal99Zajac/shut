export interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex flex-row w-full h-full">
      <section className="bg-red-500 w-1/2"></section>
      <section className="w-1/2">{children}</section>
    </main>
  )
}

export default AuthLayout
