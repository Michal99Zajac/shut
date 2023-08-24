import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { Parent } from '#/common/types/Parent'
import { Query } from '#/common/types/Query'
import { AuthContext } from '#/graphql/context'
import { AuthenticationService } from '#/auth/services/AuthenticationService'
import { CookieService } from '#/common/service/CookieService'

interface Args {}

interface RefreshAccessQuery extends Query {
  include?: Prisma.UserInclude<DefaultArgs>
  select?: Prisma.UserSelect<DefaultArgs>
}

/**
 * GraphQL resolver to refresh the access token for a user.
 *
 * @param query Query
 * @param __ Parent
 * @param ___ Args
 * @param context AuthContext
 * @returns Refreshed user object
 */
export const resolveRefreshAccess = async (
  query: RefreshAccessQuery,
  __: Parent,
  ___: Args,
  context: AuthContext,
) => {
  const { user } = context

  // prepare services
  const authenticator = new AuthenticationService(context.prisma)
  const cookizer = new CookieService()

  // get new access token
  const session = await authenticator.encode(user)

  // set new access token in cookies
  cookizer.access(session)

  // get user from database
  const refreshedUser = await context.prisma.user.findFirstOrThrow({
    ...query,
    where: { id: user.id },
  })

  return refreshedUser
}

export default resolveRefreshAccess
