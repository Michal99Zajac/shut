'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'

import GoogleDeleteAccountButton from '@/settings/components/GoogleDeleteAccountButton'
import SecureForm from '@/settings/components/SecureForm'

const Page: Client.Page = () => {
  return (
    <>
      <h1 className="font-koulen text-4xl">Settings</h1>
      <Breadcrumbs aria-label="breadcrumb" className="!mb-4">
        <Link href="/" className="font-koulen hover:underline">
          SHUT
        </Link>
        <p className="font-koulen">Settings</p>
      </Breadcrumbs>
      <div className="flex justify-center mb-8">
        <div className="w-[620px]">
          <h2 className="font-koulen text-3xl border-b-2 border-gray-200 border-solid mb-6">
            Profile
          </h2>
          <form>
            <TextField label="Email" className="!mb-4" fullWidth placeholder="email@example.com" />
            <div className="text-right">
              <Button size="large" disabled variant="contained">
                Update
              </Button>
            </div>
          </form>
          <h2 className="font-koulen text-3xl border-b-2 border-gray-200 border-solid mb-4">
            Secure
          </h2>
          <SecureForm />
          <h2 className="font-koulen text-3xl border-b-2 border-gray-200 border-solid mb-4">
            Account
          </h2>
          <GoogleDeleteAccountButton />
        </div>
      </div>
    </>
  )
}

export default Page
