import Link from 'next/link'
import Image from 'next/image'

export function WaitForEmailPage() {
  return (
    <div className="w-[400px] max-w-full">
      <div className="flex justify-center mb-4">
        <Image
          src="/media/auth/wait-for-email.svg"
          alt="Wait for email envelop"
          width={200}
          height={200}
        />
      </div>
      <h1 className="font-koulen text-5xl text-center mb-2">Check your email</h1>
      <h2 className="text-center mb-12">
        We have sent a password recover instructions to your email.
      </h2>
      <p className="text-center">
        Did not receive the email? Check your spam or
        <br />
        <Link href="/auth/forgot-password" className="text-primary underline">
          try another email address
        </Link>
      </p>
    </div>
  )
}

export default WaitForEmailPage
