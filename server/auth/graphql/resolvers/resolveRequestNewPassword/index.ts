import { SendTemplatedEmailCommand } from '@aws-sdk/client-ses'

import { Parent } from '#/common/types/Parent'
import { InputShape } from '#/common/types/InputShape'
import { Context } from '#/graphql/context'
import { ses } from '#/aws/ses'
import { config } from '#/config'
import AuthenticationService from '#/auth/services/AuthenticationService'

import { RequestNewPasswordInput } from '../../inputs/RequestNewPasswordInput'
import { GraphQLError } from 'graphql'

interface Args {
  input: InputShape<typeof RequestNewPasswordInput>
}

/**
 * GraphQL resolver to request a new password for a user.
 *
 * @param __ Parent
 * @param ___ Args
 * @param context Context
 * @returns Refreshed user object
 */
export const resolveRequestNewPassword = async (__: Parent, args: Args, context: Context) => {
  const authenticator = new AuthenticationService(context.prisma)

  // find user
  const user = await context.prisma.user.findFirst({ where: { email: args.input.email } })

  // check if user exists
  if (!user) throw new GraphQLError("User with given email doesn't exist")

  // generate reset token
  const token = await authenticator.encodeReset(user)

  const command = new SendTemplatedEmailCommand({
    Source: `SHUT <${config.aws.sender}>`,
    Destination: {
      ToAddresses: [config.aws.sender], // FIXME: change to addesss
    },
    Template: 'shut-reset-password',
    TemplateData: JSON.stringify({
      email: user.email,
      resetLink: `http://localhost:3000/auth/forgot-password/reset-password?token=${token}`,
    }),
  })

  try {
    await ses.send(command)
    return true
  } catch (error) {
    throw new GraphQLError('Email send went wrong')
  }
}

export default resolveRequestNewPassword
