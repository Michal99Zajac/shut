'use client'

import { DndProvider } from 'react-dnd'
import {
  Tree as DnDTree,
  DropOptions,
  getBackendOptions,
  MultiBackend,
  NodeModel,
} from '@minoru/react-dnd-treeview'

import { Node, NodeProps } from './components/Node'
import { DraggedNode } from './components/DraggedNode'
import { InputNode, InputNodeProps } from './components/InputNode'
import { EmptyTree, EmptyTreeProps } from './components/EmptyTree'
import classes from './BookmarkTree.module.css'

export type BookmarkTreeNodeData = { selected: boolean } | { input: boolean }
export type BookmarkTreeNode = NodeModel<BookmarkTreeNodeData>

export interface BookmarkTreeProps {
  tree: BookmarkTreeNode[]
  onDrop: (tree: BookmarkTreeNode[], options: DropOptions<BookmarkTreeNodeData>) => void
  onSelect?: (id: number | string | null) => void
  inputProps?: Omit<InputNodeProps, 'id' | 'parent' | 'depth'>
  emptyProps?: EmptyTreeProps
  moreProps?: NodeProps['moreProps']
}

export function BookmarkTree({
  tree,
  onDrop,
  onSelect,
  inputProps,
  emptyProps,
  moreProps,
}: BookmarkTreeProps) {
  if (tree.length === 0) return <EmptyTree {...emptyProps} />

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
          if (data && 'input' in data) {
            if (droppable) throw new Error('InputNode cannot be droppable')

            return (
              <InputNode
                depth={depth}
                defaultValue={text}
                parent={parent}
                id={id}
                {...inputProps}
              />
            )
          }

          if (data && 'selected' in data)
            return (
              <Node
                id={id}
                onSelect={onSelect}
                isOpen={isOpen}
                text={text}
                onToggle={onToggle}
                selected={data.selected}
                depth={depth}
                hasChild={hasChild}
                moreProps={moreProps}
              />
            )

          return <></>
        }}
        dragPreviewRender={({ item }) => <DraggedNode text={item.text} />}
        onDrop={onDrop}
        enableAnimateExpand={true}
        canDrag={(node) => (node?.data && 'value' in node.data ? false : true)}
        sort={(a, b) => a.text.localeCompare(b.text)}
      />
    </DndProvider>
  )
}

export default BookmarkTree
