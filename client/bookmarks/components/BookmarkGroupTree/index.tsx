'use client'

import { useState } from 'react'

import { BookmarkTree, BookmarkTreeNode } from '@/components/BookmarkTree'

const SampleData: BookmarkTreeNode[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
    data: {
      active: false,
    },
  },
  {
    id: 2,
    parent: 1,
    text: 'File 1-1',
    droppable: true,
    data: {
      active: false,
    },
  },
  {
    id: 7,
    parent: 1,
    text: 'ww',
    droppable: false,
    data: {
      value: 'aaa',
    },
  },
  {
    id: 3,
    parent: 1,
    text: 'File 1-2',
    droppable: true,
    data: {
      active: false,
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
    data: {
      active: false,
    },
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
    data: {
      active: false,
    },
  },
  {
    id: 6,
    parent: 5,
    droppable: true,
    text: 'File 2-1-1',
    data: {
      active: false,
    },
  },
]

export function BookmarkGroupTree() {
  const [tree, setTree] = useState<BookmarkTreeNode[]>(SampleData)

  return (
    <BookmarkTree
      tree={tree}
      onDrop={(newTree) => setTree(newTree)}
      inputProps={{
        onChange: (position, value) => {
          setTree((tree) => {
            const index = tree.findIndex((node) => node.id === position.id)
            if (index === -1) return tree
            return [
              ...tree.slice(0, index),
              {
                ...tree[index],
                data: {
                  ...tree[index].data,
                  value,
                },
              },
              ...tree.slice(index + 1),
            ]
          })
        },
        onSubmit: (position, value) => {
          alert(`Submit ${value} to ${position.id}`)
        },
        onCancel: (id) => {
          alert(`Cancel ${id}`)
        },
      }}
    />
  )
}

export default BookmarkGroupTree
