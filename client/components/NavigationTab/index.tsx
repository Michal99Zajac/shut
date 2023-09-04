import { ActiveLink } from '@/components/ActiveLink'

interface NavigationTabProps {
  /**
   * The URL the navigation tab points to.
   */
  href: string
}

/**
 * A navigation tab component that uses the ActiveLink component
 * to apply specific styles based on the active state.
 * This component is placed inside header.
 */
export function NavigationTab({ href, children }: React.PropsWithChildren<NavigationTabProps>) {
  return (
    <ActiveLink
      href={href}
      className="border-b-2 font-koulen px-2 hover:bg-primary-50"
      activeClassName="border-primary"
    >
      {children}
    </ActiveLink>
  )
}

export default NavigationTab
