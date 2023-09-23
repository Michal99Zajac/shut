'use client'

import { useEffect, useRef, useState } from 'react'
import { produce } from 'immer'
import { TreeMethods } from '@minoru/react-dnd-treeview'
import difference from 'lodash/difference'

import { BookmarkTreeNode } from '@/components/BookmarkTree'
import {
  GQL_BookmarkGroupsQuery,
  useCreateBookmarkGroupMutation,
  useDeleteBookmarkGroupMutation,
  useUpdateBookmarkGroupMutation,
} from '@/graphql/generated'
import useQuery from '@/hooks/useQuery'

const transformBookmarkGroupsToTreeNodes = (
  bookmarkGroups: GQL_BookmarkGroupsQuery['bookmarkGroups'],
  selectedIds: string[] = [],
) =>
  bookmarkGroups.edges.map((edge) => ({
    id: edge.node.id,
    parent: edge.node.parent?.id ?? 0,
    text: edge.node.name,
    droppable: true,
    data: {
      input: false,
      selected: selectedIds.includes(edge.node.id),
    },
  }))

interface Anchor {
  target: HTMLElement
  id: number | string
}

export const useBookmarkGroupTreeToolbox = (
  bookmarkGroups: GQL_BookmarkGroupsQuery['bookmarkGroups'],
) => {
  const query = useQuery<{ bookmarkGroupId: string }>()
  const ref = useRef<TreeMethods>(null)
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const [tree, setTree] = useState<BookmarkTreeNode[]>(
    transformBookmarkGroupsToTreeNodes(bookmarkGroups),
  )
  const onlineBookmarksGroupIds = bookmarkGroups.edges.map(({ node }) => node.id)
  const [createBookmarkGroupMutation] = useCreateBookmarkGroupMutation({
    refetchQueries: ['BookmarkGroups'],
  })
  const [updateBookmarkGroupMutation] = useUpdateBookmarkGroupMutation({
    refetchQueries: ['BookmarkGroups'],
  })
  const [deleteBookmarkGroupMutation] = useDeleteBookmarkGroupMutation({
    refetchQueries: ['BookmarkGroups'],
  })

  /* -------------------------------------------------------------------------- */
  /*                                Tree Methods                                */
  /* -------------------------------------------------------------------------- */

  const clearInputs = () => {
    setTree(
      produce((draft) => {
        draft.forEach((node) => {
          if (node.data && 'input' in node.data) {
            // remove input node
            if (!onlineBookmarksGroupIds.includes(node.id.toString())) {
              draft.splice(draft.indexOf(node), 1)
            } else {
              node.droppable = true
              node.data.input = false
            }
          }
        })
      }),
    )
  }

  const onSelect = (id: number | string | null) => {
    query.set('bookmarkGroupId', id ? id.toString() : null)
  }

  const onInputSubmit = async (
    position: { id: number | string; parent: number | string },
    value: string,
  ) => {
    const isBookmarkExist = bookmarkGroups.edges.find(({ node }) => node.id === position.id)

    // check if the node exists, if it does, update it
    if (isBookmarkExist) {
      return updateBookmarkGroupMutation({
        variables: {
          updateBookmarkGroupId: position.id.toString(),
          input: {
            name: value,
          },
        },
      })
    }

    // otherwise create a new node
    return createBookmarkGroupMutation({
      variables: {
        input: {
          name: value,
          parentId: position.parent == 0 ? null : position.parent.toString(),
        },
      },
    })
  }

  const onDrop = (newTree: BookmarkTreeNode[]) => {
    const diff = difference(newTree, tree)[0]

    if (!diff) return

    updateBookmarkGroupMutation({
      variables: {
        updateBookmarkGroupId: diff.id.toString(),
        input: {
          parentId: diff.parent == 0 ? null : diff.parent.toString(),
        },
      },
    })
  }

  const onInputCreate = (parent: string | number) => {
    const newNode = {
      id: new Date().getTime(),
      parent,
      text: '',
      droppable: false,
      data: { input: true, selected: false },
    }

    ref.current?.open(parent)
    setTree((oldTree) => [...oldTree, newNode])
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

  const onAdd = () => {
    if (!anchor?.id) return

    onInputCreate(anchor.id)
    closeMenu()
  }

  const onRename = () => {
    if (!anchor?.id) return

    clearInputs()
    setTree(
      produce((draft) => {
        const node = draft.find((node) => node.id === anchor.id)

        if (node?.data) {
          node.droppable = false
          node.data.input = true
        }
      }),
    )
    closeMenu()
  }

  const onDelete = () => {
    if (!anchor?.id) return

    deleteBookmarkGroupMutation({
      variables: {
        deleteBookmarkGroupId: anchor.id.toString(),
      },
    })

    closeMenu()
  }

  /* -------------------------------------------------------------------------- */
  /*                                Side Effects                                */
  /* -------------------------------------------------------------------------- */

  // set tree nodes depending on the bookmark groups
  useEffect(() => {
    const selectedIds = query.query.bookmarkGroupId ? [query.query.bookmarkGroupId] : []
    setTree(transformBookmarkGroupsToTreeNodes(bookmarkGroups, selectedIds))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarkGroups])

  // set selected node depending on the query
  useEffect(() => {
    const selectedIds = query.query.bookmarkGroupId ? [query.query.bookmarkGroupId] : []
    setTree(
      produce((drafts) => {
        drafts.forEach((node) => {
          if (node.data && 'selected' in node.data) {
            node.data.selected = selectedIds.includes(node.id.toString())
          }
        })
      }),
    )
  }, [query.query.bookmarkGroupId])

  return {
    tree: {
      tree,
      setTree,
      onSelect,
      onInputSubmit,
      ref,
      onInputCreate,
      clearInputs,
      onDrop,
    },
    menu: {
      anchor,
      setAnchor,
      openMenu,
      closeMenu,
      onAdd,
      onRename,
      onDelete,
    },
  }
}

export default useBookmarkGroupTreeToolbox
