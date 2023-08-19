import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'
import { CookieService } from '#/common/service/CookieService'

interface Args {}

/**
 * GraphQL resolver to handle the user sign-out process.
 * This involves removing the user's access token from cookies.
 *
 * @param _ Parent
 * @param __ Args
 * @param context AuthContext
 * @returns The ID of the user who has been signed out
 */
export const resolveSignOut = async (_: Parent, __: Args, context: AuthContext) => {
  const { user } = context

  // prepare services
  const cookizer = new CookieService()

  // remove access token from cookies
  cookizer.removeAccess()

  return user.id
}

export default resolveSignOut
