import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'

import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'
import { InputShape } from '#/common/types/InputShape'

import { ChangePasswordInput } from '../../inputs/ChangePasswordInput'

interface Args {
  input: InputShape<typeof ChangePasswordInput>
}

/**
 * Resolver for the changePassword mutation. Change the password of a user.
 *
 * @param parent Parent
 * @param args Args
 * @param context AuthContext
 * @returns user id if successful otherwise throws an error
 */
export const resolveChangePassword = async (parent: Parent, args: Args, context: AuthContext) => {
  const { input } = args
  const { user } = context

  if (!context.user.password) throw new GraphQLError('User does not have a password')

  // check if old password is correct
  const isCorrect = bcrypt.compare(input.oldPassword, context.user.password)
  if (!isCorrect) throw new GraphQLError('Old password is incorrect')

  // change password
  try {
    await context.prisma.user.changePassword(user.id, input.newPassword)
    return user.id
  } catch (error) {
    throw new GraphQLError('Password change failed')
  }
}

export default resolveChangePassword
