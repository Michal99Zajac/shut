import jwt from 'jsonwebtoken'

import { config } from '#/config'

/**
 * Decode JWT token.
 *
 * @param token - The token.
 * @param mode - The mode to decode the token in.
 * @returns The decoded token.
 */
export const decodeToken = (token: string, mode: 'access' | 'refresh') => {
  const { secret } = config.jwt[mode]

  return jwt.verify(token, secret) as { userId: string }
}

export default decodeToken
