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
import classes from './BookmarkTree.module.css'

export type BookmarkTreeNode = NodeModel<{ active: boolean }>

export interface BookmarkTreeProps {
  tree: BookmarkTreeNode[]
  onDrop: (tree: BookmarkTreeNode[], options: DropOptions<{ active: boolean }>) => void
  onSelect?: (id: number | string) => void
}

export function BookmarkTree({ tree, onDrop, onSelect }: BookmarkTreeProps) {
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
        render={({ id, text, data }, { depth, isOpen, onToggle, hasChild }) => (
          <Node
            id={id}
            onSelect={onSelect}
            isOpen={isOpen}
            text={text}
            onToggle={onToggle}
            active={data?.active}
            depth={depth}
            hasChild={hasChild}
          />
        )}
        dragPreviewRender={({ clientOffset, isDragging, item }) => <div>{item.text}</div>}
        onDrop={onDrop}
        enableAnimateExpand={true}
      />
    </DndProvider>
  )
}

export default BookmarkTree
