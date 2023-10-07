import { GoogleUser, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma, PrismaClient } from '#/db'
import { CookieService } from '#/common/service/CookieService'

import AuthenticationService from '../auth/services/AuthenticationService'

export interface Context {
  user: (User & { googleUser: GoogleUser | null }) | null
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
}

export interface AuthContext extends Context {
  user: User & { googleUser: GoogleUser | null }
}

export interface GoogleAuthContext extends Context {
  user: User & { googleUser: GoogleUser }
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
  const session = cookizer.get('session')

  // If access token exists, decode it, set user in context and refresh cookie
  if (session) {
    // decode token
    const user = await authenticator.decode(session.value)

    // set user in context
    context.user = user
  }

  return context
}
