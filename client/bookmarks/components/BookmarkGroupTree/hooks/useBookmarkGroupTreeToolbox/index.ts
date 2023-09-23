'use client'

import { useRef, useState } from 'react'
import { produce } from 'immer'
import { TreeMethods } from '@minoru/react-dnd-treeview'

import { BookmarkTreeNode } from '@/components/BookmarkTree'
import { useCreateBookmarkGroupMutation } from '~/client/graphql/generated'

interface Anchor {
  target: HTMLElement
  id: number | string
}

export const useBookmarkGroupTreeToolbox = (defaultTree: BookmarkTreeNode[] = []) => {
  const ref = useRef<TreeMethods>(null)
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const [tree, setTree] = useState<BookmarkTreeNode[]>(defaultTree)
  const [createBookmarkGroupMutation, createBookmarkGroupMutationState] =
    useCreateBookmarkGroupMutation()

  /* -------------------------------------------------------------------------- */
  /*                                Tree Methods                                */
  /* -------------------------------------------------------------------------- */

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
            if (node.id === id && node.text === '') {
              draft.splice(draft.indexOf(node), 1)
            } else {
              node.data.input = false
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
    createBookmarkGroupMutation({
      variables: {
        input: {
          name: value,
          parentId: position.parent == 0 ? null : position.parent.toString(),
        },
      },
    })

    // setTree(
    //   produce((draft) => {
    //     const input = draft.find(
    //       (node) => node.data && 'input' in node.data && node.id === position.id,
    //     )

    //     if (input) {
    //       // change input node into normal node
    //       input.id = position.id
    //       input.parent = position.parent
    //       input.text = value
    //       input.droppable = true
    //       input.data = {
    //         selected: false,
    //       }
    //     }
    //   }),
    // )
  }

  const onInputCreate = (parent: string | number) => {
    const newNode = {
      id: new Date().getTime(),
      parent,
      text: '',
      droppable: false,
      data: { input: true },
    }

    setTree((oldTree) => [...oldTree, newNode])
    ref.current?.open(parent)
  }

  /* -------------------------------------------------------------------------- */
  /*                                Menu Methods                                */
  /* -------------------------------------------------------------------------- */

  const openMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number | string,
  ) => {
    setAnchor({
      target: event.currentTarget,
      id,
    })
  }

  const closeMenu = () => setAnchor(null)

  const onMenuCreateNewGroup = () => {
    if (!anchor?.id) return

    onInputCreate(anchor.id)
    closeMenu()
  }

  return {
    tree: {
      tree,
      setTree,
      onSelect,
      onCancel,
      onInputSubmit,
      ref,
      onInputCreate,
    },
    menu: {
      anchor,
      setAnchor,
      openMenu,
      closeMenu,
      onMenuCreateNewGroup,
    },
  }
}

export default useBookmarkGroupTreeToolbox
