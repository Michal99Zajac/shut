import type { Metadata } from 'next'

import GoogleDeleteAccountButton from '@/settings/components/GoogleDeleteAccountButton'

export const metadata: Metadata = {
  title: 'Shut | Settings',
}

const SettingsPage: Client.Page = () => {
  return <GoogleDeleteAccountButton />
}

export default SettingsPage
