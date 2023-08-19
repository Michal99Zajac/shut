import { Parent } from '#/common/types/Parent'
import { Query } from '#/common/types/Query'
import { AuthContext } from '#/graphql/context'
import { AuthenticationService } from '#/auth/services/AuthenticationService'
import { CookieService } from '#/common/service/CookieService'

interface Args {}

/**
 * GraphQL resolver to refresh the access token for a user.
 *
 * @param _ Query
 * @param __ Parent
 * @param ___ Args
 * @param context AuthContext
 * @returns Refreshed user object
 */
export const resolveRefreshAccess = async (
  _: Query,
  __: Parent,
  ___: Args,
  context: AuthContext,
) => {
  const { user } = context

  // prepare services
  const authenticator = new AuthenticationService(context.prisma)
  const cookizer = new CookieService()

  // get new access token
  const accessToken = await authenticator.encode(user)

  // set new access token in cookies
  cookizer.access(accessToken)

  return user
}

export default resolveRefreshAccess
