'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

import SecureForm from '@/settings/components/SecureForm'
import DeleteAccountButton from '@/settings/components/DeleteAccountButton'

const Page: Client.Page = () => {
  return (
    <>
      <h1 className="font-koulen text-4xl">Settings</h1>
      <Breadcrumbs aria-label="breadcrumb" className="!mb-6">
        <Link href="/" className="font-koulen hover:underline">
          SHUT
        </Link>
        <p className="font-koulen">Settings</p>
      </Breadcrumbs>
      <div className="flex justify-center">
        <div className="w-[640px] max-w-full">
          <h2 className="font-koulen text-3xl mb-2">Secure</h2>
          <p className="mb-4">
            Set a new password. Changing your password will not log you out on other devices.
          </p>
          <SecureForm />
          <hr className="my-8" />
          <div className="p-4 rounded-md border-solid border-2 border-red-500 bg-red-100">
            <h2 className="font-koulen text-3xl mb-6">Danger Zone</h2>
            <h3 className="font-koulen text-xl mb-2">Delete Account</h3>
            <p className="mb-4">
              Permanently remove your Personal Account and all of its contents from the{' '}
              <span className="font-koulen">SHUT</span>. This action is not reversible, so please
              continue with caution.
            </p>
            <DeleteAccountButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
