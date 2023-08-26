import classes from './AuthLayout.module.css'

export interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex flex-row w-full h-full">
      <section className="hidden bg-primary w-1/2 p-8 relative md:flex items-center justify-center -z-[1] overflow-hidden">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div key={index} style={{ left: index * 140 }} className={classes.bookmark} />
          ))}
        <h1 className="font-koulen text-8xl text-white">
          Shut it Down
          <br />
          Save it Up!
        </h1>
      </section>
      <section className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
