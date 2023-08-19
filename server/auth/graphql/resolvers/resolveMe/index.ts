import { Parent } from '#/common/types/Parent'
import { Query } from '#/common/types/Query'
import { AuthContext } from '#/graphql/context'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

interface Args {}

interface MeQuery extends Query {
  include?: Prisma.UserInclude<DefaultArgs>
  select?: Prisma.UserSelect<DefaultArgs>
}

/**
 * GraphQL resolver for retrieving the current authenticated user's data.
 *
 * @param query MeQuery
 * @param _ Parent
 * @param __ Args
 * @param context AuthContext
 * @returns The authenticated user's data
 */
export const resolveMe = async (query: MeQuery, _: Parent, __: Args, context: AuthContext) => {
  // spit out user id
  const { id } = context.user

  // get user from database
  const user = await context.prisma.user.findFirstOrThrow({ ...query, where: { id } })

  return user
}
