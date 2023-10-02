import { GraphQLError } from 'graphql'

import Parent from '#/common/types/Parent'
import InputShape from '#/common/types/InputShape'
import { Context } from '#/graphql/context'
import AuthenticationService from '#/auth/services/AuthenticationService'

import { ResetForgottenPasswordInput } from '../../inputs/ResetForgottenPasswordInput'

interface Args {
  input: InputShape<typeof ResetForgottenPasswordInput>
}

/**
 * Resolver for the resetForgottenPassword mutation. Reset the password of a user.
 *
 * @param parent Parent
 * @param args Args
 * @param context Context
 * @returns true if successful otherwise throws an error
 */
export const resolveResetForgottenPassword = async (
  parent: Parent,
  args: Args,
  context: Context,
) => {
  const { input } = args

  // prepare services
  const authenticator = new AuthenticationService(context.prisma)

  try {
    const user = await authenticator.decodeShort(input.token, 'RESET')
    await context.prisma.user.changePassword(user.id, input.password)
  } catch (error) {
    throw new GraphQLError('Password reset failed')
  }

  return true
}

export default resolveResetForgottenPassword
