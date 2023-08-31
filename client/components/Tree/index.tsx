import { DndProvider } from 'react-dnd'
import { Tree as DnDTree, getBackendOptions, MultiBackend } from '@minoru/react-dnd-treeview'
import { useState } from 'react'

const SampleData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 1,
    text: 'File 1-1',
    data: {
      fileType: 'csv',
      fileSize: '0.5MB',
    },
  },
  {
    id: 3,
    parent: 1,
    text: 'File 1-2',
    data: {
      fileType: 'pdf',
      fileSize: '4.8MB',
    },
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
  },
  {
    id: 6,
    parent: 5,
    text: 'File 2-1-1',
    data: {
      fileType: 'image',
      fileSize: '2.1MB',
    },
  },
]

export function Tree() {
  const [treeData, setTreeData] = useState(SampleData)
  const handleDrop = (newTree: any) => setTreeData(newTree)

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <DnDTree
        tree={treeData}
        rootId={0}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginInlineStart: depth * 10 }}>
            {node.droppable && <span onClick={onToggle}>{isOpen ? '[-]' : '[+]'}</span>}
            {node.text}
          </div>
        )}
        dragPreviewRender={(monitorProps) => <div>{monitorProps.item.text}</div>}
        onDrop={handleDrop}
      />
    </DndProvider>
  )
}

export default Tree
