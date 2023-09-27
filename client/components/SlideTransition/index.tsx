import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'

/**
 * Slide transition for MUI Dialog.
 * @see https://mui.com/material-ui/react-dialog/#transitions
 */
export const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default SlideTransition
