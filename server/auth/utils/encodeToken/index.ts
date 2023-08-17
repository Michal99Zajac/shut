import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

import config from '#/config'

/**
 * Encode a JWT token
 *
 * @param user User to encode
 * @param mode Mode to encode the token in
 * @returns Encoded token
 */
export const encodeToken = (user: User, mode: 'access' | 'refresh') => {
  const { options, secret } = config.jwt[mode]

  const encodedToken = jwt.sign({ userId: user.id }, secret, options)

  return encodedToken
}

export default encodeToken
