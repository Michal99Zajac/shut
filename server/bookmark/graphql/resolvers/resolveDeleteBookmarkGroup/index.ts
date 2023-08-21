import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

interface Args {
  id: string | number
}

/**
 * Delete a bookmark group by ID.
 *
 * @param _ Parent
 * @param args Args
 * @param context AuthContext
 * @returns ID of the deleted bookmark group
 */
export const resolveDeleteBookmarkGroup = async (_: Parent, args: Args, context: AuthContext) => {
  const { id } = args

  try {
    const deletedBookmarkGroup = await context.prisma.bookmarkGroup.delete({
      where: { id: id.toString(), user: { id: context.user.id } },
    })

    return deletedBookmarkGroup.id
  } catch (error) {
    throw new Error('Delete bookmark group failed')
  }
}

export default resolveDeleteBookmarkGroup
