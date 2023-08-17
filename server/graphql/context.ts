import { User, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { headers } from 'next/headers'

import { prisma } from '#/db'
import decodeAccessToken from '#/auth/utils/decodeAccessToken'
import dismantleAuthHeader from '#/auth/utils/dismantleAuthHeader'

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
  const context: Context = {
    req,
    res,
    prisma,
    user: null,
  }

  // Get authorization header
  const headersList = headers()
  const authHeader = headersList.get('Authorization')

  // Get token from authorization header
  const token = dismantleAuthHeader(authHeader)

  // Decode token and get user
  if (token) {
    const decoded = decodeAccessToken(token)

    const user = await prisma.user.findFirst({ where: { id: decoded.userId } })
    context.user = user
  }

  return context
}
