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
  { selectedIds = [], fetchedIds = [] }: { selectedIds?: string[]; fetchedIds?: string[] } = {},
) =>
  bookmarkGroups.map((bookmarkGroup) => ({
    id: bookmarkGroup.id,
    parent: bookmarkGroup.parent?.id
      ? fetchedIds.includes(bookmarkGroup.parent.id)
        ? bookmarkGroup.parent.id
        : 0
      : 0,
    text: bookmarkGroup.name,
    droppable: true,
    data: {
      input: false,
      selected: selectedIds?.includes(bookmarkGroup.id),
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
    transformBookmarkGroupsToTreeNodes(bookmarkGroups, {
      selectedIds: query.query.bookmarkGroupId ? [query.query.bookmarkGroupId] : [],
      fetchedIds: bookmarkGroups.map((bookmarkGroup) => bookmarkGroup.id),
    }),
  )
  const onlineBookmarksGroupIds = bookmarkGroups.map((bookmarkGroup) => bookmarkGroup.id)
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

  const resetBookmarkGroupTree = () => {
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

  const selectBookmarkGroup = (id: number | string | null) => {
    query.set('bookmarkGroupId', id ? id.toString() : null)
  }

  const submitInput = async (
    position: { id: number | string; parent: number | string },
    value: string,
  ) => {
    const isBookmarkExist = bookmarkGroups.find((bookmarkGroup) => bookmarkGroup.id === position.id)

    // check if the node exists, if it does, update it
    if (isBookmarkExist) {
      return updateBookmarkGroupMutation({
        variables: {
          updateBookmarkGroupId: position.id.toString(),
          input: {
            name: value,
          },
        },
        refetchQueries: ['BookmarkGroups'],
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
      refetchQueries: ['BookmarkGroups'],
    })
  }

  const updateBookmarkGroupParent = (newTree: BookmarkTreeNode[]) => {
    const diff = difference(newTree, tree)[0]

    if (!diff) return

    updateBookmarkGroupMutation({
      variables: {
        updateBookmarkGroupId: diff.id.toString(),
        input: {
          parentId: diff.parent == 0 ? null : diff.parent.toString(),
        },
      },
      refetchQueries: ['BookmarkGroups'],
    })
  }

  const createInput = (parent: string | number) => {
    resetBookmarkGroupTree()

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

  const addBookmarkGroup = () => {
    if (!anchor?.id) return
    createInput(anchor.id)
    closeMenu()
  }

  const renameBookmarkGroup = () => {
    if (!anchor?.id) return

    resetBookmarkGroupTree()
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

  const deleteBookmarkGroup = () => {
    if (!anchor?.id) return

    deleteBookmarkGroupMutation({
      variables: {
        deleteBookmarkGroupId: anchor.id.toString(),
      },
      refetchQueries: ['BookmarkGroups'],
    })

    closeMenu()
  }

  /* -------------------------------------------------------------------------- */
  /*                                Side Effects                                */
  /* -------------------------------------------------------------------------- */

  // set tree nodes depending on the bookmark groups
  useEffect(() => {
    const selectedIds = query.query.bookmarkGroupId ? [query.query.bookmarkGroupId] : []
    setTree(
      transformBookmarkGroupsToTreeNodes(bookmarkGroups, {
        selectedIds,
        fetchedIds: bookmarkGroups.map((bookmarkGroup) => bookmarkGroup.id),
      }),
    )
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
      ref,
      setTree,
      selectBookmarkGroup,
      submitInput,
      createInput,
      resetBookmarkGroupTree,
      updateBookmarkGroupParent,
    },
    menu: {
      anchor,
      setAnchor,
      openMenu,
      closeMenu,
      addBookmarkGroup,
      renameBookmarkGroup,
      deleteBookmarkGroup,
    },
  }
}

export default useBookmarkGroupTreeToolbox
