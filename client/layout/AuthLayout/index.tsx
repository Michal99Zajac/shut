export interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex flex-row w-full h-full">
      <section className="bg-primary w-1/2 p-8">
        <h1 className="font-koulen text-8xl text-white">
          Save it!
          <br />
          Keep it!
        </h1>
      </section>
      <section className="w-1/2 p-8 flex flex-col justify-center items-center">{children}</section>
    </main>
  )
}

export default AuthLayout
