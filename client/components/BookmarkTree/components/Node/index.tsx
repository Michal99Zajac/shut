import clsx from 'clsx'
import React from 'react'
import {
  AiOutlineFolder,
  AiFillFolder,
  AiFillFolderOpen,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
} from 'react-icons/ai'

import classes from './Node.module.css'

interface NodeProps {
  isOpen?: boolean
  text?: string
  onToggle?: () => void
  depth?: number
  hasChild?: boolean
  selected?: boolean
  id: number | string
  onSelect?: (id: number | string) => void
}

export const Node = React.forwardRef<any, NodeProps>(
  ({ isOpen, text, onToggle, depth = 0, hasChild, selected, onSelect, id }, ref) => {
    return (
      <button
        ref={ref}
        style={{ paddingInlineStart: 24 * depth + 8 }}
        className={clsx(classes.node, selected && classes.active)}
        onClick={hasChild ? onToggle : undefined}
        onDoubleClick={(e) => onSelect?.(id)}
      >
        <span className="text-xs w-4 text-center">
          {hasChild ? isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp /> : null}
        </span>
        <span className="mr-2">
          {!hasChild ? <AiOutlineFolder /> : isOpen ? <AiFillFolderOpen /> : <AiFillFolder />}
        </span>
        <div>{text}</div>
      </button>
    )
  },
)

Node.displayName = 'TreeNode'

export default Node
