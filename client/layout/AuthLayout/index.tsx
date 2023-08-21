export interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex flex-row w-full h-full">
      <section className="bg-primary w-1/2 p-8"></section>
      <section className="w-1/2 p-8">{children}</section>
    </main>
  )
}

export default AuthLayout
