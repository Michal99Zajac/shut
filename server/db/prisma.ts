import { PrismaClient as CorePrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import config from '#/config'

export const prisma = new CorePrismaClient().$extends({
  name: 'AppExtend',
  model: {
    user: {
      signUp: async (email: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, config.secure.password.salt)

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        })

        return user
      },
      changePassword: async (id: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, config.secure.password.salt)

        const user = await prisma.user.update({
          where: {
            id,
          },
          data: {
            password: hashedPassword,
          },
        })

        return user
      },
    },
  },
})

export type PrismaClient = typeof prisma
