'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { config } from '@/config'

const SignInTemplate: React.FC<React.PropsWithChildren> = ({ children }) => {
  if (!config.oauth.google.clientId) throw new Error('Google OAuth Client ID is not set')

  return (
    <GoogleOAuthProvider clientId={config.oauth.google.clientId}>{children}</GoogleOAuthProvider>
  )
}

export default SignInTemplate
