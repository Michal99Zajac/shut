import { NodeModel } from '@minoru/react-dnd-treeview'

/**
 * Generates a tree node that is used as an input node
 *
 * @param parent The parent node id
 * @returns The generated tree node
 */
export const generateTreeInputNode = (
  parent: string | number = 0,
): NodeModel<{ input: boolean }> => ({
  id: new Date().getTime().toString(),
  parent: parent,
  text: '',
  droppable: false,
  data: {
    input: true,
  },
})

export default generateTreeInputNode
