import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'

import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'
import { InputShape } from '#/common/types/InputShape'
import CookieService from '#/common/service/CookieService'

import { DeleteAccountInput } from '../../inputs/DeleteAccountInput'

interface Args {
  input: InputShape<typeof DeleteAccountInput>
}

/**
 *  Resolver for the deleteAccount mutation. Delete the account of a user.
 *
 * @param parent Parent
 * @param args Args
 * @param context AuthContext
 * @returns user id if successful otherwise throws an error
 */
export const resolveDeleteAccount = async (parent: Parent, args: Args, context: AuthContext) => {
  const { input } = args

  // prepare service
  const cookizer = new CookieService()

  if (!context.user.password) throw new GraphQLError('User does not have a password')

  // check if old password is correct
  const isCorrect = await bcrypt.compare(input.password, context.user.password)
  if (!isCorrect) throw new GraphQLError('Password is incorrect')

  try {
    const deletedUser = await context.prisma.user.delete({
      where: {
        id: context.user.id,
      },
    })

    // remove access to resources
    cookizer.removeAccess()

    return deletedUser.id
  } catch (error) {
    throw new GraphQLError('Account deletion failed')
  }
}

export default resolveDeleteAccount
