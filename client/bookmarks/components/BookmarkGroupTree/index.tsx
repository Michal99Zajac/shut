'use client'

import { useState } from 'react'
import { produce } from 'immer'

import { BookmarkTree, BookmarkTreeNode } from '@/components/BookmarkTree'

const SampleData: BookmarkTreeNode[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
    data: {
      selected: false,
    },
  },
  {
    id: 2,
    parent: 1,
    text: 'File 1-1',
    droppable: true,
    data: {
      selected: false,
    },
  },
  {
    id: 7,
    parent: 1,
    text: 'ww',
    droppable: false,
    data: {
      input: true,
    },
  },
  {
    id: 3,
    parent: 1,
    text: 'File 1-2',
    droppable: true,
    data: {
      selected: false,
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
    data: {
      selected: false,
    },
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
    data: {
      selected: false,
    },
  },
  {
    id: 6,
    parent: 5,
    droppable: true,
    text: 'File 2-1-1',
    data: {
      selected: false,
    },
  },
]

export function BookmarkGroupTree() {
  const [tree, setTree] = useState<BookmarkTreeNode[]>(SampleData)

  const onSelect = (id: number | string) => {
    setTree(
      produce((draft) => {
        draft.forEach((node) => {
          if (node.data && 'selected' in node.data) {
            // set all selected to false except the selected one
            node.data.selected = node.id === id ? true : false
          }
        })
      }),
    )
  }

  const onCancel = (id: number | string) => {
    setTree(
      produce((draft) => {
        draft.forEach((node) => {
          if (node.data && 'input' in node.data) {
            // remove input node
            if (node.id === id) {
              draft.splice(draft.indexOf(node), 1)
            }
          }
        })
      }),
    )
  }

  return (
    <BookmarkTree
      tree={tree}
      onDrop={(newTree) => setTree(newTree)}
      onSelect={onSelect}
      inputProps={{
        onSubmit: (position, value) => {
          alert(`Submit ${value} to ${position.id}`)
        },
        onCancel: onCancel,
        placeholder: 'New folder',
      }}
    />
  )
}

export default BookmarkGroupTree
