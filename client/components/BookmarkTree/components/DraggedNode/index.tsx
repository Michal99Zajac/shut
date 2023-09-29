import { BiFolder } from 'react-icons/bi'
import classes from './DraggedNode.module.css'

interface DraggedNodeProps {
  text: string
}

export function DraggedNode({ text }: DraggedNodeProps) {
  return (
    <div className={classes.node}>
      <span className="mr-2">
        <BiFolder />
      </span>
      <div>{text}</div>
    </div>
  )
}

export default DraggedNode
