import { User, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '#/db'
import { CookieService } from '#/common/service/CookieService'

import AuthenticationService from '../auth/services/AuthenticationService'

export interface Context {
  user: User | null
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
}

export interface AuthContext extends Context {
  user: User
}

export const buildContext = async (req: NextApiRequest, res: NextApiResponse) => {
  // preapre services
  const cookizer = new CookieService()
  const authenticator = new AuthenticationService(prisma)

  // prepare default context values
  const context: Context = {
    req,
    res,
    prisma,
    user: null,
  }

  // Get access token from cookies
  const accessToken = cookizer.get('accessToken')

  // If access token exists, decode it, set user in context and refresh cookie
  if (accessToken) {
    // decode token
    const user = await authenticator.decode(accessToken.value)

    // set user in context
    context.user = user
  }

  return context
}
