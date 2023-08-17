import { User } from '@prisma/client'

/**
 * Response from a successful authentication
 */
export class AuthenticatedResponse {
  /**
   * Access token
   */
  accessToken!: string
  /**
   * Refresh token
   */
  refreshToken!: string
  /**
   * Authenticated user
   */
  user!: User
}

export default AuthenticatedResponse
