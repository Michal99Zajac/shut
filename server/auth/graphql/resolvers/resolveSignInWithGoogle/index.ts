import { OAuth2Client } from 'google-auth-library'
import { GraphQLError } from 'graphql'

import { config } from '#/config'
import { CryptoService } from '#/secure/services/CryptoService'
import { googleTokenPayloadSchema } from '#/auth/schemas/GoogleTokenPayload'
import { googleAccessDataSchema } from '#/auth/schemas/GoogleAccessData'
import Parent from '#/common/types/Parent'
import Query from '#/common/types/Query'
import { Context } from '#/graphql/context'
import InputShape from '#/common/types/InputShape'
import CookieService from '#/common/service/CookieService'
import AuthenticationService from '#/auth/services/AuthenticationService'

import { OAuthCodeInput } from '../../inputs/OAuthCodeInput'

interface Args {
  input: InputShape<typeof OAuthCodeInput>
}

/**
 * Resolver for the signInWithGoogle mutation. Sign in with Google.
 *
 * @param query Query
 * @param parent Parent
 * @param args Args
 * @param context Context
 * @returns user id if successful otherwise throws an error
 */
export const resolveSignInWithGoogle = async (
  query: Query,
  parent: Parent,
  args: Args,
  context: Context,
) => {
  // prepare the crypto service
  const cryptoService = new CryptoService()
  const cookizer = new CookieService()
  const authenticator = new AuthenticationService(context.prisma)

  const url = new URL('/', context.req.url)
  const oauth = new OAuth2Client({
    clientId: config.oauth.google.clientId,
    clientSecret: config.oauth.google.clientSecret,
    redirectUri: url.origin,
  })

  try {
    // decode the code
    const { tokens } = await oauth.getToken(args.input.code)

    const { id_token: idToken, ...accessData } = tokens

    if (!idToken) throw new Error('Getting id token failed')

    // parse the access data
    const parsedAccessData = googleAccessDataSchema.parse(accessData)

    // verify the id token and get the ticket
    const ticket = await oauth.verifyIdToken({
      idToken,
    })

    // get the payload from the ticket
    const tokenPayload = ticket.getPayload()

    if (!tokenPayload) throw new Error('Get payload failed')

    // parse the token payload
    const parsedTokenPayload = googleTokenPayloadSchema.parse(tokenPayload)

    // encrypt the access data
    const { content, iv } = cryptoService.encrypt(parsedAccessData)

    // mark the user as confirmed because they have signed in with Google

    const user = await context.prisma.user.upsert({
      ...query,
      where: {
        email: parsedTokenPayload.email,
      },
      create: {
        email: parsedTokenPayload.email,
        confirmed: true,
        googleUser: {
          connectOrCreate: {
            where: {
              email: parsedTokenPayload.email,
            },
            create: {
              email: parsedTokenPayload.email,
              locale: parsedTokenPayload.locale,
              picture: parsedTokenPayload.picture,
              familyName: parsedTokenPayload.family_name,
              givenName: parsedTokenPayload.given_name,
              name: parsedTokenPayload.name,
              googleToken: {
                create: {
                  data: content,
                  iv,
                },
              },
            },
          },
        },
      },
      update: {
        confirmed: true,
        googleUser: {
          upsert: {
            where: {
              email: parsedTokenPayload.email,
            },
            create: {
              email: parsedTokenPayload.email,
              locale: parsedTokenPayload.locale,
              picture: parsedTokenPayload.picture,
              familyName: parsedTokenPayload.family_name,
              givenName: parsedTokenPayload.given_name,
              name: parsedTokenPayload.name,
              googleToken: {
                create: {
                  data: content,
                  iv,
                },
              },
            },
            update: {
              email: parsedTokenPayload.email,
              locale: parsedTokenPayload.locale,
              picture: parsedTokenPayload.picture,
              familyName: parsedTokenPayload.family_name,
              givenName: parsedTokenPayload.given_name,
              name: parsedTokenPayload.name,
              googleToken: {
                update: {
                  data: content,
                  iv,
                },
              },
            },
          },
        },
      },
    })

    // get session token
    const session = await authenticator.encode(user)

    // grant access
    cookizer.access(session)

    return user
  } catch (error) {
    throw new GraphQLError('Google OAuth failed')
  }
}

export default resolveSignInWithGoogle
