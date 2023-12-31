import clsx from 'clsx'
import React from 'react'
import { AiOutlineFolder, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { BiFolder, BiFolderOpen } from 'react-icons/bi'
import { IconButton } from '@mui/material'
import { BsThreeDots } from 'react-icons/bs'

import classes from './Node.module.css'

export interface NodeProps {
  isOpen?: boolean
  text?: string
  onToggle?: () => void
  depth?: number
  hasChild?: boolean
  selected?: boolean
  id: number | string
  onSelect?: (id: number | string | null) => void
  moreProps?: {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number | string) => void
  }
}

export const Node = ({
  isOpen,
  text,
  onToggle,
  depth = 0,
  hasChild,
  selected,
  onSelect,
  id,
  moreProps,
}: NodeProps) => {
  return (
    <div
      style={{ paddingInlineStart: 12 * depth }}
      className={clsx(classes.node, selected && classes.active)}
      onClick={() => onSelect?.(selected ? null : id)}
    >
      <span className="text-xs w-8 text-center">
        {hasChild && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onToggle?.()
            }}
          >
            {isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
          </IconButton>
        )}
      </span>
      <span className="mr-2">
        {!hasChild ? <AiOutlineFolder /> : isOpen ? <BiFolderOpen /> : <BiFolder />}
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      <div className="grow" />
      <div className="flex self-end">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            moreProps?.onClick?.(e, id)
          }}
        >
          <BsThreeDots />
        </IconButton>
      </div>
    </div>
  )
}

export default Node
