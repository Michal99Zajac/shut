'use client'

import { AiOutlineFolder, AiFillFolder } from 'react-icons/ai'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

import { TreeItem, TreeView } from '@/components/Tree'

export function RootPage() {
  return (
    <>
      <h1 className="font-koulen text-4xl">Dashboard</h1>
      <p className="text-gray-500">Welcome to your dashboard!</p>
      <div>
        <TreeView
          aria-label="gmail"
          defaultExpanded={['3']}
          defaultCollapseIcon={<IoMdArrowDropdown />}
          defaultExpandIcon={<IoMdArrowDropup />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
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
      </div>
    </>
  )
}

export default RootPage
