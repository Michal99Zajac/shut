'use client'

import React from 'react'
import { DndProvider } from 'react-dnd'
import {
  Tree as DnDTree,
  DropOptions,
  getBackendOptions,
  MultiBackend,
  NodeModel,
  TreeMethods,
} from '@minoru/react-dnd-treeview'
import orderBy from 'lodash/orderBy'

import { Node, NodeProps } from './components/Node'
import { DraggedNode } from './components/DraggedNode'
import { InputNode, InputNodeProps } from './components/InputNode'
import classes from './BookmarkTree.module.css'

export type BookmarkTreeNodeData = { selected: boolean; input: boolean }
export type BookmarkTreeNode = NodeModel<BookmarkTreeNodeData>

export interface BookmarkTreeProps {
  tree: BookmarkTreeNode[]
  onDrop: (tree: BookmarkTreeNode[], options: DropOptions<BookmarkTreeNodeData>) => void
  onSelect?: (id: number | string | null) => void
  inputProps?: Omit<InputNodeProps, 'id' | 'parent' | 'depth'>
  moreProps?: NodeProps['moreProps']
}

export const BookmarkTree = React.forwardRef<TreeMethods, BookmarkTreeProps>(
  ({ tree, onDrop, onSelect, inputProps, moreProps }, ref) => {
    return (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <DnDTree
          tree={orderBy(tree, 'text', 'asc')}
          rootId={0}
          ref={ref}
          initialOpen
          insertDroppableFirst={false}
          classes={{
            root: classes.root,
            container: classes.container,
            dropTarget: classes.dropTarget,
            listItem: classes.listItem,
            draggingSource: classes.draggingSource,
            placeholder: classes.placeholder,
          }}
          render={(
            { id, text, data, parent, droppable },
            { depth, isOpen, onToggle, hasChild },
          ) => {
            if (data && data.input) {
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

            return (
              <Node
                id={id}
                onSelect={onSelect}
                isOpen={isOpen}
                text={text}
                onToggle={onToggle}
                selected={data?.selected}
                depth={depth}
                hasChild={hasChild}
                moreProps={moreProps}
              />
            )
          }}
          dragPreviewRender={({ item }) => <DraggedNode text={item.text} />}
          onDrop={onDrop}
          enableAnimateExpand={true}
          canDrag={(node) => (node?.data?.input ? false : true)}
          sort
        />
      </DndProvider>
    )
  },
)

BookmarkTree.displayName = 'BookmarkTree'

export default BookmarkTree
