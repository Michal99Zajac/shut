import { GraphQLError } from 'graphql'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import InputShape from '#/common/types/InputShape'
import Parent from '#/common/types/Parent'
import Query from '#/common/types/Query'
import { Context } from '#/graphql/context'
import AuthenticationService from '#/auth/services/AuthenticationService'
import CookieService from '#/common/service/CookieService'

import SignInInput from '../../inputs/SignInInput'

interface Args {
  input: InputShape<typeof SignInInput>
}

interface SignInQuery extends Query {
  include?: Prisma.UserInclude<DefaultArgs>
  select?: Prisma.UserSelect<DefaultArgs>
}

/**
 * Resolves the sign-in process for a GraphQL query.
 *
 * @param query Query
 * @param _ Parent
 * @param args Args
 * @param context Context
 * @returns Authenticated user object or throws a GraphQL error
 */
export const resolveSignIn = async (
  query: SignInQuery,
  _: Parent,
  args: Args,
  context: Context,
) => {
  // prepare service
  const authenticator = new AuthenticationService(context.prisma)
  const cookizer = new CookieService()

  const { email, password } = args.input

  try {
    // authenticate user
    const authenticatedUser = await authenticator.authenticate(email, password)

    // encode access token
    const accessToken = await authenticator.encode(authenticatedUser)

    // set access token cookie
    cookizer.access(accessToken)

    // get full user from database
    const user = await context.prisma.user.findFirstOrThrow({
      ...query,
      where: { id: authenticatedUser.id },
    })

    return user
  } catch (error) {
    const message = (error as any).message || 'Something went wrong'
    throw new GraphQLError(message)
  }
}

export default resolveSignIn
