import { NextRequest, NextResponse } from 'next/server'

import { config } from '#/config'
import { prisma } from '#/db'
import AuthenticationService from '#/auth/services/AuthenticationService'

export const GET = async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return new Response('Token not found', { status: 400 })
  }

  // start auth service
  const authenticator = new AuthenticationService(prisma)

  // decode token
  try {
    const user = await authenticator.decodeShort(token, 'VERIFY')

    // change user status
    await prisma.user.update({
      where: { id: user.id },
      data: { confirmed: true },
    })

    // redirect to login page
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  } catch (error) {
    return new Response('Token or user is invalid', { status: 400 })
  }
}
