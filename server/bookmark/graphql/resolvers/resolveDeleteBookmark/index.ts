import { Parent } from '#/common/types/Parent'
import { AuthContext } from '#/graphql/context'

interface Args {
  id: string | number
}

/**
 * Delete a bookmark  by ID.
 *
 * @param _ Parent
 * @param args Args
 * @param context AuthContext
 * @returns ID of the deleted bookmark
 */
export const resolveDeleteBookmark = async (_: Parent, args: Args, context: AuthContext) => {
  const { id } = args

  try {
    const deletedBookmark = await context.prisma.bookmark.delete({
      where: { id: id.toString(), user: { id: context.user.id } },
    })

    return deletedBookmark.id
  } catch (error) {
    throw new Error('Delete bookmark failed')
  }
}

export default resolveDeleteBookmark
