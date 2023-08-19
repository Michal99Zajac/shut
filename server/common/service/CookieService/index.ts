import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'

import { config } from '#/config'

export class CookieService {
  protected cookie: ReadonlyRequestCookies

  constructor() {
    this.cookie = cookies()
  }

  access(token: string) {
    const expires = new Date(Date.now() + config.jwt.access.options.expiresIn * 1000) // 7 days in milliseconds

    this.cookie.set('accessToken', token, {
      httpOnly: true,
      secure: config.node.env === 'production',
      expires: expires,
    })
  }

  removeAccess() {
    this.cookie.delete('accessToken')
  }
}

export default CookieService
