import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'

export const StyledIconButton = styled(IconButton)(() => ({
  '&.MuiButtonBase-root': {
    height: '2rem',
    width: '2rem',
    borderRadius: '4px',
  },
}))

export default StyledIconButton
