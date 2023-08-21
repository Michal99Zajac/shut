import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Koulen } from 'next/font/google'
import clsx from 'clsx'

// install fonts
export const roboto = Roboto({ subsets: ['latin'], weight: ['400'], variable: '--font-roboto' })
export const koulen = Koulen({ subsets: ['latin'], weight: ['400'], variable: '--font-koulen' })

// set metadata
export const metadata: Metadata = {
  title: 'Shut - ',
  description: 'Shut is a universal safe for your bookmarks. Save once and have everywhere.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className, roboto.variable, koulen.variable)}>{children}</body>
    </html>
  )
}
