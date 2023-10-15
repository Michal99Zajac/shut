import { GoogleUser, User } from '@prisma/client'

import { Context } from '#/graphql/context'

export type Parent = User & { googleUser?: GoogleUser }

export interface Args {}

/**
 * Resolves the profile url of the user.
 *
 * @param parent Parent
 * @param args Args
 * @param context Context
 * @returns Profile url or null
 */
export const resolveProfileUrl = async (parent: Parent, args: any, context: Context) => {
  // If user is logged with google, return the google profile url
  if (parent.googleUser) {
    return parent.googleUser.picture
  }

  return null
}

export default resolveProfileUrl
