import { GraphQLError } from 'graphql'
import { OAuth2Client } from 'google-auth-library'

import CookieService from '#/common/service/CookieService'
import config from '#/config'
import { googleTokenPayloadSchema } from '#/auth/schemas/GoogleTokenPayload'
import { Parent } from '#/common/types/Parent'
import { InputShape } from '#/common/types/InputShape'
import { GoogleAuthContext } from '#/graphql/context'

import OAuthCodeInput from '../../inputs/OAuthCodeInput'

interface Args {
  input: InputShape<typeof OAuthCodeInput>
}

/**
 * Resolver for the deleteAccountWithGoogle mutation. Delete the account of a user.
 *
 * @param parent Parent
 * @param args Args
 * @param context GoogleAuthContext
 * @returns user id if successful otherwise throws an error
 */
export const resolveDeleteAccountWithGoogle = async (
  parent: Parent,
  args: Args,
  context: GoogleAuthContext,
) => {
  // prepare service
  const cookizer = new CookieService()

  // prepare google oauth
  const oauth = new OAuth2Client({
    clientId: config.oauth.google.clientId,
    clientSecret: config.oauth.google.clientSecret,
    redirectUri: config.oauth.google.redirectUri,
  })

  try {
    // decode the code
    const { tokens } = await oauth.getToken(args.input.code)

    const { id_token: idToken } = tokens

    if (!idToken) throw new Error('Getting id token failed')

    // verify the id token and get the ticket
    const ticket = await oauth.verifyIdToken({
      idToken,
    })

    // get the payload from the ticket
    const tokenPayload = ticket.getPayload()

    if (!tokenPayload) throw new Error('Get payload failed')

    // parse the token payload
    const parsedTokenPayload = googleTokenPayloadSchema.parse(tokenPayload)

    // check if emails match
    if (parsedTokenPayload.email !== context.user.googleUser.email)
      throw new Error('Emails do not match')

    // delete the user
    const deletedUser = await context.prisma.user.delete({
      where: {
        id: context.user.id,
      },
    })

    // log out the user
    cookizer.removeAccess()

    return deletedUser.id
  } catch (error) {
    throw new GraphQLError('Account deletion failed')
  }
}

export default resolveDeleteAccountWithGoogle
