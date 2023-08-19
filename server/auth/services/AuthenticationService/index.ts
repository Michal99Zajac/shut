import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { config } from '#/config'
import { decodedAccessToken } from '#/auth/models/DecodedAccessToken'
import { CommonService } from '#/common/service/CommonService'

/**
 * Provides authentication services such as login, encoding, and decoding JWT.
 */
export class AuthenticationService extends CommonService {
  /**
   * Authenticates a user based on their email and password.
   *
   * @param email User's email
   * @param password User's password
   * @returns Authenticated user or throws an error if not found/mismatch
   */
  async authenticate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    // check if user exists
    if (!user) throw new Error('User with this email does not exist')

    // check if user has password
    if (!user.password) {
      throw new Error('User has other type of login')
    }

    // check if password is correct
    const isCorrect = await bcrypt.compare(password, user.password)
    if (!isCorrect) {
      throw new Error('Incorrect password')
    }

    return user
  }

  /**
   * Decodes a JWT access token to fetch the user.
   *
   * @param accessToken JWT access token
   * @returns User associated with the token or throws an error if invalid token
   */
  async decode(accessToken: string) {
    // prepare variables
    const { secret } = config.jwt.access
    let userId: string

    // verify access token and its structure
    try {
      const decoded = decodedAccessToken.parse(jwt.verify(accessToken, secret))
      userId = decoded.userId
    } catch (error) {
      throw new Error('Access token is expired or invalid')
    }

    // get user from database
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    // check if user exists
    if (!user) throw new Error('User does not exist')

    return user
  }

  /**
   * Generates a JWT access token for a user.
   *
   * @param user User object
   * @returns JWT access token
   */
  async encode(user: User) {
    // preapre variables
    const jwtAccess = config.jwt.access

    // encode access token
    const accessToken = jwt.sign({ userId: user.id }, jwtAccess.secret, jwtAccess.options)

    return accessToken
  }
}

export default AuthenticationService
