import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'

import { config } from '#/config'

/**
 * Service class for managing cookies.
 */
export class CookieService {
  /**
   * Instance of the Next.js cookie management.
   */
  protected cookie: ReadonlyRequestCookies

  constructor() {
    this.cookie = cookies()
  }

  /**
   * Sets the access token in a cookie with security settings and expiration.
   *
   * @param token JWT access token
   */
  access(token: string) {
    const expires = new Date(Date.now() + config.jwt.access.options.expiresIn * 1000) // 7 days in milliseconds

    this.cookie.set('accessToken', token, {
      httpOnly: true,
      secure: config.node.env === 'production',
      expires: expires,
    })
  }

  /**
   * Removes the access token from cookies.
   */
  removeAccess() {
    this.cookie.delete('accessToken')
  }
}

export default CookieService
