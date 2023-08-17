import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'

import { Context } from '#/graphql/context'
import InputShape from '#/common/types/InputShape'
import Parent from '#/common/types/Parent'
import config from '#/config'

import { SignUpInput } from '../../inputs/SignUpInput'

interface Args {
  input: InputShape<typeof SignUpInput>
}

/**
 * Resolver for the signUp mutation. Create a new user and return its id.
 *
 * @param _ Parent
 * @param args Args
 * @param context Context
 * @returns SignedUpResponse
 */
export const resolveSignUp = async (_: Parent, args: Args, context: Context) => {
  const { email, password } = args.input

  // Check if user already exists
  let user = await context.prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) throw new GraphQLError('User already exists')

  const hashedPassword = await bcrypt.hash(password, config.secure.saltRounds)

  // User does not exist, create it
  user = await context.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  // Return user id
  return {
    id: user.id,
  }
}

export default resolveSignUp
