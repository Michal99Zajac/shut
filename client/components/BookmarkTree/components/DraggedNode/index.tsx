import { AiFillFolder } from 'react-icons/ai'
import classes from './DraggedNode.module.css'

interface DraggedNodeProps {
  text: string
}

export function DraggedNode({ text }: DraggedNodeProps) {
  return (
    <div className={classes.node}>
      <span className="mr-2">
        <AiFillFolder />
      </span>
      <div>{text}</div>
    </div>
  )
}

export default DraggedNode
