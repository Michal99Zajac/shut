import jwt from 'jsonwebtoken'

import { config } from '#/config'

/**
 * Decodes an access token.
 *
 * @param token - The access token.
 * @returns The decoded access token.
 */
export const decodeAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.access.secret) as { userId: string }
}

export default decodeAccessToken
