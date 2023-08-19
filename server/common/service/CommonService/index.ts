import { PrismaClient } from '@prisma/client'

/**
 * Basic service class. Provides integrated access to Prisma database client.
 */
export class CommonService {
  protected prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }
}

export default CommonService
