'use client'

import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { AiFillFolder, AiOutlineFolder } from 'react-icons/ai'

import { TreeItem, TreeView } from '@/components/Tree'

export function BookmarkGroupTree() {
  return (
    <TreeView
      aria-label="bookmark-groups"
      defaultCollapseIcon={<IoMdArrowDropdown />}
      defaultExpandIcon={<IoMdArrowDropup />}
      onNodeToggle={(event, nodeIds) => console.log(nodeIds)}
    >
      <TreeItem nodeId="1" labelText="All Mail" labelIcon={AiFillFolder} labelInfo="90" />
      <TreeItem nodeId="2" labelText="Trash" labelIcon={AiFillFolder} labelInfo="333" />
      <TreeItem nodeId="3" labelText="Categories" labelIcon={AiOutlineFolder} labelInfo="30">
        <TreeItem nodeId="5" labelText="Social" labelIcon={AiFillFolder} labelInfo="90" />
        <TreeItem nodeId="6" labelText="Updates" labelIcon={AiFillFolder} labelInfo="2,294" />
        <TreeItem nodeId="7" labelText="Forums" labelIcon={AiFillFolder} labelInfo="3,566" />
        <TreeItem nodeId="8" labelText="Promotions" labelIcon={AiFillFolder} labelInfo="733" />
      </TreeItem>
      <TreeItem nodeId="4" labelText="History" labelIcon={AiFillFolder} labelInfo="2" />
    </TreeView>
  )
}

export default BookmarkGroupTree
