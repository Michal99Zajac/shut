'use client'

import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'

import { useDeleteAccountWithGoogleMutation } from '@/graphql/generated'

export function GoogleDeleteAccountButton() {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [deleteAccount, { loading, client }] = useDeleteAccountWithGoogleMutation({
    onError: () => {
      setIsError(true)
    },
    onCompleted: async () => {
      await client.clearStore()
      router.push('/auth/signin')
    },
  })
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      await deleteAccount({
        variables: {
          input: {
            code: codeResponse.code,
          },
        },
      })
    },
    onError: (error) => {
      console.error(error)
      setIsError(true)
    },
  })

  return (
    <>
      <Button
        startIcon={<FcGoogle />}
        disabled={loading}
        className="!font-roboto !text-black !border-blue-100 hover:!bg-blue-50"
        fullWidth
        variant="outlined"
        size="large"
        onClick={login}
      >
        Delete account
      </Button>
      <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}>
        <Alert onClose={() => setIsError(false)} severity="error" sx={{ width: '100%' }}>
          Google confirmation has failed
        </Alert>
      </Snackbar>
    </>
  )
}

export default GoogleDeleteAccountButton
