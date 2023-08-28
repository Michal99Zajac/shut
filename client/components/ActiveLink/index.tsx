'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

type NextLinkProps = React.PropsWithChildren<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps &
    React.RefAttributes<HTMLAnchorElement>
>

interface ActiveLinkProps extends NextLinkProps {
  /**
   * Optional: A CSS class to be applied when the link is active.
   */
  activeClassName?: string
}

/**
 * ActiveLink component
 * A wrapper around the Next.js Link component that applies an "active" class name
 * to the link element when the current location matches the href.
 */
export function ActiveLink({
  href,
  children,
  activeClassName,
  className,
  ...defaultProps
}: ActiveLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link {...defaultProps} href={href} className={clsx(className, isActive && activeClassName)}>
      {children}
    </Link>
  )
}

export default ActiveLink
