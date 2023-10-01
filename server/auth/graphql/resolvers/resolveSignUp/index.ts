import { GraphQLError } from 'graphql'
import { SendTemplatedEmailCommand } from '@aws-sdk/client-ses'

import { ses } from '#/aws/ses'
import { Context } from '#/graphql/context'
import InputShape from '#/common/types/InputShape'
import Parent from '#/common/types/Parent'
import { config } from '#/config'
import AuthenticationService from '#/auth/services/AuthenticationService'

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
 * @returns user id
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

  // sign up user
  user = await context.prisma.user.signUp(email, password)

  try {
    const authenticator = new AuthenticationService(context.prisma)

    // generate token
    const token = await authenticator.encodeShort(user, 'VERIFY')

    const command = new SendTemplatedEmailCommand({
      Source: `SHUT <${config.aws.sender}>`,
      Destination: {
        ToAddresses: [config.aws.sender], // FIXME: change to correct addesss
      },
      Template: 'shut-confirm-email',
      TemplateData: JSON.stringify({
        email: user.email,
        confirmLink: `${config.server.url}/api/auth/confirm-email?token=${token}`,
      }),
    })

    ses.send(command)
  } catch (error) {
    throw new GraphQLError('Email send went wrong')
  }

  // Return user id
  return user.id
}

export default resolveSignUp
