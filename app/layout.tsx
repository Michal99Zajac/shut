import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Koulen } from 'next/font/google'
import clsx from 'clsx'

import { ThemeRegistry } from '@/theme/ThemeRegistry'
import { ApolloProvider } from '@/graphql/client'

// install fonts
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '300', '500', '700'],
  variable: '--font-roboto',
})
export const koulen = Koulen({ subsets: ['latin'], weight: ['400'], variable: '--font-koulen' })

// set metadata
export const metadata: Metadata = {
  title: 'Shut',
  description: 'Shut is a universal safe for your bookmarks. Save once and have everywhere.',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className, roboto.variable, koulen.variable)}>
        <ApolloProvider>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </ApolloProvider>
      </body>
    </html>
  )
}
