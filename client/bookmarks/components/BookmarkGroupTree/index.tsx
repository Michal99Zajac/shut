'use client'

import { useState } from 'react'
import { produce } from 'immer'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { BookmarkTree, BookmarkTreeNode } from '@/components/BookmarkTree'
import { generateTreeInputNode } from '@/bookmarks/utils/generateTreeInputNode'

const SampleData: BookmarkTreeNode[] = [
  {
    id: 1,
    parent: 0,
    text: 'Folder 1',
    droppable: true,
    data: {
      selected: false,
    },
  },
  {
    id: 2,
    parent: 0,
    text: 'Folder 2',
    droppable: true,
    data: {
      selected: false,
    },
  },
  {
    id: 3,
    parent: 2,
    text: 'Folder 2-1',
    droppable: true,
    data: {
      selected: false,
    },
  },
]

interface Anchor {
  target: HTMLElement
  id: number | string
}

export function BookmarkGroupTree() {
  const [tree, setTree] = useState<BookmarkTreeNode[]>(SampleData)
  const [anchor, setAnchor] = useState<Anchor | null>(null)

  const onSelect = (id: number | string | null) => {
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

  const onInputSubmit = (
    position: { id: number | string; parent: number | string },
    value: string,
  ) => {
    setTree(
      produce((draft) => {
        const input = draft.find(
          (node) => node.data && 'input' in node.data && node.id === position.id,
        )

        if (input) {
          // change input node into normal node
          input.id = position.id
          input.parent = position.parent
          input.text = value
          input.data = {
            selected: false,
          }
        }
      }),
    )
  }

  const onEmptyCreate = () => {
    setTree([generateTreeInputNode()])
  }

  const onMoreClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number | string,
  ) => {
    setAnchor({
      target: event.currentTarget,
      id,
    })
  }

  const onMenuClose = () => {
    setAnchor(null)
  }

  const onMenuOptionClick = () => {
    if (!anchor) return

    setTree(
      produce((draft) => {
        const node = draft.find(
          (node) => node.data && 'selected' in node.data && node.id === anchor.id,
        )

        if (node) {
          node.droppable = false
          node.data = {
            input: true,
          }
        }
      }),
    )

    setAnchor(null)
  }

  return (
    <>
      <BookmarkTree
        tree={tree}
        onDrop={(newTree) => setTree(newTree)}
        onSelect={onSelect}
        inputProps={{
          onSubmit: onInputSubmit,
          onCancel: onCancel,
          placeholder: 'New folder',
        }}
        emptyProps={{
          onCreate: onEmptyCreate,
        }}
        moreProps={{
          onClick: onMoreClick,
        }}
      />
      <Menu anchorEl={anchor?.target} open={!!anchor} onClose={onMenuClose}>
        <MenuItem onClick={onMenuOptionClick}>Profile</MenuItem>
        <MenuItem onClick={onMenuOptionClick}>My account</MenuItem>
        <MenuItem onClick={onMenuOptionClick}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default BookmarkGroupTree
