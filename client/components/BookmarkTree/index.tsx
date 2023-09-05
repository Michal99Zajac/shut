'use client'

import { DndProvider } from 'react-dnd'
import {
  Tree as DnDTree,
  DropOptions,
  getBackendOptions,
  MultiBackend,
  NodeModel,
} from '@minoru/react-dnd-treeview'

import { Node } from './components/Node'
import { DraggedNode } from './components/DraggedNode'
import { InputNode, InputNodeProps } from './components/InputNode'
import classes from './BookmarkTree.module.css'

export type BookmarkTreeNodeData = { active: boolean } | { value: string }
export type BookmarkTreeNode = NodeModel<BookmarkTreeNodeData>

export interface BookmarkTreeProps {
  tree: BookmarkTreeNode[]
  onDrop: (tree: BookmarkTreeNode[], options: DropOptions<BookmarkTreeNodeData>) => void
  onSelect?: (id: number | string) => void
  inputProps?: Omit<InputNodeProps, 'id' | 'value' | 'parent' | 'depth'>
}

export function BookmarkTree({ tree, onDrop, onSelect, inputProps }: BookmarkTreeProps) {
  if (tree.length === 0) return <div className={classes.root}>Empty</div>

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <DnDTree
        tree={tree}
        rootId={0}
        initialOpen
        classes={{
          root: classes.root,
          container: classes.container,
          dropTarget: classes.dropTarget,
          listItem: classes.listItem,
          draggingSource: classes.draggingSource,
          placeholder: classes.placeholder,
        }}
        render={({ id, text, data, droppable, parent }, { depth, isOpen, onToggle, hasChild }) => {
          if (data && 'value' in data) {
            if (droppable) throw new Error('InputNode cannot be droppable')

            return (
              <InputNode depth={depth} parent={parent} id={id} value={data.value} {...inputProps} />
            )
          }

          if (data && 'active' in data)
            return (
              <Node
                id={id}
                onSelect={onSelect}
                isOpen={isOpen}
                text={text}
                onToggle={onToggle}
                active={data.active}
                depth={depth}
                hasChild={hasChild}
              />
            )

          return <></>
        }}
        dragPreviewRender={({ item }) => <DraggedNode text={item.text} />}
        onDrop={onDrop}
        enableAnimateExpand={true}
        canDrag={(node) => (node?.data && 'value' in node.data ? false : true)}
      />
    </DndProvider>
  )
}

export default BookmarkTree
